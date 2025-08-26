#!/bin/bash

echo "Testing Events Queue API endpoints..."
echo "====================================="

BASE_URL="http://localhost:9000/api/events"

echo ""
echo "1. Testing GET /api/events (should return empty array initially)"
curl -s "$BASE_URL" | jq '.'

echo ""
echo "2. Testing POST /api/events (create a manual event)"
curl -s -X POST "$BASE_URL" \
  -H "Content-Type: application/json" \
  -d '{"name": "Manual Test Event"}' | jq '.'

echo ""
echo "3. Testing POST /api/events/generate-mock (add mock data job to queue)"
curl -s -X POST "$BASE_URL/generate-mock" \
  -H "Content-Type: application/json" \
  -d '{}' | jq '.'

echo ""
echo "4. Testing POST /api/events/generate-mock with delay"
curl -s -X POST "$BASE_URL/generate-mock" \
  -H "Content-Type: application/json" \
  -d '{"delay": 5000}' | jq '.'

echo ""
echo "5. Testing GET /api/events/stats (queue and events statistics)"
curl -s "$BASE_URL/stats" | jq '.'

echo ""
echo "6. Waiting 5 seconds for cron jobs to process..."
sleep 5

echo ""
echo "7. Testing GET /api/events (should now have some events from cron jobs)"
curl -s "$BASE_URL" | jq '.'

echo ""
echo "8. Testing GET /api/events/stats again (updated statistics)"
curl -s "$BASE_URL/stats" | jq '.'

echo ""
echo "====================================="
echo "Queue testing completed!"
echo ""
echo "Note: The cron job runs every 2 seconds, so you should see new events being created automatically."
echo "Check the application logs to see the cron job execution and queue processing."
