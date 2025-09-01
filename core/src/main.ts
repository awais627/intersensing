import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Connect MQTT microservice
  const mqttMicroservice = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.MQTT,
    options: {
      url: "mqtts://9bc811871bbb400281764a67bbfc77b9.s1.eu.hivemq.cloud:8883",
      username: "hivemq.webclient.1756719842910", // put HiveMQ username in .env
      password: "IH#.rGN7,f04wLpJcx9?", // put HiveMQ password in .env
      clientId: "nestjs-mqtt-backend",
    },
  });

  // Start the microservice
  await mqttMicroservice.listen();
  console.log("🔌 MQTT Microservice started and listening");

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
  console.log(`📡 MQTT Microservice: Connected to HiveMQ Cloud`);
}

bootstrap();
