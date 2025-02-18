import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class FeatureRestrictionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    if (status === 403) {
      response.status(403).json({
        statusCode: 403,
        message: 'Ta funkcja nie jest dostępna w Twoim planie. Rozważ aktualizację planu.',
        error: 'Forbidden',
      });
    } else {
      response.status(status).json(exception.getResponse());
    }
  }
} 