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
      CNT: 8,
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

      // Broadcast to all connected clients
      this.server.emit("telemetry:new", telemetry);

      // Send confirmation to the sender
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

  // Method to broadcast telemetry updates to all connected clients
  broadcastTelemetryUpdate(telemetry: any): void {
    this.server.emit("telemetry:new", telemetry);
  }

  // Method to broadcast alerts to all connected clients
  broadcastAlert(alert: IAlert): void {
    this.server.emit("alert:new", {
      success: true,
      data: alert,
      message: `Alert triggered: ${alert.rule_id} - ${alert.sensor_type} ${alert.operator} ${alert.threshold}`,
      severity: alert.severity,
      timestamp: alert.triggered_at,
    });
  }

  // Method to get connected clients count
  getConnectedClientsCount(): number {
    return this.server.engine.clientsCount;
  }

  // Method to get clients in telemetry room
  getTelemetrySubscribersCount(): number {
    const room = this.server.sockets.adapter.rooms.get("telemetry");
    return room ? room.size : 0;
  }
}
