#!/bin/bash

# Intersensing Start Script
# This script pulls latest changes, builds platform, and starts both services

set -e  # Exit on any error

echo "🚀 Starting Intersensing services..."

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check required tools
echo "📋 Checking required tools..."
if ! command_exists git; then
    echo "❌ Git is not installed. Please install git first."
    exit 1
fi

if ! command_exists npm; then
    echo "❌ NPM is not installed. Please install Node.js and NPM first."
    exit 1
fi

if ! command_exists serve; then
    echo "⚠️  'serve' package not found. Installing globally..."
    npm install -g serve
fi

# Pull latest changes from GitHub
echo "📥 Pulling latest changes from GitHub..."
git pull origin main || git pull origin master || echo "⚠️  Could not pull from main/master branch"

# Platform: Build and serve
echo "🏗️  Building platform..."
cd platform

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing platform dependencies..."
    npm install
fi

echo "🔨 Building platform..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Platform build successful!"
    echo "🌐 Starting platform on http://localhost:3000"
    # Start platform in background
    serve -s build -l 3000 &
    PLATFORM_PID=$!
    echo "📝 Platform PID: $PLATFORM_PID"
else
    echo "❌ Platform build failed!"
    exit 1
fi

cd ..

# Core: Start in production mode
echo "🔧 Starting core service..."
cd core

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file for core service..."
    cat <<EOL > .env
PORT=9000
MONGO_DB_URL=mongodb+srv://muhammadawais:vkl1Phd92yEJLHOR@cluster0.0wi6ueg.mongodb.net/
MONGO_DB_NAME=iot-telemetry
REDIS_URL=redis://default:WLC2j4A5XTSVtLYckE6HIt7ZqKl8Cfm9@redis-16508.c1.us-central1-2.gce.redns.redis-cloud.com:16508
EOL
    echo "✅ .env file created"
else
    echo "ℹ️  .env file already exists, skipping creation"
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing core dependencies..."
    npm install
fi

# Build core if dist doesn't exist
if [ ! -d "dist" ]; then
    echo "🔨 Building core..."
    npm run build
fi

echo "🚀 Starting core service in production mode..."
npm run start:prod &
CORE_PID=$!
echo "📝 Core PID: $CORE_PID"

cd ..

# Wait for services to start
echo "⏳ Waiting for services to start..."
sleep 5

# Check if services are running
echo "🔍 Checking service status..."

if kill -0 $PLATFORM_PID 2>/dev/null; then
    echo "✅ Platform is running (PID: $PLATFORM_PID)"
else
    echo "❌ Platform failed to start"
fi

if kill -0 $CORE_PID 2>/dev/null; then
    echo "✅ Core service is running (PID: $CORE_PID)"
else
    echo "❌ Core service failed to start"
fi

echo ""
echo "🎉 Intersensing services started successfully!"
echo "📱 Platform: http://localhost:3000"
echo "🔧 Core: Running in production mode on port 9000"
echo ""
echo "To stop services, run: kill $PLATFORM_PID $CORE_PID"
echo "Or use: pkill -f 'serve -s build' && pkill -f 'node dist/main'"

# Function to cleanup on script exit
cleanup() {
    echo ""
    echo "🛑 Stopping services..."
    if kill -0 $PLATFORM_PID 2>/dev/null; then
        kill $PLATFORM_PID
        echo "✅ Platform stopped"
    fi
    if kill -0 $CORE_PID 2>/dev/null; then
        kill $CORE_PID
        echo "✅ Core service stopped"
    fi
    echo "👋 Goodbye!"
    exit 0
}

# Set trap to cleanup on script exit
trap cleanup SIGINT SIGTERM

# Keep script running
echo "🔄 Services are running. Press Ctrl+C to stop all services."
wait
