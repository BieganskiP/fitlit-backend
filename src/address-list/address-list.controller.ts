import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
  Query,
} from '@nestjs/common';
import { AddressListService } from './address-list.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../enums/user-role.enum';
import { AuthenticatedRequest } from '../types/express';

@Controller('address-list')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AddressListController {
  constructor(private readonly addressListService: AddressListService) {}

  @Post('reassign-routes')
  @Roles(UserRole.ADMIN, UserRole.OWNER)
  async reassignRoutes(
    @Body()
    dto: {
      addressListIds: string[];
      targetRoute: string;
      date: string;
    },
    @Req() req: AuthenticatedRequest,
  ) {
    return this.addressListService.reassignRoutes({
      ...dto,
      date: new Date(dto.date),
      companyId: req.user.companyId,
    });
  }

  @Get('my-deliveries')
  @Roles(UserRole.USER, UserRole.LEADER, UserRole.ADMIN, UserRole.OWNER)
  async findMyDeliveries(
    @Req() req: AuthenticatedRequest,
    @Query('date') dateString?: string,
  ) {
    const date = dateString ? new Date(dateString) : undefined;
    return this.addressListService.findUserAddressList(req.user.id, date);
  }
}
