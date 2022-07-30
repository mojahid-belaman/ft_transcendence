import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder, ExpressSwaggerCustomOptions } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  require('dotenv').config()
  console.log(process.env.INTRA_CLIENT_ID);
  
  const app = await NestFactory.create(AppModule);
  
  const config = new DocumentBuilder()
  .setTitle("Channels & Chat API")
  .setDescription("This is Transcendence's channels API")
  .setVersion('0.1')
  .addTag("channel")
  .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
  .build();
  
  
  app.useGlobalPipes(new ValidationPipe())
  const cors = require('cors');
  app.use(cors({ credentials: true, origin: process.env.FRONT_END_URI }));
  app.use(cookieParser());
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(5000);
}
bootstrap();
