import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

import {
  EMAIL_SERVICE,
  JWT_FACTORY,
  USERS_REPOSITORY,
  AUTH_SERVICE,
} from './constants/injection-tokens';

import { USER_SCHEMA_DEFINATION } from './entities/user.entity';
import { AuthController } from './controllers/auth.controller';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt-bearer-auth.guard';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './stratigies/cookies-jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forFeature([USER_SCHEMA_DEFINATION]),
    JwtModule.registerAsync(JWT_FACTORY),
  ],

  providers: [
    JwtStrategy,
    AUTH_SERVICE,
    EMAIL_SERVICE,
    USERS_REPOSITORY,
    ConfigService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  controllers: [AuthController],
  exports: [],
})
export class AuthModule {}
