import { ApiProperty } from '@nestjs/swagger';

export class TelemetryResponseDto {
  @ApiProperty({
    description: 'Unique identifier for the telemetry record',
    example: '507f1f77bcf86cd799439011'
  })
  _id: string;

  @ApiProperty({
    description: 'Timestamp of the telemetry reading',
    example: '1654733331'
  })
  timestamp: string;

  @ApiProperty({
    description: 'Temperature reading in Celsius',
    example: 20.117
  })
  Temperature: number;

  @ApiProperty({
    description: 'Humidity percentage',
    example: 52.81
  })
  Humidity: number;

  @ApiProperty({
    description: 'Total Volatile Organic Compounds in ppb',
    example: 0
  })
  TVOC: number;

  @ApiProperty({
    description: 'Equivalent CO2 concentration in ppm',
    example: 400
  })
  eCO2: number;

  @ApiProperty({
    description: 'Raw Hydrogen gas sensor reading',
    example: 12448
  })
  'Raw H2': number;

  @ApiProperty({
    description: 'Raw Ethanol sensor reading',
    example: 19155
  })
  'Raw Ethanol': number;

  @ApiProperty({
    description: 'Atmospheric pressure in hPa',
    example: 939.758
  })
  Pressure: number;

  @ApiProperty({
    description: 'PM1.0 particulate matter in μg/m³',
    example: 0.0
  })
  'PM1.0': number;

  @ApiProperty({
    description: 'PM2.5 particulate matter in μg/m³',
    example: 0.0
  })
  'PM2.5': number;

  @ApiProperty({
    description: 'Number concentration of particles >0.5μm in particles/cm³',
    example: 0.0
  })
  'NC0.5': number;

  @ApiProperty({
    description: 'Number concentration of particles >1.0μm in particles/cm³',
    example: 0.0
  })
  'NC1.0': number;

  @ApiProperty({
    description: 'Number concentration of particles >2.5μm in particles/cm³',
    example: 0.0
  })
  'NC2.5': number;

  @ApiProperty({
    description: 'Count value',
    example: 8
  })
  CNT: number;

  @ApiProperty({
    description: 'Record creation timestamp',
    example: '2023-06-08T12:35:31.000Z'
  })
  createdAt: string;

  @ApiProperty({
    description: 'Record last update timestamp',
    example: '2023-06-08T12:35:31.000Z'
  })
  updatedAt: string;
}

export class TelemetryArrayResponseDto {
  @ApiProperty({
    description: 'Array of telemetry records',
    type: [TelemetryResponseDto],
    isArray: true
  })
  data: TelemetryResponseDto[];
}

export class TelemetryMockResponseDto {
  @ApiProperty({
    description: 'Success status of mock data generation',
    example: true
  })
  success: boolean;

  @ApiProperty({
    description: 'Generated mock telemetry data',
    type: TelemetryResponseDto
  })
  data: TelemetryResponseDto;
}
