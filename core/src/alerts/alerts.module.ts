import { Module, forwardRef } from "@nestjs/common";
import { AlertsController } from "./alerts.controller";
import { AlertsService } from "./alerts.service";
import { CommonModule } from "../common/common/src";
import { TelemetryModule } from "../telemetry/telemetry.module";

@Module({
  imports: [CommonModule, forwardRef(() => TelemetryModule)],
  controllers: [AlertsController],
  providers: [AlertsService],
  exports: [AlertsService],
})
export class AlertsModule {}
