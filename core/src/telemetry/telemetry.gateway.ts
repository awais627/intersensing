import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { TelemetryService } from './telemetry.service';
import { CreateTelemetryDto } from './dto/create-telemetry.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class TelemetryGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly telemetryService: TelemetryService) {}

  @SubscribeMessage('telemetry:new')
  async handleTelemetry(
    @MessageBody() createTelemetryDto: CreateTelemetryDto,
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    try {
      const telemetry = await this.telemetryService.create(createTelemetryDto);
      
      // Broadcast to all connected clients
      this.server.emit('telemetry:new', telemetry);
      
      // Send confirmation to the sender
      client.emit('telemetry:created', { success: true, data: telemetry });
    } catch (error) {
      client.emit('telemetry:error', { success: false, error: error.message });
    }
  }

  @SubscribeMessage('telemetry:subscribe')
  handleSubscribe(@ConnectedSocket() client: Socket): void {
    client.join('telemetry');
    client.emit('telemetry:subscribed', { success: true });
  }

  @SubscribeMessage('telemetry:unsubscribe')
  handleUnsubscribe(@ConnectedSocket() client: Socket): void {
    client.leave('telemetry');
    client.emit('telemetry:unsubscribed', { success: true });
  }

  // Method to broadcast telemetry updates to all connected clients
  broadcastTelemetryUpdate(telemetry: any): void {
    this.server.emit('telemetry:new', telemetry);
  }
}
