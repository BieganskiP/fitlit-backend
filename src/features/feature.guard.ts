import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CompanyPlan } from '../enums/company-plan.enum';
import { features } from '../config/features.config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from '../entities/company.entity';

@Injectable()
export class FeatureGuard implements CanActivate {
  private readonly planHierarchy = {
    [CompanyPlan.ENTERPRISE]: 3,
    [CompanyPlan.BUSINESS]: 2,
    [CompanyPlan.BASIC]: 1,
  };

  constructor(
    private reflector: Reflector,
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredFeature = this.reflector.get<string>(
      'requiredFeature',
      context.getHandler(),
    );

    if (!requiredFeature) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Superadmins bypass feature restrictions
    if (user.role === 'SUPERADMIN') {
      return true;
    }

    // Get company with plan
    const company = await this.companyRepository.findOne({
      where: { id: user.companyId },
    });

    if (!company) {
      return false;
    }

    // Get required plan for the feature
    const featureConfig = features[requiredFeature];
    if (!featureConfig) {
      return false;
    }

    const requiredPlanLevel = this.planHierarchy[featureConfig.minPlan];
    const currentPlanLevel = this.planHierarchy[company.plan];

    return currentPlanLevel >= requiredPlanLevel;
  }
}
