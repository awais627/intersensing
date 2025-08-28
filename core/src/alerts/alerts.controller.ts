import { Controller, Get, Query, Param, Patch } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from "@nestjs/swagger";
import { IsISO8601, IsOptional } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { AlertsService } from "./alerts.service";
import { AlertCountsResponseDto } from "./dto/alert-count.dto";
import { RecentAlertsResponseDto } from "./dto/recent-alerts.dto";
import { DailyAlertsResponseDto } from "./dto/daily-alerts.dto";
import { AlertSeverityCountsDto } from "./dto/alert-severity-counts.dto";

export class TopOffendersQueryDto {
  @ApiPropertyOptional({
    description: "Start date (ISO 8601 format)",
    example: "2025-08-28T00:00:00.000Z"
  })
  @IsOptional()
  @IsISO8601({ strict: true }, { message: "startDate must be a valid ISO 8601 date string" })
  startDate?: string;

  @ApiPropertyOptional({
    description: "End date (ISO 8601 format)",
    example: "2025-08-28T23:59:59.999Z"
  })
  @IsOptional()
  @IsISO8601({ strict: true }, { message: "endDate must be a valid ISO 8601 date string" })
  endDate?: string;
}

@ApiTags("alerts")
@Controller("api/alerts")
export class AlertsController {
  constructor(private readonly alertsService: AlertsService) {}

  @Get()
  @ApiOperation({ summary: "Get recent alerts with total counts" })
  @ApiQuery({ name: "limit", required: false, type: Number })
  @ApiQuery({ name: "offset", required: false, type: Number })
  @ApiResponse({ 
    status: 200, 
    description: "Recent alerts with total counts retrieved successfully",
    type: RecentAlertsResponseDto
  })
  async getRecentAlerts(@Query("limit") limit?: number, @Query("offset") offset?: number): Promise<RecentAlertsResponseDto> {
    const parsedLimit = limit ? parseInt(limit.toString()) : 50;
    const parsedOffset = offset ? parseInt(offset.toString()) : 0;
    return await this.alertsService.getRecentAlertsWithCounts(parsedLimit, parsedOffset);
  }

  @Get("acknowledged")
  @ApiOperation({ summary: "Get recent acknowledged alerts with total counts" })
  @ApiQuery({ name: "limit", required: false, type: Number })
  @ApiQuery({ name: "offset", required: false, type: Number })
  @ApiResponse({ 
    status: 200, 
    description: "Recent acknowledged alerts with total counts retrieved successfully",
    type: RecentAlertsResponseDto
  })
  async getRecentAcknowledgedAlerts(@Query("limit") limit?: number, @Query("offset") offset?: number): Promise<RecentAlertsResponseDto> {
    const parsedLimit = limit ? parseInt(limit.toString()) : 50;
    const parsedOffset = offset ? parseInt(offset.toString()) : 0;
    const alerts = await this.alertsService.getRecentAlertsByAcknowledgment(true, parsedLimit, parsedOffset);
    const totalCount = await this.alertsService.getTotalAcknowledgedAlertsCount();
    
    return {
      alerts,
      totalCount,
      returnedCount: alerts.length,
      limit: parsedLimit
    };
  }

  @Get("unacknowledged")
  @ApiOperation({ summary: "Get recent unacknowledged alerts with total counts" })
  @ApiQuery({ name: "limit", required: false, type: Number })
  @ApiQuery({ name: "offset", required: false, type: Number })
  @ApiResponse({ 
    status: 200, 
    description: "Recent unacknowledged alerts with total counts retrieved successfully",
    type: RecentAlertsResponseDto
  })
  async getRecentUnacknowledgedAlerts(@Query("limit") limit?: number, @Query("offset") offset?: number): Promise<RecentAlertsResponseDto> {
    const parsedLimit = limit ? parseInt(limit.toString()) : 50;
    const parsedOffset = offset ? parseInt(offset.toString()) : 0;
    const alerts = await this.alertsService.getRecentAlertsByAcknowledgment(false, parsedLimit, parsedOffset);
    const totalCount = await this.alertsService.getTotalAcknowledgedAlertsCount(false);
    
    return {
      alerts,
      totalCount,
      returnedCount: alerts.length,
      limit: parsedLimit
    };
  }

