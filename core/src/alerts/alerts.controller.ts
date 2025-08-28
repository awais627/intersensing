import { Controller, Get, Query, Param, Patch } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from "@nestjs/swagger";
import { AlertsService } from "./alerts.service";

@ApiTags("alerts")
@Controller("api/alerts")
export class AlertsController {
  constructor(private readonly alertsService: AlertsService) {}

  @Get()
  @ApiOperation({ summary: "Get recent alerts" })
  @ApiQuery({ name: "limit", required: false, type: Number })
  @ApiResponse({ status: 200, description: "Recent alerts retrieved successfully" })
  async getRecentAlerts(@Query("limit") limit?: number) {
    return await this.alertsService.getRecentAlerts(limit ? parseInt(limit.toString()) : 50);
  }

  @Get("day/:date")
  @ApiOperation({ summary: "Get alerts for a specific day" })
  @ApiResponse({ status: 200, description: "Daily alerts retrieved successfully" })
  async getAlertsForDay(@Param("date") dateStr: string) {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date format. Use YYYY-MM-DD");
    }
    return await this.alertsService.getAlertsForDay(date);
  }

  @Get("today")
  @ApiOperation({ summary: "Get alerts for today" })
  @ApiResponse({ status: 200, description: "Today's alerts retrieved successfully" })
  async getTodaysAlerts() {
    return await this.alertsService.getAlertsForDay(new Date());
  }

  @Patch(":id/acknowledge")
  @ApiOperation({ summary: "Acknowledged an alert" })
  @ApiResponse({ status: 200, description: "Alert acknowledged successfully" })
  async ackAlert(@Param("id") id: string) {
    await this.alertsService.ackAlert(id);
    return { message: "Alert acknowledged successfully" };
  }
}
