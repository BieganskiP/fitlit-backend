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

    // Cookie options
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'PROD',
      sameSite: process.env.NODE_ENV === 'PROD' ? 'none' : 'lax',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      path: '/',
    } as any;

    // Only add domain in production and if it's properly set
    if (process.env.NODE_ENV === 'PROD' && process.env.COOKIE_DOMAIN) {
      // Extract just the hostname part
      let domain = process.env.COOKIE_DOMAIN.trim();
      
      // Remove protocol if present
      domain = domain.replace(/^https?:\/\//, '');
      
      // Remove port if present
      domain = domain.split(':')[0];
      
      // Remove path if present
      domain = domain.split('/')[0];

      if (domain) {
        cookieOptions.domain = domain;
      }
    }

    // Set new token with updated settings
    response.cookie('fitlit_token', token, cookieOptions);

    return { user };
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    // Use the same cookie options for consistency
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'PROD',
      sameSite: process.env.NODE_ENV === 'PROD' ? 'none' : 'lax',
      path: '/',
    } as any;

    if (process.env.NODE_ENV === 'PROD' && process.env.COOKIE_DOMAIN) {
      const domain = process.env.COOKIE_DOMAIN.trim().split('#')[0];
      if (domain) {
        cookieOptions.domain = domain;
      }
    }

    // Clear token with matching settings
    response.clearCookie('fitlit_token', cookieOptions);
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
