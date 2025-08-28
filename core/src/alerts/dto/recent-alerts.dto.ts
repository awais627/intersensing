import { ApiProperty } from "@nestjs/swagger";
import { IAlert } from "../../common/interfaces/alert";

export class RecentAlertsResponseDto {
  @ApiProperty({
    description: "Array of recent alerts",
    type: [Object],
    example: [
      {
        _id: "507f1f77bcf86cd799439011",
        rule_id: "temp-high-01",
        sensor_type: "Temperature",
        threshold: 30,
        operator: ">=",
        notify: ["email", "in-app"],
        severity: "warning",
        triggered_at: "2024-01-15T10:30:00.000Z",
        telemetry_data: { Temperature: 32, Humidity: 45, eCO2: 600 },
        acknowledged: false,
        createdAt: "2024-01-15T10:30:00.000Z",
        updatedAt: "2024-01-15T10:30:00.000Z"
      }
    ]
  })
  alerts: IAlert[];

  @ApiProperty({
    description: "Total count of all alerts",
    example: 1250
  })
  totalCount: number;

  @ApiProperty({
    description: "Count of alerts returned in this response",
    example: 50
  })
  returnedCount: number;

  @ApiProperty({
    description: "Limit parameter used for the query",
    example: 50
  })
  limit: number;
}
