import { Injectable, Logger, NotFoundException, Inject, forwardRef } from "@nestjs/common";
import { Collection, ObjectId } from "mongodb";
import { MongoService } from "../common/common/src/mongo.service";
import { IAlert, ISensorOptimalRange, IDeviationThreshold } from "../common/interfaces/alert";
import { ITelemetry } from "../common/interfaces/telemetry";
import { TelemetryService } from "../common/common/src/services/telemetry.service";
import { TelemetryGateway } from "../telemetry/telemetry.gateway";

@Injectable()
export class AlertsService {
  private readonly logger = new Logger(AlertsService.name);
  private alertsCollection: Collection<IAlert> | null = null;

  private readonly sensorOptimalRanges: ISensorOptimalRange[] = [
    { sensor_type: "Temperature", min: 18, max: 27, unit: "°C", enabled: true, },
    { sensor_type: "Humidity", min: 40, max: 60, unit: "%", enabled: true, },
    { sensor_type: "eCO2", min: 400, max: 600, unit: "ppm", enabled: true, },
    { sensor_type: "TVOC", min: 0, max: 220, unit: "ppb", enabled: true, },
    { sensor_type: "Pressure", min: 980, max: 1030, unit: "hPa", enabled: true, },
    { sensor_type: "PM1.0", min: 0, max: 15, unit: "μg/m³", enabled: true, },
    { sensor_type: "PM2.5", min: 0, max: 25, unit: "μg/m³", enabled: true, },
  ];

  private readonly deviationThresholds: IDeviationThreshold[] = [
    { severity: "low", deviation_percentage: 10, notify: ["in-app"], },
    { severity: "medium", deviation_percentage: 25, notify: ["in-app"], },
    { severity: "high", deviation_percentage: 50, notify: ["in-app", "email"], },
    { severity: "critical", deviation_percentage: 75, notify: ["in-app", "email"], },
    { severity: "catastrophic", deviation_percentage: 90, notify: ["in-app", "email", "sms"], },
  ];

  constructor(
    private readonly mongoService: MongoService, 
    private readonly telemetryService: TelemetryService,
    @Inject(forwardRef(() => TelemetryGateway)) private readonly telemetryGateway: TelemetryGateway,
  ) {}

