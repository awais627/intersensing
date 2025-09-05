import React, { useState, useEffect } from 'react'
import { AISuggestion, aiSuggestionService } from '../../services/ai-suggestions'
import { AISuggestionPopup } from './ai-suggestion-popup'

interface AISuggestionsContainerProps {
	telemetryData?: any
}

export const AISuggestionsContainer: React.FC<AISuggestionsContainerProps> = ({
	telemetryData
}) => {
	const [activeSuggestions, setActiveSuggestions] = useState<AISuggestion[]>([])
	const [dismissedSuggestions, setDismissedSuggestions] = useState<Set<string>>(new Set())
	const [suggestionQueue, setSuggestionQueue] = useState<AISuggestion[]>([])
	const [isAlertActive, setIsAlertActive] = useState(false)

	useEffect(() => {
		// Register alert active callback with the service
		aiSuggestionService.registerAlertActiveCallback(() => isAlertActive)

		// Subscribe to new suggestions
		const unsubscribe = aiSuggestionService.subscribe((suggestion) => {
			// Don't add if already dismissed
			if (dismissedSuggestions.has(suggestion.id)) {
				return
			}

			// If no alert is currently active, show the suggestion immediately
			if (!isAlertActive) {
				setActiveSuggestions([suggestion])
				setIsAlertActive(true)
			} else {
				// If alert is active, add to queue
				setSuggestionQueue(prev => [...prev, suggestion])
			}
		})

		return unsubscribe
	}, [dismissedSuggestions, isAlertActive])

	// Process telemetry data when it changes
	useEffect(() => {
		if (telemetryData) {
			aiSuggestionService.processTelemetryData(telemetryData)
		}
	}, [telemetryData])

	// Clean up old suggestions periodically
	useEffect(() => {
		const interval = setInterval(() => {
			aiSuggestionService.clearOldSuggestions()
			setActiveSuggestions(prev => 
				prev.filter(s => !dismissedSuggestions.has(s.id))
			)
		}, 60000) // Every minute

		return () => clearInterval(interval)
	}, [dismissedSuggestions])

	const handleClose = (suggestionId: string) => {
		setActiveSuggestions(prev => 
			prev.filter(s => s.id !== suggestionId)
		)
		setIsAlertActive(false)
		
		// Process next suggestion from queue if available
		setSuggestionQueue(prev => {
			if (prev.length > 0) {
				const nextSuggestion = prev[0]
				setActiveSuggestions([nextSuggestion])
				setIsAlertActive(true)
				return prev.slice(1)
			}
			return prev
		})
	}

	const handleDismiss = (suggestionId: string) => {
		setDismissedSuggestions(prev => new Set([...prev, suggestionId]))
		setActiveSuggestions(prev => 
			prev.filter(s => s.id !== suggestionId)
		)
		setIsAlertActive(false)
		
		// Process next suggestion from queue if available
		setSuggestionQueue(prev => {
			if (prev.length > 0) {
				const nextSuggestion = prev[0]
				setActiveSuggestions([nextSuggestion])
				setIsAlertActive(true)
				return prev.slice(1)
			}
			return prev
		})
	}

	// Initial demo suggestion after 10 seconds
	useEffect(() => {
		const initialTimer = setTimeout(() => {
			const demoSuggestions = aiSuggestionService.generateDemoSuggestions()
			const randomSuggestion = demoSuggestions[Math.floor(Math.random() * demoSuggestions.length)]
			
			// Don't add if already dismissed
			if (dismissedSuggestions.has(randomSuggestion.id)) {
				return
			}

			// If no alert is currently active, show the suggestion immediately
			if (!isAlertActive) {
				setActiveSuggestions([randomSuggestion])
				setIsAlertActive(true)
			} else {
				// If alert is active, add to queue
				setSuggestionQueue(prev => [...prev, randomSuggestion])
			}
		}, 10000) // Initial trigger after 10 seconds

		return () => clearTimeout(initialTimer)
	}, [dismissedSuggestions, isAlertActive])

	// Generate demo suggestions periodically for demo purposes
	useEffect(() => {
		const demoInterval = setInterval(() => {
			// Generate demo suggestions with 20% probability
			if (Math.random() < 0.2) {
				const demoSuggestions = aiSuggestionService.generateDemoSuggestions()
				const randomSuggestion = demoSuggestions[Math.floor(Math.random() * demoSuggestions.length)]
				
				// Don't add if already dismissed
				if (dismissedSuggestions.has(randomSuggestion.id)) {
					return
				}

				// If no alert is currently active, show the suggestion immediately
				if (!isAlertActive) {
					setActiveSuggestions([randomSuggestion])
					setIsAlertActive(true)
				} else {
					// If alert is active, add to queue
					setSuggestionQueue(prev => [...prev, randomSuggestion])
				}
			}
		}, 15000) // Every 15 seconds

		return () => clearInterval(demoInterval)
	}, [dismissedSuggestions, isAlertActive])

	return (
		<div className="fixed top-4 right-4 z-50">
			{activeSuggestions.length > 0 && (
				<AISuggestionPopup
					key={activeSuggestions[0].id}
					suggestion={activeSuggestions[0]}
					onClose={() => handleClose(activeSuggestions[0].id)}
					onDismiss={() => handleDismiss(activeSuggestions[0].id)}
				/>
			)}
			{/* Queue indicator */}
			{suggestionQueue.length > 0 && (
				<div className="mt-2 bg-blue-600 text-white text-xs px-3 py-1 rounded-full shadow-lg">
					{suggestionQueue.length} more alert{suggestionQueue.length > 1 ? 's' : ''} waiting
				</div>
			)}
		</div>
	)
}
