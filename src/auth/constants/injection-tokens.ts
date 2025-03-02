import { Provider } from '@nestjs/common';
import { MongoUserRepository } from '../repositories/mongo-user.repository';
import { NodeMailerEmailService } from '../services/email/nodemailer-email.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from './environment-variables';
import { DefaultAuthService } from '../services/auth/auth.service';
import { JwtModuleAsyncOptions } from '@nestjs/jwt';

export const USERS_REPOSITORY_INJECTION_TOKEN = 'USERS_REPOSITORY';
export const EMAIL_SERVICE_INJECTION_TOKEN = 'EMAIL_SERVICE';
export const AUTH_SERVICE_INJECTION_TOKEN = 'AUTH_SERVICE';

export const USERS_REPOSITORY = {
  provide: USERS_REPOSITORY_INJECTION_TOKEN,
  useClass: MongoUserRepository,
} ;

export const AUTH_SERVICE = {
  provide: AUTH_SERVICE_INJECTION_TOKEN,
  useClass: DefaultAuthService,
} ;

export const EMAIL_SERVICE =    {
    provide: EMAIL_SERVICE_INJECTION_TOKEN,
    useClass: NodeMailerEmailService, 
};

export const JWT_FACTORY = {
    imports: [ConfigModule],
  useFactory: async (configService: ConfigService<EnvironmentVariables>) => {
    return {
      privateKey: configService.getOrThrow('JWT_PRIVATE_SECRET', {
        infer: true,
      }),
      publicKey: configService.getOrThrow('JWT_PUBLIC_SECRET', {
        infer: true,
      }),
      signOptions: {
        expiresIn: configService.getOrThrow('JWT_EXPIRATION', {
          infer: true,
        }),
      },
    };
  },
  inject: [ConfigService],
} as JwtModuleAsyncOptions;