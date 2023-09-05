import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger'
import { ExpressAdapter } from '@nestjs/platform-express';
import { CorsOptions } from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter());

  // Define your CORS options here

  const corsOptions: CorsOptions = {
    origin: 'http://localhost:3001', // Replace with your frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow cookies to be sent with the request (if applicable)
  };

  // Enable CORS with the defined options

  app.enableCors(corsOptions);

  app.useGlobalPipes(new ValidationPipe());
  
  const options = new DocumentBuilder()
  .setTitle("Products-API")
  .setDescription("API for Product CRUD operation")
  .setVersion("1.0")
  .addBearerAuth({
    type: 'http',
    scheme:'bearer',
    bearerFormat:"JWT",
    name: "JWT",
    description: "Enter Jwt Token",
    in:"header"
  }, "JWT-auth").build();

  const document = SwaggerModule.createDocument(app , options);
  SwaggerModule.setup('api', app,document)
  await app.listen(3000);
}
bootstrap();
