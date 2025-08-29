import { IMachineRule } from 'types/rules'

export const demoRules: IMachineRule[] = [
  {
    id: '1',
    machineId: 'MACHINE-001',
    machineName: 'Production Line A',
    sensorOptimalRanges: [
      { sensor_type: "Temperature", min: 18, max: 27, unit: "°C", enabled: true },
      { sensor_type: "Humidity", min: 40, max: 60, unit: "%", enabled: true },
      { sensor_type: "eCO2", min: 400, max: 600, unit: "ppm", enabled: true },
      { sensor_type: "TVOC", min: 0, max: 220, unit: "ppb", enabled: true },
      { sensor_type: "Pressure", min: 980, max: 1030, unit: "hPa", enabled: true },
      { sensor_type: "PM1.0", min: 0, max: 15, unit: "μg/m³", enabled: true },
      { sensor_type: "PM2.5", min: 0, max: 25, unit: "μg/m³", enabled: true },
    ],
    deviationThresholds: [
      { severity: "low", deviation_percentage: 10, notify: ["in-app"] },
      { severity: "medium", deviation_percentage: 25, notify: ["in-app"] },
      { severity: "high", deviation_percentage: 50, notify: ["in-app", "email"] },
      { severity: "critical", deviation_percentage: 75, notify: ["in-app", "email"] },
      { severity: "catastrophic", deviation_percentage: 90, notify: ["in-app", "email", "sms"] },
    ],
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    enabled: true
  },
  {
    id: '2',
    machineId: 'MACHINE-002',
    machineName: 'Assembly Line B',
    sensorOptimalRanges: [
      { sensor_type: "Temperature", min: 20, max: 25, unit: "°C", enabled: true },
      { sensor_type: "Humidity", min: 45, max: 55, unit: "%", enabled: true },
      { sensor_type: "eCO2", min: 350, max: 500, unit: "ppm", enabled: true },
      { sensor_type: "TVOC", min: 0, max: 200, unit: "ppb", enabled: true },
      { sensor_type: "Pressure", min: 990, max: 1020, unit: "hPa", enabled: true },
      { sensor_type: "PM1.0", min: 0, max: 12, unit: "μg/m³", enabled: true },
      { sensor_type: "PM2.5", min: 0, max: 20, unit: "μg/m³", enabled: true },
    ],
    deviationThresholds: [
      { severity: "low", deviation_percentage: 8, notify: ["in-app"] },
      { severity: "medium", deviation_percentage: 20, notify: ["in-app"] },
      { severity: "high", deviation_percentage: 40, notify: ["in-app", "email"] },
      { severity: "critical", deviation_percentage: 60, notify: ["in-app", "email"] },
      { severity: "catastrophic", deviation_percentage: 80, notify: ["in-app", "email", "sms"] },
    ],
    createdAt: '2024-01-10T14:30:00Z',
    updatedAt: '2024-01-12T09:15:00Z',
    enabled: true
  },
  {
    id: '3',
    machineId: 'MACHINE-003',
    machineName: 'Quality Control Station',
    sensorOptimalRanges: [
      { sensor_type: "Temperature", min: 22, max: 24, unit: "°C", enabled: true },
      { sensor_type: "Humidity", min: 50, max: 55, unit: "%", enabled: true },
      { sensor_type: "eCO2", min: 300, max: 450, unit: "ppm", enabled: true },
      { sensor_type: "TVOC", min: 0, max: 150, unit: "ppb", enabled: true },
      { sensor_type: "Pressure", min: 1000, max: 1015, unit: "hPa", enabled: true },
      { sensor_type: "PM1.0", min: 0, max: 8, unit: "μg/m³", enabled: true },
      { sensor_type: "PM2.5", min: 0, max: 15, unit: "μg/m³", enabled: true },
    ],
    deviationThresholds: [
      { severity: "low", deviation_percentage: 5, notify: ["in-app"] },
      { severity: "medium", deviation_percentage: 15, notify: ["in-app"] },
      { severity: "high", deviation_percentage: 30, notify: ["in-app", "email"] },
      { severity: "critical", deviation_percentage: 50, notify: ["in-app", "email"] },
      { severity: "catastrophic", deviation_percentage: 70, notify: ["in-app", "email", "sms"] },
    ],
    createdAt: '2024-01-08T16:45:00Z',
    updatedAt: '2024-01-14T11:20:00Z',
    enabled: false
  },
  {
    id: '4',
    machineId: 'MACHINE-004',
    machineName: 'Packaging Unit',
    sensorOptimalRanges: [
      { sensor_type: "Temperature", min: 19, max: 26, unit: "°C", enabled: true },
      { sensor_type: "Humidity", min: 35, max: 65, unit: "%", enabled: true },
      { sensor_type: "eCO2", min: 450, max: 700, unit: "ppm", enabled: true },
      { sensor_type: "TVOC", min: 0, max: 250, unit: "ppb", enabled: true },
      { sensor_type: "Pressure", min: 975, max: 1035, unit: "hPa", enabled: true },
      { sensor_type: "PM1.0", min: 0, max: 18, unit: "μg/m³", enabled: true },
      { sensor_type: "PM2.5", min: 0, max: 28, unit: "μg/m³", enabled: true },
    ],
    deviationThresholds: [
      { severity: "low", deviation_percentage: 12, notify: ["in-app"] },
      { severity: "medium", deviation_percentage: 28, notify: ["in-app"] },
      { severity: "high", deviation_percentage: 55, notify: ["in-app", "email"] },
      { severity: "critical", deviation_percentage: 80, notify: ["in-app", "email"] },
      { severity: "catastrophic", deviation_percentage: 95, notify: ["in-app", "email", "sms"] },
    ],
    createdAt: '2024-01-20T09:15:00Z',
    updatedAt: '2024-01-20T09:15:00Z',
    enabled: true
  }
]
