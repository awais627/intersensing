import { io, Socket } from 'socket.io-client'
import { TelemetryData } from './telemetry'

export class SocketService {
  private socket: Socket | null = null
  private isConnected = false

  connect(url: string = 'http://localhost:9000') {
    if (this.socket && this.isConnected) {
      return this.socket
    }

    this.socket = io(url, {
      transports: ['websocket', 'polling'],
      autoConnect: true,
    })

    this.socket.on('connect', () => {
      console.log('Connected to telemetry WebSocket')
      this.isConnected = true
    })

    this.socket.on('disconnect', () => {
      console.log('Disconnected from telemetry WebSocket')
      this.isConnected = false
    })

    this.socket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error)
      this.isConnected = false
    })

    return this.socket
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect()
      this.socket = null
      this.isConnected = false
    }
  }

  subscribeToTelemetry(callback: (data: TelemetryData) => void) {
    if (!this.socket) {
      console.error('Socket not connected')
      return
    }

    this.socket.emit('telemetry:subscribe')
    this.socket.on('telemetry:new', callback)
  }

  unsubscribeFromTelemetry() {
    if (!this.socket) return

    this.socket.emit('telemetry:unsubscribe')
    this.socket.off('telemetry:new')
  }

  sendTelemetry(telemetryData: any) {
    if (!this.socket) {
      console.error('Socket not connected')
      return
    }

    this.socket.emit('telemetry:new', telemetryData)
  }

  isSocketConnected(): boolean {
    return this.isConnected
  }

  getSocket(): Socket | null {
    return this.socket
  }
}

export const socketService = new SocketService()
