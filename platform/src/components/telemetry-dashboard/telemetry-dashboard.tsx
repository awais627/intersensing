import React, { useEffect, useState } from 'react'
import { useTelemetry } from 'hooks/useTelemetry'
import { AnalyticsItem } from 'components/analytics-item'
import { PieCard } from 'components/pie-card'
import { WiBarometer, WiHumidity, WiThermometer } from 'react-icons/wi'
import { FaLeaf, FaWind } from 'react-icons/fa'
import { ThreadTrafficTimeline } from '../../pages/workspace/asset/threat/components/traffic-timeline'
import { Top10 } from '../../pages/workspace/asset/threat/components/top-10'
import { Alert } from 'services/telemetry'
import { socketService } from 'services/socket'
import { RepeatedClicksPanel } from '../../pages/workspace/asset/threat/components/repeated-clicks-panel'

export const TelemetryDashboard: React.FC = () => {
	const {
		telemetryData,
		latestData,
		alerts,
		loading,
		error,
		isConnected,
		refresh,
		refreshAlerts,
		machineCounts,
		alertCounts,
		topOffenders
	} = useTelemetry()

	const [activeNotifications, setActiveNotifications] = useState<Alert[]>([])
	const [alertsLoading, setAlertsLoading] = useState(false)

	// Handle new alerts and show notifications
	useEffect(() => {
		if (alerts.length > 0) {
			const latestAlert = alerts[0]
			if (!activeNotifications.find((n) => n._id === latestAlert._id)) {
				console.log('🚨 Adding new alert notification:', latestAlert)
				setActiveNotifications((prev) => [latestAlert, ...prev])

				// Auto-remove notification after 10 seconds
				setTimeout(() => {
					setActiveNotifications((prev) =>
						prev.filter((n) => n._id !== latestAlert._id)
					)
				}, 10000)
			}
		}
	}, [alerts, activeNotifications])

	const closeNotification = (alertId: string) => {
		setActiveNotifications((prev) => prev.filter((n) => n._id !== alertId))
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

	const getTemperatureData = () => {
		if (!topOffenders?.topParameters) return []

		const tempParameter = topOffenders.topParameters.find(
			(p) => p.parameter === 'Temperature'
		)
		if (!tempParameter) return []

		return [
			{
				id: 'Critical',
				label: 'Critical',
				value: tempParameter.critical,
				color: 'orange',
				variant: '900'
			},
			{
				id: 'High',
				label: 'High',
				value: tempParameter.high,
				color: 'orange',
				variant: '800'
			},
			{
				id: 'Medium',
				label: 'Medium',
				value: tempParameter.medium,
				color: 'orange',
				variant: '700'
			},
			{
				id: 'Low',
				label: 'Low',
				value: tempParameter.low,
				color: 'orange',
				variant: '600'
			}
		]
	}

	const getHumidityData = () => {
		if (!topOffenders?.topParameters) return []

		const humidityParameter = topOffenders.topParameters.find(
			(p) => p.parameter === 'Humidity'
		)
		if (!humidityParameter) return []

		return [
			{
				id: 'Critical',
				label: 'Critical',
				value: humidityParameter.critical,
				color: 'orange',
				variant: '900'
			},
			{
				id: 'High',
				label: 'High',
				value: humidityParameter.high,
				color: 'orange',
				variant: '800'
			},
			{
				id: 'Medium',
				label: 'Medium',
				value: humidityParameter.medium,
				color: 'orange',
				variant: '700'
			},
			{
				id: 'Low',
				label: 'Low',
				value: humidityParameter.low,
				color: 'orange',
				variant: '600'
			}
		]
	}

	const getAirQualityData = () => {
		if (!topOffenders?.topParameters) return []

		const eco2Parameter = topOffenders.topParameters.find(
			(p) => p.parameter === 'eCO2'
		)
		if (!eco2Parameter) return []

		return [
			{
				id: 'Critical',
				label: 'Critical',
				value: eco2Parameter.critical,
				color: 'orange',
				variant: '900'
			},
			{
				id: 'High',
				label: 'High',
				value: eco2Parameter.high,
				color: 'orange',
				variant: '800'
			},
			{
				id: 'Medium',
				label: 'Medium',
				value: eco2Parameter.medium,
				color: 'orange',
				variant: '700'
			},
			{
				id: 'Low',
				label: 'Low',
				value: eco2Parameter.low,
				color: 'orange',
				variant: '600'
			}
		]
	}

	const getMachineCountsData = () => {
		if (
			!topOffenders?.topMachines ||
			!Array.isArray(topOffenders.topMachines) ||
			topOffenders.topMachines.length === 0
		) {
			return [
				{
					id: 'No Data',
					value: 0,
					color: 'gray',
					variant: '900'
				}
			]
		}

		// Convert top machines to the format expected by PieCard
		return topOffenders.topMachines.map((machine, index) => ({
			id: machine.machineId,
			value: machine.total,
			color: 'red',
			variant: (700 - index * 100 > 0
				? 700 - index * 100
				: 100
			).toLocaleString()
		}))
	}

	const getAlertCountsData = () => {
		if (
			!alertCounts?.data ||
			!Array.isArray(alertCounts.data) ||
			alertCounts.data.length === 0
		) {
			return [
				{
					id: 'No Alerts',
					value: 0,
					color: 'gray',
					variant: '900'
				}
			]
		}

		// Convert alert counts to the format expected by PieCard
		return alertCounts.data.map((alertCount) => ({
			id: alertCount.type.charAt(0).toUpperCase() + alertCount.type.slice(1),
			value: alertCount.count,
			color:
				alertCount.type === 'critical'
					? 'red'
					: alertCount.type === 'high'
					? 'orange'
					: alertCount.type === 'medium'
					? 'yellow'
					: alertCount.type === 'low'
					? 'blue'
					: 'green',
			variant: '900'
		}))
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
					<PieCard
						containerClassName="h-full"
						data={getAlertCountsData()}
						label="Active Alerts by Severity"
						hasData={
							alertCounts?.data &&
							Array.isArray(alertCounts.data) &&
							alertCounts.data.length > 0
						}
						infoTooltip={
							<div className="flex flex-col">
								<p>Real-time alert counts by severity level</p>
								<p className="text-xs text-gray-500">
									Red: Critical, Orange: High, Yellow: Medium, Blue: Low, Green:
									Warning
								</p>
								<p className="text-xs text-gray-400 mt-2">
									Updates automatically via WebSocket when new alerts arrive
								</p>
								<p className="text-xs text-blue-500 mt-1">
									Click refresh button to manually update counts
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
				<div className="col-span-1 h-full">
					<RepeatedClicksPanel data={topOffenders} />
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
						label="Temperature Alert Count"
						hasData={
							topOffenders?.topParameters &&
							topOffenders.topParameters.length > 0
						}
						totalValue={
							topOffenders?.topParameters &&
							topOffenders.topParameters.length > 0
								? (
										topOffenders.topParameters.find(
											(p) => p.parameter === 'Temperature'
										)?.total || 0
								  ).toString()
								: '0'
						}
						infoTooltip={
							<div className="flex flex-col">
								<p>Total temperature alerts across all machines</p>
								<p className="text-xs text-gray-500">
									Center shows total temperature alerts
								</p>
								<p className="text-xs text-gray-500">Red: High alert count</p>
								<p className="text-xs text-blue-500 mt-1">
									Data from top-offenders API
								</p>
							</div>
						}
					/>
				</div>
				<div className="h-full">
					<PieCard
						containerClassName="h-full"
						data={getHumidityData()}
						label="Humidity Alert Count"
						hasData={
							topOffenders?.topParameters &&
							topOffenders.topParameters.length > 0
						}
						totalValue={
							topOffenders?.topParameters &&
							topOffenders.topParameters.length > 0
								? (
										topOffenders.topParameters.find(
											(p) => p.parameter === 'Humidity'
										)?.total || 0
								  ).toString()
								: '0'
						}
						infoTooltip={
							<div className="flex flex-col">
								<p>Total humidity alerts across all machines</p>
								<p className="text-xs text-gray-500">
									Center shows total humidity alerts
								</p>
								<p className="text-xs text-gray-500">Blue: High alert count</p>
								<p className="text-xs text-blue-500 mt-1">
									Data from top-offenders API
								</p>
							</div>
						}
					/>
				</div>
				<div className="h-full">
					<PieCard
						containerClassName="h-full"
						data={getAirQualityData()}
						label="eCO2 Alert Count"
						hasData={
							topOffenders?.topParameters &&
							topOffenders.topParameters.length > 0
						}
						totalValue={
							topOffenders?.topParameters &&
							topOffenders.topParameters.length > 0
								? (
										topOffenders.topParameters.find(
											(p) => p.parameter === 'eCO2'
										)?.total || 0
								  ).toString()
								: '0'
						}
						infoTooltip={
							<div className="flex flex-col">
								<p>Total eCO2 alerts across all machines</p>
								<p className="text-xs text-gray-500">
									Center shows total eCO2 alerts
								</p>
								<p className="text-xs text-gray-500">
									Orange: High alert count
								</p>
								<p className="text-xs text-blue-500 mt-1">
									Data from top-offenders API
								</p>
							</div>
						}
					/>
				</div>
			</div>
		</div>
	)
}
