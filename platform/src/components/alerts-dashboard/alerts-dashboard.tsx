import React, { useEffect, useState } from 'react'
import { useTelemetry } from 'hooks/useTelemetry'
import {
	FaBell,
	FaCheckCircle,
	FaClock,
	FaExclamationTriangle,
	FaInfoCircle
} from 'react-icons/fa'
import {
	Alert,
	AlertService,
	AlertSeverityCountsResponse
} from 'services/telemetry'
import { socketService } from 'services/socket'
import { AlertsTimeline } from '../../pages/workspace/asset/threat/components/alerts-timeline'

export const AlertsDashboard: React.FC = () => {
	const {
		telemetryData,
		latestData,
		alerts,
		loading,
		error,
		isConnected,
		refresh,
		refreshAlerts
	} = useTelemetry()

	const [activeNotifications, setActiveNotifications] = useState<Alert[]>([])
	const [alertsLoading, setAlertsLoading] = useState(false)
	// Paginated table data - always exactly 10 records per page
	// New real-time alerts are added to the top, oldest records are removed
	const [allAlerts, setAllAlerts] = useState<Alert[]>([])
	const [currentPage, setCurrentPage] = useState(1)
	const [totalPages, setTotalPages] = useState(1)
	const [alertsPerPage] = useState(10)
	const [totalAlertsCount, setTotalAlertsCount] = useState(0)

	// Severity counts for metrics - updated in real-time via socket
	const [severityCounts, setSeverityCounts] =
		useState<AlertSeverityCountsResponse | null>(null)
	const [severityCountsLoading, setSeverityCountsLoading] = useState(false)

	// Timeline data - last 25 records, updated in real-time
	const [timelineAlerts, setTimelineAlerts] = useState<Alert[]>([])
	const [timelineLoading, setTimelineLoading] = useState(false)

	// Fetch alerts for current page (always exactly 10 records per page)
	const fetchAlertsForPage = async (page: number = 1) => {
		try {
			setAlertsLoading(true)
			const offset = (page - 1) * alertsPerPage
			const response = await AlertService.getRecentAlerts(alertsPerPage, offset)

			// Ensure we only set exactly the number of alerts for this page
			// This prevents socket updates from affecting pagination
			setAllAlerts(response.alerts.slice(0, alertsPerPage))
			setTotalAlertsCount(response.totalCount)
			setTotalPages(Math.ceil(response.totalCount / alertsPerPage))
		} catch (err) {
			console.error('Error fetching alerts:', err)
		} finally {
			setAlertsLoading(false)
		}
	}

	// Fetch alert severity counts
	const fetchSeverityCounts = async (days: number = 1) => {
		try {
			setSeverityCountsLoading(true)
			const counts = await AlertService.getAlertSeverityCounts(days)
			setSeverityCounts(counts)
		} catch (err) {
			console.error('Error fetching severity counts:', err)
		} finally {
			setSeverityCountsLoading(false)
		}
	}

	// Fetch last 25 alerts for timeline
	const fetchTimelineAlerts = async () => {
		try {
			setTimelineLoading(true)
			const response = await AlertService.getRecentAlerts(25, 0) // Get last 25 alerts
			setTimelineAlerts(response.alerts)
		} catch (err) {
			console.error('Error fetching timeline alerts:', err)
		} finally {
			setTimelineLoading(false)
		}
	}

	// Initialize alerts data
	useEffect(() => {
		fetchAlertsForPage(1)
		fetchSeverityCounts(1) // Default to 1 day
		fetchTimelineAlerts() // Fetch timeline alerts
	}, [])

	// Subscribe to real-time alerts updates
	useEffect(() => {
		if (isConnected) {
			socketService.subscribeToAlerts((newAlert) => {
				console.log('🚨 New real-time alert received:', newAlert)
				// Ensure resolved property exists
				const alertWithDefaults = {
					...newAlert,
					resolved: newAlert.resolved || false,
					machineId: newAlert.telemetry_data?.machineId || 'Unknown'
				}

				// Update timeline alerts with new alert
				setTimelineAlerts((prev) => {
					const updated = [alertWithDefaults, ...prev]
					// Keep only last 25 alerts for timeline
					return updated.slice(0, 25)
				})

				// Add new alert to top of current page data (maintain 10-record limit)
				setAllAlerts((prev) => {
					const updated = [alertWithDefaults, ...prev]
					// Keep only the first 10 records to maintain pagination
					return updated.slice(0, alertsPerPage)
				})

				// Update severity counts in real-time
				setSeverityCounts((prev) => {
					if (!prev) return prev

					// Create updated counts object
					const updatedCounts = { ...prev }

					// Update the specific severity count
					switch (newAlert.severity) {
						case 'critical':
							updatedCounts.critical += 1
							break
						case 'high':
							updatedCounts.high += 1
							break
						case 'warning':
							updatedCounts.warning += 1
							break
						case 'low':
							updatedCounts.low += 1
							break
						default:
							// Handle any other severity types
							break
					}

					// Update total count
					updatedCounts.total += 1

					// Update resolved count if the alert is resolved
					if (newAlert.resolved) {
						updatedCounts.resolved += 1
					}

					return updatedCounts
				})

				// Update active notifications
				setActiveNotifications((prev) => [alertWithDefaults, ...prev])

				// Auto-remove notification after 10 seconds
				setTimeout(() => {
					setActiveNotifications((prev) =>
						prev.filter((n) => n._id !== newAlert._id)
					)
				}, 10000)
			})
		}

		return () => {
			socketService.unsubscribeFromAlerts()
		}
	}, [isConnected, alertsPerPage])

	// Handle new alerts and show notifications
	useEffect(() => {
		if (alerts.length > 0) {
			const latestAlert = alerts[0]
			if (!activeNotifications.find((n) => n._id === latestAlert._id)) {
				console.log('🚨 Adding new alert notification:', latestAlert)
				// Ensure resolved property exists
				const alertWithDefaults = {
					...latestAlert,
					resolved: latestAlert.resolved || false,
					machineId: latestAlert.telemetry_data?.machineId || 'Unknown'
				}

				// Update timeline alerts with new alert
				setTimelineAlerts((prev) => {
					const updated = [alertWithDefaults, ...prev]
					// Keep only last 25 alerts for timeline
					return updated.slice(0, 25)
				})

				// Add new alert to top of current page data (maintain 10-record limit)
				setAllAlerts((prev) => {
					const updated = [alertWithDefaults, ...prev]
					// Keep only the first 10 records to maintain pagination
					return updated.slice(0, alertsPerPage)
				})

				// Update severity counts in real-time
				setSeverityCounts((prev) => {
					if (!prev) return prev

					// Create updated counts object
					const updatedCounts = { ...prev }

					// Update the specific severity count
					switch (latestAlert.severity) {
						case 'critical':
							updatedCounts.critical += 1
							break
						case 'high':
							updatedCounts.high += 1
							break
						case 'warning':
							updatedCounts.warning += 1
							break
						case 'low':
							updatedCounts.low += 1
							break
						default:
							// Handle any other severity types
							break
					}

					// Update total count
					updatedCounts.total += 1

					// Update resolved count if the alert is resolved
					if (latestAlert.resolved) {
						updatedCounts.resolved += 1
					}

					return updatedCounts
				})

				// Update active notifications
				setActiveNotifications((prev) => [alertWithDefaults, ...prev])

				// Auto-remove notification after 10 seconds
				setTimeout(() => {
					setActiveNotifications((prev) =>
						prev.filter((n) => n._id !== latestAlert._id)
					)
				}, 10000)
			}
		}
	}, [alerts, activeNotifications, alertsPerPage])

	const handleRefreshAlerts = async () => {
		await fetchAlertsForPage(currentPage)
		await fetchSeverityCounts(1) // Refresh severity counts as well
		await fetchTimelineAlerts() // Refresh timeline alerts as well
	}

	const handleResolveAlert = async (alertId: string) => {
		try {
			await AlertService.resolveAlert(alertId)
			// Update local state
			setAllAlerts((prev) =>
				prev.map((alert) =>
					alert._id === alertId
						? { ...alert, resolved: true, resolved_at: new Date() }
						: alert
				)
			)
		} catch (err) {
			console.error('Error resolving alert:', err)
		}
	}
	// Get alert metrics from API data
	const getAlertMetrics = () => {
		if (!severityCounts) return []

		return [
			{
				label: 'Critical Alerts',
				key: 'critical',
				tooltip: 'Number of critical severity alerts',
				value: severityCounts.critical,
				icon: FaExclamationTriangle,
				unit: '',
				color: 'text-red-600'
			},
			{
				label: 'High Alerts',
				key: 'high',
				tooltip: 'Number of high severity alerts',
				value: severityCounts.high,
				icon: FaBell,
				unit: '',
				color: 'text-orange-600'
			},
			{
				label: 'Warning Alerts',
				key: 'warning',
				tooltip: 'Number of warning alerts',
				value: severityCounts.warning,
				icon: FaClock,
				unit: '',
				color: 'text-amber-600'
			},
			{
				label: 'Low Alerts',
				key: 'low',
				tooltip: 'Number of low severity alerts',
				value: severityCounts.low,
				icon: FaInfoCircle,
				unit: '',
				color: 'text-blue-600'
			},
			{
				label: 'Resolved Alerts',
				key: 'resolved',
				tooltip: 'Number of resolved alerts',
				value: severityCounts.resolved,
				icon: FaCheckCircle,
				unit: '',
				color: 'text-green-600'
			},
			{
				label: 'Total Alerts',
				key: 'total',
				tooltip: 'Total number of alerts in the date range',
				value: severityCounts.total,
				icon: FaInfoCircle,
				unit: '',
				color: 'text-gray-600'
			}
		]
	}

	const handlePageChange = async (page: number) => {
		if (page === currentPage) return
		setCurrentPage(page)
		await fetchAlertsForPage(page)
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

	const metrics = getAlertMetrics()

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

			{/* Alert Metrics */}
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 w-full">
				{severityCountsLoading
					? // Loading skeleton for metrics
					  Array.from({ length: 6 }).map((_, index) => (
							<div
								key={index}
								className="bg-white p-4 rounded-lg border border-card-border animate-pulse"
							>
								<div className="flex items-center justify-between mb-2">
									<div className="w-5 h-5 bg-gray-300 rounded"></div>
									<div className="w-20 h-3 bg-gray-300 rounded"></div>
								</div>
								<div className="w-16 h-8 bg-gray-300 rounded"></div>
							</div>
					  ))
					: metrics.map((metric, index) => {
							const IconComponent = metric.icon
							return (
								<div
									key={index}
									className="bg-white p-4 rounded-lg border border-card-border"
								>
									<div className="flex items-center justify-between mb-2">
										<IconComponent className={`w-5 h-5 ${metric.color}`} />
										<span className="text-xs text-gray-500">
											{metric.label}
										</span>
									</div>
									<div className="text-2xl font-bold ">{metric.value}</div>
								</div>
							)
					  })}
			</div>

			<div className="grid grid-cols-3 items-center gap-6 w-full h-[400px]">
				<div className="col-span-3 h-full">
					<div className="flex justify-between items-center mb-4">
						<h3 className="text-lg font-semibold">Alerts Timeline</h3>
						<button
							onClick={fetchTimelineAlerts}
							disabled={timelineLoading}
							className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
						>
							{timelineLoading ? 'Refreshing...' : 'Refresh Timeline'}
						</button>
					</div>
					{timelineLoading ? (
						<div className="flex items-center justify-center h-full">
							<div className="text-center">
								<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
								<p className="text-gray-500">Loading timeline...</p>
							</div>
						</div>
					) : (
						<AlertsTimeline alerts={timelineAlerts} />
					)}
				</div>
			</div>

			<div className="w-full bg-white p-6 rounded-lg border">
				<div className="flex justify-between items-center mb-4">
					<h3 className="text-xl font-semibold">Alerts Records</h3>
					<button
						onClick={handleRefreshAlerts}
						disabled={alertsLoading}
						className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
					>
						{alertsLoading ? 'Refreshing...' : 'Refresh'}
					</button>
				</div>

				<div className="overflow-x-auto">
					<table className="min-w-full divide-y divide-gray-200">
						<thead className="bg-gray-50">
							<tr>
								<th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
									Machine ID
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
									Severity
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
									Sensor Type
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
									Rule ID
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
									Threshold
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
									Triggered At
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
									Status
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
									Actions
								</th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							{allAlerts.map((alert) => (
								<tr key={alert._id} className="hover:bg-gray-50">
									<td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
										{alert.machineId || 'Unknown'}
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<span
											className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
												alert.severity === 'critical'
													? 'bg-red-100 text-red-800'
													: alert.severity === 'high'
													? 'bg-orange-100 text-orange-800'
													: alert.severity === 'medium'
													? 'bg-yellow-100 text-yellow-800'
													: alert.severity === 'warning'
													? 'bg-amber-100 text-amber-800'
													: 'bg-blue-100 text-blue-800'
											}`}
										>
											{alert.severity}
										</span>
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm ">
										{alert.sensor_type}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm ">
										{alert.rule_id}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm ">
										{alert.operator} {alert.threshold}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm">
										{new Date(alert.triggered_at).toLocaleString()}
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<span
											className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
												alert.resolved
													? 'bg-green-100 text-green-800'
													: 'bg-red-100 text-red-800'
											}`}
										>
											{alert.resolved ? 'Resolved' : 'Active'}
										</span>
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
										{!alert.resolved && (
											<button
												onClick={() => handleResolveAlert(alert._id!)}
												className="text-indigo-600 hover:text-indigo-900"
											>
												Resolve
											</button>
										)}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				{totalPages > 1 && (
					<div className="flex items-center justify-between mt-4">
						<div className="text-sm text-gray-700">
							Showing {(currentPage - 1) * alertsPerPage + 1} to{' '}
							{Math.min(currentPage * alertsPerPage, totalAlertsCount)} of{' '}
							{totalAlertsCount} results
						</div>
						<div className="flex space-x-2">
							<button
								onClick={() => handlePageChange(currentPage - 1)}
								disabled={currentPage === 1}
								className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
							>
								Previous
							</button>
							<button
								onClick={() => handlePageChange(currentPage + 1)}
								disabled={currentPage === totalPages}
								className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
							>
								Next
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
