import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { FilterUsersDto } from '../dto/user/filter-users.dto';
import { UserRole } from '../enums/user-role.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(filterDto: FilterUsersDto, currentUser: User) {
    const { search, role, page = '1', limit = '10' } = filterDto;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const queryBuilder = this.userRepository
      .createQueryBuilder('user')
      .select([
        'user.id',
        'user.email',
        'user.firstName',
        'user.lastName',
        'user.phoneNumber',
        'user.city',
        'user.streetName',
        'user.houseNumber',
        'user.postCode',
        'user.role',
        'user.status',
        'user.wage',
        'user.companyId',
        'user.invitationToken',
        'user.invitationExpires',
        'user.isProfileComplete',
        'user.createdAt',
        'user.updatedAt',
      ]);

    // Base conditions
    if (currentUser.role !== UserRole.SUPERADMIN) {
      // Non-superadmins can only see users from their company and never see superadmins
      queryBuilder
        .where('user.companyId = :companyId', {
          companyId: currentUser.companyId,
        })
        .andWhere('user.role != :superadminRole', {
          superadminRole: UserRole.SUPERADMIN,
        });
    }

    // Search condition
    if (search) {
      queryBuilder.andWhere(
        '(LOWER(user.email) LIKE LOWER(:search) OR LOWER(user.firstName) LIKE LOWER(:search) OR LOWER(user.lastName) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    // Role filter
    if (role) {
      queryBuilder.andWhere('user.role = :role', { role });
    }

    // Add pagination
    queryBuilder
      .skip(skip)
      .take(parseInt(limit))
      .orderBy('user.createdAt', 'DESC');

    // Get total count for pagination
    const [users, total] = await queryBuilder.getManyAndCount();

    return {
      users,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit)),
      },
    };
  }

  async findOne(id: string, currentUser: User) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['company'],
    });

    if (!user) {
      throw new NotFoundException('Użytkownik nie został znaleziony');
    }

    // Check if user has access to view this user
    if (
      currentUser.role !== UserRole.SUPERADMIN &&
      user.companyId !== currentUser.companyId
    ) {
      throw new NotFoundException('Użytkownik nie został znaleziony');
    }

    // Don't show superadmins to non-superadmins
    if (
      user.role === UserRole.SUPERADMIN &&
      currentUser.role !== UserRole.SUPERADMIN
    ) {
      throw new NotFoundException('Użytkownik nie został znaleziony');
    }

    return user;
  }

  async changeRole(userId: string, newRole: UserRole, currentUser: User) {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('Użytkownik nie został znaleziony');
    }

    // Owners can't change their own role
    if (currentUser.id === userId) {
      throw new BadRequestException('Nie możesz zmienić swojej własnej roli');
    }

    // Check company access
    if (
      currentUser.role !== UserRole.SUPERADMIN &&
      user.companyId !== currentUser.companyId
    ) {
      throw new BadRequestException(
        'Nie masz uprawnień do zarządzania tym użytkownikiem',
      );
    }

    // Owner-specific restrictions
    if (currentUser.role === UserRole.OWNER) {
      // Can't create or modify owners
      if (newRole === UserRole.OWNER || user.role === UserRole.OWNER) {
        throw new BadRequestException(
          'Nie możesz tworzyć ani modyfikować właścicieli',
        );
      }

      // Can't modify superadmins
      if (user.role === UserRole.SUPERADMIN) {
        throw new BadRequestException('Nie możesz modyfikować superadminów');
      }
    }

    user.role = newRole;
    return this.userRepository.save(user);
  }

  async updateWage(id: string, wage: number, currentUser: User) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('Użytkownik nie został znaleziony');
    }

    // Check company access
    if (
      currentUser.role !== UserRole.SUPERADMIN &&
      user.companyId !== currentUser.companyId
    ) {
      throw new BadRequestException(
        'Nie masz uprawnień do zarządzania tym użytkownikiem',
      );
    }

    // Only allow positive wages
    if (wage < 0) {
      throw new BadRequestException('Wynagrodzenie nie może być ujemne');
    }

    user.wage = wage;
    return this.userRepository.save(user);
  }

  async getCurrentUser(userId: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['company', 'routes', 'superadminCompanies'],
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        status: true,
        wage: true,
        isProfileComplete: true,
        company: {
          id: true,
          name: true,
          plan: true,
        },
        routes: {
          id: true,
          name: true,
          description: true,
          active: true,
        },
        superadminCompanies: {
          id: true,
          name: true,
        },
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
