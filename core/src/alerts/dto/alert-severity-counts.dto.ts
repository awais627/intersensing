import { ApiProperty } from "@nestjs/swagger";

export class AlertSeverityCountsDto {
  @ApiProperty({
    description: "Number of critical severity alerts",
    example: 15
  })
  critical: number;

  @ApiProperty({
    description: "Number of high severity alerts",
    example: 25
  })
  high: number;

  @ApiProperty({
    description: "Number of warning alerts",
    example: 40
  })
  warning: number;

  @ApiProperty({
    description: "Number of low severity alerts",
    example: 30
  })
  low: number;

  @ApiProperty({
    description: "Number of resolved alerts",
    example: 20
  })
  resolved: number;

  @ApiProperty({
    description: "Total number of alerts in the date range",
    example: 130
  })
  total: number;

  @ApiProperty({
    description: "Date range for the counts",
    example: {
      start: "2024-01-14",
      end: "2024-01-15"
    }
  })
  dateRange: {
    start: string;
    end: string;
  };
}
