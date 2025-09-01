# Intersensing IoT Platform 

A comprehensive IoT telemetry monitoring and alerting platform with real-time data processing, MQTT integration, intelligent alert management, and comprehensive analytics.

## 🏗️ Architecture

- **Backend**: NestJS + MQTT Microservices + Socket.IO + MongoDB + Redis + Bull Queues + **Swagger/OpenAPI** (in `core/` directory)
- **Frontend**: React + TypeScript + Tailwind CSS + Nivo Charts + Socket.IO Client (in `platform/` directory)
- **Queue System**: Redis + Bull for background job processing
- **Real-time**: WebSocket connections for live updates
- **MQTT Integration**: HiveMQ Cloud for IoT device communication

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ 
- MongoDB running locally or MongoDB Atlas connection
- Redis server (local or cloud) for queue management
- npm or yarn
- **Optional**: MQTT broker (HiveMQ Cloud configured by default)

### Using the Start Script (Recommended)

The easiest way to start the entire platform:

```bash
# Make the script executable
chmod +x start.sh

# Start all services
./start.sh
```

This script will:
- Pull latest changes from Git
- Install dependencies for both frontend and backend
- Build the platform
- Start Redis if configured
- Start the backend with production settings
- Serve the frontend on port 3000

### Manual Setup

#### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd core
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

4. **Start Redis** (for queue management):
   ```bash
   # Using Docker Compose (recommended)
   docker-compose -f docker-compose.local.yml up -d
   
   # Or install locally
   # macOS with Homebrew
   brew install redis
   brew services start redis
   ```

5. **Start MongoDB** (if not using cloud):
   ```bash
   # macOS with Homebrew
   brew services start mongodb-community
   
   # Or manually
   mongod --dbpath /usr/local/var/mongodb
   ```

6. **Start the backend:**
   ```bash
   # Development mode
   npm run start:dev
   
   # Production mode
   npm run build
   npm run start:prod
   ```

The backend will start on `http://localhost:9000`

#### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd platform
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the frontend:**
   ```bash
   # Development mode
   npm start
   
   # Production build
   npm run build
   npx serve -s build -l 3000
   ```

The frontend will start on `http://localhost:3000`

## 📚 API Documentation

### Interactive Swagger UI
Access the complete API documentation at: **`http://localhost:9000/api/docs`**

The Swagger UI provides:
- Interactive API testing for all endpoints
- Request/response schemas with examples
- MQTT event documentation
- WebSocket event documentation
- Real-time API testing interface
- Comprehensive error code documentation

### Core Services Documentation
- **`core/README.md`**: Backend setup and advanced configuration
- **Swagger UI**: Interactive documentation and testing at `/api/docs`
- **Queue Dashboard**: Bull queue monitoring at `/admin/queues`

## 📊 Features

### Backend (NestJS + Microservices)
- **🔌 MQTT Integration** with HiveMQ Cloud for IoT device communication
- **📡 Microservice Architecture** with dedicated MQTT transport layer
- **🔄 Real-time WebSocket** support for live data streaming
- **⚡ Background Job Processing** with Redis + Bull queues
- **🚨 Intelligent Alert System** with configurable thresholds and severity levels
- **📊 Advanced Analytics** with aggregation pipelines and statistics
- **🗄️ MongoDB Integration** for scalable data persistence
- **📋 Queue Management** with Bull Board web interface
- **🔗 REST API endpoints** for telemetry data CRUD operations
- **🎯 Mock Data Generation** for testing and demonstration
- **✅ Data Validation** with class-validator and DTOs
- **📖 Comprehensive Swagger/OpenAPI** documentation with interactive UI
- **🛡️ Error Handling** and comprehensive logging

### Frontend (React + TypeScript)
- **📈 Real-time Dashboard** with live telemetry data visualization
- **📊 Interactive Charts** using Nivo for beautiful data visualization
- **🚨 Alert Management** with severity-based filtering and acknowledgment
- **🔔 Real-time Notifications** via WebSocket connections
- **📱 Responsive Design** optimized for desktop and mobile
- **🎨 Modern UI** with Tailwind CSS and custom components
- **⚡ State Management** with Zustand for efficient data handling
- **🔍 Advanced Filtering** and search capabilities
- **📋 Comprehensive Analytics** with machine and parameter statistics
- **💫 Error Handling** and loading states with toast notifications

