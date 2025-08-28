# Alerts Counts API

## Overview

The Alerts Counts API provides a way to retrieve the total count of alerts grouped by severity type for a specific date. This endpoint is useful for generating dashboards, reports, and analytics showing alert distribution over time.

## Endpoint

```
GET /api/alerts/counts
```

## Query Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `date` | string | No | Current date | Date in YYYY-MM-DD format |

## Usage Examples

### Get counts for current day
```bash
curl "http://localhost:3000/api/alerts/counts"
```

### Get counts for specific date
```bash
curl "http://localhost:3000/api/alerts/counts?date=2024-01-15"
```

### JavaScript/Node.js
```javascript
// Get current day counts
const response = await fetch('http://localhost:3000/api/alerts/counts');
const data = await response.json();

// Get specific date counts
const response = await fetch('http://localhost:3000/api/alerts/counts?date=2024-01-15');
const data = await response.json();
```

### Python
```python
import requests

# Get current day counts
response = requests.get('http://localhost:3000/api/alerts/counts')
data = response.json()

# Get specific date counts
response = requests.get('http://localhost:3000/api/alerts/counts?date=2024-01-15')
data = response.json()
```

## Response Format

### Success Response (200 OK)
```json
{
  "data": [
    {
      "count": 258,
      "type": "warning"
    },
    {
      "count": 234,
      "type": "high"
    },
    {
      "count": 156,
      "type": "critical"
    },
    {
      "count": 89,
      "type": "medium"
    },
    {
      "count": 45,
      "type": "low"
    }
  ],
  "date": "2024-01-15"
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `data` | Array | Array of alert count objects |
| `data[].count` | number | Number of alerts of this severity type |
| `data[].type` | string | Alert severity level |
| `date` | string | Date for which counts were calculated (YYYY-MM-DD) |

### Severity Types

The API always returns all severity types in the following order:
1. **critical** - Most severe alerts requiring immediate attention
2. **high** - High priority alerts
3. **warning** - Warning level alerts
4. **medium** - Medium priority alerts
5. **low** - Low priority alerts

If no alerts exist for a severity type on the specified date, the count will be 0.

## Error Responses

### 400 Bad Request
```json
{
  "statusCode": 400,
  "message": "Invalid date format. Use YYYY-MM-DD",
  "error": "Bad Request"
}
```

### 500 Internal Server Error
```json
{
  "statusCode": 500,
  "message": "Internal server error",
  "error": "Internal Server Error"
}
```

## Date Handling

- **Default**: If no date parameter is provided, the API uses the current date
- **Format**: Date must be in YYYY-MM-DD format (e.g., "2024-01-15")
- **Time Range**: The API calculates counts for the full day from 00:00:00 to 23:59:59
- **Timezone**: Uses server's local timezone for date calculations

## Performance Notes

- The API uses MongoDB aggregation pipeline for efficient counting
- Results are sorted by count in descending order
- The endpoint is optimized for quick response times even with large datasets
- Consider implementing caching if you need to call this endpoint frequently

## Testing

Use the provided test script to verify the API functionality:

```bash
chmod +x test-alert-counts.sh
./test-alert-counts.sh
```

## Integration Examples

### Dashboard Integration
```javascript
// Update dashboard every 5 minutes
setInterval(async () => {
  try {
    const response = await fetch('/api/alerts/counts');
    const data = await response.json();
    
    // Update chart components
    updateAlertChart(data.data);
    updateDateDisplay(data.date);
  } catch (error) {
    console.error('Failed to fetch alert counts:', error);
  }
}, 5 * 60 * 1000);
```

### Report Generation
```javascript
// Generate weekly report
async function generateWeeklyReport() {
  const endDate = new Date();
  const startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000);
  
  const report = [];
  
  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().split('T')[0];
    const response = await fetch(`/api/alerts/counts?date=${dateStr}`);
    const data = await response.json();
    report.push(data);
  }
  
  return report;
}
```

## Related Endpoints

- `GET /api/alerts` - Get recent alerts
- `GET /api/alerts/today` - Get today's alerts
- `GET /api/alerts/day/:date` - Get alerts for specific date
- `GET /api/alerts/acknowledged` - Get acknowledged alerts
- `GET /api/alerts/unacknowledged` - Get unacknowledged alerts
