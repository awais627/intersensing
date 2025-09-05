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
	private isAlertActive: boolean = false
	private alertActiveCallback: (() => boolean) | null = null

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

	// Register callback to check if alert is active
	registerAlertActiveCallback(callback: () => boolean): void {
		this.alertActiveCallback = callback
	}

	// Check if alert is currently active
	private isAlertCurrentlyActive(): boolean {
		return this.alertActiveCallback ? this.alertActiveCallback() : this.isAlertActive
	}

	// Generate suggestions based on telemetry data
	generateSuggestions(telemetryData: TelemetryData): AISuggestion[] {
		const suggestions: AISuggestion[] = []
		const now = new Date()

		// Temperature suggestions
		if (telemetryData.Temperature > 30) {
			suggestions.push({
				id: `temp-high-${Date.now()}`,
				title: 'Thermal Anomaly Detected',
				message: `I've detected a significant temperature elevation to ${telemetryData.Temperature.toFixed(1)}°C. This exceeds optimal operating parameters and may indicate potential equipment stress or environmental factors requiring immediate attention.`,
				severity: telemetryData.Temperature > 35 ? 'critical' : 'high',
				action: 'I recommend implementing immediate cooling measures: activate ventilation systems, reduce heat-generating activities, and monitor equipment performance closely. Consider scheduling maintenance if temperatures persist above 35°C.',
				icon: '🌡️',
				timestamp: now,
				parameter: 'Temperature',
				value: telemetryData.Temperature,
				unit: '°C'
			})
		} else if (telemetryData.Temperature < 15) {
			suggestions.push({
				id: `temp-low-${Date.now()}`,
				title: 'Thermal Efficiency Warning',
				message: `Current temperature reading of ${telemetryData.Temperature.toFixed(1)}°C is below optimal range. This may impact equipment efficiency and could lead to condensation issues or reduced performance.`,
				severity: 'medium',
				action: 'I suggest checking heating systems, verifying insulation integrity, and monitoring for any condensation buildup. Consider adjusting environmental controls to maintain optimal operating temperature.',
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
				title: 'Moisture Accumulation Alert',
				message: `I'm observing elevated humidity levels at ${telemetryData.Humidity.toFixed(1)}%. This creates an environment conducive to condensation, which poses risks to electronic equipment and may accelerate corrosion processes.`,
				severity: telemetryData.Humidity > 80 ? 'high' : 'medium',
				action: 'My analysis suggests implementing immediate moisture control: activate dehumidification systems, increase air circulation, and monitor for condensation formation. Consider installing additional humidity sensors for better coverage.',
				icon: '💧',
				timestamp: now,
				parameter: 'Humidity',
				value: telemetryData.Humidity,
				unit: '%'
			})
		} else if (telemetryData.Humidity < 30) {
			suggestions.push({
				id: `humidity-low-${Date.now()}`,
				title: 'Dry Air Condition Detected',
				message: `Current humidity reading of ${telemetryData.Humidity.toFixed(1)}% indicates extremely dry conditions. This environment increases static electricity risk and may cause discomfort or equipment sensitivity issues.`,
				severity: 'low',
				action: 'I recommend introducing controlled moisture to the environment through humidification systems. Monitor static discharge and consider implementing anti-static measures for sensitive equipment.',
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
				title: 'Atmospheric Pressure Analysis',
				message: `I'm detecting elevated barometric pressure at ${telemetryData.Pressure.toFixed(1)} hPa. This indicates a high-pressure weather system, which typically brings stable conditions but may affect air circulation patterns.`,
				severity: 'low',
				action: 'Based on meteorological patterns, I recommend monitoring ventilation efficiency and ensuring adequate air exchange. High pressure systems can sometimes trap pollutants, so verify air quality systems are functioning optimally.',
				icon: '🔺',
				timestamp: now,
				parameter: 'Pressure',
				value: telemetryData.Pressure,
				unit: 'hPa'
			})
		} else if (telemetryData.Pressure < 980) {
			suggestions.push({
				id: `pressure-low-${Date.now()}`,
				title: 'Barometric Pressure Drop Detected',
				message: `I've identified a significant pressure decrease to ${telemetryData.Pressure.toFixed(1)} hPa. This suggests an approaching low-pressure system that may bring weather changes and could impact environmental conditions.`,
				severity: 'medium',
				action: 'My weather analysis indicates potential atmospheric instability. I recommend securing outdoor equipment, checking building integrity, and preparing for possible changes in air circulation patterns.',
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
				title: 'Air Quality Degradation Alert',
				message: `My sensors are detecting elevated CO2 concentrations at ${telemetryData.eCO2} ppm. This indicates inadequate ventilation and potential air quality issues that could impact occupant health and comfort.`,
				severity: telemetryData.eCO2 > 1200 ? 'high' : 'medium',
				action: 'I recommend immediate ventilation enhancement: increase fresh air intake, activate air circulation systems, and consider temporary occupancy reduction. Monitor CO2 levels continuously until they return to acceptable ranges below 600 ppm.',
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
				title: 'Chemical Contamination Detected',
				message: `I've identified elevated volatile organic compound levels at ${telemetryData.TVOC} ppb. This suggests potential chemical contamination that may pose health risks and requires immediate investigation.`,
				severity: telemetryData.TVOC > 1000 ? 'critical' : 'high',
				action: 'My analysis indicates a potential chemical source in the environment. I recommend: 1) Identifying and eliminating VOC sources, 2) Enhancing air filtration systems, 3) Increasing ventilation rates, and 4) Considering temporary evacuation if levels exceed 1000 ppb.',
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
				title: 'Particulate Matter Contamination',
				message: `I'm detecting elevated PM2.5 concentrations at ${telemetryData['PM2.5']} μg/m³, which exceeds WHO air quality guidelines. These fine particles can penetrate deep into respiratory systems and pose significant health risks.`,
				severity: telemetryData['PM2.5'] > 50 ? 'critical' : 'high',
				action: 'My environmental analysis recommends: 1) Activating high-efficiency air purifiers immediately, 2) Identifying and eliminating particulate sources, 3) Implementing enhanced filtration systems, and 4) Considering protective measures for sensitive individuals if levels exceed 50 μg/m³.',
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
				// Only emit if no alert is currently active
				if (!this.isAlertCurrentlyActive()) {
					this.listeners.forEach(listener => listener(suggestion))
				}
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
				title: 'Thermal Optimization Complete',
				message: 'My continuous monitoring indicates optimal thermal conditions at 28.5°C. All systems are operating within ideal parameters, ensuring maximum efficiency and equipment longevity.',
				severity: 'low',
				action: 'I recommend maintaining current environmental settings. The thermal profile is perfectly balanced for your equipment specifications. No immediate adjustments required.',
				icon: '✅',
				timestamp: now,
				parameter: 'Temperature',
				value: 28.5,
				unit: '°C'
			},
			{
				id: `demo-humidity-${Date.now()}`,
				title: 'Environmental Balance Achieved',
				message: 'My analysis confirms humidity levels at 45.2% are within the optimal range for both equipment performance and human comfort. The environmental conditions are well-regulated.',
				severity: 'low',
				action: 'Current humidity management is excellent. I suggest maintaining present settings while continuing to monitor for any seasonal variations that might require adjustment.',
				icon: '💡',
				timestamp: now,
				parameter: 'Humidity',
				value: 45.2,
				unit: '%'
			},
			{
				id: `demo-pressure-${Date.now()}`,
				title: 'Atmospheric Stability Confirmed',
				message: 'My meteorological analysis shows stable atmospheric pressure at 1013.2 hPa, indicating favorable weather conditions and optimal air circulation patterns for the next 24-48 hours.',
				severity: 'low',
				action: 'Environmental conditions are stable. I recommend continuing current monitoring protocols. The pressure trend suggests no immediate weather-related concerns.',
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
