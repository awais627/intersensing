# Events Module with Bull Queue Integration

This module demonstrates a complete NestJS implementation of job queues using Bull with Redis, including cron jobs, MongoDB integration, and comprehensive API endpoints.

## Features

- **Bull Queue Integration**: Redis-based job queue system
- **Cron Jobs**: Automated job scheduling using `@nestjs/schedule`
- **MongoDB Integration**: Data persistence with Mongoose
- **REST API**: Complete CRUD operations for events
- **Queue Monitoring**: Real-time queue statistics and job tracking
- **Error Handling**: Comprehensive error handling with retry mechanisms
- **Swagger Documentation**: Full API documentation

## Architecture

```
EventsModule
├── EventsController (REST API endpoints)
├── EventsService (Business logic)
├── EventsProducer (Queue job producer)
├── EventsProcessor (Queue job consumer)
├── EventsCronService (Scheduled jobs)
└── Event Schema (MongoDB model)
```

## Prerequisites

### 1. Redis Installation

**macOS (using Homebrew):**
```bash
brew install redis
brew services start redis
```

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install redis-server
sudo systemctl start redis-server
sudo systemctl enable redis-server
```

**Docker:**
```bash
docker run -d --name redis -p 6379:6379 redis:alpine
```

### 2. MongoDB Installation

Ensure MongoDB is running on your system.

### 3. Environment Configuration

Copy and configure the environment file:
```bash
cp env.example .env
```

Configure Redis connection in `.env`:
```env
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
REDIS_DB=0
```

## Installation & Setup

1. **Install Dependencies:**
```bash
npm install
```

2. **Start the Application:**
```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

3. **Verify Services:**
- Redis: `redis-cli ping` (should return PONG)
- MongoDB: Check connection in logs
- Application: `http://localhost:9000`

## API Endpoints

### Base URL: `/api/events`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Get all events |
| `GET` | `/stats` | Get queue and events statistics |
| `GET` | `/:id` | Get event by ID |
| `POST` | `/` | Create new event |
| `POST` | `/generate-mock` | Generate mock data job |
| `DELETE` | `/:id` | Delete event by ID |

### Example Usage

**Create Event:**
```bash
curl -X POST http://localhost:9000/api/events \
  -H "Content-Type: application/json" \
  -d '{"name": "Test Event"}'
```

**Generate Mock Data:**
```bash
curl -X POST http://localhost:9000/api/events/generate-mock \
  -H "Content-Type: application/json" \
  -d '{}'
```

**Get Statistics:**
```bash
curl http://localhost:9000/api/events/stats
```

## Queue Configuration

### Queue Name: `mock-data-queue`

**Default Job Options:**
- **Attempts**: 3 retries
- **Backoff**: Exponential backoff starting at 2 seconds
- **Removal**: Completed jobs are removed, failed jobs are kept

**Queue Settings:**
- **Stalled Interval**: 30 seconds
- **Max Stalled Count**: 1

### Job Types

1. **`process-mock-data`**: Processes mock data and saves to MongoDB
2. **Scheduled Jobs**: Cron job runs every 2 seconds

## Cron Jobs

### Primary Cron Job
- **Schedule**: Every 2 seconds (`*/2 * * * * *`)
- **Action**: Adds mock data job to queue
- **Purpose**: Demonstrates automated job generation

### Additional Cron Jobs
- **Every 10 seconds**: Logging and monitoring
- **Every minute**: Periodic tasks
- **Daily at midnight**: Cleanup operations

## Testing

### 1. Manual Testing
Use the provided test script:
```bash
./test-queue.sh
```

### 2. API Testing
Test individual endpoints using curl or Postman.

### 3. Queue Monitoring
Check application logs for:
- Cron job execution
- Job processing
- Queue statistics

### 4. Redis Monitoring
```bash
# Connect to Redis CLI
redis-cli

# Monitor Redis operations
MONITOR

# Check Redis keys
KEYS *

# Check Redis memory usage
INFO memory
```

## Monitoring & Debugging

### Queue Statistics
The `/api/events/stats` endpoint provides:
- Total events count
- Today's events count
- Queue status (waiting, active, completed, failed)

### Application Logs
Monitor the application logs for:
- Cron job execution
- Job processing status
- Error messages
- Queue operations

### Redis Monitoring
```bash
# Check Redis connection
redis-cli ping

# Monitor Redis operations in real-time
redis-cli monitor

# Check Redis info
redis-cli info
```

## Error Handling

### Job Retry Mechanism
- **Automatic Retries**: 3 attempts with exponential backoff
- **Error Logging**: Comprehensive error logging for debugging
- **Graceful Degradation**: Failed jobs don't crash the system

### Connection Failures
- **Redis Fallback**: Graceful handling of Redis connection issues
- **MongoDB Fallback**: Proper error handling for database operations
- **Queue Recovery**: Automatic recovery when services are restored

## Performance Considerations

### Queue Optimization
- **Job Removal**: Completed jobs are automatically removed
- **Batch Processing**: Efficient job processing with minimal overhead
- **Memory Management**: Failed jobs are limited to prevent memory issues

### Database Optimization
- **Indexing**: Proper MongoDB indexing for performance
- **Connection Pooling**: Efficient database connection management
- **Query Optimization**: Optimized queries for better performance

## Production Deployment

### Environment Variables
```env
REDIS_HOST=your-redis-host
REDIS_PORT=6379
REDIS_PASSWORD=your-redis-password
REDIS_DB=0
MONGODB_URI=your-mongodb-connection-string
```

### Health Checks
- **Redis Health**: Monitor Redis connection status
- **Queue Health**: Monitor queue processing status
- **Database Health**: Monitor MongoDB connection status

### Scaling Considerations
- **Multiple Workers**: Deploy multiple application instances
- **Redis Clustering**: Use Redis cluster for high availability
- **Load Balancing**: Implement load balancing for API endpoints

## Troubleshooting

### Common Issues

1. **Redis Connection Failed**
   - Check Redis service status
   - Verify Redis host/port configuration
   - Check firewall settings

2. **Queue Jobs Not Processing**
   - Verify Redis connection
   - Check application logs for errors
   - Ensure processor is properly registered

3. **Cron Jobs Not Running**
   - Check application startup logs
   - Verify ScheduleModule is imported
   - Check cron job configuration

4. **MongoDB Connection Issues**
   - Verify MongoDB service status
   - Check connection string
   - Verify network connectivity

### Debug Commands

```bash
# Check Redis status
redis-cli ping

# Check MongoDB status
mongo --eval "db.runCommand('ping')"

# Check application logs
tail -f logs/app.log

# Test API endpoints
curl http://localhost:9000/api/events/stats
```

## Contributing

When adding new features:
1. Follow the existing module structure
2. Add proper error handling
3. Include Swagger documentation
4. Add appropriate tests
5. Update this README

## License

This module is part of the Intersensing IoT Telemetry Dashboard project.
