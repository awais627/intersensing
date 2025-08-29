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

    function generateMockTelemetry(): ITelemetry {
      const ranges: Record<string, { min: number; max: number }> = {
        Temperature: { min: 18, max: 27 },
        Humidity:    { min: 40, max: 60 },
        eCO2:        { min: 400, max: 600 },
        TVOC:        { min: 0, max: 220 },
        Pressure:    { min: 980, max: 1030 },
        "PM1.0":     { min: 0, max: 15 },
        "PM2.5":     { min: 0, max: 25 },
      };

      const keys = Object.keys(ranges);

      function makeValue(
        { min, max }: { min: number; max: number },
        severity: "normal" | "lowhigh" | "severe"
      ): number {
        const gap = max - min || 1;

        switch (severity) {
          case "normal":
            return Math.max(0, min + Math.random() * gap);

          case "lowhigh": {
            const dev = (0.10 + Math.random() * 0.40) * gap;
            return Math.max(0, Math.random() < 0.5 ? min - dev : max + dev);
          }

          case "severe": {
            const dev = (0.75 + Math.random() * 0.50) * gap;
            return Math.max(0, Math.random() < 0.5 ? min - dev : max + dev);
          }
        }
      }

      const alertType = Math.random() < .7 ? "normal" : Math.random() < .67 ? "lowhigh" : "severe";
      const outlierKey = alertType === "normal" ? null : keys[Math.floor(Math.random() * keys.length)];

      const data: any = {
        id: generateId("tele"),
        timestamp: Date.now().toString(),
      };

      for (const key of keys) {
        data[key] = key === outlierKey ? makeValue(ranges[key], alertType) : makeValue(ranges[key], "normal");
      }

      data["Raw H2"]      = 10000 + Math.floor(Math.random() * 5000);
      data["Raw Ethanol"] = 15000 + Math.floor(Math.random() * 8000);
      data["NC0.5"]       = Math.random() * 20;
      data["NC1.0"]       = Math.random() * 15;
      data["NC2.5"]       = Math.random() * 10;
      data["createdAt"]     = new Date();
      data["updatedAt"]     = new Date();
      data["machineId"]     = `sn-sd${String(Math.floor(Math.random() * 5) + 1).padStart(3, "0")}`;

      return data as ITelemetry;
    }

    const mockData = generateMockTelemetry();

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
