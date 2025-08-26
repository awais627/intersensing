import { Injectable, Logger } from "@nestjs/common";
import { QueueEvents, QueueNames } from "./constants/queue";
import { Queue } from "bull";
import { InjectQueue } from "@nestjs/bull";

@Injectable()
export class EventsService {
  private readonly logger = new Logger(EventsService.name);

  constructor(
    @InjectQueue(QueueNames.MOCK.MOCK)
    private readonly mockQueue: Queue,
  ) {}

  async generateMockData(): Promise<void> {
    await this.mockQueue.add(QueueEvents.MOCK.ADD_MOCK_DATA);
    this.logger.log("Mock data job added to queue");
  }
}
