import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common';
import { UserLimitService } from './user-limit.service';

@Injectable()
export class UserLimitGuard implements CanActivate {
  constructor(private readonly userLimitService: UserLimitService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Superadmins bypass the limit
    if (user.role === 'SUPERADMIN') {
      return true;
    }

    const result = await this.userLimitService.checkUserLimit(user.id, user.companyId);
    
    if (!result.allowed) {
      throw new BadRequestException(result.message);
    }

    return true;
  }
} 