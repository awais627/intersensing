import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class MqttTelemetryDto {
  @ApiProperty({
    description: 'Timestamp of the telemetry data',
    example: '1654733331'
  })
  @IsString()
  timestamp: string;

  @ApiProperty({
    description: 'Temperature reading in Celsius',
    example: 20.117
  })
  @IsNumber()
  Temperature: number;

  @ApiProperty({
    description: 'Humidity reading in percentage',
    example: 52.81
  })
  @IsNumber()
  Humidity: number;

  @ApiProperty({
    description: 'TVOC (Total Volatile Organic Compounds) reading',
    example: 0
  })
  @IsNumber()
  TVOC: number;

  @ApiProperty({
    description: 'eCO2 (equivalent CO2) reading',
    example: 400
  })
  @IsNumber()
  eCO2: number;

  @ApiProperty({
    description: 'Raw H2 reading',
    example: 12448
  })
  @IsNumber()
  'Raw H2': number;

  @ApiProperty({
    description: 'Raw Ethanol reading',
    example: 19155
  })
  @IsNumber()
  'Raw Ethanol': number;

  @ApiProperty({
    description: 'Pressure reading in hPa',
    example: 939.758
  })
  @IsNumber()
  Pressure: number;

  @ApiProperty({
    description: 'PM1.0 particulate matter reading',
    example: 0.0
  })
  @IsNumber()
  'PM1.0': number;

  @ApiProperty({
    description: 'PM2.5 particulate matter reading',
    example: 0.0
  })
  @IsNumber()
  'PM2.5': number;

  @ApiProperty({
    description: 'NC0.5 particle count',
    example: 0.0
  })
  @IsNumber()
  'NC0.5': number;

  @ApiProperty({
    description: 'NC1.0 particle count',
    example: 0.0
  })
  @IsNumber()
  'NC1.0': number;

  @ApiProperty({
    description: 'NC2.5 particle count',
    example: 0.0
  })
  @IsNumber()
  'NC2.5': number;

  @ApiProperty({
    description: 'Machine identifier',
    example: 3
  })
  @IsNumber()
  machineId: number;
}

export class MqttAlertDto {
  @ApiProperty({
    description: 'Type of alert',
    example: 'TEMPERATURE_HIGH'
  })
  @IsString()
  type: string;

  @ApiProperty({
    description: 'Severity level of the alert',
    example: 'HIGH',
    enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']
  })
  @IsString()
  severity: string;

  @ApiProperty({
    description: 'Alert message',
    example: 'High temperature detected: 35°C'
  })
  @IsString()
  message: string;

  @ApiProperty({
    description: 'Machine identifier',
    example: 3
  })
  @IsNumber()
  machineId: number;

  @ApiProperty({
    description: 'Timestamp of the alert',
    example: '1654733331'
  })
  @IsString()
  timestamp: string;

  @ApiProperty({
    description: 'Additional alert data',
    example: { temperature: 35 }
  })
  @IsOptional()
  @IsObject()
  data?: Record<string, any>;
}

export class MqttCommandDto {
  @ApiProperty({
    description: 'Command type to execute',
    example: 'RESTART_MACHINE'
  })
  @IsString()
  command: string;

  @ApiProperty({
    description: 'Target machine identifier',
    example: 3
  })
  @IsNumber()
  machineId: number;

  @ApiProperty({
    description: 'Command parameters',
    example: { delay: 5000 }
  })
  @IsOptional()
  @IsObject()
  parameters?: Record<string, any>;
}

export class MqttResponseDto {
  @ApiProperty({
    description: 'Response status',
    example: true
  })
  success: boolean;

  @ApiProperty({
    description: 'Response message',
    example: 'Command executed successfully'
  })
  message: string;

  @ApiProperty({
    description: 'Response data',
    example: { result: 'Machine restarted' }
  })
  @IsOptional()
  data?: any;

  @ApiProperty({
    description: 'Timestamp of the response',
    example: '1654733331'
  })
  timestamp: string;
}
