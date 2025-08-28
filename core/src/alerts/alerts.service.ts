import { Injectable, Logger } from "@nestjs/common";
import { Collection, ObjectId } from "mongodb";
import { MongoService } from "../common/common/src/mongo.service";
import { IAlert, IAlertRule } from "../common/interfaces/alert";
import { ITelemetry } from "../common/interfaces/telemetry";

@Injectable()
export class AlertsService {
  private readonly logger = new Logger(AlertsService.name);
  private alertsCollection: Collection<IAlert> | null = null;

  private readonly defaultRules: IAlertRule[] = [
    {
      rule_id: "temp-high-01",
      sensor_type: "Temperature",
      threshold: 30,
      operator: ">=",
    //   persistence: "30s",
      notify: ["email", "in-app"],
      severity: "warning",
      enabled: true,
    },
    {
      rule_id: "humidity-low-01",
      sensor_type: "Humidity",
      threshold: 20,
      operator: "<=",
    //   persistence: "60s",
      notify: ["in-app"],
      severity: "medium",
      enabled: true,
    },
    {
      rule_id: "co2-critical-01",
      sensor_type: "eCO2",
      threshold: 800,
      operator: ">=",
    //   persistence: "10s",
      notify: ["email", "in-app"],
      severity: "critical",
      enabled: true,
    },
  ];

  constructor(private readonly mongoService: MongoService) {}

  async checkTelemetryForAlerts(telemetry: ITelemetry): Promise<IAlert[]> {
    const triggeredAlerts: IAlert[] = [];
    const rules = this.defaultRules;

    for (const rule of rules) {
      if (!rule.enabled) continue;

      const sensorValue = telemetry[rule.sensor_type];
      if (sensorValue === undefined || sensorValue === null) continue;

      if (this.evaluateCondition(sensorValue, rule.threshold, rule.operator)) {
        const alert: IAlert = {
          rule_id: rule.rule_id,
          sensor_type: rule.sensor_type,
          threshold: rule.threshold,
          operator: rule.operator,
        //   persistence: rule.persistence,
          notify: rule.notify,
          severity: rule.severity,
          triggered_at: new Date(),
          telemetry_data: telemetry,
          acknowledged: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        const savedAlert = await this.createAlert(alert);
        triggeredAlerts.push(savedAlert);
        
        this.logger.warn(
          `Alert triggered: ${rule.rule_id} - ${rule.sensor_type} ${rule.operator} ${rule.threshold} (actual: ${sensorValue})`
        );
      }
    }

    return triggeredAlerts;
  }

  private evaluateCondition(value: number, threshold: number, operator: string): boolean {
    switch (operator) {
      case ">=": return value >= threshold;
      case "<=": return value <= threshold;
      case ">": return value > threshold;
      case "<": return value < threshold;
      case "==": return value === threshold;
      case "!=": return value !== threshold;
      default: return false;
    }
  }

  async createAlert(alert: IAlert): Promise<IAlert> {
    const collection = await this.getAlertsCollection();
    const result = await collection.insertOne(alert);
    return { ...alert, _id: result.insertedId.toString() };
  }

  async getAlertsForDay(date: Date): Promise<IAlert[]> {
    const collection = await this.getAlertsCollection();
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    return await collection.find({
      triggered_at: {
        $gte: startOfDay,
        $lte: endOfDay
      }
    }).sort({ triggered_at: -1 }).toArray();
  }

  async getRecentAlerts(limit: number = 50): Promise<IAlert[]> {
    const collection = await this.getAlertsCollection();
    return await collection
      .find()
      .sort({ triggered_at: -1 })
      .limit(limit)
      .toArray();
  }

  async getRecentAlertsByAcknowledgment(acknowledged: boolean, limit: number = 50): Promise<IAlert[]> {
    const collection = await this.getAlertsCollection();
    return await collection
      .find({ acknowledged })
      .sort({ triggered_at: -1 })
      .limit(limit)
      .toArray();
  }

  async ackAlert(alertId: string): Promise<void> {
    const collection = await this.getAlertsCollection();
    await collection.updateOne(
      { _id: alertId } as any,
      {
        $set: {
          acknowledged: true,
          acknowledged_at: new Date(),
          updatedAt: new Date(),
        }
      }
    );
  }

  private async getAlertsCollection(): Promise<Collection<IAlert>> {
    if (!this.alertsCollection) {
      const db = this.mongoService.DB;
      const existing = await db.listCollections({ name: "alerts" }).toArray();
      if (!existing.length) {
        await db.createCollection("alerts");
        console.log("[MongoDB] Created collection: alerts");
      }
      this.alertsCollection = db.collection<IAlert>("alerts");
    }
    return this.alertsCollection;
  }

}
