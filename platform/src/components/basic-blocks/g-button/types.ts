import CSS from 'csstype'
import { ReactNode } from 'react'
import { IconType } from 'react-icons'

export interface GbuttonProps {
	label?: string
	children?: ReactNode
	type?: 'icon' | 'text'
	shape?: 'square' | 'circle'
	variant?: 'text' | 'contained' | 'outlined' | 'colored'
	color?:
		| 'primary'
		| 'secondary'
		| 'success'
		| 'warning'
		| 'danger'
		| 'neutral'
		| 'purple'
		| 'white'
		| 'buttonPrimary'
		| 'disabled'
		| 'yellow'

	size?: 'xxxs' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
	disabled?: boolean
	icon?: IconType
	iconPlacement?: 'left' | 'right'
	onClick?: () => void
	style?: CSS.Properties
	className?: string
	loading?: boolean
	tooltipPosition?: 'top' | 'bottom' | 'left' | 'right'
	labelClassName?: string
	borderColor?: string
	hoverColor?: string
	iconClassName?: string,
	loader?: boolean,
}
