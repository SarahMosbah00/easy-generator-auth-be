import { Module } from '@nestjs/common';
import { HomeController } from './controllers/home.controller';

@Module({
  controllers: [HomeController]
})
export class HomeModule {}
