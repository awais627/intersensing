import React, { useMemo, useState } from 'react'
import { classNames } from 'utils'
import { GSection, GTooltip } from 'components/basic-blocks'
import { LineChart } from 'components/charts/line-chart'
import {
	RiErrorWarningLine,
	RiLoader2Line,
	RiQuestionLine
} from 'react-icons/ri'
import { alertFilterOptions, alertTypeFilterOptions } from '../../constants'
import { AvailableMetrics } from '../repeated-clicks-panel/available-metrics'
import { Alert } from '../../../../../../services/telemetry'
import moment from 'moment/moment'

export const AlertsTimeline = ({ alerts }: { alerts: Alert[] }) => {
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

		return filtered
	}, [alerts, selectedSeverity, selectedAlertType])

	// Create timeline data with actual telemetry values
	const timelineData = useMemo(() => {
		// Create sequential index mapping for alerts
		const alertsWithIndex = filteredAlerts.map((alert, index) => ({
			...alert,
			index: index + 1
		}))

		// Convert to chart format with actual telemetry values
		return [
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
			{
				id: 'Warning',
				data: alertsWithIndex
					.filter((alert) => alert.severity === 'warning')
					.map((alert) => ({
						x: alert.index,
						y:
							alert.telemetry_data[
								alert.sensor_type as keyof typeof alert.telemetry_data
							] || 0
					}))
			}
		]
	}, [filteredAlerts])

	const timelineColors = [
		{ color: 'red', shade: 500 }, // Critical
		{ color: 'orange', shade: 500 }, // High
		{ color: 'yellow', shade: 500 }, // Medium
		{ color: 'blue', shade: 500 }, // Low
		{ color: 'amber', shade: 500 } // Warning
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
						formatter={timelineDataValueFormatter}
						tooltipFormator={(point: any) => (
							<div className="border rounded bg-white shadow-sm p-1 flex space-x-1 items-center text-xs">
								<RiLoader2Line
									className="w-5 h-5"
									style={{ color: point.color }}
								/>
								<span>{moment(Number(point.data.x)).format('MMM Do')}</span>:
								<span className="font-semibold">
									{timelineDataValueFormatter(Number(point.data.y))}{' '}
									{point.id.split('.')[0]}{' '}
								</span>
							</div>
						)}
					/>
				) : (
					emptyState
				)}
			</GSection>
		</div>
	)
}
