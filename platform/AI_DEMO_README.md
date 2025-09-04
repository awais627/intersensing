# AI Demo Features

This document describes the AI demo features implemented in the frontend to showcase AI capabilities during demonstrations.

## Overview

The AI demo system provides realistic-looking AI suggestions based on sensor data without requiring actual AI processing. It's designed to enhance the demo experience by showing intelligent recommendations and alerts.

## Features

### 1. AI Suggestion Service (`services/ai-suggestions.ts`)

- **Static AI Analysis**: Generates suggestions based on predefined thresholds for temperature, humidity, pressure, air quality, and particulate matter
- **Severity Levels**: Low, Medium, High, and Critical suggestions with appropriate styling
- **Real-time Processing**: Processes telemetry data and generates suggestions with 30% probability to avoid spam
- **Demo Mode**: Generates static demo suggestions for testing and demonstration purposes

### 2. AI Suggestion Popup (`components/ai-suggestions/ai-suggestion-popup.tsx`)

- **Responsive Design**: Appears in the top-right corner with smooth animations
- **Severity-based Styling**: Different colors and icons based on suggestion severity
- **Auto-dismiss**: Automatically dismisses after 10-15 seconds depending on severity
- **Interactive Controls**: Users can close or dismiss suggestions
- **Rich Content**: Shows parameter values, recommended actions, and AI analysis indicators

### 3. AI Suggestions Container (`components/ai-suggestions/ai-suggestions-container.tsx`)

- **Global State Management**: Manages active and dismissed suggestions
- **Telemetry Integration**: Processes real telemetry data when available
- **Demo Mode**: Generates demo suggestions every 30 seconds when no real suggestions are active
- **Cleanup**: Automatically removes old suggestions and dismissed ones

### 4. AI Suggestions Context (`contexts/ai-suggestions-context.tsx`)

- **React Context**: Provides global state management for AI suggestions
- **Telemetry Integration**: Connects to real telemetry data from the telemetry hook
- **Subscription System**: Manages listeners for new suggestions
- **Demo Triggers**: Handles both real and demo suggestion generation

### 5. AI Demo Trigger (`components/ai-suggestions/ai-demo-trigger.tsx`)

- **Manual Testing**: Provides buttons to manually trigger AI suggestions
- **Random Data Generation**: Creates mock telemetry data to test suggestion generation
- **Static Demo**: Triggers predefined demo suggestions
- **Development Tool**: Useful for testing and demonstration purposes

## Integration

### Main Layout Integration

The AI suggestions are integrated into the `MainLayout` component, making them available on all pages:

```tsx
<AISuggestionsContainer telemetryData={telemetryData} />
<AIDemoTrigger />
```

### Telemetry Data Connection

The telemetry page connects real sensor data to the AI suggestions:

```tsx
const { latestData } = useTelemetry()
const { setTelemetryData } = useAISuggestions()

useEffect(() => {
  if (latestData) {
    setTelemetryData(latestData)
  }
}, [latestData, setTelemetryData])
```

## Suggestion Types

### Temperature Suggestions
- **High Temperature**: > 30°C (High/Critical severity)
- **Low Temperature**: < 15°C (Medium severity)
- **Optimal Range**: 15-30°C (Low severity)

### Humidity Suggestions
- **High Humidity**: > 70% (Medium/High severity)
- **Low Humidity**: < 30% (Low severity)
- **Optimal Range**: 30-70% (Low severity)

### Pressure Suggestions
- **High Pressure**: > 1020 hPa (Low severity)
- **Low Pressure**: < 980 hPa (Medium severity)
- **Normal Range**: 980-1020 hPa (Low severity)

### Air Quality Suggestions
- **High eCO2**: > 800 ppm (Medium/High severity)
- **High TVOC**: > 500 ppb (High/Critical severity)
- **High PM2.5**: > 25 μg/m³ (High/Critical severity)

## Demo Behavior

### Automatic Suggestions
- Real suggestions are generated when telemetry data exceeds thresholds (30% probability)
- Demo suggestions appear every 30 seconds when no real suggestions are active
- Suggestions auto-dismiss after 10-15 seconds based on severity

### Manual Testing
- Use the "Trigger AI Analysis" button to generate random telemetry data
- Use the "Static Demo" button to trigger predefined demo suggestions
- Both buttons are available in the bottom-left corner of all pages

## Customization

### Adding New Suggestion Types
1. Add new thresholds in `AISuggestionService.generateSuggestions()`
2. Define appropriate severity levels and actions
3. Update the suggestion interface if needed

### Modifying Styling
1. Update `getSeverityConfig()` in `ai-suggestion-popup.tsx`
2. Modify colors, icons, and animations as needed
3. Adjust auto-dismiss timers in the popup component

### Changing Demo Behavior
1. Modify the demo interval in `ai-suggestions-context.tsx`
2. Adjust suggestion probability in `AISuggestionService.processTelemetryData()`
3. Update demo suggestion content in `generateDemoSuggestions()`

## Technical Notes

- All suggestions are stored in memory and cleared after 1 hour
- The system uses React Context for global state management
- Suggestions are generated with a 30% probability to avoid overwhelming users
- The demo trigger is only visible in development/demo mode
- All components are fully typed with TypeScript

## Usage in Demo

1. **Start the application** and navigate to any page
2. **Wait for automatic suggestions** or use the demo trigger buttons
3. **Interact with suggestions** by closing or dismissing them
4. **Navigate between pages** to see suggestions persist across the application
5. **Use the telemetry page** to see real-time suggestions based on actual sensor data

The AI demo system provides a realistic and engaging demonstration of AI capabilities without requiring actual AI processing, making it perfect for showcasing the platform's potential to stakeholders and clients.
