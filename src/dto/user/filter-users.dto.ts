import { IsOptional, IsString, IsEnum } from 'class-validator';
import { UserRole } from '../../enums/user-role.enum';

export class FilterUsersDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @IsOptional()
  @IsString()
  companyId?: string;

  @IsOptional()
  @IsString()
  page?: string;

  @IsOptional()
  @IsString()
  limit?: string;
} 