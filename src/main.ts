import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
  
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // configuramos el prefijo 'api' ---> para acceder /api/endpoint
  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
