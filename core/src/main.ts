import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: true,
    credentials: true,
  });

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle("IoT Telemetry Dashboard API")
    .setDescription(
      "A comprehensive API for IoT telemetry data management with real-time WebSocket support",
    )
    .setVersion("1.0")
    .addTag("telemetry", "IoT telemetry data operations")
    .addTag("websocket", "Real-time WebSocket events")
    .addServer("http://localhost:9000", "Development server")
    .addServer("https://api.example.com", "Production server")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/docs", app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
      filter: true,
      showRequestHeaders: true,
    },
    customSiteTitle: "IoT Telemetry API Documentation",
    customCss: ".swagger-ui .topbar { display: none }",
  });

  const port = 9000;
  await app.listen(port);

  console.log(`🚀 IoT Telemetry Dashboard Backend running on port ${port}`);
  console.log(`📊 REST API: http://localhost:${port}/api/telemetry`);
  console.log(`🔌 WebSocket: ws://localhost:${port}`);
  console.log(`📚 API Documentation: http://localhost:${port}/api/docs`);
}

bootstrap();
