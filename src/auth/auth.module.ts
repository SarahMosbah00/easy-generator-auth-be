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

import { UserModel } from './entities/user.entity';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forFeature([UserModel]),
    JwtModule.registerAsync(JWT_FACTORY),
  ],

  providers: [AUTH_SERVICE, EMAIL_SERVICE, USERS_REPOSITORY, ConfigService],
  controllers: [AuthController],
  exports: [],
})
export class AuthModule {}
