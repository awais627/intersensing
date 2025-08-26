import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS
  app.enableCors({
    origin: true,
    credentials: true,
  });

  const port = process.env.PORT || 9000;
  await app.listen(port);
  
  console.log(`🚀 IoT Telemetry Dashboard Backend running on port ${port}`);
  console.log(`📊 REST API: http://localhost:${port}/api/telemetry`);
  console.log(`🔌 WebSocket: ws://localhost:${port}`);
}

bootstrap();
