import React, { useState, useEffect } from 'react'
import { AISuggestion } from '../../services/ai-suggestions'
import { RiCloseLine, RiInformationLine, RiErrorWarningLine, RiAlertLine, RiCheckboxCircleLine, RiRobotLine, RiBrainLine, RiPulseLine } from 'react-icons/ri'

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
	const [isTyping, setIsTyping] = useState(false)
	const [displayedMessage, setDisplayedMessage] = useState('')
	const [displayedAction, setDisplayedAction] = useState('')
	const config = getSeverityConfig(suggestion.severity)
	const IconComponent = config.icon

	// Typing animation effect
	useEffect(() => {
		setIsTyping(true)
		setDisplayedMessage('')
		setDisplayedAction('')
		
		let messageIndex = 0
		let actionIndex = 0
		let messageInterval: NodeJS.Timeout
		let actionInterval: NodeJS.Timeout
		
		messageInterval = setInterval(() => {
			if (messageIndex < suggestion.message.length) {
				setDisplayedMessage(suggestion.message.slice(0, messageIndex + 1))
				messageIndex++
			} else {
				clearInterval(messageInterval)
				// Start typing action after message is complete
				setTimeout(() => {
					actionInterval = setInterval(() => {
						if (actionIndex < suggestion.action.length) {
							setDisplayedAction(suggestion.action.slice(0, actionIndex + 1))
							actionIndex++
						} else {
							clearInterval(actionInterval)
							setIsTyping(false)
						}
					}, 25)
				}, 800)
			}
		}, 40)

		return () => {
			clearInterval(messageInterval)
			clearInterval(actionInterval)
		}
	}, [suggestion.message, suggestion.action])

	useEffect(() => {
		// Animate in with a small delay to prevent glitches
		setTimeout(() => {
			setIsVisible(true)
			setIsAnimating(true)
		}, 200)

		// Auto-dismiss after 30 seconds for all severities
		const autoDismissTime = 30000
		const timer = setTimeout(() => {
			handleDismiss()
		}, autoDismissTime)

		return () => clearTimeout(timer)
	}, [suggestion.severity])

	const handleDismiss = () => {
		setIsAnimating(false)
		setTimeout(() => {
			onDismiss()
		}, 500)
	}

	const handleClose = () => {
		setIsAnimating(false)
		setTimeout(() => {
			onClose()
		}, 500)
	}

	return (
		<div
			className={`fixed top-4 right-4 z-50 max-w-lg w-full mx-4 transform transition-all duration-700 ease-out ${
				isVisible && isAnimating
					? 'translate-x-0 opacity-100 scale-100'
					: 'translate-x-full opacity-0 scale-95'
			}`}
		>
			<div className="relative">
				{/* AI Assistant Card */}
				<div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl shadow-2xl border border-slate-700 overflow-hidden">
					{/* Animated background pattern */}
					<div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 animate-pulse"></div>
					
					{/* Header with AI branding */}
					<div className="relative p-4 border-b border-slate-700">
						<div className="flex items-center justify-between">
							<div className="flex items-center space-x-3">
								{/* AI Avatar */}
								<div className="relative">
									<div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
										<RiRobotLine className="w-6 h-6 text-white" />
									</div>
									{/* Pulsing ring */}
									<div className="absolute inset-0 rounded-full border-2 border-blue-400 animate-ping opacity-20"></div>
								</div>
								
								<div>
									<div className="flex items-center space-x-2">
										<h3 className="text-white font-semibold text-sm">AI Assistant</h3>
										<div className="flex items-center space-x-1">
											<RiBrainLine className="w-3 h-3 text-blue-400" />
											<span className="text-xs text-blue-400 font-medium">ANALYZING</span>
										</div>
									</div>
									<p className="text-slate-400 text-xs">Real-time sensor analysis</p>
								</div>
							</div>
							
							{/* Close button */}
							<button
								onClick={handleClose}
								className="p-2 rounded-full hover:bg-slate-700 transition-colors group"
								aria-label="Close AI suggestion"
							>
								<RiCloseLine className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
							</button>
						</div>
					</div>

					{/* AI Response Content */}
					<div className="p-4 space-y-4">
						{/* Alert Header */}
						<div className="flex items-center space-x-3">
							<div className={`p-2 rounded-lg ${config.bgColor} ${config.borderColor} border`}>
								<IconComponent className={`w-5 h-5 ${config.iconColor}`} />
							</div>
							<div>
								<h4 className={`font-semibold text-sm ${config.titleColor}`}>
									{suggestion.title}
								</h4>
								<div className="flex items-center space-x-2 mt-1">
									<span className="text-lg">{suggestion.icon}</span>
									<span className="text-xs text-slate-500">
										{suggestion.parameter}: {suggestion.value.toFixed(1)} {suggestion.unit}
									</span>
								</div>
							</div>
						</div>

						{/* AI Message with typing effect */}
						<div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700">
							<div className="flex items-start space-x-2">
								<div className="w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
									<RiPulseLine className="w-3 h-3 text-white" />
								</div>
								<div className="flex-1">
									<p className="text-slate-200 text-sm leading-relaxed">
										{displayedMessage}
										{isTyping && (
											<span className="inline-block w-2 h-4 bg-blue-400 ml-1 animate-pulse"></span>
										)}
									</p>
								</div>
							</div>
						</div>

						{/* AI Recommendation */}
						<div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-lg p-3 border border-blue-500/20">
							<div className="flex items-start space-x-2">
								<div className="w-6 h-6 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
									<span className="text-white text-xs">💡</span>
								</div>
								<div className="flex-1">
									<p className="text-blue-100 text-xs font-medium mb-1">AI Recommendation:</p>
									<p className="text-slate-200 text-sm leading-relaxed">
										{displayedAction}
										{isTyping && displayedMessage === suggestion.message && (
											<span className="inline-block w-2 h-4 bg-yellow-400 ml-1 animate-pulse"></span>
										)}
									</p>
								</div>
							</div>
						</div>

						{/* AI Status Footer */}
						<div className="flex items-center justify-between pt-2 border-t border-slate-700">
							<div className="flex items-center space-x-2">
								<div className="flex items-center space-x-1">
									<div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
									<span className="text-xs text-green-400 font-medium">AI ACTIVE</span>
								</div>
								<span className="text-slate-500 text-xs">•</span>
								<span className="text-xs text-slate-500">Confidence: 94%</span>
							</div>
							<div className="text-xs text-slate-500">
								{new Date().toLocaleTimeString()}
							</div>
						</div>
					</div>

					{/* Action Buttons */}
					<div className="p-4 bg-slate-800/50 border-t border-slate-700">
						<div className="flex space-x-2">
							<button
								onClick={handleDismiss}
								className="flex-1 px-4 py-2 text-xs font-medium text-slate-300 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
							>
								Dismiss
							</button>
							<button
								onClick={handleClose}
								className="flex-1 px-4 py-2 text-xs font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg transition-all duration-200 transform hover:scale-105"
							>
								Understood
							</button>
						</div>
					</div>
				</div>

				{/* Glow effect */}
				<div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-2xl blur-xl -z-10"></div>
			</div>
		</div>
	)
}
