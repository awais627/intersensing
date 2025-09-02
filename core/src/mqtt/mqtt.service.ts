import { Injectable, Logger, Inject, forwardRef } from "@nestjs/common";
import { ITelemetry } from "../common/interfaces/telemetry";
import { TelemetryService } from "../common/common/src/services/telemetry.service";
import { AlertsService } from "../alerts/alerts.service";
import { TelemetryGateway } from "../telemetry/telemetry.gateway";

@Injectable()
export class MqttService {
  private readonly logger = new Logger(MqttService.name);

  constructor(
    private readonly telemetryService: TelemetryService,
    private readonly alertsService: AlertsService,
    @Inject(forwardRef(() => TelemetryGateway)) private readonly telemetryGateway: TelemetryGateway,
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

      // Broadcast telemetry data via WebSocket to all connected clients
      try {
        this.telemetryGateway.broadcastTelemetryUpdate(data);
        this.logger.log(`📡 Broadcasted telemetry data via WebSocket for machine ${data.machineId}`);
      } catch (broadcastError) {
        this.logger.error(`❌ Failed to broadcast telemetry data:`, broadcastError);
      }

      // Check for alerts using the alerts service
      try {
        const triggeredAlerts = await this.alertsService.checkTelemetryForAlerts(data);
        if (triggeredAlerts.length > 0) {
          this.logger.log(`🚨 Created ${triggeredAlerts.length} alert(s) for machine ${data.machineId}`);
        }
      } catch (alertError) {
        this.logger.error(`❌ Failed to check/create alerts for machine ${data.machineId}:`, alertError);
        // Don't throw here - we still want telemetry processing to succeed even if alert checking fails
      }

      this.logger.log(`✅ Telemetry data processed successfully for machine ${data.machineId}`);
    } catch (error) {
      this.logger.error("❌ Failed to process telemetry data:", error);
      throw error;
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
