import {
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
  Req,
  Post,
  Body,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CompanyAccessGuard } from '../guards/company-access.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CompanyAccess } from '../decorators/company-access.decorator';
import { UserRole } from '../enums/user-role.enum';
import { FilterUsersDto } from '../dto/user/filter-users.dto';
import { FeatureGuard } from 'src/guards/feature.guard';
import { RequireFeature } from '../decorators/require-feature.decorator';
import { AuthenticatedRequest } from '../types/express';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async getCurrentUser(@Req() req: AuthenticatedRequest) {
    return this.usersService.getCurrentUser(req.user.id);
  }

  @Get()
  @Roles(UserRole.SUPERADMIN, UserRole.OWNER, UserRole.ADMIN)
  async findAll(@Query() filterDto: FilterUsersDto, @Req() req) {
    return this.usersService.findAll(filterDto, req.user);
  }

  @Get(':id')
  @Roles(UserRole.SUPERADMIN, UserRole.OWNER, UserRole.ADMIN)
  @UseGuards(CompanyAccessGuard)
  @CompanyAccess()
  async findOne(@Param('id') id: string, @Req() req) {
    return this.usersService.findOne(id, req.user);
  }

  @Post('change-role')
  @Roles(UserRole.OWNER, UserRole.ADMIN)
  @RequireFeature('ROLE_MANAGEMENT')
  async changeUserRole(
    @Body() { userId, role }: { userId: string; role: UserRole },
    @Req() req,
  ) {
    return this.usersService.changeRole(userId, role, req.user);
  }

  @Post(':id/wage')
  @Roles(UserRole.OWNER, UserRole.ADMIN)
  @RequireFeature('WAGE_MANAGEMENT')
  async updateWage(
    @Param('id') id: string,
    @Body() { wage }: { wage: number },
    @Req() req,
  ) {
    return this.usersService.updateWage(id, wage, req.user);
  }
}
