import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { BullModule } from "@nestjs/bull";
import { BullBoardModule } from "@bull-board/nestjs";
import { ExpressAdapter } from "@bull-board/express";
import { TelemetryModule } from "./telemetry/telemetry.module";
import { EventsModule } from "./events/events.module";
import { AlertsModule } from "./alerts/alerts.module";
import { AppController } from "./telemetry/app.controller";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BullModule.forRoot({
      redis: {
        host: "redis://default:WLC2j4A5XTSVtLYckE6HIt7ZqKl8Cfm9@redis-16508.c1.us-central1-2.gce.redns.redis-cloud.com:16508",
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
  ],
  controllers: [AppController],
})
export class AppModule {}
