import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type TelemetryDocument = Telemetry & Document;

@Schema({ timestamps: true })
export class Telemetry {
  @ApiProperty({
    description: 'Unique identifier for the telemetry record',
    example: '507f1f77bcf86cd799439011'
  })
  _id: string;

  @ApiProperty({
    description: 'Timestamp of the telemetry reading',
    example: '1654733331'
  })
  @Prop({ required: true })
  timestamp: string;

  @ApiProperty({
    description: 'Temperature reading in Celsius',
    example: 20.117
  })
  @Prop({ required: true, type: Number })
  Temperature: number;

  @ApiProperty({
    description: 'Humidity percentage',
    example: 52.81
  })
  @Prop({ required: true, type: Number })
  Humidity: number;

  @ApiProperty({
    description: 'Total Volatile Organic Compounds in ppb',
    example: 0
  })
  @Prop({ required: true, type: Number })
  TVOC: number;

  @ApiProperty({
    description: 'Equivalent CO2 concentration in ppm',
    example: 400
  })
  @Prop({ required: true, type: Number })
  eCO2: number;

  @ApiProperty({
    description: 'Raw Hydrogen gas sensor reading',
    example: 12448
  })
  @Prop({ required: true, type: Number })
  'Raw H2': number;

  @ApiProperty({
    description: 'Raw Ethanol sensor reading',
    example: 19155
  })
  @Prop({ required: true, type: Number })
  'Raw Ethanol': number;

  @ApiProperty({
    description: 'Atmospheric pressure in hPa',
    example: 939.758
  })
  @Prop({ required: true, type: Number })
  Pressure: number;

  @ApiProperty({
    description: 'PM1.0 particulate matter in μg/m³',
    example: 0.0
  })
  @Prop({ required: true, type: Number })
  'PM1.0': number;

  @ApiProperty({
    description: 'PM2.5 particulate matter in μg/m³',
    example: 0.0
  })
  @Prop({ required: true, type: Number })
  'PM2.5': number;

  @ApiProperty({
    description: 'Number concentration of particles >0.5μm in particles/cm³',
    example: 0.0
  })
  @Prop({ required: true, type: Number })
  'NC0.5': number;

  @ApiProperty({
    description: 'Number concentration of particles >1.0μm in particles/cm³',
    example: 0.0
  })
  @Prop({ required: true, type: Number })
  'NC1.0': number;

  @ApiProperty({
    description: 'Number concentration of particles >2.5μm in particles/cm³',
    example: 0.0
  })
  @Prop({ required: true, type: Number })
  'NC2.5': number;

  @ApiProperty({
    description: 'Count value',
    example: 8
  })
  @Prop({ required: true, type: Number })
  CNT: number;

  @ApiProperty({
    description: 'Record creation timestamp',
    example: '2023-06-08T12:35:31.000Z'
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Record last update timestamp',
    example: '2023-06-08T12:35:31.000Z'
  })
  updatedAt: Date;
}

export const TelemetrySchema = SchemaFactory.createForClass(Telemetry);
