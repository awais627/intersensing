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

	useEffect(() => {
		// Subscribe to new suggestions
		const unsubscribe = aiSuggestionService.subscribe((suggestion) => {
			setActiveSuggestions(prev => {
				// Don't add if already dismissed or already active
				if (dismissedSuggestions.has(suggestion.id) || 
					prev.some(s => s.id === suggestion.id)) {
					return prev
				}
				// Only show one suggestion at a time - replace any existing suggestions
				return [suggestion]
			})
		})

		return unsubscribe
	}, [dismissedSuggestions])

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
	}

	const handleDismiss = (suggestionId: string) => {
		setDismissedSuggestions(prev => new Set([...prev, suggestionId]))
		setActiveSuggestions(prev => 
			prev.filter(s => s.id !== suggestionId)
		)
	}

	// Initial demo suggestion after 10 seconds
	useEffect(() => {
		const initialTimer = setTimeout(() => {
			const demoSuggestions = aiSuggestionService.generateDemoSuggestions()
			const randomSuggestion = demoSuggestions[Math.floor(Math.random() * demoSuggestions.length)]
			
			setActiveSuggestions(prev => {
				if (dismissedSuggestions.has(randomSuggestion.id) || 
					prev.some(s => s.id === randomSuggestion.id)) {
					return prev
				}
				// Only show one suggestion at a time
				return [randomSuggestion]
			})
		}, 10000) // Initial trigger after 10 seconds

		return () => clearTimeout(initialTimer)
	}, [dismissedSuggestions])

	// Generate demo suggestions periodically for demo purposes
	useEffect(() => {
		const demoInterval = setInterval(() => {
			// Generate demo suggestions with 30% probability
			if (Math.random() < 0.3) {
				const demoSuggestions = aiSuggestionService.generateDemoSuggestions()
				const randomSuggestion = demoSuggestions[Math.floor(Math.random() * demoSuggestions.length)]
				
				setActiveSuggestions(prev => {
					if (dismissedSuggestions.has(randomSuggestion.id) || 
						prev.some(s => s.id === randomSuggestion.id)) {
						return prev
					}
					// Only show one suggestion at a time - replace any existing suggestions
					return [randomSuggestion]
				})
			}
		}, 10000) // Every 10 seconds

		return () => clearInterval(demoInterval)
	}, [dismissedSuggestions])

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
		</div>
	)
}
