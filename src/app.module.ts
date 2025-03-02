import { Module, Provider, ValidationPipe, ValidationPipeOptions } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import { DatabaseModule } from './database/database.module';
import { ValidatorOptions } from 'class-validator';
import { APP_PIPE } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';


export const VALIDATOR_OPTIONS = { whitelist: true } satisfies ValidatorOptions;
export const VALIDATION_PIPE_OPTIONS = {
    ...VALIDATOR_OPTIONS,
} satisfies ValidationPipeOptions;

const VALIDATION_PIPE: Provider = {
  provide: APP_PIPE,
  useFactory: (): ValidationPipe => new ValidationPipe(VALIDATION_PIPE_OPTIONS),
};

@Module({
  imports: [ DatabaseModule, AuthModule, HomeModule ],
  controllers: [],
  providers: [VALIDATION_PIPE, ConfigService],

})
export class AppModule {}
