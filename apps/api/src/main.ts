import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { ThrottlerGuard } from '@nestjs/throttler';
import { AppConfig } from './modules/config/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(AppConfig).logger);
  app.use(helmet());
  app.enableCors({
    origin: app.get(ConfigService).get<string>('web.origin'),
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalGuards(app.get(ThrottlerGuard));

  const config = new DocumentBuilder()
    .setTitle('Tool Jockey API')
    .setDescription('Tool management API surface')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = app.get(ConfigService).get<number>('port') ?? 3000;
  await app.listen(port);
}

void bootstrap();
