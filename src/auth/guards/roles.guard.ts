import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../../enums/user-role.enum';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    // user.role comes from the JWT token
    const roleHierarchy = {
      [UserRole.SUPERADMIN]: 5,
      [UserRole.OWNER]: 4,
      [UserRole.ADMIN]: 3,
      [UserRole.LEADER]: 2,
      [UserRole.USER]: 1,
    };

    const userRoleLevel = roleHierarchy[user.role];
    const requiredRoleLevel = Math.max(...requiredRoles.map(role => roleHierarchy[role]));

    return userRoleLevel >= requiredRoleLevel;
  }
} 