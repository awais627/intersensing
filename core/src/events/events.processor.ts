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
  async handleConvertToPdf(job: Job) {
    const mockData: ITelemetry = {
      id: generateId("tele"),
      timestamp: Date.now().toString(),
      Temperature: 20 + Math.random() * 20,
      Humidity: 40 + Math.random() * 30,
      TVOC: Math.floor(Math.random() * 100),
      eCO2: 400 + Math.floor(Math.random() * 600),
      "Raw H2": 10000 + Math.floor(Math.random() * 5000),
      "Raw Ethanol": 15000 + Math.floor(Math.random() * 8000),
      Pressure: 900 + Math.random() * 100,
      "PM1.0": Math.random() * 10,
      "PM2.5": Math.random() * 15,
      "NC0.5": Math.random() * 20,
      "NC1.0": Math.random() * 15,
      "NC2.5": Math.random() * 10,
      createdAt: new Date(),
      updatedAt: new Date(),
      CNT: Math.floor(Math.random() * 20),
    };

    // Save telemetry data
    const savedTelemetry = await this.telemetryService.create(mockData);

    // Check for alerts
    const triggeredAlerts =
      await this.alertsService.checkTelemetryForAlerts(mockData);

    // Broadcast telemetry data to connected clients
    this.telemetryGateway.broadcastTelemetryUpdate(mockData);

    // Broadcast alerts if any were triggered
    if (triggeredAlerts.length > 0) {
      for (const alert of triggeredAlerts) {
        this.telemetryGateway.broadcastAlert(alert);
      }
    }

    return savedTelemetry;
  }
}
