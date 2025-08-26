import { useState, useEffect, useCallback } from 'react'
import { TelemetryService, TelemetryData } from 'services/telemetry'
import { socketService } from 'services/socket'

export const useTelemetry = () => {
  const [telemetryData, setTelemetryData] = useState<TelemetryData[]>([])
  const [latestData, setLatestData] = useState<TelemetryData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  // Fetch latest telemetry data
  const fetchLatestData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await TelemetryService.getLatest()
      setTelemetryData(data)
      if (data.length > 0) {
        setLatestData(data[0])
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch telemetry data')
    } finally {
      setLoading(false)
    }
  }, [])

  // Generate mock data
  const generateMockData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const newData = await TelemetryService.generateMock()
      setTelemetryData(prev => [newData, ...prev.slice(0, 9)]) // Keep only latest 10
      setLatestData(newData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate mock data')
    } finally {
      setLoading(false)
    }
  }, [])

  // Connect to WebSocket and subscribe to real-time updates
  useEffect(() => {
    const socket = socketService.connect()
    
    socket.on('connect', () => {
      setIsConnected(true)
      console.log('Connected to telemetry WebSocket')
    })

    socket.on('disconnect', () => {
      setIsConnected(false)
      console.log('Disconnected from telemetry WebSocket')
    })

    // Subscribe to telemetry updates
    socketService.subscribeToTelemetry((newData: TelemetryData) => {
      setTelemetryData(prev => [newData, ...prev.slice(0, 9)]) // Keep only latest 10
      setLatestData(newData)
    })

    return () => {
      socketService.unsubscribeFromTelemetry()
      socketService.disconnect()
    }
  }, [])

  // Initial data fetch
  useEffect(() => {
    fetchLatestData()
  }, [fetchLatestData])

  return {
    telemetryData,
    latestData,
    loading,
    error,
    isConnected,
    fetchLatestData,
    generateMockData,
    refresh: fetchLatestData
  }
}
