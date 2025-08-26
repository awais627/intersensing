# IoT Telemetry Dashboard Backend

A NestJS backend for IoT telemetry data with real-time WebSocket updates.

## Features

- REST API endpoints for telemetry data
- WebSocket support for real-time updates
- MongoDB integration for data persistence
- Mock data generation for testing

## API Endpoints

### REST API

- `POST /api/telemetry` - Create new telemetry record
- `POST /api/telemetry/mock` - Generate and save mock telemetry data
- `GET /api/telemetry/latest` - Get latest 10 telemetry records
- `GET /api/telemetry` - Get all telemetry records
- `GET /api/telemetry/:id` - Get specific telemetry record
- `DELETE /api/telemetry/:id` - Delete telemetry record

### WebSocket Events

- `telemetry:new` - Send new telemetry data
- `telemetry:subscribe` - Subscribe to telemetry updates
- `telemetry:unsubscribe` - Unsubscribe from updates

## API Documentation

### Interactive Swagger UI
Access the complete API documentation at: **`http://localhost:9000/api/docs`**

The Swagger UI provides:
- Interactive API testing
- Request/response schemas
- Example data and responses
- Error code documentation
- **WebSocket event documentation**
- Data model validation

### API Documentation Files
- **`API_DOCUMENTATION.md`**: Comprehensive API reference
- **`WEBSOCKET_DOCUMENTATION.md`**: Detailed WebSocket API guide
- **`README.md`**: Backend setup and Swagger guide
- **Swagger UI**: Interactive documentation and testing

## WebSocket Support

### Real-time Data Streaming
The backend provides real-time IoT data streaming via WebSocket connections using Socket.IO.

### WebSocket Features
- **Real-time broadcasting** of telemetry data
- **Automatic room management** for subscribers
- **Fallback transport** (WebSocket + Polling)
- **Comprehensive event documentation**
- **Error handling** and response confirmation

### WebSocket Events
- `telemetry:new` - Send/receive telemetry data
- `telemetry:subscribe` - Subscribe to updates
- `telemetry:unsubscribe` - Unsubscribe from updates

### Connection Details
- **URL**: `ws://localhost:9000/telemetry`
- **Namespace**: `/telemetry`
- **Transport**: WebSocket (primary), Polling (fallback)

### Testing WebSocket
```bash
# Test WebSocket functionality
./test-websocket.sh

# Or use wscat directly
wscat -c ws://localhost:9000/telemetry
```

For complete WebSocket documentation, see: **`WEBSOCKET_DOCUMENTATION.md`**

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp env.example .env
   # Edit .env with your MongoDB connection string
   ```

3. Start MongoDB (make sure MongoDB is running)

4. Run the application:
   ```bash
   # Development mode
   npm run start:dev
   
   # Production mode
   npm run build
   npm run start:prod
   ```

## Data Model

The telemetry data includes:
- Temperature (°C)
- Humidity (%)
- TVOC (ppb)
- eCO2 (ppm)
- Raw H2
- Raw Ethanol
- Pressure (hPa)
- PM1.0, PM2.5 (μg/m³)
- NC0.5, NC1.0, NC2.5 (particles/cm³)
- CNT (count)

## Testing

Use the mock endpoint to generate test data:
```bash
curl -X POST http://localhost:9000/api/telemetry/mock
```
