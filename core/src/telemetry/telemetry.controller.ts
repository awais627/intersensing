import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiQuery,
} from "@nestjs/swagger";
import { CreateTelemetryDto } from "./dto/create-telemetry.dto";
import { TelemetryResponseDto } from "./dto/telemetry-response.dto";
import { TelemetryService } from "../common/common/src/services/telemetry.service";
import { ITelemetry, MachineCount } from "../common/interfaces/telemetry";
import { generateId } from "../common/utils";

@ApiTags("telemetry")
@Controller("api/telemetry")
export class TelemetryController {
  constructor(private readonly telemetryService: TelemetryService) {}

  @Post()
  @ApiOperation({
    summary: "Create new telemetry record",
    description:
      "Creates a new IoT telemetry data record with all sensor readings",
  })
  @ApiBody({
    type: CreateTelemetryDto,
    description: "Telemetry data from IoT device",
    examples: {
      sample: {
        summary: "Sample IoT Data",
        description: "A typical IoT device telemetry payload",
        value: {
          timestamp: "1654733331",
          Temperature: 20.117,
          Humidity: 52.81,
          TVOC: 0,
          eCO2: 400,
          "Raw H2": 12448,
          "Raw Ethanol": 19155,
          Pressure: 939.758,
          "PM1.0": 0.0,
          "PM2.5": 0.0,
          "NC0.5": 0.0,
          "NC1.0": 0.0,
          "NC2.5": 0.0,
          machineId: 3,
        },
      },
    },
  })
  @ApiCreatedResponse({
    description: "Telemetry record created successfully",
    type: TelemetryResponseDto,
  })
  @ApiBadRequestResponse({
    description: "Invalid input data or validation errors",
  })
  @ApiInternalServerErrorResponse({
    description: "Internal server error occurred",
  })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createTelemetryDto: ITelemetry) {
    return this.telemetryService.create(createTelemetryDto);
  }

  @Post("mock")
  @ApiOperation({
    summary: "Generate mock telemetry data",
    description:
      "Creates and saves a mock telemetry record with realistic sensor values for testing purposes",
  })
  @ApiCreatedResponse({
    description: "Mock telemetry data generated successfully",
    type: TelemetryResponseDto,
  })
  @ApiInternalServerErrorResponse({
    description: "Internal server error occurred",
  })
  @HttpCode(HttpStatus.CREATED)
  async createMock() {
    const mockData: ITelemetry = {
      id: generateId("tele"),
      timestamp: Date.now().toString(),
      Temperature: 20 + Math.random() * 10,
      Humidity: 40 + Math.random() * 30,
      TVOC: Math.floor(Math.random() * 100),
      eCO2: 400 + Math.floor(Math.random() * 200),
      "Raw H2": 10000 + Math.floor(Math.random() * 5000),
      "Raw Ethanol": 15000 + Math.floor(Math.random() * 8000),
      Pressure: 900 + Math.random() * 100,
      "PM1.0": Math.random() * 10,
      "PM2.5": Math.random() * 15,
      "NC0.5": Math.random() * 20,
      "NC1.0": Math.random() * 15,
      "NC2.5": Math.random() * 10,
      createdAt: new Date(),
      updatedAt: new Date(),
      machineId: `sn-sd${String(Math.floor(Math.random() * 5) + 1).padStart(3, "0")}`,

    };
    return this.telemetryService.create(mockData);
  }

  @Get("latest")
  @ApiOperation({
    summary: "Get latest telemetry records",
    description:
      "Retrieves the 10 most recent telemetry records from the database",
  })
  @ApiOkResponse({
    description: "Latest telemetry records retrieved successfully",
    type: [TelemetryResponseDto],
  })
  @ApiInternalServerErrorResponse({
    description: "Internal server error occurred",
  })
  async findLatest(): Promise<ITelemetry[]> {
    return this.telemetryService.findLatest(10);
  }

  @Get()
  @ApiOperation({
    summary: "Get all telemetry records",
    description:
      "Retrieves all telemetry records from the database, sorted by creation date (newest first)",
  })
  @ApiOkResponse({
    description: "All telemetry records retrieved successfully",
    type: [TelemetryResponseDto],
  })
  @ApiInternalServerErrorResponse({
    description: "Internal server error occurred",
  })
  async findAll(): Promise<ITelemetry[]> {
    return this.telemetryService.findAll();
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get telemetry record by ID",
    description:
      "Retrieves a specific telemetry record using its unique identifier",
  })
  @ApiParam({
    name: "id",
    description: "Unique identifier of the telemetry record",
    example: "507f1f77bcf86cd799439011",
  })
  @ApiOkResponse({
    description: "Telemetry record retrieved successfully",
    type: TelemetryResponseDto,
  })
  @ApiNotFoundResponse({
    description: "Telemetry record not found",
  })
  @ApiBadRequestResponse({
    description: "Invalid ID format",
  })
  async findOne(@Param("id") id: string): Promise<ITelemetry> {
    return this.telemetryService.findOne(id);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete telemetry record",
    description: "Removes a specific telemetry record from the database",
  })
  @ApiParam({
    name: "id",
    description: "Unique identifier of the telemetry record to delete",
    example: "507f1f77bcf86cd799439011",
  })
  @ApiOkResponse({
    description: "Telemetry record deleted successfully",
    type: TelemetryResponseDto,
  })
  @ApiNotFoundResponse({
    description: "Telemetry record not found",
  })
  @ApiBadRequestResponse({
    description: "Invalid ID format",
  })
  @HttpCode(HttpStatus.OK)
  async remove(@Param("id") id: string) {
    return this.telemetryService.remove(id);
  }
  // Define return type


  @Get("count/by-machine")
  @ApiOperation({
    summary: "Get telemetry counts per machine",
    description:
      "Returns the number of telemetry records per machine. If machineIds are provided, filters by those IDs; otherwise, returns counts for all machines.",
  })
  @ApiQuery({
    name: "machineIds",
    description: "Comma-separated list of machine IDs. Optional — if not provided, counts for all machines will be returned.",
    example: "sn-sd001,sn-sd004",
    required: false,
  })
  @ApiQuery({
    name: "start",
    description: "Start date/time (ISO 8601 or timestamp) for filtering",
    example: "2025-08-01T00:00:00Z",
    required: false,
  })
  @ApiQuery({
    name: "end",
    description: "End date/time (ISO 8601 or timestamp) for filtering",
    example: "2025-08-28T23:59:59Z",
    required: false,
  })
  @ApiOkResponse({
    description: "Counts retrieved successfully",
    schema: {
      example: [
        { machineId: "sn-sd001", count: 28 },
        { machineId: "sn-sd004", count: 12 }
      ]
    },
  })
  @ApiBadRequestResponse({
    description: "Invalid query parameters",
  })
  async getCountsByMachine(
    @Query("machineIds") machineIds?: string,
    @Query("start") start?: string,
    @Query("end") end?: string
  ): Promise<MachineCount[]> {
    return this.telemetryService.getCountsByMachine(machineIds, start, end);
  }
}


