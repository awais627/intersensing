import { GSection } from 'components/basic-blocks'
import { GNewTooltip } from 'components/basic-blocks/g-tooltip/g-new-tooltip'
import { BarChart } from 'components/charts/bar-chart'
import { RiQuestionLine } from 'react-icons/ri'
import { useState } from 'react'
import { repeatedClicksFilterOptions } from '../../constants'
import { AvailableMetrics } from './available-metrics'

export const RepeatedClicksPanel = () => {
	const [type, setType] = useState(repeatedClicksFilterOptions[0])

	// demo static data
	const demoRepeatedIps = [
		{ number: '2', count: 40 },
		{ number: '3', count: 25 },
		{ number: '4', count: 10 },
		{ number: '5+', count: 5 }
	]

	const demoRepeatedDevices = [
		{ number: '2', count: 60 },
		{ number: '3', count: 35 },
		{ number: '4', count: 15 },
		{ number: '5+', count: 7 }
	]

	const chartData = type.type === 'ip' ? demoRepeatedIps : demoRepeatedDevices

	return (
		<GSection containerClassName="-mb-6" loading={false}>
			<div className="h-full relative">
				<div className="flex items-center justify-between pb-6">
					<div className="text-t-default flex flex-row items-center gap-x-1">
						<span className="font-bold text-xl ">Repeated clicks</span>
						<GNewTooltip content="Breakdown of how many IPs/Devices have clicked on an ad multiple times">
							<RiQuestionLine className="w-3 h-3 text-t-default" />
						</GNewTooltip>
					</div>
					<AvailableMetrics
						availableMetrics={repeatedClicksFilterOptions}
						selectedMetric={type}
						setSelectedMetric={setType}
						assetId=""
						page="threat"
						card="sourceMap"
					/>
				</div>

				<div className="flex flex-col gap-2">
					<div className="mb-4">
						<BarChart
							data={chartData}
							index="number"
							layout="vertical"
							containerClassName="h-[294px]"
							leftPadding={40}
							barPadding={0.9}
							hideAxisLeft={false}
							keys={['count']}
							tooltip={(data) => (
								<>
									<span>{data.number} click(s): </span>
									<span className="font-semibold">
										{Number(data.count).toLocaleString()}{' '}
										{type.type === 'ip' ? 'IP addresses' : 'Devices'}
									</span>
								</>
							)}
						/>
					</div>
				</div>
				<span className="text-sm absolute right-0 bottom-[12px]">Clicks</span>
			</div>
		</GSection>
	)
}
