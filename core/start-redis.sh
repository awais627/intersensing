#!/bin/bash

echo "Starting Redis with Docker Compose..."
echo "====================================="

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Start Redis services
echo "🚀 Starting Redis and Redis Commander..."
docker-compose -f docker-compose.redis.yml up -d

# Wait for Redis to be ready
echo "⏳ Waiting for Redis to be ready..."
sleep 5

# Check Redis health
if docker exec intersensing-redis redis-cli ping | grep -q "PONG"; then
    echo "✅ Redis is running and healthy!"
    echo "📍 Redis endpoint: localhost:6379"
    echo "🌐 Redis Commander UI: http://localhost:8081"
    echo ""
    echo "You can now start your NestJS application:"
    echo "npm run start:dev"
else
    echo "❌ Redis failed to start properly. Check logs:"
    echo "docker-compose -f docker-compose.redis.yml logs redis"
    exit 1
fi

echo ""
echo "To stop Redis services:"
echo "docker-compose -f docker-compose.redis.yml down"
echo ""
echo "To view Redis logs:"
echo "docker-compose -f docker-compose.redis.yml logs -f redis"
