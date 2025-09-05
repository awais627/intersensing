import { GSection } from 'components/basic-blocks'
import { GNewTooltip } from 'components/basic-blocks/g-tooltip/g-new-tooltip'
import { RiQuestionLine } from 'react-icons/ri'
import { top10Options } from '../../constants'
import { PercentageBadge } from '../../../../../../components/analytics-item/percentage-badge'
import { AvailableMetrics } from '../repeated-clicks-panel/available-metrics'
import { TelemetryData } from '../../../../../../services/telemetry'

// Helper function to format numbers with appropriate precision
const formatNumber = (value: number, unit: string): string => {
	if (!value) return `${0} ${unit}`
	if (unit === '°C' || unit === 'hPa') {
		return `${value.toFixed(2)} ${unit}`
	}
	if (unit === '%') {
		return `${value.toFixed(1)} ${unit}`
	}
	if (unit === 'ppm' || unit === 'ppb') {
		return `${value.toFixed(0)} ${unit}`
	}
	if (unit === 'μg/m³') {
		return `${value.toFixed(2)} ${unit}`
	}
	if (unit === '#') {
		return `${value.toFixed(0)} ${unit}`
	}
	return `${value} ${unit}`
}

export const Top10 = ({
	telemetryData
}: {
	telemetryData: TelemetryData[]
}) => {
	const demoTop10Type = top10Options[0]

	// Transform telemetry data to match the expected format
	const transformedData = telemetryData.slice(0, 10).map((item, index) => {
		// Get the most recent values for each metric
		const metrics = [
			{ name: 'Temperature', value: item.Temperature, unit: '°C' },
			{ name: 'Humidity', value: item.Humidity, unit: '%' },
			{ name: 'TVOC', value: item.TVOC, unit: 'ppm' },
			{ name: 'eCO2', value: item.eCO2, unit: 'ppb' },
			{ name: 'Pressure', value: item.Pressure, unit: 'hPa' },
			{ name: 'PM1.0', value: item['PM1.0'], unit: 'μg/m³' },
			{ name: 'PM2.5', value: item['PM2.5'], unit: 'μg/m³' },
			{ name: 'Raw H2', value: item['Raw H2'], unit: 'ppm' },
			{ name: 'Raw Ethanol', value: item['Raw Ethanol'], unit: 'ppm' },
			{ name: 'CNT', value: item.CNT, unit: '#' }
		]

		// Select a metric based on index to show variety
		const selectedMetric = metrics[index % metrics.length]

		return {
			entity: selectedMetric.name,
			type: getTypeForMetric(selectedMetric.name),
			rate: formatNumber(selectedMetric?.value, selectedMetric?.unit),
			timestamp: item.timestamp
		}
	})

	return (
		<GSection containerClassName="-mb-6 h-full" loading={false}>
			<div className="flex flex-col items-start mb-2 4xl:flex-row 4xl:justify-between 4xl:items-center ">
				<div className="text-gray-500 text-md flex flex-row items-center gap-x-1">
					<div className="text-xl font-bold text-t-default ">
						Table of last 10 telemetry records
					</div>
					<GNewTooltip content="List of top 10 entities with highest fraud rate (% of bad clicks)">
						<RiQuestionLine className="w-3.5 h-3.5 text-t-dark" />
					</GNewTooltip>
				</div>
				<div>
					<AvailableMetrics
						availableMetrics={top10Options}
						selectedMetric={demoTop10Type}
						setSelectedMetric={() => {}}
						assetId=""
						page="threat"
						card="top10"
					/>
				</div>
			</div>
			<div className="flex flex-col gap-2 divide-y divide-t-border-gray-100 h-[300px] flex-wrap">
				{transformedData.length > 0 ? (
					transformedData.map((item, index) => (
						<TopStatsItem key={`${item.entity}-${index}`} current={item} />
					))
				) : (
					<div className="flex items-center justify-center h-full text-t-secondary">
						No telemetry data available
					</div>
				)}
			</div>
		</GSection>
	)
}

// Helper function to determine type for each metric
const getTypeForMetric = (metricName: string): string => {
	if (['Temperature', 'Humidity', 'Pressure'].includes(metricName))
		return 'environmental'
	if (['TVOC', 'eCO2', 'Raw H2', 'Raw Ethanol'].includes(metricName))
		return 'airQuality'
	if (['PM1.0', 'PM2.5', 'NC0.5', 'NC1.0', 'NC2.5'].includes(metricName))
		return 'particulate'
	return 'sensor'
}

export const TopStatsItem = (props: {
	current: {
		entity: string
		type: string
		rate: number | string
		adPlatform?: string
		timestamp?: string
	}
}) => {
	const { current } = props

	return (
		<div className="flex justify-between pt-4 pr-6" key={current.entity}>
			<div className="flex items-center gap-2">
				{/*<div className="!text-t-default">*/}
				{/*	<TopItemIcon item={current} />*/}
				{/*</div>*/}

				<div className="flex flex-col">
					<span className="text-t-default">{topItemName(current)}</span>
					<span className="text-sm text-t-secondary">
						{topItemTypeLabel(current)}
					</span>
				</div>
			</div>
			<div className="flex items-center gap-2">
				<span className="text-t-default font-bold">{current.rate}</span>
				<PercentageBadge change={+2} />
			</div>
		</div>
	)
}

const TopItemIcon = (props: { item: { type: string; entity: string } }) => {
	const { item } = props
	const { type } = item

	if (type === 'particulate') return <span>🌫️</span>
	if (type === 'airQuality') return <span>💨</span>
	if (type === 'environmental') return <span>🌡️</span>
	if (type === 'sensor') return <span>📊</span>
	return <RiQuestionLine className="h-4 w-4 text-t-default" />
}

const topItemName = (item: { type: string; entity: string }) => {
	if (item.type === 'particulate') return item.entity + ' sensor'
	if (item.type === 'airQuality') return item.entity + ' monitor'
	if (item.type === 'environmental') return item.entity + ' reading'
	if (item.type === 'sensor') return item.entity + ' data'
	return item.entity
}

const topItemTypeLabel = (item: { type: string }) => {
	if (item.type === 'particulate') return 'Particulate Matter'
	if (item.type === 'airQuality') return 'Air Quality'
	if (item.type === 'environmental') return 'Environmental'
	if (item.type === 'sensor') return 'Sensor Data'
	return 'Other'
}
