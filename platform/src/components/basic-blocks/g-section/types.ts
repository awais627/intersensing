import { ReactElement } from 'react'

export interface GSectionProps {
	title?: string | ReactElement
	loading?: boolean
	subtitle?: string | ReactElement
	titleClass?: string
	actions?: any
	bar?: any
	children: any
	className?: string
	containerClassName?: string
	lineBreak?: boolean
	lineBreakColor?: string
	alignItems?: 'start' | 'center' | 'end'
	contentClassName?: string
}
