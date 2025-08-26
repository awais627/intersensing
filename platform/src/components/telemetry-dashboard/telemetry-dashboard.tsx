import React from 'react'
import { useTelemetry } from 'hooks/useTelemetry'
import { AnalyticsItem } from 'components/analytics-item'
import { PieCard } from 'components/pie-card'
import { CgSpinner } from 'react-icons/cg'
import { WiBarometer, WiHumidity, WiThermometer } from 'react-icons/wi'
import { FaLeaf, FaWind } from 'react-icons/fa'
import { ThreadTrafficTimeline } from '../../pages/workspace/asset/threat/components/traffic-timeline'

export const TelemetryDashboard: React.FC = () => {
	const {
		telemetryData,
		latestData,
		loading,
		error,
		isConnected,
		generateMockData,
		refresh
	} = useTelemetry()

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
			{/* Connection Status */}
			<div className="flex items-center gap-2 text-sm">
				<div
					className={`w-3 h-3 rounded-full ${
						isConnected ? 'bg-green-500' : 'bg-red-500'
					}`}
				/>
				<span className={isConnected ? 'text-green-600' : 'text-red-600'}>
					{isConnected
						? 'Connected to IoT Device'
						: 'Disconnected from IoT Device'}
				</span>
			</div>

			{/* Control Buttons */}
			<div className="flex gap-4">
				<button
					onClick={generateMockData}
					disabled={loading}
					className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
				>
					{loading ? (
						<CgSpinner className="w-4 h-4 animate-spin" />
					) : (
						'Generate Mock Data'
					)}
				</button>
				<button
					onClick={refresh}
					disabled={loading}
					className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
				>
					{loading ? <CgSpinner className="w-4 h-4 animate-spin" /> : 'Refresh'}
				</button>
			</div>

			{/* Metrics Dashboard */}
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
						data={getAirQualityData()}
						label="Air Quality (eCO2) Trend"
						hasData={telemetryData.length > 0}
						infoTooltip={
							<div className="flex flex-col">
								<p>Recent eCO2 measurements over time</p>
								<p className="text-xs text-gray-500">
									Green: Good, Yellow: Moderate, Red: Poor
								</p>
							</div>
						}
					/>
				</div>
				<div className="col-span-2 h-full">
					<ThreadTrafficTimeline telemetryData={telemetryData} />
				</div>
				{/*<div className="col-span-2 h-full">*/}
				{/*	<div className="bg-white p-4 rounded-lg border h-full">*/}
				{/*		<h3 className="text-lg font-semibold mb-4">*/}
				{/*			Recent Telemetry Data*/}
				{/*		</h3>*/}
				{/*		<div className="space-y-2 max-h-80 overflow-y-auto">*/}
				{/*			{telemetryData.slice(0, 10).map((item, index) => (*/}
				{/*				<div*/}
				{/*					key={item._id}*/}
				{/*					className="flex justify-between items-center p-2 bg-gray-50 rounded"*/}
				{/*				>*/}
				{/*					<span className="text-sm text-gray-600">*/}
				{/*						{new Date(item.createdAt).toLocaleString()}*/}
				{/*					</span>*/}
				{/*					<div className="flex gap-4 text-sm">*/}
				{/*						<span>🌡️ {item.Temperature.toFixed(1)}°C</span>*/}
				{/*						<span>💧 {item.Humidity.toFixed(1)}%</span>*/}
				{/*						<span>🌬️ {item['eCO2']} ppm</span>*/}
				{/*					</div>*/}
				{/*				</div>*/}
				{/*			))}*/}
				{/*		</div>*/}
				{/*	</div>*/}
				{/*</div>*/}
			</div>

			<div className="grid grid-cols-3 items-center gap-6 w-full h-[400px]">
				<div className="h-full">
					<PieCard
						containerClassName="h-full"
						data={getTemperatureData()}
						label="Temperature Trend"
						hasData={telemetryData.length > 0}
						infoTooltip={
							<div className="flex flex-col">
								<p>Recent temperature measurements</p>
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
						label="Humidity Trend"
						hasData={telemetryData.length > 0}
						infoTooltip={
							<div className="flex flex-col">
								<p>Recent humidity measurements</p>
								<p className="text-xs text-gray-500">
									Green: Optimal, Yellow: Low, Red: High
								</p>
							</div>
						}
					/>
				</div>
				<div className="h-full">
					<div className="bg-white p-4 rounded-lg border h-full">
						<h3 className="text-lg font-semibold mb-4">Device Status</h3>
						<div className="space-y-3">
							<div className="flex justify-between">
								<span>PM1.0:</span>
								<span className="font-semibold">
									{latestData?.['PM1.0']?.toFixed(2) || 0} μg/m³
								</span>
							</div>
							<div className="flex justify-between">
								<span>PM2.5:</span>
								<span className="font-semibold">
									{latestData?.['PM2.5']?.toFixed(2) || 0} μg/m³
								</span>
							</div>
							<div className="flex justify-between">
								<span>Raw H2:</span>
								<span className="font-semibold">
									{latestData?.['Raw H2']?.toLocaleString() || 0}
								</span>
							</div>
							<div className="flex justify-between">
								<span>Raw Ethanol:</span>
								<span className="font-semibold">
									{latestData?.['Raw Ethanol']?.toLocaleString() || 0}
								</span>
							</div>
							<div className="flex justify-between">
								<span>CNT:</span>
								<span className="font-semibold">{latestData?.CNT || 0}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
