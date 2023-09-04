import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';

const PORT = 3500;
async function bootstrap() {
  try {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter());
    console.log(`Running on Express adapter at port: ${PORT}`);
    await app.listen(PORT);
    app.useGlobalPipes(new ValidationPipe());
  } catch (error) {
    console.log(error);
  }
}
bootstrap();
