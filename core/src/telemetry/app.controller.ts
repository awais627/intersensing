import { ApiTags } from "@nestjs/swagger";
import { Controller, Get } from "@nestjs/common";

@ApiTags("health")
@Controller("health")
export class AppController {
  @Get()
  async health() {
    return "ok";
  }
}
