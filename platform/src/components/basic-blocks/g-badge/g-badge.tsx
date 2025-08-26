import { useThemeStore } from 'layout/navbar/store'
import { useNavigate } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'
import { GBadgeProps } from './types'
import { GTooltip } from '../g-tooltip'

export const GBadge = ({
	text,
	color,
	link,
	tooltip,
	className,
	icon: Icon
}: GBadgeProps) => {
	const navigate = useNavigate()

	const { theme } = useThemeStore()

	const textColor = () => {
		if (!color || color === 'neutral')
			return theme === 'dark' ? 'text-t-default' : 'text-t-secondary'

		return theme === 'dark' ? `text-${color}-400` : `text-${color}-700`
	}
	const bgColor = () => {
		if (!color || color === 'neutral')
			return theme === 'dark' ? 'bg-gray-100' : 'bg-gray-50'

		return theme === 'dark' ? 'bg-badge-selected' : `bg-${color}-100`
	}

	if (tooltip) {
		return (
			<GTooltip content={tooltip} position="top">
				<div
					className={twMerge(
						'rounded-md text-sm font-semibold py-0.5 px-1.5 w-fit',
						bgColor(),
						textColor(),
						link ? 'cursor-pointer' : '',
						`${className}`
					)}
					onClick={() => (link ? navigate(link) : null)}
				>
					{Icon && <Icon />}
					{text}
				</div>
			</GTooltip>
		)
	}

	return (
		<div
			className={twMerge(
				'flex items-center gap-0.5 rounded-full text-sm font-bold py-[3px] px-2 w-fit',
				bgColor(),
				textColor(),
				link ? 'cursor-pointer' : '',
				`${className}`
			)}
			onClick={() => (link ? navigate(link) : null)}
		>
			{Icon && <Icon />}
			{text}
		</div>
	)
}
