import { useState, useEffect, useCallback } from 'react'
import { TelemetryService, TelemetryData, Alert, AlertService, MachineCount, AlertCountsResponse } from 'services/telemetry'
import { socketService } from 'services/socket'

export const useTelemetry = () => {
  const [telemetryData, setTelemetryData] = useState<TelemetryData[]>([])
  const [latestData, setLatestData] = useState<TelemetryData | null>(null)
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [machineCounts, setMachineCounts] = useState<MachineCount[]>([])
  const [alertCounts, setAlertCounts] = useState<AlertCountsResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  // Helper function to format dates consistently
  const formatDate = (date: string | Date): Date => {
    return typeof date === 'string' ? new Date(date) : date
  }

  // Fetch latest telemetry data
  const fetchLatestData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      console.log('🔄 Fetching latest telemetry data...')
      const data = await TelemetryService.getLatest()
      console.log('📊 Fetched telemetry data:', data)
      
      // Ensure dates are properly formatted
      const formattedData = data.map(item => ({
        ...item,
        createdAt: formatDate(item.createdAt),
        updatedAt: formatDate(item.updatedAt)
      }))
      
      setTelemetryData(formattedData)
      if (formattedData.length > 0) {
        setLatestData(formattedData[0])
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch telemetry data'
      console.error('❌ Error fetching telemetry data:', errorMessage)
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }, [])

  // Fetch recent alerts
  const fetchRecentAlerts = useCallback(async () => {
    try {
      console.log('🚨 Fetching recent alerts...')
      const recentAlerts = await AlertService.getRecentAlerts(5)
      console.log('🚨 Fetched recent alerts:', recentAlerts)
      
      // Ensure dates are properly formatted
      const formattedAlerts = recentAlerts.map(alert => ({
        ...alert,
        triggered_at: formatDate(alert.triggered_at),
        createdAt: formatDate(alert.createdAt),
        updatedAt: formatDate(alert.updatedAt),
        telemetry_data: {
          ...alert.telemetry_data,
          createdAt: formatDate(alert.telemetry_data.createdAt),
          updatedAt: formatDate(alert.telemetry_data.updatedAt)
        }
      }))
      
      setAlerts(formattedAlerts)
    } catch (err) {
      console.error('❌ Error fetching recent alerts:', err)
      // Don't set error for alerts, just log it
    }
  }, [])

  // Fetch machine counts
  const fetchMachineCounts = useCallback(async () => {
    try {
      console.log('📊 Fetching machine counts...')
      const counts = await TelemetryService.getCountsByMachine()
      console.log('📊 Fetched machine counts:', counts)
      setMachineCounts(counts)
    } catch (err) {
      console.error('❌ Error fetching machine counts:', err)
      // Don't set error for machine counts, just log it
    }
  }, [])

  // Fetch alert counts
  const fetchAlertCounts = useCallback(async () => {
    try {
      console.log('🚨 Fetching alert counts...')
      const counts = await TelemetryService.getAlertCounts()
      console.log('🚨 Fetched alert counts:', counts)
      setAlertCounts(counts)
    } catch (err) {
      console.error('❌ Error fetching alert counts:', err)
      // Don't set error for alert counts, just log it
    }
  }, [])

  // Generate mock data
  const generateMockData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      console.log('🎲 Generating mock telemetry data...')
      const newData = await TelemetryService.generateMock()
      console.log('🎲 Generated mock data:', newData)
      
      // Ensure dates are properly formatted
      const formattedData = {
        ...newData,
        createdAt: formatDate(newData.createdAt),
        updatedAt: formatDate(newData.updatedAt)
      }
      
      setTelemetryData(prev => [formattedData, ...prev.slice(0, 19)]) // Keep only latest 20
      setLatestData(formattedData)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate mock data'
      console.error('❌ Error generating mock data:', errorMessage)
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }, [])

  // Connect to WebSocket and subscribe to real-time updates
  useEffect(() => {
    console.log('🔌 Setting up WebSocket connection...')
    const socket = socketService.connect()
    
    socket.on('connect', () => {
      console.log('✅ WebSocket connected in hook')
      setIsConnected(true)
    })

    socket.on('disconnect', () => {
      console.log('❌ WebSocket disconnected in hook')
      setIsConnected(false)
    })

    // Subscribe to telemetry updates
    socketService.subscribeToTelemetry((newData: TelemetryData) => {
      console.log('📊 Hook received new telemetry data:', newData)
      
      // Ensure dates are properly formatted
      const formattedData = {
        ...newData,
        createdAt: formatDate(newData.createdAt),
        updatedAt: formatDate(newData.updatedAt)
      }
      
      setTelemetryData(prev => [formattedData, ...prev.slice(0, 19)]) // Keep only latest 20
      setLatestData(formattedData)
      
      // Update machine counts when new telemetry data arrives
      fetchMachineCounts()
    })

    // Subscribe to alert updates
    socketService.subscribeToAlerts((newAlert: Alert) => {
      console.log('🚨 Hook received new alert:', newAlert)
      
      // Ensure dates are properly formatted
      const formattedAlert = {
        ...newAlert,
        triggered_at: formatDate(newAlert.triggered_at),
        createdAt: formatDate(newAlert.createdAt),
        updatedAt: formatDate(newAlert.updatedAt),
        telemetry_data: {
          ...newAlert.telemetry_data,
          createdAt: formatDate(newAlert.telemetry_data.createdAt),
          updatedAt: formatDate(newAlert.telemetry_data.updatedAt)
        }
      }
      
      // Add new alert to the beginning and keep only latest 10
      setAlerts(prev => [formattedAlert, ...prev.slice(0, 9)])
      
      // Update alert counts when new alert arrives
      fetchAlertCounts()
    })

    // Test connection after a short delay
    setTimeout(() => {
      socketService.testConnection()
    }, 1000)

    return () => {
      console.log('🧹 Cleaning up WebSocket connections...')
      socketService.unsubscribeFromTelemetry()
      socketService.unsubscribeFromAlerts()
      socketService.disconnect()
    }
  }, [fetchMachineCounts, fetchAlertCounts])

  // Initial data fetch
  useEffect(() => {
    console.log('🚀 Initial data fetch...')
    fetchLatestData()
    fetchRecentAlerts()
    fetchMachineCounts()
    fetchAlertCounts()
  }, [fetchLatestData, fetchRecentAlerts, fetchMachineCounts, fetchAlertCounts])

  return {
    telemetryData,
    latestData,
    alerts,
    loading,
    error,
    isConnected,
    fetchLatestData,
    generateMockData,
    refresh: fetchLatestData,
    refreshAlerts: fetchRecentAlerts,
    machineCounts,
    alertCounts
  }
}
