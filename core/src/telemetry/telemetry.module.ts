import { Module } from "@nestjs/common";
import { TelemetryController } from "./telemetry.controller";
import { TelemetryGateway } from "./telemetry.gateway";
import { CommonModule } from "../common/common/src";

@Module({
  imports: [CommonModule],
  controllers: [TelemetryController],
  providers: [TelemetryGateway],
  exports: [TelemetryGateway],
})
export class TelemetryModule {}