### Alert System
- **🎯 Smart Threshold Detection** with configurable optimal ranges
- **📊 Severity Classification** (Low, Medium, High, Critical, Catastrophic)
- **📈 Deviation Analysis** with percentage-based calculations
- **✅ Alert Acknowledgment** and resolution tracking
- **📋 Alert Analytics** with top offenders and trending analysis
- **🔄 Real-time Broadcasting** via WebSocket to all connected clients
<!-- - **🔔 Multi-channel Notifications** (In-app, Email, SMS based on severity) -->

### Queue System
- **⚡ Background Processing** for resource-intensive operations
- **🔄 Job Scheduling** with cron-based automation (configurable)
- **📊 Queue Monitoring** with Bull Board web interface
- **🔧 Error Handling** with retry mechanisms and dead letter queues
- **📈 Performance Metrics** and job statistics

## 🔌 API Endpoints

### Telemetry API
- `POST /api/telemetry` - Create new telemetry record
- `POST /api/telemetry/mock` - Generate and save mock telemetry data
- `GET /api/telemetry/latest` - Get latest 10 telemetry records
- `GET /api/telemetry` - Get all telemetry records with optional filtering
- `GET /api/telemetry/:id` - Get specific telemetry record by ID
- `GET /api/telemetry/count/by-machine` - Get telemetry counts per machine
- `DELETE /api/telemetry/:id` - Delete telemetry record

### Alerts API
- `GET /api/alerts` - Get recent alerts with pagination
- `GET /api/alerts/acknowledged` - Get acknowledged alerts
- `GET /api/alerts/unacknowledged` - Get unacknowledged alerts
- `GET /api/alerts/today` - Get today's alerts
- `GET /api/alerts/day/:date` - Get alerts for specific date
- `GET /api/alerts/severity-counts` - Get alert counts by severity level
- `GET /api/alerts/top-offenders` - Get top offending machines and parameters
- `PATCH /api/alerts/:id/acknowledge` - Acknowledge an alert
- `PATCH /api/alerts/:id/resolve` - Resolve an alert

### Events API
- `POST /api/events/mock` - Generate mock data via queue system

### Queue Management
- `GET /admin/queues` - Bull Board interface for queue monitoring

### MQTT Topics (Microservice)
- `telemetry/+/+` - Receive telemetry data from IoT devices
- `alerts/+` - Handle alert messages
- `commands/+` - Process device commands
- `status/request` - Service status requests
- `demo/topic` - Demo/testing topic

### WebSocket Events (Namespace: `/telemetry`)
- `telemetry:new` - Send/receive new telemetry data
- `telemetry:subscribe` - Subscribe to live telemetry updates
- `telemetry:unsubscribe` - Unsubscribe from telemetry updates
- `alert:new` - Receive real-time alert notifications

## 📡 Data Model

### Telemetry Data Schema
The comprehensive sensor data includes:
- **Temperature** (°C) - Environmental temperature readings
- **Humidity** (%) - Relative humidity measurements
- **TVOC** (ppb) - Total Volatile Organic Compounds
- **eCO2** (ppm) - Equivalent CO2 concentration
- **Raw H2** - Hydrogen gas sensor raw reading
- **Raw Ethanol** - Ethanol sensor raw reading
- **Pressure** (hPa) - Atmospheric pressure
- **PM1.0** (μg/m³) - Particulate matter (1.0 micrometers)
- **PM2.5** (μg/m³) - Particulate matter (2.5 micrometers)
- **NC0.5** (particles/cm³) - Particle count (0.5 micrometers)
- **NC1.0** (particles/cm³) - Particle count (1.0 micrometers)
- **NC2.5** (particles/cm³) - Particle count (2.5 micrometers)
- **machineId** - Unique device identifier (e.g., "sn-sd001")
- **timestamp** - Unix timestamp of data collection
- **createdAt/updatedAt** - Database timestamps

### Alert Data Schema
Intelligent alert system with:
- **rule_id** - Unique alert rule identifier
- **sensor_type** - Which sensor triggered the alert
- **actual_value** - The measured value that triggered the alert
- **optimal_range** - Expected min/max values for the sensor
- **deviation_percentage** - How much the value deviates from optimal range
- **deviation_type** - "above_max" or "below_min"
- **severity** - "low", "medium", "high", "critical", "catastrophic"
- **notify** - Notification channels (in-app, email, sms)
- **triggered_at** - When the alert was created
- **acknowledged** - Whether the alert has been reviewed
- **telemetry_data** - Full sensor data that triggered the alert

