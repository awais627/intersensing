import { ReactElement } from 'react'

export interface PieCardProps {
	isLoading?: boolean
	label?: string

	currencyValue?: boolean
	isFilteringByCampaign?: boolean
	data: any
	link?: boolean
	infoTooltip?: string | ReactElement | Element | undefined
	noData?: boolean
	containerClassName?: string
	hasData?: boolean
	totalValue?: string
}

export interface item {
	id: string
	value: number
	color: string
	variant?: number
	link?: string
}
