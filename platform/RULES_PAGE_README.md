# Machine Rules Page

This page allows users to create and manage monitoring rules for specific machines in the Intersensing platform.

## Features

### 1. View Existing Rules
- Display all configured machine rules in a clean, organized list
- Each rule shows machine ID, name, creation date, and status
- Expandable view to see detailed sensor ranges and deviation thresholds
- Visual indicators for rule status (active/inactive)

### 2. Create New Rules
- **Machine Information**: Enter machine ID and name
- **Sensor Optimal Ranges**: Configure acceptable ranges for various sensors:
  - Temperature (°C)
  - Humidity (%)
  - eCO2 (ppm)
  - TVOC (ppb)
  - Pressure (hPa)
  - PM1.0 (μg/m³)
  - PM2.5 (μg/m³)
- **Deviation Thresholds**: Set alert levels with notification methods:
  - Low (5-15%): In-app notifications
  - Medium (15-30%): In-app notifications
  - High (30-60%): In-app + Email
  - Critical (60-80%): In-app + Email
  - Catastrophic (80-95%): In-app + Email + SMS

### 3. Rule Management
- Toggle rules on/off
- Delete existing rules
- View detailed sensor configurations
- See notification preferences for each severity level

## Demo Data

The page includes sample rules for:
- Production Line A (MACHINE-001)
- Assembly Line B (MACHINE-002)
- Quality Control Station (MACHINE-003)
- Packaging Unit (MACHINE-004)

## Navigation

Access the rules page via:
- Sidebar navigation → Rules
- Direct URL: `/rules`

## Technical Implementation

- **TypeScript interfaces** for type safety
- **React hooks** for state management
- **Tailwind CSS** for styling
- **Responsive design** for mobile and desktop
- **Form validation** with error handling
- **Modal forms** for creating new rules

## Future Enhancements

- Edit existing rules
- Rule templates for common configurations
- Bulk rule operations
- Rule testing and simulation
- Integration with actual IoT devices
- Historical rule performance analytics
