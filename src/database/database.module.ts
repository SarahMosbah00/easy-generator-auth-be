import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseConfigService } from './mongoose-config.service';
import { MongooseModule, MongooseModuleAsyncOptions } from '@nestjs/mongoose';


const MONGOOSE_MODULE_ASYNC_OPTIONS = {
    imports: [ConfigModule],
    inject: [ConfigService],
    useClass: MongooseConfigService,
} satisfies MongooseModuleAsyncOptions;

@Module({
    imports: [MongooseModule.forRootAsync(MONGOOSE_MODULE_ASYNC_OPTIONS)],
})
export class DatabaseModule {}
