# WebSocket API Documentation

## 🔌 Overview

The IoT Telemetry Dashboard provides real-time data streaming via WebSocket connections using Socket.IO. This document details all available WebSocket events, connection methods, and usage examples.

## 🌐 Connection Details

### Connection URL
```
ws://localhost:9000/telemetry
```

### Transport Methods
- **WebSocket** (primary)
- **Polling** (fallback)

### Namespace
- **Default**: `/telemetry`

## 🔗 Connection Examples

### JavaScript/Node.js Client

```javascript
const io = require('socket.io-client');

// Connect to the telemetry namespace
const socket = io('http://localhost:9000/telemetry', {
  transports: ['websocket', 'polling'],
  autoConnect: true
});

// Connection event handlers
socket.on('connect', () => {
  console.log('Connected to telemetry WebSocket');
});

socket.on('disconnect', () => {
  console.log('Disconnected from telemetry WebSocket');
});

socket.on('connect_error', (error) => {
  console.error('Connection error:', error);
});
```

### Python Client

```python
import socketio

# Create Socket.IO client
sio = socketio.Client()

@sio.event
def connect():
    print('Connected to telemetry WebSocket')

@sio.event
def disconnect():
    print('Disconnected from telemetry WebSocket')

# Connect to the server
sio.connect('http://localhost:9000', namespaces=['/telemetry'])
```

### cURL (for testing)

```bash
# Install wscat for WebSocket testing
npm install -g wscat

# Connect to WebSocket
wscat -c ws://localhost:9000/telemetry
```

## 📡 WebSocket Events

### 1. Send Telemetry Data

**Event**: `telemetry:new`

Sends new telemetry data to all connected clients and saves it to the database.

#### Request Payload
```json
{
  "timestamp": "1654733331",
  "Temperature": 20.117,
  "Humidity": 52.81,
  "TVOC": 0,
  "eCO2": 400,
  "Raw H2": 12448,
  "Raw Ethanol": 19155,
  "Pressure": 939.758,
  "PM1.0": 0.0,
  "PM2.5": 0.0,
  "NC0.5": 0.0,
  "NC1.0": 0.0,
  "NC2.5": 0.0,
  "CNT": 8
}
```

#### Response Events

**Success Response** (`telemetry:created`):
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "timestamp": "1654733331",
    "Temperature": 20.117,
    "Humidity": 52.81,
    "TVOC": 0,
    "eCO2": 400,
    "Raw H2": 12448,
    "Raw Ethanol": 19155,
    "Pressure": 939.758,
    "PM1.0": 0.0,
    "PM2.5": 0.0,
    "NC0.5": 0.0,
    "NC1.0": 0.0,
    "NC2.5": 0.0,
    "CNT": 8,
    "createdAt": "2023-06-08T12:35:31.000Z",
    "updatedAt": "2023-06-08T12:35:31.000Z"
  },
  "message": "Telemetry data created and broadcast successfully"
}
```

**Error Response** (`telemetry:error`):
```json
{
  "success": false,
  "error": "Invalid telemetry data format",
  "message": "Failed to process telemetry data"
}
```

#### Usage Example

```javascript
// Send telemetry data
socket.emit('telemetry:new', {
  timestamp: Date.now().toString(),
  Temperature: 22.5,
  Humidity: 45.2,
  TVOC: 15,
  eCO2: 450,
  'Raw H2': 12000,
  'Raw Ethanol': 18000,
  Pressure: 950.5,
  'PM1.0': 2.1,
  'PM2.5': 3.5,
  'NC0.5': 5.2,
  'NC1.0': 3.8,
  'NC2.5': 2.1,
  CNT: 12
});

// Listen for response
socket.on('telemetry:created', (response) => {
  console.log('Telemetry created:', response.data);
});

socket.on('telemetry:error', (response) => {
  console.error('Telemetry error:', response.error);
});
```

### 2. Subscribe to Updates

**Event**: `telemetry:subscribe`

Subscribes the client to receive real-time telemetry data updates.

#### Request Payload
No payload required.

#### Response Event (`telemetry:subscribed`)
```json
{
  "success": true,
  "message": "Successfully subscribed to telemetry updates"
}
```

#### Usage Example

```javascript
// Subscribe to telemetry updates
socket.emit('telemetry:subscribe');

