import { Process, Processor } from "@nestjs/bull";
import { Injectable } from "@nestjs/common";
import { Job } from "bull";
import { QueueEvents, QueueNames } from "./constants/queue";

@Injectable()
@Processor(QueueNames.MOCK.MOCK)
export class EventsProcessor {
  @Process(QueueEvents.MOCK.ADD_MOCK_DATA)
  async handleConvertToPdf(job: Job) {
    return true;
  }
}
