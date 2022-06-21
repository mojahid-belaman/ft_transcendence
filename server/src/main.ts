import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder, ExpressSwaggerCustomOptions } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle("Channels & Chat API")
  .setDescription("This is Transcendence's channels API")
  .setVersion('0.1')
  .addTag("channel")
  .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
  .build();

  
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors({
    origin: '*'
  })

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(5000);
}
bootstrap();
