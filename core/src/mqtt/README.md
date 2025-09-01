# MQTT Module

The MQTT module provides MQTT (Message Queuing Telemetry Transport) functionality for the IoT Telemetry Dashboard Backend. It handles real-time communication with IoT devices, processes telemetry data, and manages alerts.

## Features

- **MQTT Message Handling**: Processes incoming MQTT messages from IoT devices
- **Telemetry Processing**: Automatically saves and processes telemetry data
- **Alert Generation**: Automatically creates alerts based on telemetry thresholds
- **Message Publishing**: Publishes processed data and alerts to MQTT topics
- **Command Handling**: Processes commands sent to IoT devices
- **Status Monitoring**: Provides MQTT service health information

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
# MQTT Configuration (configured in main.ts)
MQTT_HOST=mqtts://9bc811871bbb400281764a67bbfc77b9.s1.eu.hivemq.cloud:8883
MQTT_USERNAME=hivemq.webclient.1756719842910
MQTT_PASSWORD=IH#.rGN7,f04wLpJcx9?
MQTT_CLIENT_ID=nestjs-mqtt-backend
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

## Testing

### Prerequisites

Install MQTT CLI tools:
```bash
# macOS
brew install mosquitto

# Ubuntu/Debian
sudo apt-get install mosquitto-clients

# Windows (with chocolatey)
choco install mosquitto
```

### Test Commands

#### 1. Test Demo Topic
```bash
mosquitto_pub -h 9bc811871bbb400281764a67bbfc77b9.s1.eu.hivemq.cloud \
  -p 8883 \
  -u hivemq.webclient.1756719842910 \
  -P "IH#.rGN7,f04wLpJcx9?" \
  -t "demo/topic" \
  -m '{"test": "Hello MQTT!"}' \
  --insecure
```

#### 2. Test Telemetry Data
```bash
mosquitto_pub -h 9bc811871bbb400281764a67bbfc77b9.s1.eu.hivemq.cloud \
  -p 8883 \
  -u hivemq.webclient.1756719842910 \
  -P "IH#.rGN7,f04wLpJcx9?" \
  -t "telemetry/1/temperature" \
  -m '{
    "timestamp": "1654733331",
    "Temperature": 35.5,
    "Humidity": 75.2,
    "TVOC": 0,
    "eCO2": 400,
    "Raw H2": 12448,
    "Raw Ethanol": 19155,
    "Pressure": 950.5,
    "PM1.0": 0.0,
    "PM2.5": 0.0,
    "NC0.5": 0.0,
    "NC1.0": 0.0,
    "NC2.5": 0.0,
    "machineId": 1
  }' \
  --insecure
```

#### 3. Test Alert Generation (High Temperature)
```bash
mosquitto_pub -h 9bc811871bbb400281764a67bbfc77b9.s1.eu.hivemq.cloud \
  -p 8883 \
  -u hivemq.webclient.1756719842910 \
  -P "IH#.rGN7,f04wLpJcx9?" \
  -t "telemetry/2/alert" \
  -m '{
    "timestamp": "1654733331",
    "Temperature": 38.5,
    "Humidity": 90.2,
    "TVOC": 0,
    "eCO2": 400,
    "Raw H2": 12448,
    "Raw Ethanol": 19155,
    "Pressure": 850.5,
    "PM1.0": 0.0,
    "PM2.5": 0.0,
    "NC0.5": 0.0,
    "NC1.0": 0.0,
    "NC2.5": 0.0,
    "machineId": 2
  }' \
  --insecure
```

#### 4. Test Alert Messages
```bash
mosquitto_pub -h 9bc811871bbb400281764a67bbfc77b9.s1.eu.hivemq.cloud \
  -p 8883 \
  -u hivemq.webclient.1756719842910 \
  -P "IH#.rGN7,f04wLpJcx9?" \
  -t "alerts/system" \
  -m '{
    "type": "SYSTEM_ERROR",
    "severity": "HIGH",
    "message": "System failure detected",
    "machineId": 1,
    "timestamp": "1654733331"
  }' \
  --insecure
```

#### 5. Test Command Messages
```bash
mosquitto_pub -h 9bc811871bbb400281764a67bbfc77b9.s1.eu.hivemq.cloud \
  -p 8883 \
  -u hivemq.webclient.1756719842910 \
  -P "IH#.rGN7,f04wLpJcx9?" \
  -t "commands/restart" \
  -m '{
    "command": "RESTART_MACHINE",
    "machineId": 1,
    "parameters": {"delay": 5000}
  }' \
  --insecure
```

#### 6. Test Status Request
```bash
mosquitto_pub -h 9bc811871bbb400281764a67bbfc77b9.s1.eu.hivemq.cloud \
  -p 8883 \
  -u hivemq.webclient.1756719842910 \
  -P "IH#.rGN7,f04wLpJcx9?" \
  -t "status/request" \
  -m '{}' \
  --insecure
```

### Expected Backend Logs

When testing, you should see logs like:

```
🔌 MQTT Microservice started and listening
📡 MQTT Microservice: Connected to HiveMQ Cloud
📡 Received on demo/topic: { test: 'Hello MQTT!' }
📡 Received telemetry on telemetry/1/temperature: { timestamp: '1654733331', ... }
💾 Saved telemetry data for machine 1
🚨 Created alert: TEMPERATURE_HIGH for machine 1
✅ Telemetry data processed successfully for machine 1
```

### Quick Test Commands

**Simple telemetry test:**
```bash
mosquitto_pub -h 9bc811871bbb400281764a67bbfc77b9.s1.eu.hivemq.cloud \
  -p 8883 \
  -u hivemq.webclient.1756719842910 \
  -P "IH#.rGN7,f04wLpJcx9?" \
  -t "telemetry/1/test" \
  -m '{"timestamp":"1654733331","Temperature":30.5,"Humidity":70.0,"TVOC":0,"eCO2":400,"Raw H2":12448,"Raw Ethanol":19155,"Pressure":1000.0,"PM1.0":0.0,"PM2.5":0.0,"NC0.5":0.0,"NC1.0":0.0,"NC2.5":0.0,"machineId":1}' \
  --insecure
```

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

## Troubleshooting

### Common Issues

1. **Connection Failed**: Check MQTT broker configuration and credentials
2. **Message Not Processed**: Verify topic patterns match expected format
3. **Alerts Not Generated**: Check telemetry data format and threshold values
4. **No Backend Logs**: Ensure backend is running and MQTT microservice is started

### SSL/TLS Issues

If you encounter SSL certificate issues, use the `--insecure` flag for testing:
```bash
mosquitto_pub --insecure -h ... -t ... -m ...
```

### Connection Status

Check if the MQTT microservice is running by looking for these logs:
```
🔌 MQTT Microservice started and listening
📡 MQTT Microservice: Connected to HiveMQ Cloud
```

## Future Enhancements

- MQTT QoS configuration
- Message persistence and replay
- Advanced topic filtering
- MQTT over WebSocket support
- Message encryption and authentication
- Real-time connection monitoring
- Message rate limiting
- Topic-based access control
