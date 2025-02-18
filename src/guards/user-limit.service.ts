import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Company } from '../entities/company.entity';
import { planLimits } from '../config/plan-limits.config';

@Injectable()
export class UserLimitService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async checkUserLimit(userId: string, companyId: string): Promise<{ allowed: boolean; message?: string }> {
    const company = await this.companyRepository.findOne({
      where: { id: companyId },
    });

    if (!company) {
      return { 
        allowed: false, 
        message: 'Firma nie została znaleziona'
      };
    }

    const currentUserCount = await this.userRepository.count({
      where: { companyId: company.id },
    });

    const planLimit = planLimits[company.plan].maxUsers;

    if (currentUserCount >= planLimit) {
      return {
        allowed: false,
        message: `Osiągnięto limit użytkowników dla planu ${company.plan}. Limit: ${planLimit}. Rozważ aktualizację planu.`,
      };
    }

    return { allowed: true };
  }
} 