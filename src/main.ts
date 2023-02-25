import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    bodyParser: false,
  });
  app.enableCors();

  const options = new DocumentBuilder()
    .setTitle('Products Test API ')
    .setDescription('Api documentations')
    .setVersion('v.230226.0800')
    .addTag('Products ApiDoc')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  const port = process.env.PORT || 3000;

  app.useGlobalPipes(
    new ValidationPipe({
       whitelist: true,
       forbidNonWhitelisted: true,
       transform:true
      })
  );

  
  app.use(express.urlencoded({  limit: '50mb',extended: false }));
  app.use(express.json({ limit: '50mb'}));
  
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
  //console.log(process.env.TWILIO_AUTH_TOKEN)
}
bootstrap();
