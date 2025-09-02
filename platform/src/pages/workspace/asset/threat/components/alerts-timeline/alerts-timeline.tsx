import React, { useMemo, useState } from 'react'
import { classNames } from 'utils'
import { GSection, GTooltip } from 'components/basic-blocks'
import { LineChart } from 'components/charts/line-chart'
import { RiErrorWarningLine, RiQuestionLine } from 'react-icons/ri'
import { alertFilterOptions, alertTypeFilterOptions } from '../../constants'
import { AvailableMetrics } from '../repeated-clicks-panel/available-metrics'
import { Alert } from '../../../../../../services/telemetry'
import moment from 'moment/moment'

export const AlertsTimeline = ({ alerts }: { alerts: Alert[] }) => {
	// Component now handles up to 200 alerts for comprehensive timeline view
	const [type, setType] = useState<'DAY' | 'WEEK' | 'MONTH'>('DAY')
	const [selectedSeverity, setSelectedSeverity] = useState<{
		name: string
		type: string
	}>(alertFilterOptions[0])
	const [selectedAlertType, setSelectedAlertType] = useState<{
		name: string
		type: string
	}>(alertTypeFilterOptions[0])

	// Filter alerts based on selected severity and type
	const filteredAlerts = useMemo(() => {
		let filtered = alerts

		// Filter by severity
		if (selectedSeverity.type !== 'all') {
			if (selectedSeverity.type === 'resolved') {
				filtered = filtered.filter((alert) => alert.resolved)
			} else {
				filtered = filtered.filter(
					(alert) => alert.severity === selectedSeverity.type
				)
			}
		}

		// Filter by alert type
		if (selectedAlertType.type !== 'all') {
			filtered = filtered.filter(
				(alert) => alert.sensor_type === selectedAlertType.type
			)
		}

		return filtered.reverse()
	}, [alerts, selectedSeverity, selectedAlertType])

	// Create timeline data with actual telemetry values (supports up to 200 alerts)
	const timelineData = useMemo(() => {
		// Create sequential index mapping for alerts
		const alertsWithIndex = filteredAlerts.map((alert, index) => ({
			...alert,
			index: index + 1
		}))

		return [
				{
				id: 'Catastrophic',
				data: alertsWithIndex
					.filter((alert) => alert.severity === 'catastrophic')
					.map((alert) => ({
						x: alert.index,
						y:
							alert.telemetry_data[
								alert.sensor_type as keyof typeof alert.telemetry_data
							] || 0
					}))
			},
			{
				id: 'Critical',
				data: alertsWithIndex
					.filter((alert) => alert.severity === 'critical')
					.map((alert) => ({
						x: alert.index,
						y:
							alert.telemetry_data[
								alert.sensor_type as keyof typeof alert.telemetry_data
							] || 0
					}))
			},
			{
				id: 'High',
				data: alertsWithIndex
					.filter((alert) => alert.severity === 'high')
					.map((alert) => ({
						x: alert.index,
						y:
							alert.telemetry_data[
								alert.sensor_type as keyof typeof alert.telemetry_data
							] || 0
					}))
			},
			{
				id: 'Medium',
				data: alertsWithIndex
					.filter((alert) => alert.severity === 'medium')
					.map((alert) => ({
						x: alert.index,
						y:
							alert.telemetry_data[
								alert.sensor_type as keyof typeof alert.telemetry_data
							] || 0
					}))
			},
			{
				id: 'Low',
				data: alertsWithIndex
					.filter((alert) => alert.severity === 'low')
					.map((alert) => ({
						x: alert.index,
						y:
							alert.telemetry_data[
								alert.sensor_type as keyof typeof alert.telemetry_data
							] || 0
					}))
			},

		]
	}, [filteredAlerts])

	const timelineColors = [
		{ color: 'red', shade: 500 }, // Catastrophic
		{ color: 'orange', shade: 500 }, // Critical
		{ color: 'yellow', shade: 500 }, // High
		{ color: 'blue', shade: 500 }, // Medium
		{ color: 'amber', shade: 500 } // Low
	]

	const timelineDataValueFormatter = (value: number) => value.toLocaleString()

	const emptyState = (
		<div className="flex flex-col items-center justify-center w-full p-8 text-center">
			<RiErrorWarningLine className="w-8 h-8 text-gray-500" />
			<h3 className="mt-2 text-md font-medium text-gray-700">No alerts data</h3>
			<p className="mt-1 text-md text-gray-500">
				Select different filters or time period
			</p>
		</div>
	)

	return (
		<div>
			<GSection containerClassName="border border-card-border h-[400px] -mb-6">
				<div className="flex justify-between items-center h-full">
					<div className="flex flex-row items-center gap-x-1 text-xl font-bold">
						Alerts Timeline
						<GTooltip
							content={
								<div className="flex flex-col font-normal">
									Timeline of alerts by severity and sensor type
								</div>
							}
						>
							<RiQuestionLine className="w-3.5 h-3.5 text-t-dark" />
						</GTooltip>
					</div>
					<div className="flex items-center justify-end gap-4">
						{/* Severity Filter */}
						<div className="pr-4">
							<AvailableMetrics
								availableMetrics={alertFilterOptions}
								selectedMetric={selectedSeverity}
								setSelectedMetric={setSelectedSeverity}
								assetId=""
								page="threat"
								card="device"
							/>
						</div>
						{/* Alert Type Filter */}
						<div className="pr-4">
							<AvailableMetrics
								availableMetrics={alertTypeFilterOptions}
								selectedMetric={selectedAlertType}
								setSelectedMetric={setSelectedAlertType}
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
				{filteredAlerts.length > 0 ? (
					<LineChart
						enablePoints={false}
						className="h-[300px]"
						lineWidth={5}
						data={timelineData}
						colors={timelineColors}
						noBottomAxis
						formatter={timelineDataValueFormatter}
						tooltipFormator={(point: any) => {
							// Find the corresponding alert data to get sensor type and other details
							const alertIndex = point.data.x
							const alertData = filteredAlerts[alertIndex - 1] // Convert back to array index

							return (
								<div className="border rounded bg-white shadow-sm p-2 flex flex-col space-y-1 text-xs min-w-[200px]">
									<div className="flex items-center space-x-2">
										<div
											className="w-3 h-3 rounded-full"
											style={{ backgroundColor: point.color }}
										/>
										<span className="font-semibold ">{point.id} Severity</span>
									</div>
									<div className="border-t pt-1">
										<div className="flex justify-between">
											<span className="text-gray-600">Sensor Type:</span>
											<span className="font-medium  capitalize">
												{alertData?.sensor_type || 'Unknown'}
											</span>
										</div>
										<div className="flex justify-between">
											<span className="text-gray-600">Value:</span>
											<span className="font-semibold ">
												{timelineDataValueFormatter(Number(point.data.y))}
											</span>
										</div>
										{/* <div className="flex justify-between">
											<span className="text-gray-600">Threshold:</span>
											<span className="font-medium ">
												{alertData?.operator} {alertData?.threshold}
											</span>
										</div> */}
										<div className="flex justify-between">
											<span className="text-gray-600">Machine:</span>
											<span className="font-medium ">
												{alertData?.telemetry_data?.machineId || 'Unknown'}
											</span>
										</div>
										<div className="flex justify-between">
											<span className="text-gray-600">Time:</span>
											<span className="font-medium ">
												{moment(alertData?.triggered_at).format(
													'MMM Do, h:mm:ss A'
												)}
											</span>
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
