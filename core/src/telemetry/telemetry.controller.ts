import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
} from '@nestjs/common';
import { TelemetryService } from './telemetry.service';
import { CreateTelemetryDto } from './dto/create-telemetry.dto';
import { Telemetry } from './schemas/telemetry.schema';

@Controller('api/telemetry')
export class TelemetryController {
  constructor(private readonly telemetryService: TelemetryService) {}

  @Post()
  async create(@Body() createTelemetryDto: CreateTelemetryDto): Promise<Telemetry> {
    return this.telemetryService.create(createTelemetryDto);
  }

  @Post('mock')
  async createMock(): Promise<Telemetry> {
    const mockData: CreateTelemetryDto = {
      timestamp: Date.now().toString(),
      Temperature: 20 + Math.random() * 10,
      Humidity: 40 + Math.random() * 30,
      TVOC: Math.floor(Math.random() * 100),
      eCO2: 400 + Math.floor(Math.random() * 200),
      'Raw H2': 10000 + Math.floor(Math.random() * 5000),
      'Raw Ethanol': 15000 + Math.floor(Math.random() * 8000),
      Pressure: 900 + Math.random() * 100,
      'PM1.0': Math.random() * 10,
      'PM2.5': Math.random() * 15,
      'NC0.5': Math.random() * 20,
      'NC1.0': Math.random() * 15,
      'NC2.5': Math.random() * 10,
      CNT: Math.floor(Math.random() * 20),
    };
    return this.telemetryService.create(mockData);
  }

  @Get('latest')
  async findLatest(): Promise<Telemetry[]> {
    return this.telemetryService.findLatest(10);
  }

  @Get()
  async findAll(): Promise<Telemetry[]> {
    return this.telemetryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Telemetry> {
    return this.telemetryService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Telemetry> {
    return this.telemetryService.remove(id);
  }
}
