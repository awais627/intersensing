import { io, Socket } from 'socket.io-client'
import { Alert, TelemetryData } from './telemetry'
import { ApiConfig } from '../config'

// Backend response formats
interface AlertResponse {
	success: boolean
	data: Alert
	message: string
	severity: string
	timestamp: string
}

interface TelemetryResponse {
	data: TelemetryData
}

export class SocketService {
	private socket: Socket | null = null
	private isConnected = false

	connect(
		url = process.env.NODE_ENV === 'production'
			? 'https://intersensing.hubextech.com'
			: ApiConfig.API_BASE_URL
	) {
		console.log('Attempting to connect to WebSocket at:', `${url}/telemetry`)

		if (this.socket && this.isConnected) {
			console.log('Socket already connected, returning existing socket')
			return this.socket
		}

		// Connect to the telemetry namespace
		this.socket = io(`${url}/telemetry`, {
			transports: ['websocket', 'polling'],
			autoConnect: true,
			timeout: 20000,
			forceNew: true
		})

		this.socket.on('connect', () => {
			console.log('✅ Connected to telemetry WebSocket namespace')
			this.isConnected = true
		})

		this.socket.on('disconnect', (reason) => {
			console.log(
				'❌ Disconnected from telemetry WebSocket namespace. Reason:',
				reason
			)
			this.isConnected = false
		})

		this.socket.on('connect_error', (error) => {
			console.error('❌ WebSocket connection error:', error)
			this.isConnected = false
		})

		this.socket.on('error', (error) => {
			console.error('❌ Socket error:', error)
		})

		return this.socket
	}

	disconnect() {
		if (this.socket) {
			console.log('Disconnecting WebSocket...')
			this.socket.disconnect()
			this.socket = null
			this.isConnected = false
		}
	}

	subscribeToTelemetry(callback: (data: TelemetryData) => void) {
		if (!this.socket) {
			console.error('❌ Socket not connected')
			return
		}

		console.log('🔔 Subscribing to telemetry updates...')
		this.socket.emit('telemetry:subscribe')
		this.socket.on('telemetry:new', (response: TelemetryResponse) => {
			console.log('📊 Received telemetry:new event:', response)
			// Extract the actual telemetry data from the response
			const telemetryData = response.data
			callback(telemetryData)
		})
	}

	subscribeToAlerts(callback: (alert: Alert) => void) {
		if (!this.socket) {
			console.error('❌ Socket not connected')
			return
		}

		console.log('🚨 Subscribing to alert updates...')
		this.socket.emit('telemetry:subscribe')
		this.socket.on('alert:new', (response: AlertResponse) => {
			console.log('🚨 Received alert:new event:', response)
			// Extract the actual alert data from the response
			const alertData = response.data
			callback(alertData)
		})
	}

	unsubscribeFromTelemetry() {
		if (!this.socket) return

		console.log('🔕 Unsubscribing from telemetry updates...')
		this.socket.emit('telemetry:unsubscribe')
		this.socket.off('telemetry:new')
	}

	unsubscribeFromAlerts() {
		if (!this.socket) return

		console.log('🔕 Unsubscribing from alert updates...')
		this.socket.off('alert:new')
	}

	sendTelemetry(telemetryData: any) {
		if (!this.socket) {
			console.error('❌ Socket not connected')
			return
		}

		console.log('📤 Sending telemetry data:', telemetryData)
		this.socket.emit('telemetry:new', telemetryData)
	}

	isSocketConnected(): boolean {
		return this.isConnected
	}

	getSocket(): Socket | null {
		return this.socket
	}

	// Debug method to test connection
	testConnection() {
		if (this.socket) {
			console.log('🔍 Socket connection status:', {
				connected: this.socket.connected,
				id: this.socket.id,
				transport: this.socket.io.engine.transport.name
			})
		} else {
			console.log('🔍 No socket instance')
		}
	}
}

export const socketService = new SocketService()
