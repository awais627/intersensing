#!/bin/bash

echo "Testing Alert Counts API"
echo "========================"

# Test with current date (default)
echo "1. Testing with current date (default):"
curl -s "http://localhost:3000/api/alerts/counts" | jq '.'

echo -e "\n2. Testing with specific date (2024-01-15):"
curl -s "http://localhost:3000/api/alerts/counts?date=2024-01-15" | jq '.'

echo -e "\n3. Testing with invalid date:"
curl -s "http://localhost:3000/api/alerts/counts?date=invalid-date" | jq '.'

echo -e "\n4. Testing with yesterday:"
YESTERDAY=$(date -v-1d +%Y-%m-%d 2>/dev/null || date -d 'yesterday' +%Y-%m-%d)
curl -s "http://localhost:3000/api/alerts/counts?date=$YESTERDAY" | jq '.'

echo -e "\nAPI Endpoint: GET /api/alerts/counts"
echo "Query Parameters:"
echo "  - date (optional): Date in YYYY-MM-DD format, defaults to today"
echo "Response Format:"
echo "  {"
echo "    \"data\": ["
echo "      { \"count\": 258, \"type\": \"warning\" },"
echo "      { \"count\": 234, \"type\": \"high\" },"
echo "      { \"count\": 156, \"type\": \"critical\" },"
echo "      { \"count\": 89, \"type\": \"medium\" },"
echo "      { \"count\": 45, \"type\": \"low\" }"
echo "    ],"
echo "    \"date\": \"2024-01-15\""
echo "  }"
