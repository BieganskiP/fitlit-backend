import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    console.log('JwtAuthGuard - Starting authentication');
    const request = context.switchToHttp().getRequest();
    console.log('JwtAuthGuard - Headers:', request.headers);
    
    const result = super.canActivate(context);
    console.log('JwtAuthGuard - Authentication result:', result);
    return result;
  }

  handleRequest(err, user, info) {
    console.log('JwtAuthGuard - Handling request');
    console.log('JwtAuthGuard - Error:', err);
    console.log('JwtAuthGuard - User:', user);
    console.log('JwtAuthGuard - Info:', info);
    
    if (err || !user) {
      console.log('JwtAuthGuard - Authentication failed');
      throw err || new Error('Unauthorized');
    }
    return user;
  }
} 