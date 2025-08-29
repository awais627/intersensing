import React, { useState } from 'react'
import {
	ICreateRuleForm,
	IDeviationThreshold,
	IMachineRule,
	ISensorOptimalRange
} from 'types/rules'
import { RiCloseLine } from 'react-icons/ri'

interface CreateRuleFormProps {
	onSubmit: (rule: IMachineRule) => void
	onCancel: () => void
}

const defaultSensorRanges: ISensorOptimalRange[] = [
	{ sensor_type: 'Temperature', min: 18, max: 27, unit: '°C', enabled: true },
	{ sensor_type: 'Humidity', min: 40, max: 60, unit: '%', enabled: true },
	{ sensor_type: 'eCO2', min: 400, max: 600, unit: 'ppm', enabled: true },
	{ sensor_type: 'TVOC', min: 0, max: 220, unit: 'ppb', enabled: true },
	{ sensor_type: 'Pressure', min: 980, max: 1030, unit: 'hPa', enabled: true },
	{ sensor_type: 'PM1.0', min: 0, max: 15, unit: 'μg/m³', enabled: true },
	{ sensor_type: 'PM2.5', min: 0, max: 25, unit: 'μg/m³', enabled: true }
]

const defaultDeviationThresholds: IDeviationThreshold[] = [
	{ severity: 'low', deviation_percentage: 10, notify: ['in-app'] },
	{ severity: 'medium', deviation_percentage: 25, notify: ['in-app'] },
	{ severity: 'high', deviation_percentage: 50, notify: ['in-app', 'email'] },
	{
		severity: 'critical',
		deviation_percentage: 75,
		notify: ['in-app', 'email']
	},
	{
		severity: 'catastrophic',
		deviation_percentage: 90,
		notify: ['in-app', 'email', 'sms']
	}
]

const notificationOptions = [
	{ value: 'in-app', label: 'In-App', icon: '📱' },
	{ value: 'email', label: 'Email', icon: '📧' },
	{ value: 'sms', label: 'SMS', icon: '💬' }
]

