#!/bin/bash

echo "🔌 IoT Telemetry Dashboard - WebSocket Testing"
echo "=============================================="
echo ""

echo "📡 WebSocket Connection Details:"
echo "   URL: ws://localhost:9000/telemetry"
echo "   Namespace: /telemetry"
echo "   Transport: WebSocket + Polling fallback"
echo ""

echo "🧪 Testing WebSocket Functionality:"
echo ""

# Check if wscat is installed
if ! command -v wscat &> /dev/null; then
    echo "❌ wscat is not installed. Installing..."
    npm install -g wscat
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install wscat. Please install manually:"
        echo "   npm install -g wscat"
        echo ""
        echo "Alternative testing methods:"
        echo "1. Use Postman WebSocket client"
        echo "2. Use browser console with Socket.IO client"
        echo "3. Use Python with python-socketio"
        exit 1
    fi
    echo "✅ wscat installed successfully"
fi

echo "✅ wscat is available for testing"
echo ""

echo "🚀 Starting WebSocket Test..."
echo ""

echo "📋 Test Steps:"
echo "1. Connect to WebSocket server"
echo "2. Subscribe to telemetry updates"
echo "3. Send test telemetry data"
echo "4. Verify real-time broadcasting"
echo "5. Test unsubscribe functionality"
echo ""

echo "🔗 Connection Test:"
echo "   wscat -c ws://localhost:9000/telemetry"
echo ""

echo "📤 Test Commands to Send:"
echo ""

echo "1. Subscribe to updates:"
echo '   {"event": "telemetry:subscribe"}'
echo ""

echo "2. Send telemetry data:"
echo '   {"event": "telemetry:new", "data": {"timestamp": "1654733331", "Temperature": 22.5, "Humidity": 45.2, "TVOC": 15, "eCO2": 450, "Raw H2": 12000, "Raw Ethanol": 18000, "Pressure": 950.5, "PM1.0": 2.1, "PM2.5": 3.5, "NC0.5": 5.2, "NC1.0": 3.8, "NC2.5": 2.1, "CNT": 12}}'
echo ""

echo "3. Unsubscribe from updates:"
echo '   {"event": "telemetry:unsubscribe"}'
echo ""

echo "🌐 Alternative Testing Methods:"
echo ""

echo "📱 Browser Console Testing:"
echo "```javascript"
echo "// Load Socket.IO client"
echo "const script = document.createElement('script');"
echo "script.src = 'https://cdn.socket.io/4.7.0/socket.io.min.js';"
echo "document.head.appendChild(script);"
echo ""
echo "// Connect to WebSocket"
echo "const socket = io('http://localhost:9000/telemetry');"
echo ""
echo "// Subscribe to updates"
echo "socket.emit('telemetry:subscribe');"
echo ""
echo "// Listen for updates"
echo "socket.on('telemetry:new', (data) => {"
echo "  console.log('New telemetry:', data);"
echo "});"
echo "```"
echo ""

echo "🐍 Python Testing:"
echo "```python"
echo "import socketio"
echo "import time"
echo ""
echo "sio = socketio.Client()"
echo ""
echo "@sio.event"
echo "def connect():"
echo "    print('Connected to telemetry WebSocket')"
echo "    sio.emit('telemetry:subscribe')"
echo ""
echo "@sio.event"
echo "def telemetry_new(data):"
echo "    print('New telemetry received:', data)"
echo ""
echo "sio.connect('http://localhost:9000', namespaces=['/telemetry'])"
echo "time.sleep(10)  # Keep connection alive"
echo "sio.disconnect()"
echo "```"
echo ""

echo "📊 Expected Behavior:"
echo "✅ Connection established successfully"
echo "✅ Subscription confirmation received"
echo "✅ Telemetry data broadcast to all clients"
echo "✅ Individual response confirmations"
echo "✅ Unsubscription confirmation received"
echo ""

echo "🔍 Troubleshooting:"
echo "1. Ensure backend is running: npm run start:dev"
echo "2. Check MongoDB connection"
echo "3. Verify CORS settings"
echo "4. Check browser console for errors"
echo "5. Review server logs for WebSocket events"
echo ""

echo "🎯 Next Steps:"
echo "1. Test WebSocket connection using wscat"
echo "2. Open multiple browser tabs to test broadcasting"
echo "3. Integrate WebSocket client in your frontend"
echo "4. Monitor real-time data flow"
echo ""

echo "✨ WebSocket testing is ready! Start with:"
echo "   wscat -c ws://localhost:9000/telemetry"
