#!/bin/bash

echo "🧪 Testing IoT Telemetry Dashboard API Endpoints"
echo "================================================"

BASE_URL="http://localhost:9000"

# Check if backend is running
echo "🔍 Checking if backend is running..."
if ! curl -s "$BASE_URL" > /dev/null 2>&1; then
    echo "❌ Backend is not running. Please start it first with: npm run start:dev"
    exit 1
fi

echo "✅ Backend is running on $BASE_URL"
echo ""

# Test mock data generation
echo "📊 Testing mock data generation..."
MOCK_RESPONSE=$(curl -s -X POST "$BASE_URL/api/telemetry/mock")
if [ $? -eq 0 ]; then
    echo "✅ Mock data generated successfully"
    echo "   Response: $MOCK_RESPONSE" | head -c 100
    echo "..."
else
    echo "❌ Failed to generate mock data"
fi
echo ""

# Test getting latest data
echo "📈 Testing latest data retrieval..."
LATEST_RESPONSE=$(curl -s "$BASE_URL/api/telemetry/latest")
if [ $? -eq 0 ]; then
    echo "✅ Latest data retrieved successfully"
    echo "   Response: $LATEST_RESPONSE" | head -c 100
    echo "..."
else
    echo "❌ Failed to retrieve latest data"
fi
echo ""

# Test getting all data
echo "📋 Testing all data retrieval..."
ALL_RESPONSE=$(curl -s "$BASE_URL/api/telemetry")
if [ $? -eq 0 ]; then
    echo "✅ All data retrieved successfully"
    echo "   Response: $ALL_RESPONSE" | head -c 100
    echo "..."
else
    echo "❌ Failed to retrieve all data"
fi
echo ""

echo "🎉 API testing completed!"
echo ""
echo "Next steps:"
echo "1. Open http://localhost:3000 in your browser"
echo "2. Navigate to the dashboard"
echo "3. Click 'Generate Mock Data' to see live updates"
echo "4. Watch the real-time data flow!"
