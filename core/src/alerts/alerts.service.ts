import { Injectable, Logger } from "@nestjs/common";
import { Collection, ObjectId } from "mongodb";
import { MongoService } from "../common/common/src/mongo.service";
import { IAlert, IAlertRule } from "../common/interfaces/alert";
import { ITelemetry } from "../common/interfaces/telemetry";
import { TelemetryService } from "../common/common/src/services/telemetry.service";
// import { TelemetryService } from "../common/common/src/services/telemetry.service";


@Injectable()
export class AlertsService {
  private readonly logger = new Logger(AlertsService.name);
  private alertsCollection: Collection<IAlert> | null = null;

  private readonly defaultRules: IAlertRule[] = [
    {
    // Low Temperature - Warning
      rule_id: "temp-low-01",
      sensor_type: "Temperature",
      threshold: 10,
      operator: "<",
      notify: ["in-app", "email"],
      severity: "critical",
      enabled: true,
    },
    // High Temperature - Critical
    {
      rule_id: "temp-high-01",
      sensor_type: "Temperature",
      threshold: 35,
      operator: ">=",
      notify: ["in-app", "email"],
      severity: "critical",
      enabled: true,
    },
    // Low Humidity - Warning
    {
      rule_id: "humidity-low-01",
      sensor_type: "Humidity",
      threshold: 30,
      operator: "<=",
      notify: ["in-app"],
      severity: "warning", // dry air discomfort
      enabled: true,
    },
    // Low Humidity - Critical
    {
      rule_id: "humidity-low-02",
      sensor_type: "Humidity",
      threshold: 20,
      operator: "<=",
      notify: ["in-app", "email"],
      severity: "critical", // risk to electronics / severe dryness
      enabled: true,
    },
    // High Humidity - Warning
    {
      rule_id: "humidity-high-01",
      sensor_type: "Humidity",
      threshold: 65,
      operator: ">=",
      notify: ["in-app"],
      severity: "warning", // uncomfortable / possible condensation
      enabled: true,
    },
    // High Humidity - Critical
    {
      rule_id: "humidity-high-02",
      sensor_type: "Humidity",
      threshold: 75,
      operator: ">=",
      notify: ["in-app", "email", "sms"],
      severity: "critical", // mold growth risk / damage to items
      enabled: true,
    },
    // Moderate eCO2 - Warning
    {
      rule_id: "co2-warning-01",
      sensor_type: "eCO2",
      threshold: 700,
      operator: ">=",
      notify: ["in-app"],
      severity: "warning",
      enabled: true,
    },
    // High eCO2 - Warning
    {
      rule_id: "co2-warning-02",
      sensor_type: "eCO2",
      threshold: 1000,
      operator: ">=",
      notify: ["in-app", "email"],
      severity: "warning",
      enabled: true,
    },
    // Critical eCO2
    {
      rule_id: "co2-critical-01",
      sensor_type: "eCO2",
      threshold: 1200,
      operator: ">=",
      notify: ["email", "in-app", "sms"],
      severity: "critical",
      enabled: true,
    },
  ];

  constructor(
    private readonly mongoService: MongoService, 
    private readonly telemetryService: TelemetryService,
  ) {}

  // async checkTelemetryForAlerts(telemetry: ITelemetry): Promise<IAlert[]> {
  //   const triggeredAlerts: IAlert[] = [];
  //   const rules = this.defaultRules;

  //   for (const rule of rules) {
  //     if (!rule.enabled) continue;

  //     const sensorValue = telemetry[rule.sensor_type];
  //     if (sensorValue === undefined || sensorValue === null) continue;

  //     if (this.evaluateCondition(sensorValue, rule.threshold, rule.operator)) {
  //       const alert: IAlert = {
  //         rule_id: rule.rule_id,
  //         sensor_type: rule.sensor_type,
  //         threshold: rule.threshold,
  //         operator: rule.operator,
  //       //   persistence: rule.persistence,
  //         notify: rule.notify,
  //         severity: rule.severity,
  //         triggered_at: new Date(),
  //         telemetry_data: telemetry,
  //         acknowledged: false,
  //         createdAt: new Date(),
  //         updatedAt: new Date(),
  //       };

  //       const savedAlert = await this.createAlert(alert);
  //       triggeredAlerts.push(savedAlert);
        
  //       this.logger.warn(
  //         `Alert triggered: ${rule.rule_id} - ${rule.sensor_type} ${rule.operator} ${rule.threshold} (actual: ${sensorValue})`
  //       );
  //     }
  //   }

