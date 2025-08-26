import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Telemetry, TelemetryDocument } from './schemas/telemetry.schema';
import { CreateTelemetryDto } from './dto/create-telemetry.dto';

@Injectable()
export class TelemetryService {
  constructor(
    @InjectModel(Telemetry.name) private telemetryModel: Model<TelemetryDocument>,
  ) {}

  async create(createTelemetryDto: CreateTelemetryDto): Promise<Telemetry> {
    const createdTelemetry = new this.telemetryModel(createTelemetryDto);
    return createdTelemetry.save();
  }

  async findLatest(limit: number = 10): Promise<Telemetry[]> {
    return this.telemetryModel
      .find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .exec();
  }

  async findAll(): Promise<Telemetry[]> {
    return this.telemetryModel.find().sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<Telemetry> {
    return this.telemetryModel.findById(id).exec();
  }

  async remove(id: string): Promise<Telemetry> {
    return this.telemetryModel.findByIdAndDelete(id).exec();
  }
}
