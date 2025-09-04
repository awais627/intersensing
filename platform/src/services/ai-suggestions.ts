import { TelemetryData } from './telemetry'

export interface AISuggestion {
	id: string
	title: string
	message: string
	severity: 'low' | 'medium' | 'high' | 'critical'
	action: string
	icon: string
	timestamp: Date
	parameter: string
	value: number
	unit: string
}

export class AISuggestionService {
	private static instance: AISuggestionService
	private suggestions: AISuggestion[] = []
	private listeners: ((suggestion: AISuggestion) => void)[] = []

	private constructor() {}

	static getInstance(): AISuggestionService {
		if (!AISuggestionService.instance) {
			AISuggestionService.instance = new AISuggestionService()
		}
		return AISuggestionService.instance
	}

	// Subscribe to new suggestions
	subscribe(listener: (suggestion: AISuggestion) => void): () => void {
		this.listeners.push(listener)
		return () => {
			this.listeners = this.listeners.filter(l => l !== listener)
		}
	}

	// Generate suggestions based on telemetry data
	generateSuggestions(telemetryData: TelemetryData): AISuggestion[] {
		const suggestions: AISuggestion[] = []
		const now = new Date()

		// Temperature suggestions
		if (telemetryData.Temperature > 30) {
			suggestions.push({
				id: `temp-high-${Date.now()}`,
				title: 'High Temperature Detected',
				message: `Temperature has reached ${telemetryData.Temperature.toFixed(1)}°C, which is above the recommended threshold.`,
				severity: telemetryData.Temperature > 35 ? 'critical' : 'high',
				action: 'Consider increasing ventilation or reducing heat sources in the area.',
				icon: '🌡️',
				timestamp: now,
				parameter: 'Temperature',
				value: telemetryData.Temperature,
				unit: '°C'
			})
		} else if (telemetryData.Temperature < 15) {
			suggestions.push({
				id: `temp-low-${Date.now()}`,
				title: 'Low Temperature Alert',
				message: `Temperature has dropped to ${telemetryData.Temperature.toFixed(1)}°C, which may affect equipment performance.`,
				severity: 'medium',
				action: 'Check heating systems and ensure proper insulation.',
				icon: '❄️',
				timestamp: now,
				parameter: 'Temperature',
				value: telemetryData.Temperature,
				unit: '°C'
			})
		}

		// Humidity suggestions
		if (telemetryData.Humidity > 70) {
			suggestions.push({
				id: `humidity-high-${Date.now()}`,
				title: 'High Humidity Warning',
				message: `Humidity levels are at ${telemetryData.Humidity.toFixed(1)}%, which can cause condensation and equipment damage.`,
				severity: telemetryData.Humidity > 80 ? 'high' : 'medium',
				action: 'Increase ventilation or use dehumidifiers to reduce moisture levels.',
				icon: '💧',
				timestamp: now,
				parameter: 'Humidity',
				value: telemetryData.Humidity,
				unit: '%'
			})
		} else if (telemetryData.Humidity < 30) {
			suggestions.push({
				id: `humidity-low-${Date.now()}`,
				title: 'Low Humidity Alert',
				message: `Humidity is at ${telemetryData.Humidity.toFixed(1)}%, which may cause static electricity and equipment issues.`,
				severity: 'low',
				action: 'Consider using humidifiers to maintain optimal humidity levels.',
				icon: '🏜️',
				timestamp: now,
				parameter: 'Humidity',
				value: telemetryData.Humidity,
				unit: '%'
			})
		}

		// Pressure suggestions
		if (telemetryData.Pressure > 1020) {
			suggestions.push({
				id: `pressure-high-${Date.now()}`,
				title: 'High Pressure System',
				message: `Atmospheric pressure is ${telemetryData.Pressure.toFixed(1)} hPa, indicating a high-pressure system.`,
				severity: 'low',
				action: 'Monitor for potential weather changes and ensure proper ventilation.',
				icon: '🔺',
				timestamp: now,
				parameter: 'Pressure',
				value: telemetryData.Pressure,
				unit: 'hPa'
			})
		} else if (telemetryData.Pressure < 980) {
			suggestions.push({
				id: `pressure-low-${Date.now()}`,
				title: 'Low Pressure Alert',
				message: `Pressure has dropped to ${telemetryData.Pressure.toFixed(1)} hPa, which may indicate stormy weather.`,
				severity: 'medium',
				action: 'Prepare for potential weather changes and check equipment stability.',
				icon: '🔻',
				timestamp: now,
				parameter: 'Pressure',
				value: telemetryData.Pressure,
				unit: 'hPa'
			})
		}

		// Air Quality suggestions
		if (telemetryData.eCO2 > 800) {
			suggestions.push({
				id: `eco2-high-${Date.now()}`,
				title: 'Poor Air Quality Detected',
				message: `eCO2 levels are elevated at ${telemetryData.eCO2} ppm, indicating poor air circulation.`,
				severity: telemetryData.eCO2 > 1200 ? 'high' : 'medium',
				action: 'Improve ventilation immediately to reduce CO2 concentration.',
				icon: '🌫️',
				timestamp: now,
				parameter: 'eCO2',
				value: telemetryData.eCO2,
				unit: 'ppm'
			})
		}

		if (telemetryData.TVOC > 500) {
			suggestions.push({
				id: `tvoc-high-${Date.now()}`,
				title: 'High VOC Levels',
				message: `TVOC concentration is ${telemetryData.TVOC} ppb, which may indicate chemical contamination.`,
				severity: telemetryData.TVOC > 1000 ? 'critical' : 'high',
				action: 'Investigate potential sources of volatile organic compounds and improve air filtration.',
				icon: '⚠️',
				timestamp: now,
				parameter: 'TVOC',
				value: telemetryData.TVOC,
				unit: 'ppb'
			})
		}

		// Particulate Matter suggestions
		if (telemetryData['PM2.5'] > 25) {
			suggestions.push({
				id: `pm25-high-${Date.now()}`,
				title: 'High PM2.5 Levels',
				message: `PM2.5 particles are at ${telemetryData['PM2.5']} μg/m³, exceeding safe air quality standards.`,
				severity: telemetryData['PM2.5'] > 50 ? 'critical' : 'high',
				action: 'Activate air purifiers and check for sources of fine particulate matter.',
				icon: '🌪️',
				timestamp: now,
				parameter: 'PM2.5',
				value: telemetryData['PM2.5'],
				unit: 'μg/m³'
			})
		}

		return suggestions
	}

