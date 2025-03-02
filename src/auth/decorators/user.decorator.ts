import { createParamDecorator, ExecutionContext, Logger } from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UserAccount } from '../interfaces/user-account.interface';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const logger = new Logger('UserDecorator');
    const request = ctx.switchToHttp().getRequest<Request>();
    const token = request.cookies['jwt'];
    if (!token) {
      logger.warn('No JWT token found in cookies');
      return null;
    }
    const jwtService = new JwtService();
    const payload = jwtService.decode(token);
    logger.log(`JWT decoded for user: ${payload.email}`);
    return payload as UserAccount;
  },
);
