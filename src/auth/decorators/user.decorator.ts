import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UserAccount } from '../interfaces/user-account.interface';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const token = request.cookies['jwt'];
    if (!token) {
      return null;
    }
    const jwtService = new JwtService();
    const payload = jwtService.decode(token);
    return payload as UserAccount;
  },
);
