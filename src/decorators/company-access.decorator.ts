import { SetMetadata } from '@nestjs/common';

export const COMPANY_ACCESS_KEY = 'companyAccess';
export const CompanyAccess = () => SetMetadata(COMPANY_ACCESS_KEY, true); 