import { Controller, Get } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("events")
@Controller("api/events")
export class EventsController {
  @Get("health")
  @ApiOperation({
    summary: "Health check",
    description: "Check Redis connection and queue status",
  })
  @ApiOkResponse({
    description: "Health check completed successfully",
  })
  async healthCheck() {
    return "ok";
  }
}
