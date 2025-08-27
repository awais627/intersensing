import { Module } from "@nestjs/common";
import { AlertsController } from "./alerts.controller";
import { AlertsService } from "./alerts.service";
import { CommonModule } from "../common/common/src";

@Module({
  imports: [CommonModule],
  controllers: [AlertsController],
  providers: [AlertsService],
  exports: [AlertsService],
})
export class AlertsModule {}
