import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({whitelist:true}));
  //Swager
    const config = new DocumentBuilder()
    .setTitle('Nest Prisma example')
    .setDescription('Apis for nest Prisma test')
    .setVersion('1.0')
    .addTag('nestPrisma')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.use(cookieParser());
  await app.listen(8080);
}
bootstrap();