  //   return triggeredAlerts;
  // }
  async checkTelemetryForAlerts(telemetry: ITelemetry): Promise<IAlert[]> {
    const triggeredAlerts: IAlert[] = [];

    // Sort rules: highest threshold first
    const rules = [...this.defaultRules].sort((a, b) => b.threshold - a.threshold);

    // Keep track of sensors that already triggered
    const triggeredSensors = new Set<string>();

    for (const rule of rules) {
      if (!rule.enabled) continue;

      const sensorValue = telemetry[rule.sensor_type];
      if (sensorValue === undefined || sensorValue === null) continue;

      // Skip if this sensor already triggered an alert
      if (triggeredSensors.has(rule.sensor_type)) continue;

      if (this.evaluateCondition(sensorValue, rule.threshold, rule.operator)) {
        const alert: IAlert = {
          rule_id: rule.rule_id,
          sensor_type: rule.sensor_type,
          threshold: rule.threshold,
          operator: rule.operator,
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

        triggeredSensors.add(rule.sensor_type); // prevent more alerts for same sensor

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

  async getAlertsForDayWithCounts(date: Date): Promise<{ alerts: IAlert[]; totalCount: number; returnedCount: number; date: string }> {
    const collection = await this.getAlertsCollection();
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const dateFilter = {
      triggered_at: {
        $gte: startOfDay,
        $lte: endOfDay
      }
    };

    // Get total count for the day
    const totalCount = await collection.countDocuments(dateFilter);
    
    // Get alerts for the day
    const alerts = await collection.find(dateFilter).sort({ triggered_at: -1 }).toArray();
    
    return {
      alerts,
      totalCount,
      returnedCount: alerts.length,
      date: date.toISOString().split('T')[0] // Format as YYYY-MM-DD
    };
  }

  async getRecentAlerts(limit: number = 50): Promise<IAlert[]> {
    const collection = await this.getAlertsCollection();
    return await collection
      .find()
      .sort({ triggered_at: -1 })
      .limit(limit)
      .toArray();
  }

  async getRecentAlertsWithCounts(limit: number = 50, offset: number = 0): Promise<{ alerts: IAlert[]; totalCount: number; returnedCount: number; limit: number }> {
    const collection = await this.getAlertsCollection();
    
    // Get total count of all alerts
    const totalCount = await collection.countDocuments();
    
    // Get recent alerts with limit and offset
    const alerts = await collection
      .find()
      .sort({ triggered_at: -1 })
      .skip(offset)
      .limit(limit)
      .toArray();
    
    return {
      alerts,
      totalCount,
      returnedCount: alerts.length,
      limit
    };
  }

  async getRecentAlertsByAcknowledgment(acknowledged: boolean, limit: number = 50, offset: number = 0): Promise<IAlert[]> {
    const collection = await this.getAlertsCollection();
    return await collection
      .find({ acknowledged })
      .sort({ triggered_at: -1 })
      .skip(offset)
      .limit(limit)
      .toArray();
  }

  async getTotalAcknowledgedAlertsCount(acknowledged: boolean = true): Promise<number> {
    const collection = await this.getAlertsCollection();
    return await collection.countDocuments({ acknowledged });
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

  async getAlertCountsByType(date: Date): Promise<Array<{ count: number; type: string }>> {
    const collection = await this.getAlertsCollection();
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const pipeline = [
      {
        $match: {
          triggered_at: {
            $gte: startOfDay,
            $lte: endOfDay
          }
        }
      },
      {
        $group: {
          _id: "$severity",
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          type: "$_id",
          count: 1
        }
      },
      {
        $sort: { count: -1 }
      }
    ];

    const result = await collection.aggregate(pipeline).toArray();
    
    // Ensure all severity types are represented, even if count is 0
    const severityTypes = ["critical", "high", "warning", "medium", "low"];
    const countsMap = new Map(result.map(item => [item.type, item.count]));
    
    return severityTypes.map(type => ({
      count: countsMap.get(type) || 0,
      type
    }));
  }

  async getAlertCountsBySeverityAndStatus(days: number = 1): Promise<{
    critical: number;
    high: number;
    warning: number;
    low: number;
    resolved: number;
    total: number;
    dateRange: { start: string; end: string };
  }> {
    const collection = await this.getAlertsCollection();
    
    // Calculate date range
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - days);
    
    // Set time boundaries
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);

    const dateFilter = {
      triggered_at: {
        $gte: startDate,
        $lte: endDate
      }
    };

    // Get counts by severity
    const severityPipeline = [
      { $match: dateFilter },
      {
        $group: {
          _id: "$severity",
          count: { $sum: 1 }
        }
      }
    ];

    const severityResult = await collection.aggregate(severityPipeline).toArray();
    const severityCounts = new Map(severityResult.map(item => [item._id, item.count]));

    // Get resolved count
    const resolvedCount = await collection.countDocuments({
      ...dateFilter,
      resolved: true
    });

    // Get total count
    const totalCount = await collection.countDocuments(dateFilter);

    return {
      critical: severityCounts.get("critical") || 0,
      high: severityCounts.get("high") || 0,
      warning: severityCounts.get("warning") || 0,
      low: severityCounts.get("low") || 0,
      resolved: resolvedCount,
      total: totalCount,
      dateRange: {
        start: startDate.toISOString().split('T')[0],
        end: endDate.toISOString().split('T')[0]
      }
    };
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

  async getMachinesLatestStatus() {
    const telemetryCol = await this.telemetryService.getCollection();
    const alertsCol = await this.getAlertsCollection();

    // Step 1: Get latest telemetry for each machine
    const latestTelemetry = await telemetryCol.aggregate([
      { $sort: { timestamp: -1 } },
      {
        $group: {
          _id: "$machineId",
          lastTelemetryAt: { $first: "$timestamp" },
          telemetryId: { $first: "$_id" }
        }
      },
    ]).toArray();

    // Step 2: For each machine, check the latest alert by referenced telemetry ID
    const results = [];
    for (const { _id: machineId, lastTelemetryAt, telemetryId } of latestTelemetry) {
      const latestAlert = await alertsCol.findOne(
        { "telemetry_data._id": telemetryId },
        { sort: { triggered_at: -1 } }
      );

      let status: "normal" | "warning" | "critical" = "normal";
      if (latestAlert) {
        if (latestAlert.severity === "warning") status = "warning";
        else if (latestAlert.severity === "critical") status = "critical";
      }

      results.push({
        machineId,
        status,
        lastTelemetryAt
      });
    }

    return results;
  }

  async getTopOffendingStats(startDate?: string, endDate?: string) {
    const collection = await this.getAlertsCollection();

    const match: Record<string, any> = {};
    if (startDate || endDate) {
      match.triggered_at = {};
      if (startDate) match.triggered_at.$gte = new Date(startDate);
      if (endDate) match.triggered_at.$lte = new Date(endDate);
    }

    const [result] = await collection.aggregate([
      { $match: match },
      {
        $facet: {
          topMachines: [
            // count per (machineId, severity)
            {
              $group: {
                _id: {
                  machineId: "$telemetry_data.machineId",
                  severity: "$severity",
                },
                count: { $sum: 1 },
              },
            },
            // pivot severities -> critical, warning
            {
              $group: {
                _id: "$_id.machineId",
                critical: {
                  $sum: {
                    $cond: [{ $eq: ["$_id.severity", "critical"] }, "$count", 0],
                  },
                },
                warning: {
                  $sum: {
                    $cond: [{ $eq: ["$_id.severity", "warning"] }, "$count", 0],
                  },
                },
                total: { $sum: "$count" },
              },
            },
            // order by critical first, then warning, then total
            { $sort: { critical: -1, warning: -1, total: -1 } },
            {
              $project: {
                _id: 0,
                machineId: "$_id",
                critical: 1,
                warning: 1,
                total: 1,
              },
            },
          ],
          topParameters: [
            // count per (sensor_type, severity)
            {
              $group: {
                _id: { param: "$sensor_type", severity: "$severity" },
                count: { $sum: 1 },
              },
            },
            // pivot severities -> critical, warning
            {
              $group: {
                _id: "$_id.param",
                critical: {
                  $sum: {
                    $cond: [{ $eq: ["$_id.severity", "critical"] }, "$count", 0],
                  },
                },
                warning: {
                  $sum: {
                    $cond: [{ $eq: ["$_id.severity", "warning"] }, "$count", 0],
                  },
                },
                total: { $sum: "$count" },
              },
            },
            // parameter breaches "most often" -> sort by total
            { $sort: { total: -1, critical: -1, warning: -1 } },
            {
              $project: {
                _id: 0,
                parameter: "$_id",
                critical: 1,
                warning: 1,
                total: 1,
              },
            },
          ],
        },
      },
    ]).toArray();

    // Always return both arrays (fallback to empty if no alerts)
    return {
      topMachines: result?.topMachines ?? [],
      topParameters: result?.topParameters ?? [],
    };
  }


}
