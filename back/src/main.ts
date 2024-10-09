import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as morgan from 'morgan';
import * as cors from 'cors';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { SeederService } from './seeder/seeder.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const seederService = app.get(SeederService);
  await seederService.seed();

  app.setGlobalPrefix('api');
  app.use(cors());
  app.use(morgan('dev')); // Puedes usar 'tiny', 'dev', o cualquier otro formato que desees.

  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });

  app.useStaticAssets(join(__dirname, '..', '..', '_doc', 'html'), {
    prefix: '/html/',
  });

  app.useStaticAssets(join(__dirname, '..', '..', 'front'), {
    prefix: '/',
  });

  await app.listen(3000);
  Logger.log(`Application is running on: http://localhost:3000`);
}
bootstrap();
