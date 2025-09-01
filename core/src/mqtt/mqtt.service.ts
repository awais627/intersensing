import { Injectable, Logger } from "@nestjs/common";
import { ITelemetry } from "../common/interfaces/telemetry";
import { TelemetryService } from "../common/common/src/services/telemetry.service";
import { AlertsService } from "../alerts/alerts.service";

@Injectable()
export class MqttService {
  private readonly logger = new Logger(MqttService.name);

  constructor(
    private readonly telemetryService: TelemetryService,
    private readonly alertsService: AlertsService,
  ) {}

  /**
   * Publish telemetry data to MQTT topic
   */
  async publishTelemetry(topic: string, data: ITelemetry): Promise<void> {
    try {
      this.logger.log(`📡 Publishing telemetry data to topic: ${topic}`);
      // Note: In a microservice setup, publishing is handled by the transport layer
      // This method is kept for future implementation if needed
    } catch (error) {
      this.logger.error(`❌ Failed to publish to topic ${topic}:`, error);
      throw error;
    }
  }

  /**
   * Publish alert to MQTT topic
   */
  async publishAlert(topic: string, alert: any): Promise<void> {
    try {
      this.logger.log(`🚨 Publishing alert to topic: ${topic}`);
      // Note: In a microservice setup, publishing is handled by the transport layer
      // This method is kept for future implementation if needed
    } catch (error) {
      this.logger.error(`❌ Failed to publish alert to topic ${topic}:`, error);
      throw error;
    }
  }

  /**
   * Process incoming MQTT telemetry data
   */
  async processTelemetryData(data: ITelemetry): Promise<void> {
    try {
      // Save telemetry data
      const result = await this.telemetryService.create(data);
      this.logger.log(`💾 Saved telemetry data for machine ${data.machineId}`);

      // Check for alerts
      await this.checkAndCreateAlerts(data);

      this.logger.log(`✅ Telemetry data processed successfully for machine ${data.machineId}`);
    } catch (error) {
      this.logger.error("❌ Failed to process telemetry data:", error);
      throw error;
    }
  }

  /**
   * Check telemetry data for alert conditions and create alerts if needed
   */
  private async checkAndCreateAlerts(telemetry: ITelemetry): Promise<void> {
    try {
      const alerts = [];

      // Temperature alerts
      if (telemetry.Temperature > 30) {
        alerts.push({
          type: "TEMPERATURE_HIGH",
          severity: "HIGH",
          message: `High temperature detected: ${telemetry.Temperature}°C`,
          machineId: telemetry.machineId,
          timestamp: telemetry.timestamp,
          data: { temperature: telemetry.Temperature },
        });
      }

      // Humidity alerts
      if (telemetry.Humidity > 80) {
        alerts.push({
          type: "HUMIDITY_HIGH",
          severity: "MEDIUM",
          message: `High humidity detected: ${telemetry.Humidity}%`,
          machineId: telemetry.machineId,
          timestamp: telemetry.timestamp,
          data: { humidity: telemetry.Humidity },
        });
      }

      // Pressure alerts
      if (telemetry.Pressure < 900 || telemetry.Pressure > 1100) {
        alerts.push({
          type: "PRESSURE_ANOMALY",
          severity: "MEDIUM",
          message: `Pressure anomaly detected: ${telemetry.Pressure} hPa`,
          machineId: telemetry.machineId,
          timestamp: telemetry.timestamp,
          data: { pressure: telemetry.Pressure },
        });
      }

      // Create alerts if any conditions are met
      for (const alert of alerts) {
        await this.alertsService.createAlert(alert);
        this.logger.log(
          `🚨 Created alert: ${alert.type} for machine ${alert.machineId}`,
        );
      }
    } catch (error) {
      this.logger.error("❌ Failed to check/create alerts:", error);
    }
  }

  /**
   * Get MQTT connection status
   */
  getConnectionStatus(): { connected: boolean; timestamp: Date } {
    return {
      connected: true, // This would need to be implemented based on actual MQTT client status
      timestamp: new Date(),
    };
  }
}
