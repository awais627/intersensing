import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { BullModule } from "@nestjs/bull";
import { BullBoardModule } from "@bull-board/nestjs";
import { ExpressAdapter } from "@bull-board/express";
import { TelemetryModule } from "./telemetry/telemetry.module";
import { EventsModule } from "./events/events.module";
import { AlertsModule } from "./alerts/alerts.module";
import { MqttModule } from "./mqtt";
import { AppController } from "./telemetry/app.controller";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST || "localhost",
        port: parseInt(process.env.REDIS_PORT) || 6379,
        password: process.env.REDIS_PASSWORD,
        db: parseInt(process.env.REDIS_DB) || 0,
      },
      defaultJobOptions: {
        attempts: 3,
        backoff: {
          type: "exponential",
          delay: 2000,
        },
        removeOnComplete: true,
        removeOnFail: false,
      },
    }),
    // BullBoard configuration
    BullBoardModule.forRoot({
      route: "/admin/queues",
      adapter: ExpressAdapter,
    }),
    TelemetryModule,
    EventsModule,
    AlertsModule,
    MqttModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
