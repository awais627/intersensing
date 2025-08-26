import { GSection } from 'components/basic-blocks'
import { GNewTooltip } from 'components/basic-blocks/g-tooltip/g-new-tooltip'
import { RiGlobalLine, RiQuestionLine } from 'react-icons/ri'
import { top10Options } from '../../constants'
import { PercentageBadge } from '../../../../../../components/analytics-item/percentage-badge'
import { AvailableMetrics } from '../repeated-clicks-panel/available-metrics'

export const Top10 = () => {
	const demoTop10Type = top10Options[0]

	// demo static data
	const demoData = [
		{ entity: 'Temperature', type: 'countries', rate: '20.11 °C' },
		{ entity: 'Humidity', type: 'deviceTypes', rate: '52.81 %' },
		{ entity: 'TVOC', type: 'ipTypes', rate: '400 ppm' },
		{ entity: 'eCO2', type: 'campaigns', rate: '0 ppb' },
		{ entity: 'Pressure', type: 'countries', rate: '939.75 hPa' }
	]

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
				{demoData.map((item) => (
					<TopStatsItem key={item.entity} current={item} />
				))}
			</div>
		</GSection>
	)
}

export const TopStatsItem = (props: {
	current: {
		entity: string
		type: string
		rate: number | string
		adPlatform?: string
	}
}) => {
	const { current } = props

	return (
		<div className="flex justify-between pt-4 pr-6" key={current.entity}>
			<div className="flex items-center gap-2">
				<div className="!text-t-default">
					<TopItemIcon item={current} />
				</div>

				<div className="flex flex-col">
					<span className="text-t-default">{topItemName(current)}</span>
					<span className="text-sm text-t-secondary">
						{topItemTypeLabel(current)}
					</span>
				</div>
			</div>
			<div className="flex items-center gap-2">
				<span className="text-t-default font-bold">{current.rate}%</span>
				<PercentageBadge change={+2} />
			</div>
		</div>
	)
}

const TopItemIcon = (props: { item: { type: string; entity: string } }) => {
	const { item } = props
	const { type } = item

	if (type === 'deviceTypes') return <span>📱</span>
	if (type === 'ipTypes') return <span>🌐</span>
	if (type === 'countries')
		return <RiGlobalLine className="h-4 w-4 text-t-default" />
	if (type === 'campaigns') return <span>🎯</span>
	return <RiQuestionLine className="h-4 w-4 text-t-default" />
}

const topItemName = (item: { type: string; entity: string }) => {
	if (item.type === 'deviceTypes') return item.entity + ' traffic'
	if (item.type === 'ipTypes') return item.entity + ' traffic'
	if (item.type === 'countries') return item.entity
	return item.entity
}

const topItemTypeLabel = (item: { type: string }) => {
	if (item.type === 'deviceTypes') return 'Device type'
	if (item.type === 'ipTypes') return 'IP type'
	if (item.type === 'countries') return 'Country'
	if (item.type === 'campaigns') return 'Campaign'
	return 'Other'
}
