export interface ITelemetry {
  id: string;
  timestamp: string;
  Temperature: number;
  Humidity: number;
  TVOC: number;
  eCO2: number;
  "Raw H2": number;
  "Raw Ethanol": number;
  Pressure: number;
  "PM1.0": number;
  "PM2.5": number;
  "NC0.5": number;
  "NC1.0": number;
  "NC2.5": number;
  machineId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MachineCount {
  machineId: string;
  count: number;
}