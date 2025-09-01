import { GbuttonProps } from '../basic-blocks/g-button/types'

export type Options =
	| 'Last 30 days'
	| 'Last 7 days'
	| 'This week'
	| 'Last week'
	| 'Last month'
	| 'Custom'

export interface GDateRangeProps {
	onChange?: (e: { from: Date; to: Date }) => void
	onApply?: (e: { from: Date; to: Date }) => void
	minDate?: Date
	label?: string
	align?: 'left' | 'right'
	variant?: GbuttonProps['variant']
	color?: GbuttonProps['color']
	size?: GbuttonProps['size']
	className?: string
	buttonLabel?: string
	loading?: boolean
	demoMode?: boolean
	applyFiltersOnMounting?: boolean
}
