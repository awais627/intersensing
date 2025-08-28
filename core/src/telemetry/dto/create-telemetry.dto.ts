import { IsNumber, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTelemetryDto {
  @ApiProperty({
    description: 'Timestamp of the telemetry reading',
    example: '1654733331',
    type: String
  })
  @IsString()
  timestamp: string;

  @ApiProperty({
    description: 'Temperature reading in Celsius',
    example: 20.117,
    type: Number,
    minimum: -50,
    maximum: 100
  })
  @IsNumber()
  Temperature: number;

  @ApiProperty({
    description: 'Humidity percentage',
    example: 52.81,
    type: Number,
    minimum: 0,
    maximum: 100
  })
  @IsNumber()
  Humidity: number;

  @ApiProperty({
    description: 'Total Volatile Organic Compounds in ppb',
    example: 0,
    type: Number,
    minimum: 0
  })
  @IsNumber()
  TVOC: number;

  @ApiProperty({
    description: 'Equivalent CO2 concentration in ppm',
    example: 400,
    type: Number,
    minimum: 0
  })
  @IsNumber()
  eCO2: number;

  @ApiProperty({
    description: 'Raw Hydrogen gas sensor reading',
    example: 12448,
    type: Number,
    minimum: 0
  })
  @IsNumber()
  'Raw H2': number;

  @ApiProperty({
    description: 'Raw Ethanol sensor reading',
    example: 19155,
    type: Number,
    minimum: 0
  })
  @IsNumber()
  'Raw Ethanol': number;

  @ApiProperty({
    description: 'Atmospheric pressure in hPa',
    example: 939.758,
    type: Number,
    minimum: 800,
    maximum: 1200
  })
  @IsNumber()
  Pressure: number;

  @ApiProperty({
    description: 'PM1.0 particulate matter in μg/m³',
    example: 0.0,
    type: Number,
    minimum: 0
  })
  @IsNumber()
  'PM1.0': number;

  @ApiProperty({
    description: 'PM2.5 particulate matter in μg/m³',
    example: 0.0,
    type: Number,
    minimum: 0
  })
  @IsNumber()
  'PM2.5': number;

  @ApiProperty({
    description: 'Number concentration of particles >0.5μm in particles/cm³',
    example: 0.0,
    type: Number,
    minimum: 0
  })
  @IsNumber()
  'NC0.5': number;

  @ApiProperty({
    description: 'Number concentration of particles >1.0μm in particles/cm³',
    example: 0.0,
    type: Number,
    minimum: 0
  })
  @IsNumber()
  'NC1.0': number;

  @ApiProperty({
    description: 'Number concentration of particles >2.5μm in particles/cm³',
    example: 0.0,
    type: Number,
    minimum: 0
  })
  @IsNumber()
  'NC2.5': number;

  @ApiProperty({
    description: 'Machine Id',
    example: 3,
    type: Number,
    minimum: 0
  })
  @IsNumber()
  machineId: number;
}