### Optimal Sensor Ranges (Configurable)
| Sensor | Min | Max | Unit | Description |
|--------|-----|-----|------|-------------|
| Temperature | 18 | 27 | °C | Comfortable room temperature |
| Humidity | 40 | 60 | % | Optimal humidity range |
| eCO2 | 400 | 600 | ppm | Good air quality |
| TVOC | 0 | 220 | ppb | Low volatile organic compounds |
| Pressure | 980 | 1030 | hPa | Normal atmospheric pressure |
| PM1.0 | 0 | 15 | μg/m³ | Good air quality |
| PM2.5 | 0 | 25 | μg/m³ | WHO recommended levels |

### Alert Severity Thresholds
| Severity | Deviation % | Notifications |
|----------|-------------|---------------|
| Low | 10% | In-app |
| Medium | 25% | In-app |
| High | 50% | In-app, Email |
| Critical | 75% | In-app, Email |
| Catastrophic | 90% | In-app, Email, SMS |

## 🧪 Testing & Development

### Using Swagger UI
1. Open `http://localhost:9000/api/docs`
2. Click on any endpoint to expand it
3. Click "Try it out" to test the API
4. Use the example data or modify it as needed
5. Execute the request and see the response

### MQTT Testing
Test MQTT integration with real IoT devices or MQTT clients:

```bash
# Send telemetry data via MQTT
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

### Generate Mock Data
```bash
# Via REST API
curl -X POST http://localhost:9000/api/telemetry/mock

# Via Queue System
curl -X POST http://localhost:9000/api/events/mock

# Via Frontend Dashboard
Click "Generate Mock Data" button

# Via Swagger UI
Use the interactive testing interface
```

### WebSocket Testing
```javascript
// Connect to WebSocket in browser console
const socket = io('http://localhost:9000/telemetry');
socket.emit('telemetry:subscribe');
socket.on('telemetry:new', (data) => console.log('New telemetry:', data));
socket.on('alert:new', (alert) => console.log('New alert:', alert));
```

### Queue Monitoring
Monitor background jobs at: `http://localhost:9000/admin/queues`

### View Latest Data
```bash
# Get latest telemetry
curl http://localhost:9000/api/telemetry/latest

# Get latest alerts
curl http://localhost:9000/api/alerts

# Get alert statistics
curl http://localhost:9000/api/alerts/severity-counts
```

## 🔧 Configuration

### Backend Environment Variables
Create a `.env` file in the `core/` directory:

```env
# Server Configuration
PORT=9000

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/iot-telemetry
# Or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database

# Redis Configuration (for queues)
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
REDIS_DB=0
# Or Redis URL:
# REDIS_URL=redis://localhost:6379

# MQTT Configuration (HiveMQ Cloud)
MQTT_HOST=9bc811871bbb400281764a67bbfc77b9.s1.eu.hivemq.cloud
MQTT_PORT=8883
MQTT_USERNAME=your_mqtt_username
MQTT_PASSWORD=your_mqtt_password
MQTT_CLIENT_ID=nestjs-mqtt-client
```

### Frontend Configuration
The frontend automatically connects to:
- **Backend API**: `http://localhost:9000` (development) 
- **WebSocket**: `http://localhost:9000/telemetry` namespace
- **Production**: Configured for `https://intersensing.hubextech.com`

### Alert System Configuration
Sensor optimal ranges and deviation thresholds are configurable in `AlertsService`:
- Modify optimal ranges for each sensor type
- Adjust deviation percentage thresholds
- Configure notification channels per severity level

### Queue Configuration
Redis and Bull queue settings in `app.module.ts`:
- Retry attempts and backoff strategies
- Job completion and failure handling
- Queue concurrency and rate limiting

## 📁 Project Structure

