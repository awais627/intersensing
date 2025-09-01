# MQTT Module

The MQTT module provides MQTT (Message Queuing Telemetry Transport) functionality for the IoT Telemetry Dashboard Backend. It handles real-time communication with IoT devices, processes telemetry data, and manages alerts.

## Features

- **MQTT Message Handling**: Processes incoming MQTT messages from IoT devices
- **Telemetry Processing**: Automatically saves and processes telemetry data
- **Alert Generation**: Automatically creates alerts based on telemetry thresholds
- **Message Publishing**: Publishes processed data and alerts to MQTT topics
- **Command Handling**: Processes commands sent to IoT devices
- **Status Monitoring**: Provides MQTT service status information

## Architecture

### Components

1. **MqttController**: Handles incoming MQTT messages and routes them to appropriate handlers
2. **MqttService**: Business logic for processing MQTT data and managing alerts
3. **DTOs**: Data Transfer Objects for message validation and structure

### Message Patterns

The module handles the following MQTT message patterns:

- `demo/topic` - Demo topic for testing
- `telemetry/+/+` - Telemetry data from IoT devices
- `alerts/+` - Alert messages
- `commands/+` - Command messages for IoT devices
- `status/request` - Service status requests

## Configuration

### Environment Variables

```bash
# MQTT Configuration
MQTT_HOST=mqtt://localhost:1883
MQTT_USERNAME=your_username
MQTT_PASSWORD=your_password
MQTT_CLIENT_ID=nestjs-mqtt-service
```

### MQTT Topics

- **Input Topics**:
  - `telemetry/{machineId}/{sensorType}` - Telemetry data
  - `alerts/{alertType}` - Alert notifications
  - `commands/{commandType}` - Device commands

- **Output Topics**:
  - `telemetry/processed` - Processed telemetry data
  - `alerts/broadcast` - Broadcast alerts to all subscribers

## Usage

### Basic Setup

```typescript
import { MqttModule } from './mqtt/mqtt.module';

@Module({
  imports: [MqttModule],
  // ... other module configuration
})
export class AppModule {}
```

### Publishing Messages

```typescript
import { MqttService } from './mqtt/mqtt.service';

@Injectable()
export class SomeService {
  constructor(private readonly mqttService: MqttService) {}

  async publishData() {
    await this.mqttService.publishTelemetry('telemetry/processed', telemetryData);
  }
}
```

### Message Handling

The module automatically handles incoming MQTT messages based on topic patterns:

1. **Telemetry Data**: Automatically saved to database and checked for alert conditions
2. **Alerts**: Processed and broadcast to all subscribers
3. **Commands**: Executed based on command type
4. **Status Requests**: Return service health information

## Alert Thresholds

The module automatically creates alerts when telemetry values exceed thresholds:

- **Temperature**: > 30°C (HIGH severity)
- **Humidity**: > 80% (MEDIUM severity)
- **Pressure**: < 900 hPa or > 1100 hPa (MEDIUM severity)

## Error Handling

- Comprehensive error logging for all operations
- Graceful fallback for failed operations
- Connection status monitoring
- Automatic MQTT client cleanup on module destruction

## Dependencies

- `@nestjs/microservices` - MQTT transport support
- `TelemetryService` - Data persistence
- `AlertsService` - Alert management
- `CommonModule` - Shared utilities and services

## Testing

### Manual Testing

1. Start the application
2. Connect an MQTT client to the configured broker
3. Publish messages to test topics
4. Verify data processing and alert generation

### Example MQTT Messages

**Telemetry Data**:
```json
{
  "timestamp": "1654733331",
  "Temperature": 25.5,
  "Humidity": 60.2,
  "Pressure": 1013.25,
  "machineId": 1
}
```

**Alert**:
```json
{
  "type": "TEMPERATURE_HIGH",
  "severity": "HIGH",
  "message": "High temperature detected: 35°C",
  "machineId": 1,
  "timestamp": "1654733331"
}
```

**Command**:
```json
{
  "command": "RESTART_MACHINE",
  "machineId": 1,
  "parameters": { "delay": 5000 }
}
```

## Troubleshooting

### Common Issues

1. **Connection Failed**: Check MQTT broker configuration and credentials
2. **Message Not Processed**: Verify topic patterns match expected format
3. **Alerts Not Generated**: Check telemetry data format and threshold values

### Logs

The module provides detailed logging for all operations:
- 📡 MQTT message reception
- 💾 Data processing
- 🚨 Alert generation
- ❌ Error conditions
- 🔌 Connection status

## Future Enhancements

- MQTT QoS configuration
- Message persistence and replay
- Advanced topic filtering
- MQTT over WebSocket support
- Message encryption and authentication
