## 🔌 WebSocket Events

### Connection Details

**WebSocket URL**: `ws://localhost:9000/telemetry`  
**Namespace**: `/telemetry`  
**Transport Methods**: WebSocket (primary), Polling (fallback)

### Connection Examples

#### JavaScript/Node.js Client
```javascript
const io = require('socket.io-client');

const socket = io('http://localhost:9000/telemetry', {
  transports: ['websocket', 'polling'],
  autoConnect: true
});

socket.on('connect', () => {
  console.log('Connected to telemetry WebSocket');
});
```

#### Python Client
```python
import socketio

sio = socketio.Client()
sio.connect('http://localhost:9000', namespaces=['/telemetry'])
```

#### Testing with wscat
```bash
npm install -g wscat
wscat -c ws://localhost:9000/telemetry
```

### WebSocket Events

#### 1. Send Telemetry Data

**Event**: `telemetry:new`

Sends new telemetry data to all connected clients and saves it to the database.

**Request Payload**:
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

**Response Events**:
- `telemetry:created`: Success confirmation with created data
- `telemetry:error`: Error notification with error details

#### 2. Subscribe to Updates

**Event**: `telemetry:subscribe`

Subscribes the client to receive real-time telemetry data updates.

**Response Event**: `telemetry:subscribed`

#### 3. Unsubscribe from Updates

**Event**: `telemetry:unsubscribe`

Unsubscribes the client from receiving telemetry data updates.

**Response Event**: `telemetry:unsubscribed`

#### 4. Receive Updates

**Event**: `telemetry:new`

Received when new telemetry data is available (broadcast to all subscribers).

### Complete WebSocket Example

```javascript
const socket = io('http://localhost:9000/telemetry');

// Subscribe to updates
socket.emit('telemetry:subscribe');

// Listen for new telemetry data
socket.on('telemetry:new', (data) => {
  console.log('New telemetry received:', data);
  updateDashboard(data);
});

// Send telemetry data
socket.emit('telemetry:new', {
  timestamp: Date.now().toString(),
  Temperature: 22.5,
  Humidity: 45.2,
  // ... other fields
});

// Listen for responses
socket.on('telemetry:created', (response) => {
  console.log('Telemetry created:', response.data);
});

socket.on('telemetry:error', (response) => {
  console.error('Telemetry error:', response.error);
});
```

### WebSocket Architecture

- **Socket.IO Rooms**: Clients are automatically added to the `telemetry` room when subscribing
- **Real-time Broadcasting**: All connected clients receive `telemetry:new` events
- **Individual Responses**: Clients receive confirmation/error responses for their own requests
- **Automatic Fallback**: Falls back to polling if WebSocket connection fails

For detailed WebSocket documentation, see: **`WEBSOCKET_DOCUMENTATION.md`**
