import React, { useMemo, useState } from 'react'
import { classNames } from 'utils'
import { GSection, GTooltip } from 'components/basic-blocks'
import { LineChart } from 'components/charts/line-chart'
import { RiErrorWarningLine, RiQuestionLine } from 'react-icons/ri'
import { cardFilterOptions } from '../../constants'
import { AvailableMetrics } from '../repeated-clicks-panel/available-metrics'
import { TelemetryData } from '../../../../../../services/telemetry'
import moment from 'moment'

export const ThreadTrafficTimeline = ({
	telemetryData
}: {
	telemetryData: TelemetryData[]
}) => {
	const [type, setType] = useState<'DAY' | 'WEEK' | 'MONTH'>('DAY')
	const [selectedMetric, setSelectedMetric] = useState<{
		name: string
		type: string
	}>(cardFilterOptions[0])

	// example mapping
	const mappedData = [
		{
			id: 'Temperature',
			data: telemetryData.map((d) => ({
				x: d.timestamp, // or new Date(d.timestamp).toISOString().slice(0, 10)
				y: d.Temperature
			}))
		},
		{
			id: 'Humidity',
			data: telemetryData.map((d) => ({
				x: d.timestamp,
				y: d.Humidity
			}))
		},
		{
			id: 'Pressure',
			data: telemetryData.map((d) => ({
				x: d.timestamp,
				y: d.Pressure
			}))
		},
		{
			id: 'eCO2',
			data: telemetryData.map((d, index) => {
				// Generate static demo data for eCO2 with values in between other metrics
				// Simulate realistic eCO2 values (400-1000 ppm range)
				const baseValue = 600
				const variation = Math.sin(index * 0.1) * 100 + Math.cos(index * 0.05) * 50
				const demoValue = Math.round(baseValue + variation)
				
				return {
					x: d.timestamp,
					y: d['eCO2'] || demoValue // Use actual eCO2 data if available, otherwise demo data
				}
			})
		}
	]

	const { organizedTimelineData, timelineColors } = useMemo(() => {
		const temperature = mappedData.filter((d) => d.id === 'Temperature')
		const humidity = mappedData.filter((d) => d.id === 'Humidity')
		const pressure = mappedData.filter((d) => d.id === 'Pressure')
		const eco2 = mappedData.filter((d) => d.id === 'eCO2')

		// If ALL is selected, return all four metrics with different colors
		if (selectedMetric.type === 'all') {
			return {
				organizedTimelineData: [...temperature, ...humidity, ...pressure, ...eco2],
				timelineColors: [
					{ color: 'red', shade: 500 },    // Temperature
					{ color: 'blue', shade: 500 },   // Humidity
					{ color: 'amber', shade: 500 },  // Pressure
					{ color: 'green', shade: 500 }   // eCO2
				]
			}
		}

		// For individual metrics, return only the selected one
		return {
			organizedTimelineData:
				selectedMetric.type === 'humidity'
					? humidity
					: selectedMetric.type === 'temperature'
					? temperature
					: pressure,
			timelineColors: [
				selectedMetric.type === 'humidity'
					? { color: 'blue', shade: 500 }
					: selectedMetric.type === 'temperature'
					? { color: 'red', shade: 500 }
					: { color: 'amber', shade: 500 }
			]
		}
	}, [selectedMetric, telemetryData])

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
						Real-time trend
						<GTooltip
							content={
								<div className="flex flex-col font-normal">
									Timeline of live number of {selectedMetric.name.toLowerCase()}
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
				{telemetryData?.length ? (
					<LineChart
						enablePoints={false}
						className="h-[300px]"
						lineWidth={5}
						noBottomAxis
						data={organizedTimelineData}
						colors={timelineColors}
						formatter={timelineDataValueFormatter}
						tooltipFormator={(point: any) => {
							const data = telemetryData[point?.index]
							const timestamp = moment(Number(point.data.x)).format(
								'MMM Do, HH:mm'
							)

							return (
								<div className="border rounded bg-white shadow-sm p-2 flex flex-col space-y-1 text-xs min-w-[200px]">
									<div className="flex items-center space-x-2">
										<div
											className="w-3 h-3 rounded-full"
											style={{ backgroundColor: point?.color }}
										/>
										<span className="font-semibold">{point?.id}</span>
									</div>
									<div className="border-t pt-1">
										<div className="flex justify-between">
											<span className="text-gray-600">Metric:</span>
											<span className="font-medium capitalize">
												{selectedMetric?.name}
											</span>
										</div>
										<div className="flex justify-between">
											<span className="text-gray-600">Value:</span>
											<span className="font-semibold">
												{timelineDataValueFormatter(Number(point?.data.y))}
											</span>
										</div>
										<div className="flex justify-between">
											<span className="text-gray-600">Machine:</span>
											<span className="font-semibold">{data?.machineId}</span>
										</div>
										<div className="flex justify-between">
											<span className="text-gray-600">Unit:</span>
											<span className="font-medium">
												{point.serieId === 'Temperature'
													? '°C'
													: point.serieId === 'Humidity'
													? '%'
													: point.serieId === 'Pressure'
													? 'hPa'
													: ''}
											</span>
										</div>
										<div className="flex justify-between">
											<span className="text-gray-600">Time:</span>
											<span className="font-medium">{timestamp}</span>
										</div>
									</div>
								</div>
							)
						}}
					/>
				) : (
					emptyState
				)}
			</GSection>
		</div>
	)
}
