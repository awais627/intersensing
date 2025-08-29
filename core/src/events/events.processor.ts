import { Process, Processor } from "@nestjs/bull";
import { Injectable } from "@nestjs/common";
import { Job } from "bull";
import { QueueEvents, QueueNames } from "./constants/queue";
import { TelemetryService } from "../common/common/src/services/telemetry.service";
import { AlertsService } from "../alerts/alerts.service";
import { TelemetryGateway } from "../telemetry/telemetry.gateway";
import { ITelemetry } from "../common/interfaces/telemetry";
import { generateId } from "../common/utils";

@Injectable()
@Processor(QueueNames.MOCK.MOCK)
export class EventsProcessor {
  constructor(
    private readonly telemetryService: TelemetryService,
    private readonly alertsService: AlertsService,
    private readonly telemetryGateway: TelemetryGateway,
  ) {}

  @Process(QueueEvents.MOCK.ADD_MOCK_DATA)
  async handleMockData(job: Job) {

    const mockData: ITelemetry = {
      id: generateId("tele"),
      timestamp: Date.now().toString(),
      Temperature: Math.random() < 0.15 ? (Math.random() < 0.5 ? 10 + Math.random() * 8 : 28 + Math.random() * 12) : 18 + Math.random() * 9,
      Humidity: Math.random() < 0.15 ? (Math.random() < 0.5 ? 20 + Math.random() * 20 : 65 + Math.random() * 20) : 40 + Math.random() * 20, TVOC: Math.random() < 0.15 ? 225 + Math.floor(Math.random() * 275) : Math.floor(Math.random() * 220), 
      eCO2: Math.random() < 0.15 ? (Math.random() < 0.5 ? 200 + Math.floor(Math.random() * 200) : 605 + Math.floor(Math.random() * 400)) : 400 + Math.floor(Math.random() * 200), 
      "Raw H2": 10000 + Math.floor(Math.random() * 5000),
      "Raw Ethanol": 15000 + Math.floor(Math.random() * 8000),
      Pressure: Math.random() < 0.15 ? (Math.random() < 0.5 ? 950 + Math.random() * 30 : 1035 + Math.random() * 30) : 980 + Math.random() * 50, 
      "PM1.0": Math.random() < 0.15 ? 16 + Math.random() * 20 : Math.random() * 15, 
      "PM2.5": Math.random() < 0.15 ? 26 + Math.random() * 25 : Math.random() * 25, 
      "NC0.5": Math.random() * 20,
      "NC1.0": Math.random() * 15,
      "NC2.5": Math.random() * 10,
      createdAt: new Date(),
      updatedAt: new Date(),
      machineId: `sn-sd${String(Math.floor(Math.random() * 5) + 1).padStart(3, "0")}`,
    };

    const savedTelemetry = await this.telemetryService.create(mockData);

    const triggeredAlerts = await this.alertsService.checkTelemetryForAlerts(mockData);

    this.telemetryGateway.broadcastTelemetryUpdate(mockData);

    if (triggeredAlerts.length > 0) {
      for (const alert of triggeredAlerts) {
        this.telemetryGateway.broadcastAlert(alert);
      }
    }

    return savedTelemetry;
  }
}
