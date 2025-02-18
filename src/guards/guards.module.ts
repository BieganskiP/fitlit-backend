import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Company } from '../entities/company.entity';
import { UserLimitGuard } from './user-limit.guard';
import { FeatureGuard } from './feature.guard';
import { UserLimitService } from './user-limit.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Company]),
  ],
  providers: [UserLimitGuard, FeatureGuard, UserLimitService],
  exports: [UserLimitGuard, FeatureGuard, UserLimitService],
})
export class GuardsModule {} 