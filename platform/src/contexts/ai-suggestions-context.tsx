import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { AISuggestion, aiSuggestionService } from '../services/ai-suggestions'
import { TelemetryData } from '../services/telemetry'

interface AISuggestionsContextType {
	activeSuggestions: AISuggestion[]
	dismissedSuggestions: Set<string>
	handleClose: (suggestionId: string) => void
	handleDismiss: (suggestionId: string) => void
	clearAllSuggestions: () => void
	telemetryData: TelemetryData | null
	setTelemetryData: (data: TelemetryData | null) => void
}

const AISuggestionsContext = createContext<AISuggestionsContextType | undefined>(undefined)

interface AISuggestionsProviderProps {
	children: ReactNode
}

export const AISuggestionsProvider: React.FC<AISuggestionsProviderProps> = ({ children }) => {
	const [activeSuggestions, setActiveSuggestions] = useState<AISuggestion[]>([])
	const [dismissedSuggestions, setDismissedSuggestions] = useState<Set<string>>(new Set())
	const [telemetryData, setTelemetryData] = useState<TelemetryData | null>(null)

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
			// Generate demo suggestions with 20% probability
			if (Math.random() < 0.2) {
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
		}, 15000) // Every 15 seconds

		return () => clearInterval(demoInterval)
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

	const clearAllSuggestions = () => {
		setActiveSuggestions([])
		setDismissedSuggestions(new Set())
	}

	const value: AISuggestionsContextType = {
		activeSuggestions,
		dismissedSuggestions,
		handleClose,
		handleDismiss,
		clearAllSuggestions,
		telemetryData,
		setTelemetryData
	}

	return (
		<AISuggestionsContext.Provider value={value}>
			{children}
		</AISuggestionsContext.Provider>
	)
}

export const useAISuggestions = (): AISuggestionsContextType => {
	const context = useContext(AISuggestionsContext)
	if (context === undefined) {
		throw new Error('useAISuggestions must be used within an AISuggestionsProvider')
	}
	return context
}