// Listen for subscription confirmation
socket.on('telemetry:subscribed', (response) => {
  console.log('Subscription status:', response.message);
});

// Listen for new telemetry data
socket.on('telemetry:new', (telemetryData) => {
  console.log('New telemetry received:', telemetryData);
  updateDashboard(telemetryData);
});
```

### 3. Unsubscribe from Updates

**Event**: `telemetry:unsubscribe`

Unsubscribes the client from receiving telemetry data updates.

#### Request Payload
No payload required.

#### Response Event (`telemetry:unsubscribed`)
```json
{
  "success": true,
  "message": "Successfully unsubscribed from telemetry updates"
}
```

#### Usage Example

```javascript
// Unsubscribe from telemetry updates
socket.emit('telemetry:unsubscribe');

// Listen for unsubscription confirmation
socket.on('telemetry:unsubscribed', (response) => {
  console.log('Unsubscription status:', response.message);
});
```

### 4. Receive Broadcast Updates

**Event**: `telemetry:new`

Received when new telemetry data is available (broadcast to all subscribers).

#### Payload
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "timestamp": "1654733331",
  "Temperature": 20.117,
  "Humidity": 52.81,
  "TVOC": 0,
  "eCO2": 400,
  "Raw H2": 12448,
  "Raw Ethanol": 19155,
  "Pressure": 939.758,
  "PM1.0": 0.0,
  "PM2.5": 0.0,
  "NC0.5": 0.0,
  "NC1.0": 0.0,
  "NC2.5": 0.0,
  "CNT": 8,
  "createdAt": "2023-06-08T12:35:31.000Z",
  "updatedAt": "2023-06-08T12:35:31.000Z"
}
```

## 🏗️ Architecture

### Socket.IO Rooms
- **`telemetry`**: All clients subscribed to telemetry updates
- **Automatic joining**: Clients are added to the room when subscribing
- **Automatic leaving**: Clients are removed from the room when unsubscribing

### Broadcasting
- **Server-side**: All connected clients receive `telemetry:new` events
- **Client-side**: Individual clients receive confirmation/error responses
- **Real-time**: Minimal latency for live data streaming

## 🔧 Implementation Examples

### Complete JavaScript Client

```javascript
class TelemetryWebSocketClient {
  constructor(url = 'http://localhost:9000') {
    this.socket = io(`${url}/telemetry`, {
      transports: ['websocket', 'polling'],
      autoConnect: true
    });
    
    this.setupEventHandlers();
  }

  setupEventHandlers() {
    this.socket.on('connect', () => {
      console.log('Connected to telemetry WebSocket');
      this.onConnect();
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from telemetry WebSocket');
      this.onDisconnect();
    });

    this.socket.on('telemetry:new', (data) => {
      this.onTelemetryUpdate(data);
    });

    this.socket.on('telemetry:created', (response) => {
      this.onTelemetryCreated(response);
    });

    this.socket.on('telemetry:error', (response) => {
      this.onTelemetryError(response);
    });
  }

  subscribe() {
    this.socket.emit('telemetry:subscribe');
  }

  unsubscribe() {
    this.socket.emit('telemetry:unsubscribe');
  }

  sendTelemetry(telemetryData) {
    this.socket.emit('telemetry:new', telemetryData);
  }

  disconnect() {
    this.socket.disconnect();
  }

  // Event handlers (override in subclass)
  onConnect() {}
  onDisconnect() {}
  onTelemetryUpdate(data) {}
  onTelemetryCreated(response) {}
  onTelemetryError(response) {}
}

// Usage
const client = new TelemetryWebSocketClient();

client.onTelemetryUpdate = (data) => {
  console.log('New telemetry data:', data);
  // Update your UI here
};

client.onTelemetryCreated = (response) => {
  console.log('Telemetry created successfully');
};

client.onTelemetryError = (response) => {
  console.error('Telemetry error:', response.error);
};

// Subscribe to updates
client.subscribe();
```

### React Hook Example

