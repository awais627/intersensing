import { ApiClient } from './api-client'

export interface Alert {
  _id?: string
  rule_id: string
  sensor_type: string
  threshold: number
  operator: '>=' | '<=' | '>' | '<' | '==' | '!='
  notify: string[]
  severity: 'low' | 'medium' | 'high' | 'critical' | 'warning'
  triggered_at: string | Date
  telemetry_data: TelemetryData
  acknowledged: boolean
  acknowledged_at?: string | Date
  resolved: boolean
  resolved_at?: string | Date
  createdAt: string | Date
  updatedAt: string | Date
}

export interface TelemetryData {
  _id: string
  id: string
  timestamp: string
  Temperature: number
  Humidity: number
  TVOC: number
  eCO2: number
  'Raw H2': number
  'Raw Ethanol': number
  Pressure: number
  'PM1.0': number
  'PM2.5': number
  'NC0.5': number
  'NC1.0': number
  'NC2.5': number
  CNT: number
  createdAt: string | Date
  updatedAt: string | Date
}

export interface CreateTelemetryDto {
  timestamp: string
  Temperature: number
  Humidity: number
  TVOC: number
  eCO2: number
  'Raw H2': number
  'Raw Ethanol': number
  Pressure: number
  'PM1.0': number
  'PM2.5': number
  'NC0.5': number
  'NC1.0': number
  'NC2.5': number
  CNT: number
}

export const TelemetryService = {
  // Get latest telemetry data
  async getLatest(): Promise<TelemetryData[]> {
    const { data } = await ApiClient.client.get('/api/telemetry/latest')
    return data
  },

  // Get all telemetry data
  async getAll(): Promise<TelemetryData[]> {
    const { data } = await ApiClient.client.get('/api/telemetry')
    return data
  },

  // Get specific telemetry record
  async getById(id: string): Promise<TelemetryData> {
    const { data } = await ApiClient.client.get(`/api/telemetry/${id}`)
    return data
  },

  // Create new telemetry record
  async create(telemetryData: CreateTelemetryDto): Promise<TelemetryData> {
    const { data } = await ApiClient.client.post('/api/telemetry', telemetryData)
    return data
  },

  // Generate mock telemetry data
  async generateMock(): Promise<TelemetryData> {
    const { data } = await ApiClient.client.post('/api/telemetry/mock')
    return data
  },

  // Delete telemetry record
  async delete(id: string): Promise<TelemetryData> {
    const { data } = await ApiClient.client.delete(`/api/telemetry/${id}`)
    return data
  }
}

export const AlertService = {
  // Get recent alerts
  async getRecentAlerts(limit: number = 5): Promise<Alert[]> {
    const { data } = await ApiClient.client.get(`/api/alerts?limit=${limit}`)
    return data
  },

  // Get alerts for a specific day
  async getAlertsForDay(date: string): Promise<Alert[]> {
    const { data } = await ApiClient.client.get(`/api/alerts/day/${date}`)
    return data
  },

  // Get today's alerts
  async getTodayAlerts(): Promise<Alert[]> {
    const { data } = await ApiClient.client.get('/api/alerts/today')
    return data
  },

  // Acknowledge an alert
  async ackAlert(alertId: string): Promise<void> {
    await ApiClient.client.patch(`/api/alerts/${alertId}/acknowledge`)
  },

  // Resolve an alert
  async resolveAlert(alertId: string): Promise<void> {
    await ApiClient.client.patch(`/api/alerts/${alertId}/resolve`)
  }
}
