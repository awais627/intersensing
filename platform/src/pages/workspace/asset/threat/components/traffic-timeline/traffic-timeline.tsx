import React, { useMemo, useState } from 'react'
import { classNames } from 'utils'
import { GSection, GTooltip } from 'components/basic-blocks'
import { LineChart } from 'components/charts/line-chart'
import { RiErrorWarningLine, RiQuestionLine } from 'react-icons/ri'
import { cardFilterOptions } from '../../constants'
import { AvailableMetrics } from '../repeated-clicks-panel/available-metrics'

export const ThreadTrafficTimeline = () => {
	const [type, setType] = useState<'DAY' | 'WEEK' | 'MONTH'>('DAY')
	const [selectedMetric, setSelectedMetric] = useState<{
		name: string
		type: string
	}>(cardFilterOptions[0])

	// demo timeline data
	const demoData = [
		{
			id: 'Suspicious clicks',
			data: [
				{ x: '2025-08-20', y: 12 },
				{ x: '2025-08-21', y: 25 },
				{ x: '2025-08-22', y: 18 }
			]
		},
		{
			id: 'Bad clicks',
			data: [
				{ x: '2025-08-20', y: 5 },
				{ x: '2025-08-21', y: 8 },
				{ x: '2025-08-22', y: 6 }
			]
		}
	]

	const { organizedTimelineData, timelineColors } = useMemo(() => {
		const exclusions = demoData.filter((d) => d.id === 'Suspicious clicks')
		const conversions = demoData.filter((d) => d.id === 'Bad clicks')
		return {
			organizedTimelineData:
				selectedMetric.type === 'bad' ? conversions : exclusions,
			timelineColors: [
				selectedMetric.type === 'bad'
					? { color: 'red', shade: 500 }
					: { color: 'amber', shade: 500 }
			]
		}
	}, [selectedMetric])

	const timelineDataValueFormatter = (value: number) => value.toLocaleString()

	const emptyState = (
		<div className="flex flex-col items-center justify-center w-full p-8 text-center">
			<RiErrorWarningLine className="w-8 h-8 text-gray-500" />
			<h3 className="mt-2 text-md font-medium text-gray-700">
				No traffic data
			</h3>
			<p className="mt-1 text-md text-gray-500">
				Select a different time period
			</p>
		</div>
	)

	return (
		<div>
			<GSection containerClassName="border border-card-border h-[400px] -mb-6">
				<div className="flex justify-between items-center h-full">
					<div className="flex flex-row items-center gap-x-1 text-xl font-bold">
						Traffic timeline
						<GTooltip
							content={
								<div className="flex flex-col font-normal">
									Timeline of daily number of{' '}
									{selectedMetric.name.toLowerCase()}
								</div>
							}
						>
							<RiQuestionLine className="w-3.5 h-3.5 text-t-dark" />
						</GTooltip>
					</div>
					<div className="flex items-center justify-end">
						<div className="pr-4">
							<AvailableMetrics
								availableMetrics={cardFilterOptions}
								selectedMetric={selectedMetric}
								setSelectedMetric={setSelectedMetric}
								assetId=""
								page="threat"
								card="device"
							/>
						</div>
						<div
							className={classNames(
								'border border-t-border-light text-default font-bold text-md py-2 px-4 cursor-pointer rounded-l',
								type === 'DAY'
									? 'bg-gray-100 text-primary-500'
									: 'bg-card-background text-t-default'
							)}
							onClick={() => setType('DAY')}
						>
							1D
						</div>
						<div
							className={classNames(
								'border border-t-border-light text-default font-bold text-md py-2 px-4 cursor-pointer rounded-r',
								type === 'WEEK'
									? 'bg-gray-100 text-primary-500'
									: 'bg-card-background text-t-default'
							)}
							onClick={() => setType('WEEK')}
						>
							1W
						</div>
						<div
							className={classNames(
								'border border-t-border-light text-default font-bold text-md py-2 px-4 cursor-pointer rounded-r',
								type === 'MONTH'
									? 'bg-gray-100 text-primary-500'
									: 'bg-card-background text-t-default'
							)}
							onClick={() => setType('MONTH')}
						>
							1M
						</div>
					</div>
				</div>
				{demoData.length ? (
					<LineChart
						enablePoints={false}
						className="h-[300px]"
						lineWidth={5}
						data={organizedTimelineData}
						colors={timelineColors}
						formatter={timelineDataValueFormatter}
					/>
				) : (
					emptyState
				)}
			</GSection>
		</div>
	)
}
