// # Entry point, aisi file jahan server start hota hai

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);


    // ✅ Allow frontend to talk to backend
  app.enableCors({
    origin: 'http://localhost:5173', // your frontend Vite server
    credentials: true,
  });

  
  const port = configService.get<number>('PORT') || 3000;
  await app.listen(port);
  console.log(`Server running on http://localhost:${port}`);
}
bootstrap();
