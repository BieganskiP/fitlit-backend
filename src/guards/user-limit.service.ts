import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Company } from '../entities/company.entity';
import { planLimits } from '../config/plan-limits.config';

@Injectable()
export class UserLimitService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {}

  async canAddUser(companyId: string): Promise<boolean> {
    const company = await this.companyRepository.findOne({
      where: { id: companyId },
    });

    if (!company) {
      throw new BadRequestException('Nie znaleziono firmy');
    }

    // Get current number of users in company
    const currentUserCount = await this.userRepository.count({
      where: { companyId },
    });

    // Get plan limits
    const limit = planLimits[company.plan].maxUsers;

    if (currentUserCount >= limit) {
      throw new BadRequestException(
        'Osiągnięto limit użytkowników dla tego planu. Rozważ aktualizację planu.',
      );
    }

    return true;
  }
}
