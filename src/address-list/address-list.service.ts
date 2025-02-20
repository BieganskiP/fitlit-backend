import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, In } from 'typeorm';
import { AddressList } from '../entities/address-list.entity';
import { AddressListInfo } from '../entities/address-list-info.entity';
import { Route } from '../entities/route.entity';

interface ReassignRoutesDto {
  addressListIds: string[]; // IDs of address-list entries to move
  targetRoute: string; // New route (e.g., 'S1K')
  date: Date; // Date of the entries
  companyId: string; // Company ID for validation
}

@Injectable()
export class AddressListService {
  constructor(
    @InjectRepository(AddressList)
    private addressListRepository: Repository<AddressList>,
    @InjectRepository(AddressListInfo)
    private addressListInfoRepository: Repository<AddressListInfo>,
    @InjectRepository(Route)
    private routeRepository: Repository<Route>,
    private dataSource: DataSource, // For transactions
  ) {}

  async reassignRoutes(dto: ReassignRoutesDto) {
    const { addressListIds, targetRoute, date, companyId } = dto;

    // Start transaction
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Find the route entity first
      const routeEntity = await this.routeRepository.findOne({
        where: {
          name: targetRoute,
          companyId,
          active: true,
        },
      });

      // Get all address list entries to move
      const addressListEntries = await this.addressListRepository.find({
        where: {
          id: In(addressListIds),
          companyId,
        },
        relations: ['addressListInfo'],
      });

      if (addressListEntries.length !== addressListIds.length) {
        throw new BadRequestException(
          'Some address list entries were not found',
        );
      }

      if (addressListEntries.length === 0) {
        throw new BadRequestException('No entries found to move');
      }

      // Get source company ID from the first entry
      const sourceCompanyId = addressListEntries[0].companyId;

      let targetAddressListInfo = await this.addressListInfoRepository.findOne({
        where: {
          route: targetRoute,
          date,
          companyId,
        },
      });

      const addressListInfoData = {
        route: targetRoute,
        date,
        companyId,
        numberOfStops: addressListEntries.length,
        numberOfPackages: addressListEntries.length,
      };

      // Add route relation only if route exists
      if (routeEntity) {
        Object.assign(addressListInfoData, {
          routeId: routeEntity.id,
          routeEntity: routeEntity,
        });
      }

      if (!targetAddressListInfo) {
        targetAddressListInfo =
          this.addressListInfoRepository.create(addressListInfoData);
        await queryRunner.manager.save(targetAddressListInfo);
      } else {
        targetAddressListInfo.numberOfStops += addressListEntries.length;
        targetAddressListInfo.numberOfPackages += addressListEntries.length;

        // Update route relation only if route exists
        if (routeEntity) {
          targetAddressListInfo.routeId = routeEntity.id;
          targetAddressListInfo.routeEntity = routeEntity;
        }

        await queryRunner.manager.save(targetAddressListInfo);
      }

      // 3. Group entries by current route for updating old route info
      const entriesByOldRoute = new Map<string, AddressList[]>();
      addressListEntries.forEach((entry) => {
        const oldRoute = entry.addressListInfo.route;
        if (!entriesByOldRoute.has(oldRoute)) {
          entriesByOldRoute.set(oldRoute, []);
        }
        entriesByOldRoute.get(oldRoute)!.push(entry);
      });

      // 4. Update old routes' counts
      for (const [oldRoute, entries] of entriesByOldRoute) {
        const oldRouteInfo = await this.addressListInfoRepository.findOne({
          where: {
            route: oldRoute,
            date,
            companyId: sourceCompanyId, // Use the source company ID
          },
        });

        if (oldRouteInfo) {
          oldRouteInfo.numberOfStops -= entries.length;
          oldRouteInfo.numberOfPackages -= entries.length;

          if (oldRouteInfo.numberOfStops === 0) {
            await queryRunner.manager.remove(oldRouteInfo);
          } else {
            await queryRunner.manager.save(oldRouteInfo);
          }
        }
      }

      // 5. Update all address list entries with new route and info
      for (const entry of addressListEntries) {
        entry.route = targetRoute;
        entry.addressListInfo = targetAddressListInfo;
        entry.addressListInfoId = targetAddressListInfo.id;

        // Add route relation if route exists
        if (routeEntity) {
          entry.routeId = routeEntity.id;
          entry.routeEntity = routeEntity;
        }

        await queryRunner.manager.save(entry);
      }

      // Commit transaction
      await queryRunner.commitTransaction();

      return {
        message: 'Routes reassigned successfully',
        updatedEntries: addressListEntries.length,
        targetRoute,
        newStopsCount: targetAddressListInfo.numberOfStops,
      };
    } catch (error) {
      // Rollback transaction on error
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      // Release query runner
      await queryRunner.release();
    }
  }

  async findUserAddressList(userId: string, date?: Date) {
    // First get all active routes assigned to the user
    const userRoutes = await this.routeRepository.find({
      where: {
        userId,
        active: true,
      },
    });

    if (!userRoutes.length) {
      return [];
    }

    // Build query for address lists
    const queryBuilder = this.addressListRepository
      .createQueryBuilder('addressList')
      .leftJoinAndSelect('addressList.routeEntity', 'route')
      .leftJoinAndSelect('addressList.addressListInfo', 'addressListInfo')
      .where('route.id IN (:...routeIds)', {
        routeIds: userRoutes.map((route) => route.id),
      });

    // Add date filter if provided
    if (date) {
      queryBuilder.andWhere('addressList.date = :date', {
        date: date,
      });
    }

    // Order by delivery time
    queryBuilder.orderBy('addressList.deliveryTime', 'ASC');

    return queryBuilder.getMany();
  }
}
