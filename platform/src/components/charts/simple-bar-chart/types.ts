import { ReactNode } from 'react'

export type SimpleBarFormat = 'number' | 'dollar' | 'percentage'

export interface SimpleBarChartProps {
	data: any
	keys: string[]
	colors: string[]
	tooltip?: any
	title?: ReactNode
	children?: ReactNode
	format: SimpleBarFormat
}
