import { Global, Module } from "@nestjs/common";
import { CommonService } from "./common.service";
import { MongoService } from "./mongo.service";
import { TelemetryService } from "./services/telemetry.service";

@Global()
@Module({
  providers: [CommonService, MongoService, TelemetryService],
  exports: [CommonService, MongoService, TelemetryService],
})
export class CommonModule {}
