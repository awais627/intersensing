import { ReactElement } from 'react'

export interface MenuLinkProps {
	label: string | ReactElement
	to: () => string
	icon?: any
	className?: string
	allowedUsers?: string[]
	onClickWithNavigation?: () => void
	onClickWithoutNavigation?: () => void
	highlightLabel?: boolean
	disabled?: boolean
}
