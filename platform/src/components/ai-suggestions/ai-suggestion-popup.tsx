import React, { useState, useEffect } from 'react'
import { AISuggestion } from '../../services/ai-suggestions'
import { RiCloseLine, RiInformationLine, RiErrorWarningLine, RiAlertLine, RiCheckboxCircleLine } from 'react-icons/ri'

interface AISuggestionPopupProps {
	suggestion: AISuggestion
	onClose: () => void
	onDismiss: () => void
}

const getSeverityConfig = (severity: AISuggestion['severity']) => {
	switch (severity) {
		case 'critical':
			return {
				bgColor: 'bg-red-50',
				borderColor: 'border-red-200',
				iconColor: 'text-red-500',
				icon: RiAlertLine,
				titleColor: 'text-red-800'
			}
		case 'high':
			return {
				bgColor: 'bg-orange-50',
				borderColor: 'border-orange-200',
				iconColor: 'text-orange-500',
				icon: RiErrorWarningLine,
				titleColor: 'text-orange-800'
			}
		case 'medium':
			return {
				bgColor: 'bg-yellow-50',
				borderColor: 'border-yellow-200',
				iconColor: 'text-yellow-500',
				icon: RiInformationLine,
				titleColor: 'text-yellow-800'
			}
		case 'low':
			return {
				bgColor: 'bg-blue-50',
				borderColor: 'border-blue-200',
				iconColor: 'text-blue-500',
				icon: RiCheckboxCircleLine,
				titleColor: 'text-blue-800'
			}
		default:
			return {
				bgColor: 'bg-gray-50',
				borderColor: 'border-gray-200',
				iconColor: 'text-gray-500',
				icon: RiInformationLine,
				titleColor: 'text-gray-800'
			}
	}
}

export const AISuggestionPopup: React.FC<AISuggestionPopupProps> = ({
	suggestion,
	onClose,
	onDismiss
}) => {
	const [isVisible, setIsVisible] = useState(false)
	const [isAnimating, setIsAnimating] = useState(false)
	const config = getSeverityConfig(suggestion.severity)
	const IconComponent = config.icon

	useEffect(() => {
		// Animate in
		setTimeout(() => {
			setIsVisible(true)
			setIsAnimating(true)
		}, 100)

		// Auto-dismiss after 10 seconds for low severity, 15 seconds for others
		const autoDismissTime = suggestion.severity === 'low' ? 10000 : 15000
		const timer = setTimeout(() => {
			handleDismiss()
		}, autoDismissTime)

		return () => clearTimeout(timer)
	}, [suggestion.severity])

	const handleDismiss = () => {
		setIsAnimating(false)
		setTimeout(() => {
			onDismiss()
		}, 300)
	}

	const handleClose = () => {
		setIsAnimating(false)
		setTimeout(() => {
			onClose()
		}, 300)
	}

	return (
		<div
			className={`fixed top-4 right-4 z-50 max-w-md w-full mx-4 transform transition-all duration-300 ease-in-out ${
				isVisible && isAnimating
					? 'translate-x-0 opacity-100'
					: 'translate-x-full opacity-0'
			}`}
		>
			<div
				className={`${config.bgColor} ${config.borderColor} border rounded-lg shadow-lg p-4 relative`}
			>
				{/* Close button */}
				<button
					onClick={handleClose}
					className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-200 transition-colors"
					aria-label="Close suggestion"
				>
					<RiCloseLine className="w-4 h-4 text-gray-500" />
				</button>

				{/* Header */}
				<div className="flex items-start space-x-3 pr-6">
					<div className={`flex-shrink-0 ${config.iconColor}`}>
						<IconComponent className="w-6 h-6" />
					</div>
					<div className="flex-1 min-w-0">
						<div className="flex items-center space-x-2">
							<span className="text-lg">{suggestion.icon}</span>
							<h3 className={`text-sm font-semibold ${config.titleColor}`}>
								{suggestion.title}
							</h3>
						</div>
						<p className="text-sm text-gray-600 mt-1">
							{suggestion.message}
						</p>
					</div>
				</div>

				{/* Action section */}
				<div className="mt-3 p-3 bg-white bg-opacity-50 rounded-md">
					<div className="flex items-start space-x-2">
						<div className="flex-shrink-0">
							<span className="text-sm font-medium text-gray-700">💡</span>
						</div>
						<div className="flex-1">
							<p className="text-sm text-gray-700 font-medium">Recommended Action:</p>
							<p className="text-sm text-gray-600 mt-1">{suggestion.action}</p>
						</div>
					</div>
				</div>

				{/* Parameter info */}
				<div className="mt-3 flex items-center justify-between text-xs text-gray-500">
					<div className="flex items-center space-x-2">
						<span className="font-medium">{suggestion.parameter}:</span>
						<span className="font-mono">
							{suggestion.value.toFixed(1)} {suggestion.unit}
						</span>
					</div>
					<div className="flex items-center space-x-2">
						<span>AI Analysis</span>
						<div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
					</div>
				</div>

				{/* Action buttons */}
				<div className="mt-3 flex space-x-2">
					<button
						onClick={handleDismiss}
						className="flex-1 px-3 py-2 text-xs font-medium text-gray-700 bg-white bg-opacity-50 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
					>
						Dismiss
					</button>
					<button
						onClick={handleClose}
						className="flex-1 px-3 py-2 text-xs font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 transition-colors"
					>
						Got it
					</button>
				</div>
			</div>
		</div>
	)
}