	// Process telemetry data and emit suggestions
	processTelemetryData(telemetryData: TelemetryData): void {
		const suggestions = this.generateSuggestions(telemetryData)
		
		// Only emit suggestions with 30% probability to avoid spam
		suggestions.forEach(suggestion => {
			if (Math.random() < 0.3) {
				this.suggestions.push(suggestion)
				this.listeners.forEach(listener => listener(suggestion))
			}
		})
	}

	// Get all suggestions
	getSuggestions(): AISuggestion[] {
		return [...this.suggestions]
	}

	// Clear old suggestions (older than 1 hour)
	clearOldSuggestions(): void {
		const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000)
		this.suggestions = this.suggestions.filter(s => s.timestamp > oneHourAgo)
	}

	// Generate demo suggestions for testing
	generateDemoSuggestions(): AISuggestion[] {
		const now = new Date()
		const demoSuggestions: AISuggestion[] = [
			{
				id: `demo-temp-${Date.now()}`,
				title: 'Temperature Optimization',
				message: 'AI analysis suggests the current temperature of 28.5°C is optimal for equipment performance.',
				severity: 'low',
				action: 'Maintain current temperature settings for optimal efficiency.',
				icon: '✅',
				timestamp: now,
				parameter: 'Temperature',
				value: 28.5,
				unit: '°C'
			},
			{
				id: `demo-humidity-${Date.now()}`,
				title: 'Humidity Management',
				message: 'Humidity levels are within acceptable range. Consider slight adjustment for better comfort.',
				severity: 'low',
				action: 'Monitor humidity trends and adjust ventilation if needed.',
				icon: '💡',
				timestamp: now,
				parameter: 'Humidity',
				value: 45.2,
				unit: '%'
			},
			{
				id: `demo-pressure-${Date.now()}`,
				title: 'Pressure System Analysis',
				message: 'Atmospheric pressure indicates stable weather conditions ahead.',
				severity: 'low',
				action: 'Continue monitoring for any significant pressure changes.',
				icon: '🌤️',
				timestamp: now,
				parameter: 'Pressure',
				value: 1013.2,
				unit: 'hPa'
			}
		]

		return demoSuggestions
	}
}

export const aiSuggestionService = AISuggestionService.getInstance()
