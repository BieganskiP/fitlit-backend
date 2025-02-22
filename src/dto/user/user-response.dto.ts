import { UserRole } from '../../enums/user-role.enum';
import { UserStatus } from '../../enums/user-status.enum';
import { Exclude, Expose } from 'class-transformer';

export class CompanyResponseDto {
  id: string;
  name: string;
  plan?: string;
}

export class RouteResponseDto {
  id: string;
  name: string;
  description?: string;
  active: boolean;
}

@Expose()
export class UserResponseDto {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  firstName?: string;

  @Expose()
  lastName?: string;

  @Expose()
  role: UserRole;

  @Expose()
  status: UserStatus;

  @Expose()
  wage?: number;

  @Expose()
  isProfileComplete: boolean;

  @Expose()
  company?: CompanyResponseDto;

  @Expose()
  routes?: RouteResponseDto[];

  @Expose()
  superadminCompanies?: CompanyResponseDto[];
}
