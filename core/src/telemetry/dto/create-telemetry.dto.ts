import { IsNumber, IsString } from 'class-validator';

export class CreateTelemetryDto {
  @IsString()
  timestamp: string;

  @IsNumber()
  Temperature: number;

  @IsNumber()
  Humidity: number;

  @IsNumber()
  TVOC: number;

  @IsNumber()
  eCO2: number;

  @IsNumber()
  'Raw H2': number;

  @IsNumber()
  'Raw Ethanol': number;

  @IsNumber()
  Pressure: number;

  @IsNumber()
  'PM1.0': number;

  @IsNumber()
  'PM2.5': number;

  @IsNumber()
  'NC0.5': number;

  @IsNumber()
  'NC1.0': number;

  @IsNumber()
  'NC2.5': number;

  @IsNumber()
  CNT: number;
}
