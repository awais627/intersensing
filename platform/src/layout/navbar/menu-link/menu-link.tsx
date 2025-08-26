import { NavLink, useMatch } from 'react-router-dom'
import { classNames } from 'utils'
import { MenuLinkProps } from './types'

export const MenuLink = (props: MenuLinkProps) => {
	const {
		icon,
		disabled,
		highlightLabel,
		label,
		onClickWithNavigation,
		onClickWithoutNavigation
	} = props

	const match = useMatch({
		path: props.to()
	})
	return (
		<div
			className={`overflow-hidden ${props.className || ''}`}
			{...(onClickWithNavigation && {
				...{ onClick: () => onClickWithNavigation() }
			})}
		>
			<NavLink
				to={props.disabled ? '#' : props.to()}
				className={classNames(
					'flex items-center px-2 py-2 text-lg text-t-menu font-bold hover:bg-gray-50 cursor-pointer space-x-3',
					props.className || ''
				)}
				{...(onClickWithoutNavigation && {
					...{
						onClick: (e) => {
							e.preventDefault()
							onClickWithoutNavigation()
						}
					}
				})}
			>
				{icon && <props.icon className="text-t-menu flex-shrink-0 h-4 w-4" />}
				<div
					className={`flex justify-center items-center gap-2 ${
						disabled
							? 'text-t-tertiary'
							: highlightLabel && match
							? 'text-primary-500'
							: 'text-t-menu'
					}`}
				>
					{label}
					{}
				</div>
			</NavLink>
		</div>
	)
	// }
}
