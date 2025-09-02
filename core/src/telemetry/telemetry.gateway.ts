import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { ApiOperation, ApiProperty, ApiTags } from "@nestjs/swagger";
import { CreateTelemetryDto } from "./dto/create-telemetry.dto";
import { TelemetryService } from "../common/common/src/services/telemetry.service";
import { ITelemetry } from "../common/interfaces/telemetry";
import { IAlert } from "../common/interfaces/alert";

// WebSocket event DTOs for comprehensive documentation
export class WebSocketTelemetryEvent {
  @ApiProperty({
    description: "Telemetry data to be sent via WebSocket",
    type: CreateTelemetryDto,
    example: {
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
      machineId: "sn-sd005",
    },
  })
  data: CreateTelemetryDto;
}

export class WebSocketResponse {
  @ApiProperty({
    description: "Success status of the WebSocket operation",
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: "Response data or error message",
    example: "Operation completed successfully",
  })
  message: string;
}

export class WebSocketTelemetryCreatedEvent {
  @ApiProperty({
    description: "Success status of telemetry creation",
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: "Created telemetry data",
    type: CreateTelemetryDto,
  })
  data: CreateTelemetryDto;

  @ApiProperty({
    description: "Success message",
    example: "Telemetry data created and broadcast successfully",
  })
  message: string;
}

export class WebSocketTelemetryErrorEvent {
  @ApiProperty({
    description: "Success status (always false for errors)",
    example: false,
  })
  success: boolean;

  @ApiProperty({
    description: "Error message describing what went wrong",
    example: "Invalid telemetry data format",
  })
  error: string;

  @ApiProperty({
    description: "Error details message",
    example: "Failed to process telemetry data",
  })
  message: string;
}

export class WebSocketSubscriptionEvent {
  @ApiProperty({
    description: "Success status of subscription operation",
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: "Subscription status message",
    example: "Successfully subscribed to telemetry updates",
  })
  message: string;
}

@ApiTags("websocket")
@WebSocketGateway({
  cors: {
    origin: "*",
  },
  namespace: "/telemetry",
  transports: ["websocket", "polling"],
})
export class TelemetryGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly telemetryService: TelemetryService) {}

  handleConnection(client: Socket) {
    // console.log(`🔌 Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    // console.log(`🔌 Client disconnected: ${client.id}`);
  }

  @SubscribeMessage("telemetry:new")
  @ApiOperation({
    summary: "Send new telemetry data via WebSocket",
    description:
      "Sends new telemetry data to all connected clients and saves it to the database. This event is used to broadcast real-time IoT sensor data to all subscribers.",
    externalDocs: {
      description: "Learn more about WebSocket events",
      url: "https://socket.io/docs/v4/",
    },
  })
  async handleTelemetry(
    @MessageBody() createTelemetryDto: ITelemetry,
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    try {
      const telemetry = await this.telemetryService.create(createTelemetryDto);

      this.server.emit("telemetry:new", telemetry);

      client.emit("telemetry:created", {
        success: true,
        data: telemetry,
        message: "Telemetry data created and broadcast successfully",
      });
    } catch (error) {
      client.emit("telemetry:error", {
        success: false,
        error: error.message,
        message: "Failed to process telemetry data",
      });
    }
  }

  @SubscribeMessage("telemetry:subscribe")
  @ApiOperation({
    summary: "Subscribe to telemetry updates",
    description:
      'Subscribes the client to receive real-time telemetry data updates. After subscribing, the client will receive all new telemetry data via the "telemetry:new" event.',
    externalDocs: {
      description: "Socket.IO rooms documentation",
      url: "https://socket.io/docs/v4/rooms/",
    },
  })
  handleSubscribe(@ConnectedSocket() client: Socket): void {
    client.join("telemetry");
    client.emit("telemetry:subscribed", {
      success: true,
      message: "Successfully subscribed to telemetry updates",
    });
  }

  @SubscribeMessage("telemetry:unsubscribe")
  @ApiOperation({
    summary: "Unsubscribe from telemetry updates",
    description:
      'Unsubscribes the client from receiving telemetry data updates. The client will no longer receive "telemetry:new" events.',
    externalDocs: {
      description: "Socket.IO rooms documentation",
      url: "https://socket.io/docs/v4/rooms/",
    },
  })
  handleUnsubscribe(@ConnectedSocket() client: Socket): void {
    client.leave("telemetry");
    client.emit("telemetry:unsubscribed", {
      success: true,
      message: "Successfully unsubscribed from telemetry updates",
    });
  }

  broadcastTelemetryUpdate(telemetry: any): void {
    this.server.emit("telemetry:new", { data: telemetry });
  }

  broadcastAlert(alert: IAlert): void {
    // console.log('🚨 Broadcasting alert via WebSocket:', {
    //   alertId: alert._id,
    //   severity: alert.severity,
    //   sensorType: alert.sensor_type,
    //   connectedClients: this.getConnectedClientsCount()
    // });
    
    this.server.emit("alert:new", {
      success: true,
      data: alert,
      message: `Alert triggered: ${alert.sensor_type} deviation of ${alert.deviation_percentage}% (${alert.deviation_type}) - Severity: ${alert.severity}`,
      severity: alert.severity,
      timestamp: alert.triggered_at,
    });
    
    // console.log('✅ Alert broadcast completed');
  }

  getConnectedClientsCount(): number {
    try {
      return this.server.engine.clientsCount || 0;
    } catch (error) {
      return 0;
    }
  }

  getTelemetrySubscribersCount(): number {
    const room = this.server.sockets.adapter.rooms.get("telemetry");
    return room ? room.size : 0;
  }
}
