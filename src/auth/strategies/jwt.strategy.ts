import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    const jwtSecret = configService.get<string>('JWT_SECRET');
    
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined');
    }

    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        // Try to get token from Authorization header
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        // Try to get token from cookies
        (request: Request) => {
          console.log('Checking cookies:', request.cookies);
          return request?.cookies?.fitlit_token;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
    console.log('JwtStrategy - Initialized');
  }

  async validate(payload: any) {
    console.log('JwtStrategy - Validating payload:', payload);
    const user = {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
      companyId: payload.companyId,
    };
    console.log('JwtStrategy - Validated user:', user);
    return user;
  }
}