export const CreateRuleForm: React.FC<CreateRuleFormProps> = ({
	onSubmit,
	onCancel
}) => {
	const [formData, setFormData] = useState<ICreateRuleForm>({
		machineId: '',
		machineName: '',
		sensorOptimalRanges: [...defaultSensorRanges],
		deviationThresholds: [...defaultDeviationThresholds]
	})

	const [errors, setErrors] = useState<Record<string, string>>({})

	const validateForm = (): boolean => {
		const newErrors: Record<string, string> = {}

		if (!formData.machineId.trim()) {
			newErrors.machineId = 'Machine ID is required'
		}
		if (!formData.machineName.trim()) {
			newErrors.machineName = 'Machine name is required'
		}

		// Validate sensor ranges
		formData.sensorOptimalRanges.forEach((sensor, index) => {
			if (sensor.min >= sensor.max) {
				newErrors[`sensor-${index}`] = 'Min value must be less than max value'
			}
		})

		// Validate deviation thresholds
		formData.deviationThresholds.forEach((threshold, index) => {
			if (
				threshold.deviation_percentage <= 0 ||
				threshold.deviation_percentage > 100
			) {
				newErrors[`threshold-${index}`] =
					'Deviation percentage must be between 1 and 100'
			}
			if (threshold.notify.length === 0) {
				newErrors[`threshold-${index}`] =
					'At least one notification method must be selected'
			}
		})

		setErrors(newErrors)
		return Object.keys(newErrors).length === 0
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		if (!validateForm()) {
			return
		}

		const newRule: IMachineRule = {
			id: Date.now().toString(),
			...formData,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
			enabled: true
		}

		onSubmit(newRule)
	}

	const updateSensorRange = (
		index: number,
		field: keyof ISensorOptimalRange,
		value: any
	) => {
		const updatedRanges = [...formData.sensorOptimalRanges]
		updatedRanges[index] = { ...updatedRanges[index], [field]: value }
		setFormData({ ...formData, sensorOptimalRanges: updatedRanges })
	}

	const updateDeviationThreshold = (
		index: number,
		field: keyof IDeviationThreshold,
		value: any
	) => {
		const updatedThresholds = [...formData.deviationThresholds]
		updatedThresholds[index] = { ...updatedThresholds[index], [field]: value }
		setFormData({ ...formData, deviationThresholds: updatedThresholds })
	}

	const toggleNotification = (thresholdIndex: number, notification: string) => {
		const updatedThresholds = [...formData.deviationThresholds]
		const currentNotifications = updatedThresholds[thresholdIndex].notify

		if (currentNotifications.includes(notification)) {
			updatedThresholds[thresholdIndex].notify = currentNotifications.filter(
				(n) => n !== notification
			)
		} else {
			updatedThresholds[thresholdIndex].notify = [
				...currentNotifications,
				notification
			]
		}

		setFormData({ ...formData, deviationThresholds: updatedThresholds })
	}

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
			<div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
				<div className="p-6 border-b border-gray-200">
					<div className="flex items-center justify-between">
						<h2 className="text-2xl font-bold ">Create New Machine Rule</h2>
						<button
							onClick={onCancel}
							className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
						>
							<RiCloseLine className="w-6 h-6" />
						</button>
					</div>
				</div>

				<form onSubmit={handleSubmit} className="p-6 space-y-8">
					{/* Basic Machine Information */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Machine ID *
							</label>
							<input
								type="text"
								value={formData.machineId}
								onChange={(e) =>
									setFormData({ ...formData, machineId: e.target.value })
								}
								className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
									errors.machineId ? 'border-red-500' : 'border-gray-300'
								}`}
								placeholder="e.g., MACHINE-001"
							/>
							{errors.machineId && (
								<p className="mt-1 text-sm text-red-600">{errors.machineId}</p>
							)}
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Machine Name *
							</label>
							<input
								type="text"
								value={formData.machineName}
								onChange={(e) =>
									setFormData({ ...formData, machineName: e.target.value })
								}
								className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
									errors.machineName ? 'border-red-500' : 'border-gray-300'
								}`}
								placeholder="e.g., Production Line A"
							/>
							{errors.machineName && (
								<p className="mt-1 text-sm text-red-600">
									{errors.machineName}
								</p>
							)}
						</div>
					</div>

					{/* Sensor Optimal Ranges */}
					<div>
						<h3 className="text-lg font-medium  mb-4">Sensor Optimal Ranges</h3>
						<div className="space-y-4">
							{formData.sensorOptimalRanges.map((sensor, index) => (
								<div
									key={index}
									className="p-4 border border-gray-200 rounded-lg"
								>
									<div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-1">
												Sensor Type
											</label>
											<input
												type="text"
												value={sensor.sensor_type}
												onChange={(e) =>
													updateSensorRange(
														index,
														'sensor_type',
														e.target.value
													)
												}
												className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
											/>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-1">
												Min Value
											</label>
											<input
												type="number"
												value={sensor.min}
												onChange={(e) =>
													updateSensorRange(
														index,
														'min',
														parseFloat(e.target.value)
													)
												}
												className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
											/>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-1">
												Max Value
											</label>
											<input
												type="number"
												value={sensor.max}
												onChange={(e) =>
													updateSensorRange(
														index,
														'max',
														parseFloat(e.target.value)
													)
												}
												className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
											/>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-1">
												Unit
											</label>
											<input
												type="text"
												value={sensor.unit}
												onChange={(e) =>
													updateSensorRange(index, 'unit', e.target.value)
												}
												className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
											/>
										</div>
										<div className="flex items-center">
											<label className="flex items-center">
												<input
													type="checkbox"
													checked={sensor.enabled}
													onChange={(e) =>
														updateSensorRange(
															index,
															'enabled',
															e.target.checked
														)
													}
													className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
												/>
												<span className="ml-2 text-sm text-gray-700">
													Enabled
												</span>
											</label>
										</div>
									</div>
									{errors[`sensor-${index}`] && (
										<p className="mt-2 text-sm text-red-600">
											{errors[`sensor-${index}`]}
										</p>
									)}
								</div>
							))}
						</div>
					</div>

					{/* Deviation Thresholds */}
					<div>
						<h3 className="text-lg font-medium  mb-4">Deviation Thresholds</h3>
						<div className="space-y-4">
							{formData.deviationThresholds.map((threshold, index) => (
								<div
									key={index}
									className="p-4 border border-gray-200 rounded-lg"
								>
									<div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-1">
												Severity Level
											</label>
											<input
												type="text"
												value={threshold.severity}
												onChange={(e) =>
													updateDeviationThreshold(
														index,
														'severity',
														e.target.value
													)
												}
												className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
											/>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-1">
												Deviation Percentage
											</label>
											<input
												type="number"
												value={threshold.deviation_percentage}
												onChange={(e) =>
													updateDeviationThreshold(
														index,
														'deviation_percentage',
														parseFloat(e.target.value)
													)
												}
												className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
												min="1"
												max="100"
											/>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-1">
												Notification Methods
											</label>
											<div className="flex gap-2">
												{notificationOptions.map((option) => (
													<button
														key={option.value}
														type="button"
														onClick={() =>
															toggleNotification(index, option.value)
														}
														className={`p-2 rounded-lg border transition-colors ${
															threshold.notify.includes(option.value)
																? 'bg-blue-100 border-blue-300 text-blue-700'
																: 'bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100'
														}`}
														title={option.label}
													>
														<span className="text-lg">{option.icon}</span>
													</button>
												))}
											</div>
										</div>
									</div>
									{errors[`threshold-${index}`] && (
										<p className="mt-2 text-sm text-red-600">
											{errors[`threshold-${index}`]}
										</p>
									)}
								</div>
							))}
						</div>
					</div>

					{/* Form Actions */}
					<div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
						<button
							type="button"
							onClick={onCancel}
							className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
						>
							Cancel
						</button>
						<button
							type="submit"
							className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
						>
							Create Rule
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}
