export interface NavItemProps {
	label: string
	to: () => string
	onClick?: () => void
	icon?: any
	disabled?: boolean
	tooltip?: string
	nested?: boolean
	activeText?: string
	className?: string
	activeIconClass?: string
	badge?: {
		text: string
		className?: string
		color: string
	}
}

export interface NavButtonProps {
	label: string
	onClick?: () => void
	icon?: any
	disabled?: boolean
	tooltip?: string
	nested?: boolean
	className?: string
	badge?: {
		text: string
		className?: string
		color: string
	}
}
