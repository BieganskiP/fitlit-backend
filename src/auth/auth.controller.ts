import { Controller, Post, Body, UseGuards, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateInvitationDto } from '../dto/user/create-invitation.dto';
import { CompleteRegistrationDto } from '../dto/user/complete-registration.dto';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './decorators/roles.decorator';
import { UserRole } from '../enums/user-role.enum';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CreateSuperAdminDto } from '../dto/user/create-superadmin.dto';
import { Response } from 'express';
import { FeatureGuard } from 'src/guards/feature.guard';
import { UserLimitGuard } from 'src/guards/user-limit.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
  @UseGuards(FeatureGuard, UserLimitGuard)
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
  async login(
    @Body() { email, password }: { email: string; password: string },
    @Res({ passthrough: true }) response: Response,
  ) {
    const { user, token } = await this.authService.login(email, password);

    // Clear any existing tokens
    response.clearCookie('jwt');
    response.clearCookie('token');

    // Set new token
    response.cookie('fitlit_token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      domain: process.env.COOKIE_DOMAIN,
    });

    return { user };
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    // Clear all possible tokens
    response.clearCookie('fitlit_token', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      domain: process.env.COOKIE_DOMAIN,
    });
    response.clearCookie('jwt');
    response.clearCookie('token');

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
}
