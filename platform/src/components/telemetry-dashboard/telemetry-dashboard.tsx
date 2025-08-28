import React, { useState, useEffect } from 'react'
import { useTelemetry } from 'hooks/useTelemetry'
import { AnalyticsItem } from 'components/analytics-item'
import { PieCard } from 'components/pie-card'
import { AlertNotification } from 'components/alert-notification'
import { WiBarometer, WiHumidity, WiThermometer } from 'react-icons/wi'
import { FaLeaf, FaWind, FaBell, FaBug, FaTimes, FaSync } from 'react-icons/fa'
import { ThreadTrafficTimeline } from '../../pages/workspace/asset/threat/components/traffic-timeline'
import { getEntriesData } from '../../pages/workspace/asset/threat/utils'
import { Top10 } from '../../pages/workspace/asset/threat/components/top-10'
import { Alert, TelemetryData } from 'services/telemetry'
import { socketService } from 'services/socket'

export const TelemetryDashboard: React.FC = () => {
	const {
		telemetryData,
		latestData,
		alerts,
		loading,
		error,
		isConnected,
		refresh,
		refreshAlerts
	} = useTelemetry()

	const [activeNotifications, setActiveNotifications] = useState<Alert[]>([])
	const [alertsLoading, setAlertsLoading] = useState(false)

	// Handle new alerts and show notifications
	useEffect(() => {
		if (alerts.length > 0) {
			const latestAlert = alerts[0]
			if (!activeNotifications.find(n => n._id === latestAlert._id)) {
				console.log('🚨 Adding new alert notification:', latestAlert)
				setActiveNotifications(prev => [latestAlert, ...prev])
				
				// Auto-remove notification after 10 seconds
				setTimeout(() => {
					setActiveNotifications(prev => prev.filter(n => n._id !== latestAlert._id))
				}, 10000)
			}
		}
	}, [alerts, activeNotifications])

	const closeNotification = (alertId: string) => {
		setActiveNotifications(prev => prev.filter(n => n._id !== alertId))
	}

	const removeAllNotifications = () => {
		setActiveNotifications([])
	}

	const handleRefreshAlerts = async () => {
		setAlertsLoading(true)
		try {
			await refreshAlerts()
		} finally {
			setAlertsLoading(false)
		}
	}

	const testWebSocketConnection = () => {
		console.log('🧪 Testing WebSocket connection...')
		socketService.testConnection()
		console.log('📊 Current telemetry data count:', telemetryData.length)
		console.log('🚨 Current alerts count:', alerts.length)
		console.log('🔌 Connection status:', isConnected)
	}

	const metrics = [
		{
			label: 'Current Temperature',
			key: 'temperature',
			tooltip: 'Current measured temperature (°C)',
			value: latestData?.Temperature || 0,
			icon: WiThermometer,
			unit: '°C'
		},
		{
			label: 'Current Humidity',
			key: 'humidity',
			tooltip: 'Current measured humidity (%)',
			value: latestData?.Humidity || 0,
			icon: WiHumidity,
			unit: '%'
		},
		{
			label: 'Current Pressure',
			key: 'pressure',
			tooltip: 'Current measured atmospheric pressure (hPa)',
			value: latestData?.Pressure || 0,
			icon: WiBarometer,
			unit: 'hPa'
		},
		{
			label: 'Air Quality (eCO2)',
			key: 'eco2',
			tooltip: 'Current measured eCO2 levels (ppm)',
			value: latestData?.['eCO2'] || 0,
			icon: FaWind,
			unit: 'ppm'
		},
		{
			label: 'TVOC',
			key: 'tvoc',
			tooltip: 'Total Volatile Organic Compounds (ppb)',
			value: latestData?.TVOC || 0,
			icon: FaLeaf,
			unit: 'ppb'
		}
	]

	const getAlertsData = () => {
		if (!alerts.length) return []

		const alertsData = alerts.map((alert) => {
			const currentValue = alert.telemetry_data?.[alert.sensor_type as keyof TelemetryData] || 0
			return {
				id: alert._id || Math.random().toString(),
				label: alert.sensor_type,
				value: typeof currentValue === 'number' ? currentValue : 0,
				color: alert.severity === 'critical' ? 'red' : 
					   alert.severity === 'high' ? 'orange' : 
					   alert.severity === 'medium' ? 'yellow' : 'blue'
			}
		})

		return alertsData.slice(0, 5) // Show last 5 alerts
	}

	const getTemperatureData = () => {
		if (!telemetryData.length) return []

		const tempData = telemetryData.map((item) => ({
			id: item._id,
			label: new Date(item.createdAt).toLocaleTimeString(),
			value: item.Temperature,
			color:
				item.Temperature > 25
					? 'red'
					: item.Temperature > 20
					? 'amber'
					: 'primary'
		}))

		return tempData.slice(0, 5) // Show last 5 readings
	}

	const getHumidityData = () => {
		if (!telemetryData.length) return []

		const humidityData = telemetryData.map((item) => ({
			id: item._id,
			label: new Date(item.createdAt).toLocaleTimeString(),
			value: item.Humidity,
			color:
				item.Humidity > 70 ? 'red' : item.Humidity > 40 ? 'amber' : 'primary'
		}))

		return humidityData.slice(0, 5) // Show last 5 readings
	}

	const getAirQualityData = () => {
		if (!telemetryData.length) return []

		const aqiData = telemetryData.map((item) => ({
			id: item._id,
			label: new Date(item.createdAt).toLocaleTimeString(),
			value: item['eCO2'],
			color:
				item['eCO2'] > 600 ? 'red' : item['eCO2'] > 400 ? 'amber' : 'primary'
		}))

		return aqiData.slice(0, 5) // Show last 5 readings
	}

	if (error) {
		return (
			<div className="flex items-center justify-center h-64">
				<div className="text-center">
					<p className="text-red-500 mb-4">{error}</p>
					<button
						onClick={refresh}
						className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
					>
						Retry
					</button>
				</div>
			</div>
		)
	}

	return (
		<div className="flex items-center justify-center flex-col gap-6 w-full">
			{/* Alert Notifications - Stacked with compact spacing */}
			<div className="fixed top-4 right-4 z-50 space-y-2">
				{activeNotifications.map((alert, index) => (
					<div key={alert._id} className="notification-container">
						<AlertNotification
							alert={alert}
							onClose={() => closeNotification(alert._id || '')}
						/>
					</div>
				))}
			</div>

			{/* Remove All Notifications Button - Positioned above notifications */}
			{activeNotifications.length > 1 && (
				<button
					onClick={removeAllNotifications}
					className="fixed top-4 right-4 z-50 px-3 py-1 bg-gray-600 text-white text-xs rounded-full hover:bg-gray-700 transition-colors flex items-center gap-1"
					title="Remove all notifications"
					style={{ transform: 'translateY(-40px)' }}
				>
					<FaTimes className="w-3 h-3" />
					Clear All
				</button>
			)}

			<div className="flex items-center gap-2 text-sm">
				<div
					className={`w-5 h-5 rounded-full ${
						isConnected ? 'bg-green-500' : 'bg-red-500'
					}`}
				/>
				<span
					className={
						isConnected
							? 'text-green-600 font-bold text-base'
							: 'text-red-600 font-bold text-base'
					}
				>
					{isConnected
						? 'Connected to IoT Device'
						: 'Disconnected from IoT Device'}
				</span>
				
				{/* Alerts Counter */}
				{alerts.length > 0 && (
					<div className="flex items-center gap-2 ml-4">
						<FaBell className="text-red-500" />
						<span className="text-red-600 font-semibold">
							{alerts.length} Active Alerts
						</span>
					</div>
				)}
			</div>

			<div className="flex py-2 items-stretch bg-white rounded-lg divide-x border border-card-border w-full">
				{metrics.map((metric, index) => {
					const IconComponent = metric.icon
					return (
						<AnalyticsItem
							key={index}
							assetId={'assetId'}
							metrics={metrics}
							format="comma"
							label={metric.label}
							showMetricSelector={false}
							value={metric.value}
							change={0}
							infoTooltip={
								<div className="flex flex-col items-center">
									<IconComponent className="w-6 h-6 mb-2" />
									<span>{metric.tooltip}</span>
									<span className="text-lg font-bold">
										{metric.value} {metric.unit}
									</span>
								</div>
							}
						/>
					)
				})}
			</div>

			{/* Charts Grid */}
			<div className="grid grid-cols-3 items-center gap-6 w-full h-[400px]">
				<div className="h-full">
					<div className="flex items-center justify-between mb-2">
						<h3 className="text-lg font-semibold">Active Alerts by Sensor</h3>
						<button
							onClick={handleRefreshAlerts}
							disabled={alertsLoading}
							className="p-1 text-gray-500 hover:text-gray-700 transition-colors disabled:opacity-50"
							title="Refresh alerts"
						>
							<FaSync className={`w-4 h-4 ${alertsLoading ? 'animate-spin' : ''}`} />
						</button>
					</div>
					<PieCard
						containerClassName="h-full"
						data={getAlertsData()}
						label="Active Alerts by Sensor"
						hasData={alerts.length > 0}
						infoTooltip={
							<div className="flex flex-col">
								<p>Recent alerts by sensor type and severity</p>
								<p className="text-xs text-gray-500">
									Red: Critical, Orange: High, Yellow: Medium, Blue: Low
								</p>
								<p className="text-xs text-gray-400 mt-2">
									Shows last 5 alerts from API + real-time updates
								</p>
							</div>
						}
					/>
				</div>
				<div className="col-span-2 h-full">
					<ThreadTrafficTimeline telemetryData={telemetryData} />
				</div>
			</div>

			<div className="grid grid-cols-3 items-center gap-6 w-full h-[400px]">
				<div className="h-full">
					<PieCard
						containerClassName="h-full"
						data={getEntriesData()}
						label="Sensor Categories"
						hasData={true}
						infoTooltip={
							<div className="flex flex-col">
								<p>Temperature, Humidity, Air Quality</p>
							</div>
						}
					/>
				</div>
				<div className="col-span-2 h-full">
					<Top10 telemetryData={telemetryData} />
				</div>
			</div>

			<div className="grid grid-cols-3 items-center gap-6 w-full h-[400px]">
				<div className="h-full">
					<PieCard
						containerClassName="h-full"
						data={getTemperatureData()}
						label="Real-time Temperature Trend"
						hasData={telemetryData.length > 0}
						infoTooltip={
							<div className="flex flex-col">
								<p>Real-time temperature measurements</p>
								<p className="text-xs text-gray-500">
									Green: Optimal, Yellow: Warm, Red: Hot
								</p>
							</div>
						}
					/>
				</div>
				<div className="h-full">
					<PieCard
						containerClassName="h-full"
						data={getHumidityData()}
						label="Real-time Humidity Trend"
						hasData={telemetryData.length > 0}
						infoTooltip={
							<div className="flex flex-col">
								<p>Real-time humidity measurements</p>
								<p className="text-xs text-gray-500">
									Green: Optimal, Yellow: Low, Red: High
								</p>
							</div>
						}
					/>
				</div>
				<div className="h-full">
					<PieCard
						containerClassName="h-full"
						data={getAirQualityData()}
						label="Real-time Air Quality (eCO2)"
						hasData={telemetryData.length > 0}
						infoTooltip={
							<div className="flex flex-col">
								<p>Real-time eCO2 measurements</p>
								<p className="text-xs text-gray-500">
									Green: Good, Yellow: Moderate, Red: Poor
								</p>
							</div>
						}
					/>
				</div>
			</div>

			{/* Device Status Panel */}
			<div className="w-full bg-white p-6 rounded-lg border">
				<h3 className="text-xl font-semibold mb-4">Device Status & Raw Sensor Data</h3>
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
					<div className="text-center p-3 bg-gray-50 rounded">
						<span className="text-sm text-gray-600">PM1.0</span>
						<p className="text-lg font-semibold">
							{latestData?.['PM1.0']?.toFixed(2) || 0} μg/m³
						</p>
					</div>
					<div className="text-center p-3 bg-gray-50 rounded">
						<span className="text-sm text-gray-600">PM2.5</span>
						<p className="text-lg font-semibold">
							{latestData?.['PM2.5']?.toFixed(2) || 0} μg/m³
						</p>
					</div>
					<div className="text-center p-3 bg-gray-50 rounded">
						<span className="text-sm text-gray-600">Raw H2</span>
						<p className="text-lg font-semibold">
							{latestData?.['Raw H2']?.toLocaleString() || 0}
						</p>
					</div>
					<div className="text-center p-3 bg-gray-50 rounded">
						<span className="text-sm text-gray-600">Raw Ethanol</span>
						<p className="text-lg font-semibold">
							{latestData?.['Raw Ethanol']?.toLocaleString() || 0}
						</p>
					</div>
					<div className="text-center p-3 bg-gray-50 rounded">
						<span className="text-sm text-gray-600">NC0.5</span>
						<p className="text-lg font-semibold">
							{latestData?.['NC0.5']?.toFixed(2) || 0}
						</p>
					</div>
					<div className="text-center p-3 bg-gray-50 rounded">
						<span className="text-sm text-gray-600">NC1.0</span>
						<p className="text-lg font-semibold">
							{latestData?.['NC1.0']?.toFixed(2) || 0}
						</p>
					</div>
					<div className="text-center p-3 bg-gray-50 rounded">
						<span className="text-sm text-gray-600">NC2.5</span>
						<p className="text-lg font-semibold">
							{latestData?.['NC2.5']?.toFixed(2) || 0}
						</p>
					</div>
					<div className="text-center p-3 bg-gray-50 rounded">
						<span className="text-sm text-gray-600">CNT</span>
						<p className="text-lg font-semibold">
							{latestData?.CNT || 0}
						</p>
					</div>
				</div>
			</div>

			{/* Debug Button */}
			<button
				onClick={testWebSocketConnection}
				className="fixed bottom-4 right-4 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
				title="Test WebSocket Connection"
			>
				<FaBug className="w-6 h-6" />
			</button>
		</div>
	)
}
