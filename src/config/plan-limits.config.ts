import { CompanyPlan } from '../enums/company-plan.enum';

interface PlanLimits {
  maxUsers: number;
  description: string;
}

export const planLimits: Record<CompanyPlan, PlanLimits> = {
  [CompanyPlan.BASIC]: {
    maxUsers: 15,
    description: 'Basic plan with up to 15 users',
  },
  [CompanyPlan.BUSINESS]: {
    maxUsers: 30,
    description: 'Business plan with up to 30 users',
  },
  [CompanyPlan.ENTERPRISE]: {
    maxUsers: 50,
    description: 'Enterprise plan with up to 50 users',
  },
};
