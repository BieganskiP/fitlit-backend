import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../../enums/user-role.enum';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    console.log('RolesGuard - Starting role check');
    const requiredRoles = this.reflector.get<UserRole[]>(
      'roles',
      context.getHandler(),
    );
    console.log('RolesGuard - Required roles:', requiredRoles);

    if (!requiredRoles) {
      console.log('RolesGuard - No roles required');
      return true;
    }

    const request = context.switchToHttp().getRequest();
    console.log('RolesGuard - Request user:', request.user);

    if (!request.user) {
      console.log('RolesGuard - No user in request');
      return false;
    }

    const hasRole = requiredRoles.some((role) => request.user.role === role);
    console.log('RolesGuard - Has required role:', hasRole);
    
    return hasRole;
  }
} 