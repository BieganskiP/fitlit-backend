import { Controller, Post, Body, UseGuards, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateInvitationDto } from '../dto/user/create-invitation.dto';
import { CompleteRegistrationDto } from '../dto/user/complete-registration.dto';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './decorators/roles.decorator';
import { UserRole } from '../enums/user-role.enum';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CreateSuperAdminDto } from '../dto/user/create-superadmin.dto';
import { Response as ExpressResponse } from 'express';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { LoginDto } from './dto/login.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('invite-client')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPERADMIN)
  async createNewClientInvitation(
    @Body() createInvitationDto: CreateInvitationDto,
  ) {
    return this.authService.createNewClientInvitation(createInvitationDto);
  }

  @Post('invite-member')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.OWNER, UserRole.ADMIN)
  async createCompanyMemberInvitation(
    @Body() createInvitationDto: CreateInvitationDto,
    @Req() req,
  ) {

    return this.authService.createCompanyMemberInvitation(
      createInvitationDto,
      req.user,
    );
  }

  @Post('complete-registration')
  async completeRegistration(
    @Body() completeRegistrationDto: CompleteRegistrationDto,
  ) {
    return this.authService.completeRegistration(completeRegistrationDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @Post('logout')
  async logout() {
    return { message: 'Wylogowano pomyślnie' };
  }

  @Post('change-role')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.OWNER, UserRole.SUPERADMIN)
  async changeUserRole(
    @Body() { userId, role }: { userId: string; role: UserRole },
    @Req() req,
  ) {
    return this.authService.changeUserRole(userId, role, req.user);
  }

  @Post('setup/superadmin')
  async createSuperAdmin(@Body() createSuperAdminDto: CreateSuperAdminDto) {
    return this.authService.createSuperAdmin(createSuperAdminDto);
  }

  @Post('change-password')
  @UseGuards(JwtAuthGuard)
  async changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @Req() req,
  ) {
    return this.authService.changePassword(
      req.user.id,
      changePasswordDto.currentPassword,
      changePasswordDto.newPassword,
    );
  }
}
