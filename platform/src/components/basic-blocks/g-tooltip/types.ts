import { MouseEvent, ReactElement, ReactNode } from 'react'

export interface GTooltipProps {
	position?: 'bottom' | 'left' | 'right' | 'top'
	persist?: boolean
	content?: ReactElement | Element | string | undefined
	containerClassName?: string
	childrenContainerClassName?: string
	className?: string
	children: ReactElement | Element
	onClick?: (e: MouseEvent) => void
}

export interface GNewTooltipProps {
	position?: 'bottom' | 'left' | 'right' | 'top'
	children: ReactNode
	content: ReactNode
	delayDuration?: number
	skipDelayDuration?: number
}
