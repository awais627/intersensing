import React, { ReactElement } from 'react'

interface Metric {
	label: string
	key: string
	tooltip: React.ReactNode
	default?: boolean
	position?: number
	format?: string
}

export interface AnalyticsItemProps {
	label: string
	value: number | string
	change?: number | string
	prefix?: string
	suffix?: string
	showValue?: boolean
	showMetricSelector?: boolean
	tooltipMsg?: string
	infoTooltip?: string | ReactElement | false
	metrics: Metric[]
	setSelectedMetrics?: any
	selectedMetrics?: Set<string>
	selectedMetric?: string
	assetId: string
	format?: string
}
