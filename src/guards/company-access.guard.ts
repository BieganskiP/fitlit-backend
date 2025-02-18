import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../enums/user-role.enum';

@Injectable()
export class CompanyAccessGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const companyId = request.params.companyId || request.query.companyId;

    // Superadmins can access all companies
    if (user.role === UserRole.SUPERADMIN) {
      return true;
    }

    // Other users can only access their own company
    return user.companyId === companyId;
  }
} 