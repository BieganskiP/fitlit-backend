import { CompanyPlan } from '../enums/company-plan.enum';

interface FeatureConfig {
  minPlan: CompanyPlan;
  description: string;
}

export const features: Record<string, FeatureConfig> = {
  USER_MANAGEMENT: {
    minPlan: CompanyPlan.BASIC,
    description: "Basic user management"
  },
  ROLE_MANAGEMENT: {
    minPlan: CompanyPlan.BUSINESS,
    description: "Advanced role management"
  },
  WAGE_MANAGEMENT: {
    minPlan: CompanyPlan.ENTERPRISE,
    description: "Employee wage management"
  },
  ADVANCED_ANALYTICS: {
    minPlan: CompanyPlan.ENTERPRISE,
    description: "Advanced analytics and reporting"
  },
  SHIFT_SCHEDULING: {
    minPlan: CompanyPlan.BUSINESS,
    description: "Work shift scheduling"
  }
}; 