```
intersensing/
├── core/                                    # Backend (NestJS + MQTT + Queues)
│   ├── src/
│   │   ├── alerts/                         # Alert management system
│   │   │   ├── alerts.controller.ts        # Alert REST API endpoints
│   │   │   ├── alerts.service.ts           # Alert business logic & analytics
│   │   │   ├── alerts.module.ts            # Alert module configuration
│   │   │   └── dto/                        # Alert data transfer objects
│   │   ├── events/                         # Background job processing
│   │   │   ├── events.controller.ts        # Event API endpoints
│   │   │   ├── events.service.ts           # Queue management
│   │   │   ├── events.processor.ts         # Job processing logic
│   │   │   ├── events.cron.ts              # Scheduled job management
│   │   │   ├── events.module.ts            # Events module + Bull configuration
│   │   │   └── constants/                  # Queue names and event constants
│   │   ├── mqtt/                           # MQTT microservice integration
│   │   │   ├── mqtt.controller.ts          # MQTT message handlers
│   │   │   ├── mqtt.service.ts             # MQTT business logic
│   │   │   ├── mqtt.module.ts              # MQTT module configuration
│   │   │   ├── README.md                   # MQTT setup documentation
│   │   │   └── dto/                        # MQTT message DTOs
│   │   ├── telemetry/                      # Core telemetry system
│   │   │   ├── telemetry.controller.ts     # Telemetry REST API
│   │   │   ├── telemetry.gateway.ts        # WebSocket gateway
│   │   │   ├── telemetry.module.ts         # Telemetry module
│   │   │   ├── app.controller.ts           # Main app controller
│   │   │   └── dto/                        # Telemetry DTOs
│   │   ├── common/                         # Shared utilities and services
│   │   │   ├── common/src/                 # Common services
│   │   │   │   ├── services/               # Database services
│   │   │   │   │   └── telemetry.service.ts
│   │   │   │   └── mongo.service.ts        # MongoDB connection
│   │   │   ├── interfaces/                 # TypeScript interfaces
│   │   │   │   ├── telemetry.ts            # Telemetry data interface
│   │   │   │   └── alert.ts                # Alert data interfaces
│   │   │   └── utils/                      # Utility functions
│   │   ├── app.module.ts                   # Main application module
│   │   └── main.ts                         # Application bootstrap + MQTT setup
│   ├── docker-compose.local.yml            # Redis container for development
│   ├── env.example                         # Environment variables template
│   ├── package.json                        # Backend dependencies
│   ├── tsconfig.json                       # TypeScript configuration
│   └── README.md                           # Backend documentation
├── platform/                               # Frontend (React + TypeScript)
│   ├── src/
│   │   ├── components/
│   │   │   ├── telemetry-dashboard/        # Telemetry visualization
│   │   │   ├── alerts-dashboard/           # Alert management UI
│   │   │   ├── charts/                     # Data visualization components
│   │   │   ├── analytics-item/             # Analytics components
│   │   │   ├── metrics-available-stats/    # Statistics components
│   │   │   └── ...                         # Other UI components
│   │   ├── services/
│   │   │   ├── telemetry.ts                # API client for telemetry & alerts
│   │   │   ├── socket.ts                   # WebSocket service
│   │   │   └── api-client.ts               # HTTP client configuration
│   │   ├── hooks/
│   │   │   ├── useTelemetry.ts             # Telemetry data hook
│   │   │   └── useAuth.ts                  # Authentication hook
│   │   ├── pages/
│   │   │   └── workspace/                  # Main dashboard pages
│   │   ├── store/                          # State management (Zustand)
│   │   ├── types/                          # TypeScript type definitions
│   │   └── config/                         # Frontend configuration
│   ├── package.json                        # Frontend dependencies
│   ├── tailwind.config.js                  # Tailwind CSS configuration
│   └── tsconfig.json                       # TypeScript configuration
├── start.sh                                # Automated startup script
└── README.md                               # Main project documentation
```

## 🚀 Deployment

### Production Deployment

#### Backend
```bash
cd core

# Install production dependencies
npm ci --production

# Build the application
npm run build

# Start in production mode
npm run start:prod

# Or with PM2 for process management
npm install -g pm2
pm2 start dist/main.js --name "intersensing-core"
```

#### Frontend
```bash
cd platform

# Install dependencies
npm ci

# Build for production
npm run build

# Serve with a static file server
npm install -g serve
serve -s build -l 3000

# Or use nginx/apache to serve the build folder
```

### Docker Deployment

#### Redis (Required for queues)
```bash
cd core
docker-compose -f docker-compose.local.yml up -d
```

#### Environment Variables for Production
```env
# Production settings
NODE_ENV=production
PORT=9000

# Database (use MongoDB Atlas for production)
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/database

# Redis (use Redis Cloud for production)
REDIS_URL=redis://username:password@host:port

# MQTT (HiveMQ Cloud)
MQTT_HOST=your-hivemq-cluster.s1.eu.hivemq.cloud
MQTT_PORT=8883
MQTT_USERNAME=your_username
MQTT_PASSWORD=your_password
```

