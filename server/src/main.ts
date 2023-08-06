import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors(); // CORS 허용

  const port = configService.get<number>('PORT', 4000); // .env 파일에 PORT가 없으면 기본값으로 4000 사용
  await app.listen(port);
}
bootstrap();
