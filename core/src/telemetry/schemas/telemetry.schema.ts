import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TelemetryDocument = Telemetry & Document;

@Schema({ timestamps: true })
export class Telemetry {
  @Prop({ required: true })
  timestamp: string;

  @Prop({ required: true, type: Number })
  Temperature: number;

  @Prop({ required: true, type: Number })
  Humidity: number;

  @Prop({ required: true, type: Number })
  TVOC: number;

  @Prop({ required: true, type: Number })
  eCO2: number;

  @Prop({ required: true, type: Number })
  'Raw H2': number;

  @Prop({ required: true, type: Number })
  'Raw Ethanol': number;

  @Prop({ required: true, type: Number })
  Pressure: number;

  @Prop({ required: true, type: Number })
  'PM1.0': number;

  @Prop({ required: true, type: Number })
  'PM2.5': number;

  @Prop({ required: true, type: Number })
  'NC0.5': number;

  @Prop({ required: true, type: Number })
  'NC1.0': number;

  @Prop({ required: true, type: Number })
  'NC2.5': number;

  @Prop({ required: true, type: Number })
  CNT: number;
}

export const TelemetrySchema = SchemaFactory.createForClass(Telemetry);
