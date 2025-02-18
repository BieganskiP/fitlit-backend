import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CompanyPlan } from '../enums/company-plan.enum';
import { features } from '../config/features.config';

@Injectable()
export class FeatureGuard implements CanActivate {
  private readonly planHierarchy = {
    [CompanyPlan.ENTERPRISE]: 3,
    [CompanyPlan.BUSINESS]: 2,
    [CompanyPlan.BASIC]: 1,
  };

  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
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

    // Get company plan from user's company
    const companyPlan = user.company?.plan || CompanyPlan.BASIC;

    // Get required plan for the feature
    const featureConfig = features[requiredFeature];
    if (!featureConfig) {
      return false;
    }

    const requiredPlanLevel = this.planHierarchy[featureConfig.minPlan];
    const currentPlanLevel = this.planHierarchy[companyPlan];

    return currentPlanLevel >= requiredPlanLevel;
  }
}
