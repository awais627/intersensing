# IoT Telemetry Dashboard

A complete IoT telemetry monitoring system with real-time data visualization and WebSocket updates.

## 🏗️ Architecture

- **Backend**: NestJS + Socket.IO + MongoDB (in `core/` directory)
- **Frontend**: React + TypeScript + Tailwind CSS (in `platform/` directory)

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ 
- MongoDB running locally
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd core
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start MongoDB** (if not already running):
   ```bash
   # macOS with Homebrew
   brew services start mongodb-community
   
   # Or manually
   mongod --dbpath /usr/local/var/mongodb
   ```

4. **Start the backend:**
   ```bash
   # Development mode
   npm run start:dev
   
   # Or use the start script
   ./start.sh
   ```

The backend will start on `http://localhost:9000`

### Frontend Setup

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
   npm start
   ```

The frontend will start on `http://localhost:3000`

## 📊 Features

### Backend (NestJS)
- **REST API endpoints** for telemetry data CRUD operations
- **WebSocket support** for real-time data streaming
- **MongoDB integration** for data persistence
- **Mock data generation** for testing and demonstration
- **Data validation** with class-validator

### Frontend (React)
- **Real-time dashboard** with live data updates
- **Interactive charts** using existing chart components
- **WebSocket integration** for live telemetry feeds
- **Responsive design** with Tailwind CSS
- **Error handling** and loading states

## 🔌 API Endpoints

### REST API
- `POST /api/telemetry` - Create new telemetry record
- `POST /api/telemetry/mock` - Generate and save mock data
- `GET /api/telemetry/latest` - Get latest 10 records
- `GET /api/telemetry` - Get all records
- `GET /api/telemetry/:id` - Get specific record
- `DELETE /api/telemetry/:id` - Delete record

### WebSocket Events
- `telemetry:new` - Send/receive new telemetry data
- `telemetry:subscribe` - Subscribe to updates
- `telemetry:unsubscribe` - Unsubscribe from updates

## 📡 Data Model

The telemetry data includes:
- **Temperature** (°C)
- **Humidity** (%)
- **TVOC** (ppb) - Total Volatile Organic Compounds
- **eCO2** (ppm) - Equivalent CO2
- **Raw H2** - Hydrogen gas sensor reading
- **Raw Ethanol** - Ethanol sensor reading
- **Pressure** (hPa) - Atmospheric pressure
- **PM1.0, PM2.5** (μg/m³) - Particulate matter
- **NC0.5, NC1.0, NC2.5** (particles/cm³) - Particle counts
- **CNT** - Count value

## 🧪 Testing

### Generate Mock Data
```bash
# Via API
curl -X POST http://localhost:9000/api/telemetry/mock

# Via Frontend
Click "Generate Mock Data" button in the dashboard
```

### View Latest Data
```bash
curl http://localhost:9000/api/telemetry/latest
```

## 🔧 Configuration

### Backend Environment Variables
Create a `.env` file in the `core/` directory:
```env
PORT=9000
MONGODB_URI=mongodb://localhost:27017/iot-telemetry
```

### Frontend Configuration
The frontend is configured to connect to:
- Backend API: `http://localhost:9000`
- WebSocket: `http://localhost:9000`

## 📁 Project Structure

```
intersensing/
├── core/                          # Backend (NestJS)
│   ├── src/
│   │   ├── telemetry/            # Telemetry module
│   │   │   ├── schemas/          # MongoDB schemas
│   │   │   ├── dto/              # Data transfer objects
│   │   │   ├── telemetry.controller.ts
│   │   │   ├── telemetry.service.ts
│   │   │   ├── telemetry.gateway.ts
│   │   │   └── telemetry.module.ts
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── package.json
│   └── start.sh
├── platform/                      # Frontend (React)
│   ├── src/
│   │   ├── components/
│   │   │   └── telemetry-dashboard/
│   │   ├── services/
│   │   │   ├── telemetry.ts      # Telemetry API service
│   │   │   └── socket.ts         # WebSocket service
│   │   ├── hooks/
│   │   │   └── useTelemetry.ts   # Custom hook for telemetry
│   │   └── pages/
│   │       └── workspace/asset/threat/
│   └── package.json
└── README.md
```

## 🚀 Deployment

### Backend
```bash
cd core
npm run build
npm run start:prod
```

### Frontend
```bash
cd platform
npm run build
# Serve the build folder with your preferred web server
```

## 🔍 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in `.env` file

2. **WebSocket Connection Issues**
   - Verify backend is running on port 9000
   - Check CORS settings

3. **Frontend Build Errors**
   - Clear `node_modules` and reinstall
   - Check TypeScript version compatibility

### Logs
- Backend logs are displayed in the terminal
- Frontend logs are in the browser console

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For issues and questions:
1. Check the troubleshooting section
2. Review the logs
3. Create an issue in the repository