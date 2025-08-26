export const SubscriptionColors: Record<
	| 'PENDING'
	| 'TRIAL'
	| 'ACTIVE'
	| 'SWITCHING'
	| 'CANCELLING'
	| 'CANCELLED'
	| 'NONE',
	string
> = {
	TRIAL: 'primary',
	ACTIVE: 'green',
	CANCELLED: 'red',
	CANCELLING: 'amber',
	SWITCHING: 'violet',
	PENDING: 'violet',
	NONE: 'gray'
}

import colors from 'tailwindcss/colors'

export const color = (name: string, v?: any) => {
	if (['primary'].includes(name)) {
		return `var(--color-${name}-${v || 500})`
	}
	if (['t'].includes(name)) {
		return `var(--color-text-${v})`
	}
	const _col = colors as any

	return _col[name][v || 500]
}

export const defaultPlatformColor = (platform: 'GADS' | 'FADS' | 'BADS') => {
	if (platform === 'GADS') return color('red', 500)
	if (platform === 'FADS') return color('blue', 500)
	if (platform === 'BADS') return color('green', 500)
	return color('red', 500)
}
