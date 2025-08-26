import { TabItem } from 'components/tabs/types'
import { ReactElement } from 'react'

export interface PageHeaderProps {
	title: string
	mode?: 'simple' | 'full'
	subtitle?:
		| string
		| Array<{ icon?: any; subtitle?: string | null }>
		| ReactElement
	currentTab?: string
	tabs?: Array<TabItem>
	tabsActions?: any
	info?: any
	tags?: Array<{ icon?: any; label?: string | null }>
	tagline?: string
	action?: any
	actionPlacement?: 'top' | 'bottom'
	editAction?: any
	editActionPlacement?: 'top' | 'bottom'
}
