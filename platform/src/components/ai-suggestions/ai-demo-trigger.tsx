import React from 'react'
import { useAISuggestions } from '../../contexts/ai-suggestions-context'
import { aiSuggestionService } from '../../services/ai-suggestions'
import { RiRefreshLine, RiRobotLine } from 'react-icons/ri'

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
		const randomSuggestion =
			demoSuggestions[Math.floor(Math.random() * demoSuggestions.length)]

		// Manually trigger the suggestion by processing it
		aiSuggestionService.processTelemetryData({
			_id: `demo-${Date.now()}`,
			id: `demo-${Date.now()}`,
			timestamp: new Date().toISOString(),
			Temperature:
				randomSuggestion.parameter === 'Temperature'
					? randomSuggestion.value
					: 25,
			Humidity:
				randomSuggestion.parameter === 'Humidity' ? randomSuggestion.value : 50,
			TVOC:
				randomSuggestion.parameter === 'TVOC' ? randomSuggestion.value : 200,
			eCO2:
				randomSuggestion.parameter === 'eCO2' ? randomSuggestion.value : 600,
			'Raw H2': 0,
			'Raw Ethanol': 0,
			Pressure:
				randomSuggestion.parameter === 'Pressure'
					? randomSuggestion.value
					: 1013,
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
		<div className="fixed bottom-[200px] left-4 z-50">
			<div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-xl shadow-2xl border border-slate-700 p-4 backdrop-blur-sm">
				<div className="flex items-center space-x-3 mb-3">
					<div className="relative">
						<div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
							<RiRobotLine className="w-5 h-5 text-white" />
						</div>
						<div className="absolute inset-0 rounded-full border-2 border-blue-400 animate-ping opacity-30"></div>
					</div>
					<div>
						<span className="text-sm font-semibold text-white">
							AI Assistant
						</span>
						<p className="text-xs text-slate-400">Controls</p>
					</div>
				</div>
				<div className="space-y-2">
					<button
						onClick={triggerDemoSuggestion}
						className="w-full px-4 py-2 text-xs font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
					>
						<RiRefreshLine className="w-3 h-3" />
						<span>Run AI Analysis</span>
					</button>
					<button
						onClick={triggerStaticDemo}
						className="w-full px-4 py-2 text-xs font-medium text-slate-300 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
					>
						Response
					</button>
				</div>
				<div className="mt-3 pt-2 border-t border-slate-700">
					<div className="flex items-center space-x-2">
						<div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
						<span className="text-xs text-green-400 font-medium">
							AI ACTIVE
						</span>
					</div>
				</div>
			</div>
		</div>
	)
}
