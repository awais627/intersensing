import { IconType } from 'react-icons'
import { ReactElement } from 'react'

export interface GBadgeProps {
	text: string | ReactElement | Element
	color?: string
	link?: string
	tooltip?: string
	className?: string
	icon?: IconType
}
