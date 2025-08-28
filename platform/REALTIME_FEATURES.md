# Real-Time Telemetry Dashboard Features

## Overview
The telemetry dashboard has been enhanced with real-time WebSocket functionality to provide live updates for both telemetry data and alerts.

## Features Implemented

### 1. Real-Time Telemetry Data
- **WebSocket Connection**: Connects to `http://localhost:9000/telemetry` namespace
- **Live Updates**: Receives `telemetry:new` events and updates dashboard in real-time
- **Data Persistence**: Keeps last 20 telemetry readings for trend analysis
- **Auto-refresh**: Dashboard automatically updates when new data arrives

### 2. Real-Time Alert System
- **Alert Notifications**: Shows toast notifications for new alerts
- **Severity-based Styling**: Different colors for critical, high, medium, low, and warning alerts
- **Auto-dismiss**: Notifications automatically disappear after 10 seconds
- **Alert Counter**: Displays active alert count in the header

### 3. Enhanced Dashboard Components

#### Real-Time Temperature Trend
- Shows live temperature measurements
- Color-coded by temperature ranges (Green: Optimal, Yellow: Warm, Red: Hot)
- Updates automatically with new data

#### Real-Time Humidity Trend
- Displays live humidity measurements
- Color-coded by humidity levels (Green: Optimal, Yellow: Low, Red: High)
- Real-time updates

#### Active Alerts by Sensor
- Replaces the previous "Air Quality (eCO2) Trend" chart
- Shows alerts grouped by sensor type
- Color-coded by severity level
- Real-time updates when new alerts are triggered

### 4. WebSocket Events

#### Client to Server
- `telemetry:subscribe` - Subscribe to telemetry updates
- `telemetry:unsubscribe` - Unsubscribe from telemetry updates
- `telemetry:new` - Send new telemetry data

#### Server to Client
- `telemetry:new` - New telemetry data received
- `alert:new` - New alert triggered
- `telemetry:created` - Confirmation of telemetry creation
- `telemetry:error` - Error in telemetry processing
- `telemetry:subscribed` - Confirmation of subscription
- `telemetry:unsubscribed` - Confirmation of unsubscription

## Technical Implementation

### Frontend Components
- **AlertNotification**: Toast-style notification component for alerts
- **useTelemetry Hook**: Enhanced with real-time WebSocket support
- **SocketService**: Manages WebSocket connections and event handling

### Backend Integration
- **TelemetryGateway**: Handles WebSocket connections and broadcasts
- **Alert Broadcasting**: Automatically sends alerts to all connected clients
- **Real-time Updates**: Broadcasts telemetry data to all subscribers

### Data Flow
1. IoT device sends telemetry data via WebSocket
2. Backend processes and stores the data
3. Backend broadcasts `telemetry:new` event to all clients
4. Frontend receives event and updates dashboard
5. If alert conditions are met, backend broadcasts `alert:new` event
6. Frontend shows notification and updates alert charts

## Usage

### Testing WebSocket Connection
1. Open `test-websocket.html` in a browser
2. Verify connection status shows "Connected to WebSocket"
3. Use "Send Test Telemetry" button to simulate data
4. Use "Send Test Alert" button to simulate alerts

### Accessing the Dashboard
1. Navigate to `http://localhost:3000/telemetry`
2. Ensure backend is running on `http://localhost:9000`
3. Dashboard will automatically connect to WebSocket
4. Real-time updates will begin immediately

### Alert Severity Levels
- **Critical**: Red - Immediate attention required
- **High**: Orange - High priority
- **Medium**: Yellow - Medium priority
- **Low**: Blue - Low priority
- **Warning**: Yellow - Warning level

## Configuration

### WebSocket URL
- Default: `http://localhost:9000/telemetry`
- Configurable in `platform/src/services/socket.ts`

### Notification Settings
- Auto-dismiss timeout: 10 seconds
- Maximum notifications: Unlimited (auto-managed)
- Position: Top-right corner

### Data Retention
- Telemetry data: Last 20 readings
- Alert data: Last 10 alerts
- Real-time updates: Immediate

## Troubleshooting

### Connection Issues
1. Ensure backend is running on port 9000
2. Check CORS settings in backend
3. Verify WebSocket namespace `/telemetry`

### No Real-time Updates
1. Check browser console for WebSocket errors
2. Verify subscription to `telemetry:new` events
3. Check backend logs for connection issues

### Alerts Not Showing
1. Verify `alert:new` event subscription
2. Check alert data format
3. Ensure notification component is rendered

## Future Enhancements
- Persistent notification settings
- Customizable alert thresholds
- Historical alert analysis
- Real-time chart animations
- WebSocket connection status indicators
