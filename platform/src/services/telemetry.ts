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
  machineId?: string
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
  machineId?: string
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

export interface MachineCount {
  count: number
  machineId: string
}

export interface AlertCount {
  count: number
  type: string
}

export interface AlertCountsResponse {
  data: AlertCount[]
  date: string
}

export interface AlertSeverityCountsResponse {
  critical: number
  high: number
  warning: number
  low: number
  resolved: number
  total: number
  dateRange: {
    start: string
    end: string
  }
}

export interface RecentAlertsResponse {
  alerts: Alert[]
  totalCount: number
  returnedCount: number
  limit: number
}

export interface DailyAlertsResponse {
  alerts: Alert[]
  totalCount: number
  returnedCount: number
  date: string
}

export interface TopOffendersResponse {
  topMachines: Array<{
    catastrophic: number
    critical: number
    high: number
    medium: number
    low: number
    total: number
    machineId: string
  }>
  topParameters: Array<{
    catastrophic: number
    critical: number
    high: number
    medium: number
    low: number
    total: number
    parameter: string
  }>
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

  // Get telemetry counts by machine
  async getCountsByMachine(): Promise<MachineCount[]> {
    const { data } = await ApiClient.client.get('/api/telemetry/count/by-machine')
    return data
  },

  // Get alert counts by type
  async getAlertCounts(): Promise<AlertCountsResponse> {
    const { data } = await ApiClient.client.get('/api/alerts/counts')
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
  // Get recent alerts with pagination
  async getRecentAlerts(limit: number = 10, offset: number = 0): Promise<RecentAlertsResponse> {
    const { data } = await ApiClient.client.get(`/api/alerts?limit=${limit}&offset=${offset}`)
    return data
  },

  // Get acknowledged alerts with pagination
  async getAcknowledgedAlerts(limit: number = 10, offset: number = 0): Promise<RecentAlertsResponse> {
    const { data } = await ApiClient.client.get(`/api/alerts/acknowledged?limit=${limit}&offset=${offset}`)
    return data
  },

  // Get unacknowledged alerts with pagination
  async getUnacknowledgedAlerts(limit: number = 10, offset: number = 0): Promise<RecentAlertsResponse> {
    const { data } = await ApiClient.client.get(`/api/alerts/unacknowledged?limit=${limit}&offset=${offset}`)
    return data
  },

  // Get alerts for a specific day
  async getAlertsForDay(date: string): Promise<DailyAlertsResponse> {
    const { data } = await ApiClient.client.get(`/api/alerts/day/${date}`)
    return data
  },

  // Get today's alerts
  async getTodayAlerts(): Promise<DailyAlertsResponse> {
    const { data } = await ApiClient.client.get('/api/alerts/today')
    return data
  },

  // Get alert severity and status counts
  async getAlertSeverityCounts(days: number = 1): Promise<AlertSeverityCountsResponse> {
    const { data } = await ApiClient.client.get(`/api/alerts/severity-counts?days=${days}`)
    return data
  },

  // Get top offenders
  async getTopOffenders(): Promise<TopOffendersResponse> {
    const { data } = await ApiClient.client.get('/api/alerts/top-offenders')
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
