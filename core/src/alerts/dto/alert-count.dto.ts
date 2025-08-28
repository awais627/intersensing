import { ApiProperty } from "@nestjs/swagger";

export class AlertCountDto {
  @ApiProperty({
    description: "Number of alerts of this type",
    example: 258
  })
  count: number;

  @ApiProperty({
    description: "Alert severity type",
    example: "warning",
    enum: ["critical", "high", "warning", "medium", "low"]
  })
  type: string;
}

export class AlertCountsResponseDto {
  @ApiProperty({
    description: "Array of alert counts by type",
    type: [AlertCountDto],
    example: [
      { count: 258, type: "warning" },
      { count: 234, type: "high" },
      { count: 156, type: "critical" },
      { count: 89, type: "medium" },
      { count: 45, type: "low" }
    ]
  })
  data: AlertCountDto[];

  @ApiProperty({
    description: "Date for which the counts were calculated",
    example: "2024-01-15"
  })
  date: string;
}
