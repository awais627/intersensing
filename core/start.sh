#!/bin/bash

echo "🚀 Starting IoT Telemetry Dashboard Backend..."

# Check if MongoDB is running
if ! pgrep -x "mongod" > /dev/null; then
    echo "❌ MongoDB is not running. Please start MongoDB first."
    echo "   You can start it with: brew services start mongodb-community"
    echo "   Or: mongod --dbpath /usr/local/var/mongodb"
    exit 1
fi

echo "✅ MongoDB is running"

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Build the application
echo "🔨 Building application..."
npm run build

# Start the application
echo "🌟 Starting application..."
npm run start:prod
