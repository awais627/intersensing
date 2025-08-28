import React, { useEffect, useState } from 'react'
import { useTelemetry } from 'hooks/useTelemetry'
import {
	FaBell,
	FaCheckCircle,
	FaClock,
	FaExclamationTriangle,
	FaInfoCircle
} from 'react-icons/fa'
import { Alert, AlertService } from 'services/telemetry'
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
	const [allAlerts, setAllAlerts] = useState<Alert[]>([])
	const [currentPage, setCurrentPage] = useState(1)
	const [totalPages, setTotalPages] = useState(1)
	const [alertsPerPage] = useState(10)

	// Fetch all alerts for pagination
	const fetchAllAlerts = async (page: number = 1) => {
		try {
			setAlertsLoading(true)
			const allAlertsData = await AlertService.getRecentAlerts(100) // Get more for pagination
			setAllAlerts(allAlertsData)
			setTotalPages(Math.ceil(allAlertsData.length / alertsPerPage))
		} catch (err) {
			console.error('Error fetching all alerts:', err)
		} finally {
			setAlertsLoading(false)
		}
	}

	// Initialize alerts data
	useEffect(() => {
		fetchAllAlerts(currentPage)
	}, [currentPage])

	// Subscribe to real-time alerts updates
	useEffect(() => {
		if (isConnected) {
			socketService.subscribeToAlerts((newAlert) => {
				console.log('🚨 New real-time alert received:', newAlert)
				setAllAlerts((prev) => [newAlert, ...prev])
				setActiveNotifications((prev) => [newAlert, ...prev])

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
	}, [isConnected])

	// Handle new alerts and show notifications
	useEffect(() => {
		if (alerts.length > 0) {
			const latestAlert = alerts[0]
			if (!activeNotifications.find((n) => n._id === latestAlert._id)) {
				console.log('🚨 Adding new alert notification:', latestAlert)
				setActiveNotifications((prev) => [latestAlert, ...prev])

				// Auto-remove notification after 10 seconds
				setTimeout(() => {
					setActiveNotifications((prev) =>
						prev.filter((n) => n._id !== latestAlert._id)
					)
				}, 10000)
			}
		}
	}, [alerts, activeNotifications])

	const handleRefreshAlerts = async () => {
		await fetchAllAlerts(currentPage)
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
	// Calculate alert metrics by severity
	const getAlertMetrics = () => {
		const criticalCount = allAlerts.filter(
			(a) => a.severity === 'critical' && !a.resolved
		).length
		const highCount = allAlerts.filter(
			(a) => a.severity === 'high' && !a.resolved
		).length
		const mediumCount = allAlerts.filter(
			(a) => a.severity === 'medium' && !a.resolved
		).length
		const lowCount = allAlerts.filter(
			(a) => a.severity === 'low' && !a.resolved
		).length
		const warningCount = allAlerts.filter(
			(a) => a.severity === 'warning' && !a.resolved
		).length
		const resolvedCount = allAlerts.filter((a) => a.resolved).length

		return [
			{
				label: 'Critical Alerts',
				key: 'critical',
				tooltip: 'Number of critical severity alerts',
				value: criticalCount,
				icon: FaExclamationTriangle,
				unit: '',
				color: 'text-red-600'
			},
			{
				label: 'High Alerts',
				key: 'high',
				tooltip: 'Number of high severity alerts',
				value: highCount,
				icon: FaBell,
				unit: '',
				color: 'text-orange-600'
			},
			{
				label: 'Medium Alerts',
				key: 'medium',
				tooltip: 'Number of medium severity alerts',
				value: mediumCount,
				icon: FaInfoCircle,
				unit: '',
				color: 'text-yellow-600'
			},
			{
				label: 'Low Alerts',
				key: 'low',
				tooltip: 'Number of low severity alerts',
				value: lowCount,
				icon: FaInfoCircle,
				unit: '',
				color: 'text-blue-600'
			},
			{
				label: 'Warning Alerts',
				key: 'warning',
				tooltip: 'Number of warning alerts',
				value: warningCount,
				icon: FaClock,
				unit: '',
				color: 'text-amber-600'
			},
			{
				label: 'Resolved Alerts',
				key: 'resolved',
				tooltip: 'Number of resolved alerts',
				value: resolvedCount,
				icon: FaCheckCircle,
				unit: '',
				color: 'text-green-600'
			}
		]
	}
	// Get paginated alerts
	const getPaginatedAlerts = () => {
		const startIndex = (currentPage - 1) * alertsPerPage
		const endIndex = startIndex + alertsPerPage
		return allAlerts.slice(startIndex, endIndex)
	}

	const handlePageChange = (page: number) => {
		setCurrentPage(page)
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

				{/* Alerts Counter */}
				{allAlerts.length > 0 && (
					<div className="flex items-center gap-2 ml-4">
						<FaBell className="text-red-500" />
						<span className="text-red-600 font-semibold">
							{allAlerts.filter((a) => !a.resolved).length} Active Alerts
						</span>
					</div>
				)}
			</div>

			{/* Alert Metrics */}
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 w-full">
				{metrics.map((metric, index) => {
					const IconComponent = metric.icon
					return (
						<div
							key={index}
							className="bg-white p-4 rounded-lg border border-card-border"
						>
							<div className="flex items-center justify-between mb-2">
								<IconComponent className={`w-5 h-5 ${metric.color}`} />
								<span className="text-xs text-gray-500">{metric.label}</span>
							</div>
							<div className="text-2xl font-bold ">{metric.value}</div>
						</div>
					)
				})}
			</div>

			<div className="grid grid-cols-3 items-center gap-6 w-full h-[400px]">
				<div className="col-span-3 h-full">
					<AlertsTimeline telemetryData={[]} />
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
							{getPaginatedAlerts().map((alert) => (
								<tr key={alert._id} className="hover:bg-gray-50">
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
							{Math.min(currentPage * alertsPerPage, allAlerts.length)} of{' '}
							{allAlerts.length} results
						</div>
						<div className="flex space-x-2">
							<button
								onClick={() => handlePageChange(currentPage - 1)}
								disabled={currentPage === 1}
								className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
							>
								Previous
							</button>
							{Array.from({ length: totalPages }, (_, i) => i + 1).map(
								(page) => (
									<button
										key={page}
										onClick={() => handlePageChange(page)}
										className={`px-3 py-2 text-sm font-medium rounded-md ${
											currentPage === page
												? 'bg-blue-600 text-white'
												: 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
										}`}
									>
										{page}
									</button>
								)
							)}
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