### Monitoring & Health Checks

#### Available Endpoints
- **Health Check**: `GET /api/telemetry/latest` (should return array)
- **Queue Status**: `GET /admin/queues` (Bull Board interface)
- **API Documentation**: `GET /api/docs` (Swagger UI)
- **WebSocket Status**: Connect to `/telemetry` namespace

#### Performance Monitoring
- Monitor Redis memory usage for queue operations
- MongoDB connection pool monitoring
- WebSocket connection counts via `TelemetryGateway.getConnectedClientsCount()`
- Alert processing times and queue job statistics

## 🔍 Troubleshooting

### Common Issues

#### 1. **Backend Connection Errors**
   - **MongoDB Connection**: Ensure MongoDB is running or check Atlas connection string
   - **Redis Connection**: Verify Redis server is running (`redis-cli ping`)
   - **MQTT Connection**: Check HiveMQ Cloud credentials and network connectivity
   
   ```bash
   # Check MongoDB connection
   mongosh "mongodb://localhost:27017/iot-telemetry"
   
   # Check Redis connection
   redis-cli ping
   
   # Test MQTT connection
   mosquitto_pub -h your-host -p 8883 -u username -P password -t test/topic -m "test"
   ```

#### 2. **Queue System Issues**
   - **Redis Not Running**: Start Redis with `docker-compose -f core/docker-compose.local.yml up -d`
   - **Queue Jobs Failing**: Monitor at `http://localhost:9000/admin/queues`
   - **Memory Issues**: Clear Redis queue data or increase memory limits

#### 3. **WebSocket Connection Issues**
   - **CORS Problems**: Verify backend CORS settings allow frontend origin
   - **Port Conflicts**: Ensure ports 9000 (backend) and 3000 (frontend) are available
   - **Namespace Issues**: Frontend connects to `/telemetry` namespace specifically

#### 4. **Alert System Issues**
   - **Alerts Not Triggering**: Check sensor optimal ranges in `AlertsService`
   - **Severity Levels**: Verify deviation thresholds configuration
   - **Database Issues**: Check MongoDB alerts collection permissions

#### 5. **Frontend Build Errors**
   - **Memory Issues**: Use `NODE_OPTIONS='--max_old_space_size=8192'` for builds
   - **TypeScript Errors**: Ensure all dependencies are compatible versions
   - **Missing Dependencies**: Run `npm install` in platform directory

#### 6. **MQTT Integration Issues**
   - **Authentication Failed**: Verify HiveMQ Cloud credentials
   - **Topic Not Working**: Check topic pattern matching in MQTT controller
   - **SSL/TLS Issues**: Use `--insecure` flag for testing

### Debug Commands

```bash
# Check service status
curl http://localhost:9000/api/telemetry/latest
curl http://localhost:9000/api/alerts/severity-counts

# Monitor logs
# Backend logs appear in terminal where you started the service
# Frontend logs appear in browser console

# Test WebSocket connection
node -e "
const io = require('socket.io-client');
const socket = io('http://localhost:9000/telemetry');
socket.on('connect', () => console.log('Connected!'));
socket.on('disconnect', () => console.log('Disconnected!'));
"

# Check queue status
curl http://localhost:9000/admin/queues
```

### Performance Optimization

#### Backend
- **MongoDB Indexing**: Add indexes for frequently queried fields (machineId, timestamp)
- **Redis Memory**: Monitor memory usage and set appropriate limits
- **Queue Concurrency**: Adjust Bull queue concurrency based on system resources
- **Connection Pooling**: Optimize MongoDB and Redis connection pool sizes

#### Frontend
- **Code Splitting**: Implement lazy loading for large components
- **Caching**: Use React Query or SWR for API data caching
- **WebSocket Management**: Implement connection retry logic and heartbeat

### Logs and Monitoring

- **Backend Logs**: Comprehensive logging with NestJS Logger
- **Queue Monitoring**: Bull Board at `/admin/queues`
- **Error Tracking**: All errors are logged with context and stack traces
- **Performance Metrics**: WebSocket connection counts, queue job statistics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly using Swagger UI
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For issues and questions:
1. Check the troubleshooting section
2. Review the Swagger UI documentation
3. Check the implementation logs
4. Test individual components using provided scripts
5. Create an issue in the repository