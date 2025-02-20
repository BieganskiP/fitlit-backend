import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { UserLimitService } from './user-limit.service';
import { UserRole } from '../enums/user-role.enum';

@Injectable()
export class UserLimitGuard implements CanActivate {
  constructor(private readonly userLimitService: UserLimitService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Bypass check for superadmins
    if (!user || user.role === UserRole.SUPERADMIN) {
      return true;
    }

    // Check if company has reached user limit
    return this.userLimitService.canAddUser(user.companyId);
  }
} 