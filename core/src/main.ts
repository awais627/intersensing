import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
    allowedHeaders: "*",
  });

  const config = new DocumentBuilder()
    .setTitle("Auth Service")
    .setDescription("APIs for user authentication")
    .setVersion("1.0")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      docExpansion: "list",
      filter: true,
      showExtensions: true,
      showCommonExtensions: true,
      deepLinking: true,
      displayRequestDuration: true,
      syntaxHighlight: {
        theme: "monokai",
      },
    },
  });
  app.getHttpAdapter().get("/api-docs", (req, res) => {
    res.json(document);
  });

  const port = 9000;
  await app.listen(port);

  console.log(`🚀 IoT Telemetry Dashboard Backend running on port ${port}`);
  console.log(`📊 REST API: http://localhost:${port}/api/telemetry`);
  console.log(`🔌 WebSocket: ws://localhost:${port}`);
  console.log(`📚 API Documentation: http://localhost:${port}/api/docs`);
}

bootstrap();
