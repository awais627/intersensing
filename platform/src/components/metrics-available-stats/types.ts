import { Dispatch, ReactElement, SetStateAction } from 'react'

export interface MetricsAvailableStatsProps {
	availableMetrics: {
		key: string
		label: string | ReactElement | (() => ReactElement)
	}[]
	selectedStat: string
	selectedStats: Set<string>
	setSelectedStats: Dispatch<SetStateAction<Set<string>>>
	assetId: string
	page: string
}
