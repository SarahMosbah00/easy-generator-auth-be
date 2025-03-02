import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '../constants/environment-variables';
import { UserAccount } from '../interfaces/user-account.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          if (req && req.cookies) {
            return req.cookies['jwt'];
          }
          return null;
        },
      ]),
      secretOrKey: configService.getOrThrow('JWT_PUBLIC_SECRET', {
        infer: true,
      }),
      algorithms: ['RS256'], 
    });
  }

  async validate(payload: UserAccount) {
    if (!payload) {
      throw new UnauthorizedException();
    }
    return payload;
  }
}