  async checkTelemetryForAlerts(telemetry: ITelemetry): Promise<IAlert[]> {
    const triggeredAlerts: IAlert[] = [];

    for (const sensorRange of this.sensorOptimalRanges) {
      if (!sensorRange.enabled) continue;

      const sensorValue = telemetry[sensorRange.sensor_type];
      if (sensorValue === undefined || sensorValue === null || isNaN(sensorValue)) continue;

      const deviationAnalysis = this.calculateDeviation(sensorValue, sensorRange);
      if (!deviationAnalysis) continue;

      const severityLevel = this.getSeverityLevel(deviationAnalysis.deviation_percentage);
      if (!severityLevel) continue;

      const alert: IAlert = {
        rule_id: `${sensorRange.sensor_type.toLowerCase()}-${deviationAnalysis.deviation_type}-${severityLevel.severity}`,
        sensor_type: sensorRange.sensor_type,
        actual_value: sensorValue,
        optimal_range: { min: sensorRange.min, max: sensorRange.max },
        deviation_percentage: deviationAnalysis.deviation_percentage,
        deviation_type: deviationAnalysis.deviation_type,
        notify: severityLevel.notify,
        severity: severityLevel.severity,
        triggered_at: new Date(),
        telemetry_data: telemetry,
        acknowledged: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const savedAlert = await this.createAlert(alert);
      triggeredAlerts.push(savedAlert);

      this.logger.warn(
        `Alert triggered: ${alert.rule_id} - ${sensorRange.sensor_type} value ${sensorValue}${sensorRange.unit || ''} is ${deviationAnalysis.deviation_percentage.toFixed(1)}% ${deviationAnalysis.deviation_type.replace('_', ' ')} the optimal range [${sensorRange.min}-${sensorRange.max}${sensorRange.unit || ''}]`
      );
    }

    return triggeredAlerts;
  }

  private calculateDeviation(value: number, range: ISensorOptimalRange): { deviation_percentage: number; deviation_type: "above_max" | "below_min" } | null {
    const { min, max } = range;

    if (value >= min && value <= max) {
      return null; 
    }

    const rangeWidth = max - min;
    let deviation_percentage: number;
    let deviation_type: "above_max" | "below_min";

    if (value > max) {
      deviation_percentage = ((value - max) / rangeWidth) * 100;
      deviation_type = "above_max";
    } else {
      deviation_percentage = ((min - value) / rangeWidth) * 100;
      deviation_type = "below_min";
    }

    return { deviation_percentage, deviation_type };
  }

  private getSeverityLevel(deviationPercentage: number): IDeviationThreshold | null {
    const sortedThresholds = [...this.deviationThresholds].sort((a, b) => b.deviation_percentage - a.deviation_percentage);
    
    for (const threshold of sortedThresholds) {
      if (deviationPercentage >= threshold.deviation_percentage) {
        return threshold;
      }
    }

    return null; 
  }

  async createAlert(alert: IAlert): Promise<IAlert> {
    const collection = await this.getAlertsCollection();
    const result = await collection.insertOne(alert);
    const savedAlert = { ...alert, _id: result.insertedId.toString() };
    
    // Broadcast alert via WebSocket
    try {
      this.telemetryGateway.broadcastAlert(savedAlert);
    } catch (error) {
      this.logger.error('Failed to broadcast alert via WebSocket:', error);
    }
    
    return savedAlert;
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

    const totalCount = await collection.countDocuments(dateFilter);
    
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
    
    const totalCount = await collection.countDocuments();
    
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
    const result = await collection.updateOne(
      {  _id: new ObjectId(alertId) } as any,     // ← wrap here
      {
        $set: {
          acknowledged: true,
          acknowledged_at: new Date(),
          updatedAt: new Date(),
        },
      }
    );

    // optional sanity check
    if (result.matchedCount === 0) {
      throw new NotFoundException(`Alert ${alertId} not found`);
    }
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
    
    const severityTypes = ["catastrophic", "critical", "high", "medium", "low"];
    const countsMap = new Map(result.map(item => [item.type, item.count]));
    
    return severityTypes.map(type => ({
      count: countsMap.get(type) || 0,
      type
    }));
  }

  async getAlertCountsBySeverityAndStatus(days: number = 1): Promise<{
    catastrophic: number;
    critical: number;
    high: number;
    medium: number;
    low: number;
    acknowledged: number;
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

    // Get acknowledged count
    const acknowledgedCount = await collection.countDocuments({
      ...dateFilter,
      acknowledged: true
    });

    // Get total count
    const totalCount = await collection.countDocuments(dateFilter);

    return {
      catastrophic: severityCounts.get("catastrophic") || 0,
      critical: severityCounts.get("critical") || 0,
      high: severityCounts.get("high") || 0,
      medium: severityCounts.get("medium") || 0,
      low: severityCounts.get("low") || 0,
      acknowledged: acknowledgedCount,
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

    const results = [];
    for (const { _id: machineId, lastTelemetryAt, telemetryId } of latestTelemetry) {
      const latestAlert = await alertsCol.findOne(
        { "telemetry_data._id": telemetryId },
        { sort: { triggered_at: -1 } }
      );

      let status: "normal" | "warning" | "critical" = "normal";
      if (latestAlert) {
        if (["low", "medium"].includes(latestAlert.severity)) {
          status = "warning";
        } else if (["high", "critical", "catastrophic"].includes(latestAlert.severity)) {
          status = "critical";
        }
      }

      results.push({
        machineId,
        status,
        lastTelemetryAt
      });
    }

    return results;
  }


  getSensorOptimalRanges(): ISensorOptimalRange[] {
    return this.sensorOptimalRanges;
  }

  getSensorOptimalRange(sensorType: string): ISensorOptimalRange | undefined {
    return this.sensorOptimalRanges.find(range => range.sensor_type === sensorType);
  }

  updateSensorOptimalRange(sensorType: string, min: number, max: number, enabled?: boolean): boolean {
    const range = this.sensorOptimalRanges.find(range => range.sensor_type === sensorType);
    if (range) {
      range.min = min;
      range.max = max;
      if (enabled !== undefined) {
        range.enabled = enabled;
      }
      this.logger.log(`Updated optimal range for ${sensorType}: [${min}, ${max}]`);
      return true;
    }
    return false;
  }

  getDeviationThresholds(): IDeviationThreshold[] {
    return this.deviationThresholds;
  }

  updateDeviationThreshold(severity: string, deviationPercentage: number, notify?: string[]): boolean {
    const threshold = this.deviationThresholds.find(t => t.severity === severity);
    if (threshold) {
      threshold.deviation_percentage = deviationPercentage;
      if (notify) {
        threshold.notify = notify;
      }
      this.logger.log(`Updated deviation threshold for ${severity}: ${deviationPercentage}%`);
      return true;
    }
    return false;
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
            // pivot severities -> critical, catastrophic
            {
              $group: {
                _id: "$_id.machineId",
                catastrophic: {
                  $sum: {
                    $cond: [{ $eq: ["$_id.severity", "catastrophic"] }, "$count", 0],
                  },
                },
                critical: {
                  $sum: {
                    $cond: [{ $eq: ["$_id.severity", "critical"] }, "$count", 0],
                  },
                },
                high: {
                  $sum: {
                    $cond: [{ $eq: ["$_id.severity", "high"] }, "$count", 0],
                  },
                },
                medium: {
                  $sum: {
                    $cond: [{ $eq: ["$_id.severity", "medium"] }, "$count", 0],
                  },
                },
                low: {
                  $sum: {
                    $cond: [{ $eq: ["$_id.severity", "low"] }, "$count", 0],
                  },
                },
                total: { $sum: "$count" },
              },
            },
            // order by catastrophic first, then critical, then high, then total
            { $sort: { catastrophic: -1, critical: -1, high: -1, medium: -1, low: -1, total: -1 } },
            {
              $project: {
                _id: 0,
                machineId: "$_id",
                catastrophic: 1,
                critical: 1,
                high: 1,
                medium: 1,
                low: 1,
                total: 1,
              },
            },
          ],
          topParameters: [
            {
              $group: {
                _id: { param: "$sensor_type", severity: "$severity" },
                count: { $sum: 1 },
              },
            },
            {
              $group: {
                _id: "$_id.param",
                catastrophic: {
                  $sum: {
                    $cond: [{ $eq: ["$_id.severity", "catastrophic"] }, "$count", 0],
                  },
                },
                critical: {
                  $sum: {
                    $cond: [{ $eq: ["$_id.severity", "critical"] }, "$count", 0],
                  },
                },
                high: {
                  $sum: {
                    $cond: [{ $eq: ["$_id.severity", "high"] }, "$count", 0],
                  },
                },
                medium: {
                  $sum: {
                    $cond: [{ $eq: ["$_id.severity", "medium"] }, "$count", 0],
                  },
                },
                low: {
                  $sum: {
                    $cond: [{ $eq: ["$_id.severity", "low"] }, "$count", 0],
                  },
                },
                total: { $sum: "$count" },
              },
            },
            { $sort: { total: -1, catastrophic: -1, critical: -1, high: -1, medium: -1, low:-1 } },
            {
              $project: {
                _id: 0,
                parameter: "$_id",
                catastrophic: 1,
                critical: 1,
                high: 1,
                medium: 1,
                low: 1,
                total: 1,
              },
            },
          ],
        },
      },
    ]).toArray();
    return {
      topMachines: result?.topMachines ?? [],
      topParameters: result?.topParameters ?? [],
    };
  }
}
