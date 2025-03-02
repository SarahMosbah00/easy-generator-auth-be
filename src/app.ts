import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from './auth/constants/environment-variables';
import { json } from 'body-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class Application {
  private static app: Application | undefined;

  private constructor() {}

  public static getInstance(): Application {
    if (Application.app == null) {
      Application.app = new Application();
    }

    return Application.app;
  }

  public async bootstrap(): Promise<void> {
    const nestApp = await NestFactory.create<NestExpressApplication>(AppModule);
    const configService =
      nestApp.get<ConfigService<EnvironmentVariables>>(ConfigService);

    this.configureJsonBodyParser(nestApp);

    this.setupSwagger(nestApp, configService);

    this.configureCors(nestApp, configService);
    await this.listenToPort(nestApp, configService);
  }

  private configureJsonBodyParser(nestApp: NestExpressApplication): void {
    const limit = '50mb';
    nestApp.use(json({ limit }));
  }

  private configureCors(
    nestApp: NestExpressApplication,
    configService: ConfigService<EnvironmentVariables>,
  ): void {
    const origin = configService.getOrThrow('CORS_ORIGIN', { infer: true });
    const [options] = [{ origin, credentials: true }] satisfies Parameters<
      typeof nestApp.enableCors
    >;
    nestApp.enableCors(options);
  }

  private setupSwagger(
    nestApp: NestExpressApplication,
    configService: ConfigService<EnvironmentVariables>,
  ): void {
    const documentBuilder = new DocumentBuilder();

    documentBuilder.setTitle('EASY GENERATOR SWAGGER');

    documentBuilder.addBearerAuth();

    const config = documentBuilder.build();
    const document = SwaggerModule.createDocument(nestApp, config);

    const path = configService.getOrThrow('SWAGGER_PATH', { infer: true });

    SwaggerModule.setup(path, nestApp, document);
  }

  private async listenToPort(
    nestApp: NestExpressApplication,
    configService: ConfigService<EnvironmentVariables>,
  ): Promise<void> {
    const port = configService.getOrThrow('SERVER_PORT', { infer: true });
    await nestApp.listen(port);
  }
}
