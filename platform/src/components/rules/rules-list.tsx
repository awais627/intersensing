import React, { useState } from 'react'
import { IMachineRule } from 'types/rules'
import {
	RiDeleteBinLine,
	RiEditLine,
	RiEyeLine,
	RiEyeOffLine
} from 'react-icons/ri'
import { format } from 'date-fns'

interface RulesListProps {
	rules: IMachineRule[]
	onToggleRule: (ruleId: string) => void
	onDeleteRule: (ruleId: string) => void
}

export const RulesList: React.FC<RulesListProps> = ({
	rules,
	onToggleRule,
	onDeleteRule
}) => {
	const [expandedRule, setExpandedRule] = useState<string | null>(null)

	const toggleExpanded = (ruleId: string) => {
		setExpandedRule(expandedRule === ruleId ? null : ruleId)
	}

	const getSeverityColor = (severity: string) => {
		switch (severity.toLowerCase()) {
			case 'low':
				return 'bg-blue-100 text-blue-800'
			case 'medium':
				return 'bg-yellow-100 text-yellow-800'
			case 'high':
				return 'bg-orange-100 text-orange-800'
			case 'critical':
				return 'bg-red-100 text-red-800'
			case 'catastrophic':
				return 'bg-purple-100 text-purple-800'
			default:
				return 'bg-gray-100 text-gray-800'
		}
	}

	const getNotificationIcon = (notification: string) => {
		switch (notification) {
			case 'in-app':
				return '📱'
			case 'email':
				return '📧'
			case 'sms':
				return '💬'
			default:
				return '🔔'
		}
	}

	if (rules.length === 0) {
		return (
			<div className="text-center py-12">
				<div className="text-gray-400 text-6xl mb-4">⚙️</div>
				<h3 className="text-lg font-medium  mb-2">No rules configured</h3>
				<p className="text-gray-500">
					Create your first machine rule to get started with monitoring.
				</p>
			</div>
		)
	}

	return (
		<div className="space-y-6">
			{rules.map((rule) => (
				<div
					key={rule.id}
					className="bg-white rounded-lg border border-gray-200 shadow-sm"
				>
					{/* Rule Header */}
					<div className="p-6 border-b border-gray-100">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-4">
								<div
									className={`w-3 h-3 rounded-full ${
										rule.enabled ? 'bg-green-500' : 'bg-gray-400'
									}`}
								/>
								<div>
									<h3 className="text-lg font-semibold ">{rule.machineName}</h3>
									<p className="text-sm text-gray-500">ID: {rule.machineId}</p>
								</div>
							</div>
							<div className="flex items-center gap-3">
								<button
									onClick={() => onToggleRule(rule.id)}
									className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
										rule.enabled
											? 'bg-green-100 text-green-800 hover:bg-green-200'
											: 'bg-gray-100 text-gray-800 hover:bg-gray-200'
									}`}
								>
									{rule.enabled ? 'Active' : 'Inactive'}
								</button>
								<button
									onClick={() => toggleExpanded(rule.id)}
									className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
								>
									{expandedRule === rule.id ? <RiEyeOffLine /> : <RiEyeLine />}
								</button>
								<button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
									<RiEditLine />
								</button>
								<button
									onClick={() => onDeleteRule(rule.id)}
									className="p-2 text-gray-400 hover:text-red-600 transition-colors"
								>
									<RiDeleteBinLine />
								</button>
							</div>
						</div>
						<div className="mt-4 flex items-center gap-6 text-sm text-gray-500">
							<span>
								Created: {format(new Date(rule.createdAt), 'MMM dd, yyyy')}
							</span>
							<span>
								Updated: {format(new Date(rule.updatedAt), 'MMM dd, yyyy')}
							</span>
						</div>
					</div>

					{/* Expanded Rule Details */}
					{expandedRule === rule.id && (
						<div className="p-6">
							<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
								{/* Sensor Optimal Ranges */}
								<div>
									<h4 className="text-lg font-medium  mb-4">
										Sensor Optimal Ranges
									</h4>
									<div className="space-y-3">
										{rule.sensorOptimalRanges.map((sensor, index) => (
											<div
												key={index}
												className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
											>
												<div className="flex items-center gap-3">
													<div
														className={`w-3 h-3 rounded-full ${
															sensor.enabled ? 'bg-green-500' : 'bg-gray-400'
														}`}
													/>
													<span className="font-medium ">
														{sensor.sensor_type}
													</span>
												</div>
												<div className="text-right">
													<div className="text-sm text-gray-600">
														{sensor.min} - {sensor.max} {sensor.unit}
													</div>
													<div className="text-xs text-gray-500">
														{sensor.enabled ? 'Enabled' : 'Disabled'}
													</div>
												</div>
											</div>
										))}
									</div>
								</div>

								{/* Deviation Thresholds */}
								<div>
									<h4 className="text-lg font-medium  mb-4">
										Deviation Thresholds
									</h4>
									<div className="space-y-3">
										{rule.deviationThresholds.map((threshold, index) => (
											<div key={index} className="p-3 bg-gray-50 rounded-lg">
												<div className="flex items-center justify-between mb-2">
													<span
														className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(
															threshold.severity
														)}`}
													>
														{threshold.severity}
													</span>
													<span className="text-sm font-medium ">
														{threshold.deviation_percentage}%
													</span>
												</div>
												<div className="flex items-center gap-2">
													<span className="text-xs text-gray-500">
														Notify via:
													</span>
													<div className="flex gap-1">
														{threshold.notify.map((notification, idx) => (
															<span
																key={idx}
																className="text-sm"
																title={notification}
															>
																{getNotificationIcon(notification)}
															</span>
														))}
													</div>
												</div>
											</div>
										))}
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			))}
		</div>
	)
}