```javascript
import { useEffect, useState, useCallback } from 'react';
import { io } from 'socket.io-client';

export const useTelemetryWebSocket = (url = 'http://localhost:9000') => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [telemetryData, setTelemetryData] = useState([]);

  useEffect(() => {
    const newSocket = io(`${url}/telemetry`);
    setSocket(newSocket);

    newSocket.on('connect', () => {
      setIsConnected(true);
      console.log('Connected to telemetry WebSocket');
    });

    newSocket.on('disconnect', () => {
      setIsConnected(false);
      console.log('Disconnected from telemetry WebSocket');
    });

    newSocket.on('telemetry:new', (data) => {
      setTelemetryData(prev => [data, ...prev.slice(0, 9)]);
    });

    return () => {
      newSocket.close();
    };
  }, [url]);

  const subscribe = useCallback(() => {
    if (socket) {
      socket.emit('telemetry:subscribe');
    }
  }, [socket]);

  const unsubscribe = useCallback(() => {
    if (socket) {
      socket.emit('telemetry:unsubscribe');
    }
  }, [socket]);

  const sendTelemetry = useCallback((data) => {
    if (socket) {
      socket.emit('telemetry:new', data);
    }
  }, [socket]);

  return {
    socket,
    isConnected,
    telemetryData,
    subscribe,
    unsubscribe,
    sendTelemetry
  };
};
```

## 🧪 Testing

### Using wscat

```bash
# Install wscat
npm install -g wscat

# Connect to WebSocket
wscat -c ws://localhost:9000/telemetry

# Subscribe to updates
{"event": "telemetry:subscribe"}

# Send telemetry data
{"event": "telemetry:new", "data": {...}}

# Unsubscribe from updates
{"event": "telemetry:unsubscribe"}
```

### Using Postman

1. Create a new WebSocket request
2. Set URL to: `ws://localhost:9000/telemetry`
3. Connect to the WebSocket
4. Send messages in the format shown above

### Using Browser Console

```javascript
// Connect to WebSocket
const socket = io('http://localhost:9000/telemetry');

// Subscribe to updates
socket.emit('telemetry:subscribe');

// Listen for updates
socket.on('telemetry:new', (data) => {
  console.log('New telemetry:', data);
});

// Send test data
socket.emit('telemetry:new', {
  timestamp: Date.now().toString(),
  Temperature: 25.5,
  Humidity: 60.2,
  // ... other fields
});
```

## 🔒 Security Considerations

### CORS Configuration
- CORS is enabled for development
- Configure appropriate origins for production
- Consider implementing authentication for production use

### Input Validation
- All incoming data is validated using DTOs
- MongoDB injection protection through Mongoose
- Type checking and validation on all fields

### Rate Limiting
- Consider implementing rate limiting for production
- Monitor WebSocket connection limits
- Implement connection pooling for high-traffic scenarios

## 📈 Performance Tips

### Connection Management
- Use connection pooling for multiple clients
- Implement automatic reconnection logic
- Monitor connection health and performance

### Data Optimization
- Send only necessary data fields
- Implement data compression for large payloads
- Use efficient serialization formats

### Scalability
- Consider Redis for session storage
- Implement load balancing for multiple server instances
- Monitor WebSocket memory usage

## 🆘 Troubleshooting

### Common Issues

1. **Connection Refused**
   - Ensure backend is running on port 9000
   - Check firewall settings
   - Verify CORS configuration

2. **Events Not Received**
   - Check if client is subscribed to updates
   - Verify event names match exactly
   - Check browser console for errors

3. **Data Not Broadcasting**
   - Verify WebSocket gateway is properly configured
   - Check MongoDB connection
   - Review server logs for errors

### Debug Mode

Enable Socket.IO debug mode:

```javascript
// Client-side
const socket = io('http://localhost:9000/telemetry', {
  debug: true
});

// Server-side (in main.ts)
const app = await NestFactory.create(AppModule, {
  logger: ['debug', 'error', 'warn', 'log']
});
```

## 📚 Additional Resources

- [Socket.IO Documentation](https://socket.io/docs/v4/)
- [Socket.IO Rooms](https://socket.io/docs/v4/rooms/)
- [NestJS WebSockets](https://docs.nestjs.com/websockets/gateways)
- [WebSocket API Reference](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)

---

**Last Updated**: August 2024  
**Version**: 1.0  
**WebSocket URL**: `ws://localhost:9000/telemetry`
