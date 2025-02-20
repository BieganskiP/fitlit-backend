import { Controller, Get, Post, Body, Param, Query, UseGuards, Req, Patch } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { CreateRouteDto } from './dto/create-route.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../enums/user-role.enum';
import { AuthenticatedRequest } from '../types/express';

@Controller('routes')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RoutesController {
  constructor(private readonly routesService: RoutesService) {}

  @Get()
  @Roles(UserRole.ADMIN, UserRole.OWNER)
  async findAll(
    @Req() req: AuthenticatedRequest,
    @Query('activeOnly') activeOnly?: string,
  ) {
    return this.routesService.findAll(
      req.user.companyId,
      activeOnly === 'true',
    );
  }

  @Post()
  @Roles(UserRole.ADMIN, UserRole.OWNER)
  async create(
    @Body() createRouteDto: CreateRouteDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.routesService.create(createRouteDto, req.user.companyId);
  }

  @Patch(':id/deactivate')
  @Roles(UserRole.ADMIN, UserRole.OWNER)
  async deactivate(
    @Param('id') id: string,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.routesService.deactivate(id, req.user.companyId);
  }

  @Patch(':id/assign/:userId')
  @Roles(UserRole.ADMIN, UserRole.OWNER)
  async assignToUser(
    @Param('id') id: string,
    @Param('userId') userId: string,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.routesService.assignToUser(id, userId, req.user.companyId);
  }
} 