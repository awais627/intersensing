import React, { useMemo, useState } from 'react'
import { classNames } from 'utils'
import { GSection, GTooltip } from 'components/basic-blocks'
import { LineChart } from 'components/charts/line-chart'
import { RiErrorWarningLine, RiQuestionLine } from 'react-icons/ri'
import { alertFilterOptions, alertTypeFilterOptions } from '../../constants'
import { AvailableMetrics } from '../repeated-clicks-panel/available-metrics'
import { Alert } from '../../../../../../services/telemetry'

export const AlertsTimeline = ({
	alerts
}: {
	alerts: Alert[]
}) => {
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
				filtered = filtered.filter(alert => alert.resolved)
			} else {
				filtered = filtered.filter(alert => alert.severity === selectedSeverity.type)
			}
		}

		// Filter by alert type
		if (selectedAlertType.type !== 'all') {
			filtered = filtered.filter(alert => alert.sensor_type === selectedAlertType.type)
		}

		return filtered
	}, [alerts, selectedSeverity, selectedAlertType])

	// Group alerts by date for timeline visualization
	const timelineData = useMemo(() => {
		const alertsByDate = filteredAlerts.reduce((acc, alert) => {
			const date = new Date(alert.triggered_at).toISOString().split('T')[0]
			if (!acc[date]) {
				acc[date] = {
					critical: 0,
					high: 0,
					medium: 0,
					low: 0,
					warning: 0
				}
			}
			acc[date][alert.severity as keyof (typeof acc)[typeof date]]++
			return acc
		}, {} as Record<string, { critical: number; high: number; medium: number; low: number; warning: number }>)

		// Get all dates and add next 5 dates with zero values
		const allDates = new Set<string>()
		Object.keys(alertsByDate).forEach(date => allDates.add(date))
		
		// Add next 5 dates if we have existing dates
		if (allDates.size > 0) {
			const lastDate = new Date(Math.max(...Array.from(allDates).map(d => new Date(d).getTime())))
			for (let i = 1; i <= 5; i++) {
				const nextDate = new Date(lastDate)
				nextDate.setDate(nextDate.getDate() + i)
				const nextDateStr = nextDate.toISOString().split('T')[0]
				allDates.add(nextDateStr)
				
				// Initialize with zero values
				if (!alertsByDate[nextDateStr]) {
					alertsByDate[nextDateStr] = {
						critical: 0,
						high: 0,
						medium: 0,
						low: 0,
						warning: 0
					}
				}
			}
		}

		// Convert to chart format
		const dates = Array.from(allDates).sort()
		return [
			{
				id: 'Critical',
				data: dates.map((date) => ({
					x: date,
					y: alertsByDate[date]?.critical || 0
				}))
			},
			{
				id: 'High',
				data: dates.map((date) => ({
					x: date,
					y: alertsByDate[date]?.high || 0
				}))
			},
			{
				id: 'Medium',
				data: dates.map((date) => ({
					x: date,
					y: alertsByDate[date]?.medium || 0
				}))
			},
			{
				id: 'Low',
				data: dates.map((date) => ({
					x: date,
					y: alertsByDate[date]?.low || 0
				}))
			},
			{
				id: 'Warning',
				data: dates.map((date) => ({
					x: date,
					y: alertsByDate[date]?.warning || 0
				}))
			}
		]
	}, [filteredAlerts])

	const timelineColors = [
		{ color: 'red', shade: 500 },    // Critical
		{ color: 'orange', shade: 500 }, // High
		{ color: 'yellow', shade: 500 }, // Medium
		{ color: 'blue', shade: 500 },   // Low
		{ color: 'amber', shade: 500 }   // Warning
	]

	const timelineDataValueFormatter = (value: number) => value.toLocaleString()

	const emptyState = (
		<div className="flex flex-col items-center justify-center w-full p-8 text-center">
			<RiErrorWarningLine className="w-8 h-8 text-gray-500" />
			<h3 className="mt-2 text-md font-medium text-gray-700">
				No alerts data
			</h3>
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
					/>
				) : (
					emptyState
				)}
			</GSection>
		</div>
	)
}
