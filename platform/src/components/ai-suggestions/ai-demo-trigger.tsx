import React from 'react'
import { useAISuggestions } from '../../contexts/ai-suggestions-context'
import { aiSuggestionService } from '../../services/ai-suggestions'
import { RiRobotLine, RiRefreshLine } from 'react-icons/ri'

export const AIDemoTrigger: React.FC = () => {
	const { setTelemetryData } = useAISuggestions()

	const triggerDemoSuggestion = () => {
		// Generate a random telemetry data point to trigger suggestions
		const mockTelemetryData = {
			_id: `demo-${Date.now()}`,
			id: `demo-${Date.now()}`,
			timestamp: new Date().toISOString(),
			Temperature: Math.random() * 40 + 10, // 10-50°C
			Humidity: Math.random() * 100, // 0-100%
			TVOC: Math.random() * 2000, // 0-2000 ppb
			eCO2: Math.random() * 1500 + 400, // 400-1900 ppm
			'Raw H2': Math.random() * 100,
			'Raw Ethanol': Math.random() * 100,
			Pressure: Math.random() * 100 + 950, // 950-1050 hPa
			'PM1.0': Math.random() * 100,
			'PM2.5': Math.random() * 100,
			'NC0.5': Math.random() * 100,
			'NC1.0': Math.random() * 100,
			'NC2.5': Math.random() * 100,
			CNT: Math.floor(Math.random() * 1000),
			createdAt: new Date(),
			updatedAt: new Date(),
			machineId: 'demo-machine'
		}

		setTelemetryData(mockTelemetryData)
	}

	const triggerStaticDemo = () => {
		const demoSuggestions = aiSuggestionService.generateDemoSuggestions()
		const randomSuggestion = demoSuggestions[Math.floor(Math.random() * demoSuggestions.length)]
		
		// Manually trigger the suggestion by processing it
		aiSuggestionService.processTelemetryData({
			_id: `demo-${Date.now()}`,
			id: `demo-${Date.now()}`,
			timestamp: new Date().toISOString(),
			Temperature: randomSuggestion.parameter === 'Temperature' ? randomSuggestion.value : 25,
			Humidity: randomSuggestion.parameter === 'Humidity' ? randomSuggestion.value : 50,
			TVOC: randomSuggestion.parameter === 'TVOC' ? randomSuggestion.value : 200,
			eCO2: randomSuggestion.parameter === 'eCO2' ? randomSuggestion.value : 600,
			'Raw H2': 0,
			'Raw Ethanol': 0,
			Pressure: randomSuggestion.parameter === 'Pressure' ? randomSuggestion.value : 1013,
			'PM1.0': 0,
			'PM2.5': 0,
			'NC0.5': 0,
			'NC1.0': 0,
			'NC2.5': 0,
			CNT: 0,
			createdAt: new Date(),
			updatedAt: new Date(),
			machineId: 'demo-machine'
		})
	}

	return (
		<div className="fixed bottom-4 left-4 z-50">
			<div className="bg-white rounded-lg shadow-lg border border-gray-200 p-3">
				<div className="flex items-center space-x-2 mb-2">
					<RiRobotLine className="w-5 h-5 text-primary-500" />
					<span className="text-sm font-medium text-gray-700">AI Demo</span>
				</div>
				<div className="space-y-2">
					<button
						onClick={triggerDemoSuggestion}
						className="w-full px-3 py-2 text-xs font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 transition-colors flex items-center justify-center space-x-1"
					>
						<RiRefreshLine className="w-3 h-3" />
						<span>Trigger AI Analysis</span>
					</button>
					<button
						onClick={triggerStaticDemo}
						className="w-full px-3 py-2 text-xs font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
					>
						Static Demo
					</button>
				</div>
			</div>
		</div>
	)
}
