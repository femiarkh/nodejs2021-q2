import * as yaml from 'js-yaml';
import * as fs from 'fs';
import { NestApplication, NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import 'dotenv/config';
import { MyLogger } from './logging/logger.service';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  let app: NestApplication | NestFastifyApplication;
  const isFastify = process.env.USE_FASTIFY === 'true';
  if (isFastify) {
    app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter(),
      { logger: true },
    );
  } else {
    app = await NestFactory.create(AppModule, { logger: true });
  }
  app.useGlobalPipes(new ValidationPipe());

  const document = yaml.load(
    fs.readFileSync('doc/api.yaml', 'utf8'),
  ) as OpenAPIObject;
  SwaggerModule.setup('doc', app, document);

  app.useLogger(app.get(MyLogger));
  await app.listen(process.env.PORT, '0.0.0.0');
  console.log(`listening on port ${process.env.PORT}`);
}
bootstrap();
