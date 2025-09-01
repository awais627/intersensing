import { Injectable, Logger } from "@nestjs/common";
import { EventsService } from "./events.service";
import { Cron, CronExpression } from "@nestjs/schedule";

@Injectable()
export class EventsCronService {
  private readonly logger = new Logger(EventsCronService.name);
  private jobCounter = 0;

  constructor(private readonly eventsService: EventsService) {}

  @Cron(CronExpression.EVERY_5_SECONDS) // Every 2 seconds
  async handleCron() {
    this.jobCounter++;

    try {
      this.logger.log(
        `Cron job #${this.jobCounter} - Adding mock data to queue`,
      );

      // Generate mock data job
      await this.eventsService.generateMockData();

      this.logger.log(
        `Cron job #${this.jobCounter} - Mock data job added successfully`,
      );
    } catch (error) {
      this.logger.error(
        `Cron job #${this.jobCounter} - Failed to add mock data: ${error.message}`,
      );
    }
  }
}
