import { Module } from "@nestjs/common";
import { MqttController } from "./mqtt.controller";
import { MqttService } from "./mqtt.service";
import { TelemetryModule } from "../telemetry/telemetry.module";
import { AlertsModule } from "../alerts/alerts.module";
import { CommonModule } from "../common/common/src";

@Module({
  imports: [TelemetryModule, AlertsModule, CommonModule],
  controllers: [MqttController],
  providers: [MqttService],
  exports: [MqttService],
})
export class MqttModule {}
