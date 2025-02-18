import { IsString, IsOptional, IsPhoneNumber } from 'class-validator';

export class UpdateUserProfileDto {
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsPhoneNumber()
  @IsOptional()
  phoneNumber?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsString()
  @IsOptional()
  streetName?: string;

  @IsString()
  @IsOptional()
  houseNumber?: string;

  @IsString()
  @IsOptional()
  postCode?: string;
} 