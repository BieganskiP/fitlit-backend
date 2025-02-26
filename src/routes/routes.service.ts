import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Route } from '../entities/route.entity';
import { CreateRouteDto } from './dto/create-route.dto';

@Injectable()
export class RoutesService {
  constructor(
    @InjectRepository(Route)
    private routeRepository: Repository<Route>,
  ) {}

  async findAll(companyId: string, activeOnly: boolean = false) {
    const query = this.routeRepository
      .createQueryBuilder('route')
      .where('route.companyId = :companyId', { companyId });

    if (activeOnly) {
      query.andWhere('route.active = true');
    }

    return query
      .leftJoinAndSelect('route.user', 'user')
      .orderBy('route.createdAt', 'DESC')
      .getMany();
  }

  async create(createRouteDto: CreateRouteDto, companyId: string) {
    const route = this.routeRepository.create({
      ...createRouteDto,
      companyId,
      active: true,
    });

    return this.routeRepository.save(route);
  }

  async deactivate(id: string, companyId: string) {
    const route = await this.routeRepository.findOne({
      where: { id, companyId },
    });

    if (!route) {
      throw new NotFoundException('Route not found');
    }

    route.active = false;
    return this.routeRepository.save(route);
  }

  async assignToUser(id: string, userId: string, companyId: string) {
    const route = await this.routeRepository.findOne({
      where: { id, companyId },
    });

    if (!route) {
      throw new NotFoundException('Route not found');
    }

    if (!route.active) {
      throw new BadRequestException('Cannot assign inactive route');
    }

    route.userId = userId;
    return this.routeRepository.save(route);
  }
}
