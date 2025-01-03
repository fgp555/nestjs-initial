import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as morgan from 'morgan';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix('api');
  app.use(morgan('dev'));
  app.enableCors();
  app.use(bodyParser.text());

  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });

  // frontend html
  // app.useStaticAssets(join(__dirname, '..', '..', 'frontend/html'), {
  //   prefix: '/',
  // });

  // frontend reactjs
  const reactjsFolder = '../../frontend/reactjs/dist';
  app.useStaticAssets(join(__dirname, reactjsFolder), {
    prefix: '/',
  });

  app
    .getHttpAdapter()
    .getInstance()
    .all('*', (req, res, next) => {
      // Si la solicitud no comienza con /api, redirige a index.html de la SPA
      if (!req.url.startsWith('/api')) {
        res.sendFile(join(__dirname, reactjsFolder, 'index.html'));
      } else {
        next();
      }
    });

  const PORT = process.env.PORT || 3000;

  await app.listen(PORT);
  Logger.log(`Application is running on: http://localhost:${PORT}`);
}
bootstrap();
