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
