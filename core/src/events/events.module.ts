import { Module } from "@nestjs/common";
import { BullModule } from "@nestjs/bull";
import { ScheduleModule } from "@nestjs/schedule";
import { EventsController } from "./events.controller";
import { EventsService } from "./events.service";
import { EventsProcessor } from "./events.processor";
import { EventsCronService } from "./events.cron";
import { BullBoardModule } from "@bull-board/nestjs";
import { BullAdapter } from "@bull-board/api/bullAdapter";
import { QueueNames } from "./constants/queue";

@Module({
  imports: [
    BullModule.forRoot({
      url: process.env.REDIS_URL,
      defaultJobOptions: {
        attempts: 3,
        delay: 500,
      },
    }),
    ScheduleModule.forRoot(),
    BullModule.registerQueue({
      name: QueueNames.MOCK.MOCK,
    }),
    BullBoardModule.forFeature({
      name: QueueNames.MOCK.MOCK,
      adapter: BullAdapter,
    }),
  ],
  controllers: [EventsController],
  providers: [EventsService, EventsProcessor, EventsCronService],
})
export class EventsModule {}