  @Get("day/:date")
  @ApiOperation({ summary: "Get alerts for a specific day with total counts" })
  @ApiResponse({ 
    status: 200, 
    description: "Daily alerts with total counts retrieved successfully",
    type: DailyAlertsResponseDto
  })
  async getAlertsForDay(@Param("date") dateStr: string): Promise<DailyAlertsResponseDto> {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date format. Use YYYY-MM-DD");
    }
    return await this.alertsService.getAlertsForDayWithCounts(date);
  }

  @Get("today")
  @ApiOperation({ summary: "Get alerts for today with total counts" })
  @ApiResponse({ 
    status: 200, 
    description: "Today's alerts with total counts retrieved successfully",
    type: DailyAlertsResponseDto
  })
  async getTodaysAlerts(): Promise<DailyAlertsResponseDto> {
    return await this.alertsService.getAlertsForDayWithCounts(new Date());
  }

  @Get("counts")
  @ApiOperation({ summary: "Get alert counts by type for a specific date" })
  @ApiQuery({ name: "date", required: false, description: "Date in YYYY-MM-DD format (defaults to today)" })
  @ApiResponse({ 
    status: 200, 
    description: "Alert counts by type retrieved successfully",
    type: AlertCountsResponseDto
  })
  async getAlertCountsByType(@Query("date") dateStr?: string): Promise<AlertCountsResponseDto> {
    const date = dateStr ? new Date(dateStr) : new Date();
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date format. Use YYYY-MM-DD");
    }
    const counts = await this.alertsService.getAlertCountsByType(date);
    
    return {
      data: counts,
      date: date.toISOString().split('T')[0] // Format as YYYY-MM-DD
    };
  }

  @Get("severity-counts")
  @ApiOperation({ summary: "Get alert counts by severity and resolution status for a date range" })
  @ApiQuery({ 
    name: "days", 
    required: false, 
    type: Number, 
    description: "Number of days to look back (defaults to 1 day)" 
  })
  @ApiResponse({ 
    status: 200, 
    description: "Alert severity and status counts retrieved successfully",
    type: AlertSeverityCountsDto
  })
  async getAlertSeverityCounts(@Query("days") days?: number): Promise<AlertSeverityCountsDto> {
    const parsedDays = days ? parseInt(days.toString()) : 1;
    if (parsedDays < 1 || parsedDays > 365) {
      throw new Error("Days parameter must be between 1 and 365");
    }
    return await this.alertsService.getAlertCountsBySeverityAndStatus(parsedDays);
  }

  @Patch(":id/acknowledge")
  @ApiOperation({ summary: "Acknowledged an alert" })
  @ApiResponse({ status: 200, description: "Alert acknowledged successfully" })
  async ackAlert(@Param("id") id: string) {
    await this.alertsService.ackAlert(id);
    return { message: "Alert acknowledged successfully" };
  }

  @Get("machines/status")
  @ApiOperation({ summary: "Get latest status of all machines" })
  @ApiResponse({ status: 200, description: "Returns machineId and status" })
  async getMachinesStatus() {
    return await this.alertsService.getMachinesLatestStatus();
  }

  @Get("top-offenders")
  @ApiOperation({ summary: "Get machineIds with most alerts" })
  @ApiResponse({ status: 200, description: "Top offending machines retrieved successfully" })
  async getTopOffendingStats(
    @Query() query: TopOffendersQueryDto
  ) {
    return await this.alertsService.getTopOffendingStats(query.startDate, query.endDate);
  }
}


