import { ReactElement } from 'react'

export interface BarChartProps {
	label?: string
	data: any
	index: string
	keys: string[]
	stacked?: boolean
	reversed?: boolean
	leftPadding?: number
	layout?: 'vertical' | 'horizontal'
	tooltip: (data: any, id?: any) => ReactElement
	containerClassName?: string
	barPadding?: number
	hideAxisLeft?: boolean
	axisBottomFormat?: any
	circleFill?: boolean
}
