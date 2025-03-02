import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose';
import type { Connection } from 'mongoose';
import { set } from 'mongoose';
import { EnvironmentVariables } from 'src/auth/constants/environment-variables';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
    public constructor(private readonly configService: ConfigService<EnvironmentVariables>) {}

    public createMongooseOptions(): MongooseModuleOptions { 
        const uri = this.configService.getOrThrow('DATABASE_URL', { infer: true });

        const options: MongooseModuleOptions = { uri };


        const user = this.configService.get('DATABASE_USER', { infer: true });
        const password = this.configService.get('DATABASE_PASSWORD', { infer: true });
        if (user != null && password != null) {
            options.user = user;
            options.pass = password;
        }

        return options;
    }
}
