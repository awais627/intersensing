import { GTooltip } from 'components/basic-blocks'
import { useMemo } from 'react'
import { NavLink, useLocation, useMatch } from 'react-router-dom'
import { useUiStore } from 'store'
import { classNames } from '../../../utils'
import { NavButtonProps, NavItemProps } from './types'
import { GBadge } from '../../../components/basic-blocks'

export const NavItem = (props: NavItemProps) => {
	const { pathname } = useLocation()
	const desktopSidebarCollapsed = useUiStore((s) => s.desktopSidebarCollapsed)

	const isPartialActive = useMemo(
		() => (props.activeText ? pathname.includes(props.activeText) : false),
		[props]
	)

	const match = useMatch({
		path: props.to()
	})

	if (props.tooltip) {
		return (
			<GTooltip content={props.tooltip}>
				{renderNavLinkView(
					props,
					!!match,
					desktopSidebarCollapsed,
					isPartialActive
				)}
			</GTooltip>
		)
	}

	return renderNavLinkView(
		props,
		!!match,
		desktopSidebarCollapsed,
		isPartialActive
	)
}

const renderNavLinkView = (
	props: NavItemProps,
	match: boolean,
	collapsed: boolean,
	isActive: boolean
) => {
	return (
		<NavLink
			to={props.disabled ? '#' : props.to()}
			onClick={props.onClick}
			className={classNames(
				isActive || match ? 'bg-gray-100 text-t-menu' : '',
				props.disabled ? 'text-t-secondary' : 'text-t-menu hover:bg-gray-50',
				props.nested ? 'pl-12' : '',
				'group flex font-bold items-center px-3 py-2 text-sm rounded-md',
				props.className ? props.className : ''
			)}
		>
			{props?.icon && (
				<>
					{collapsed ? (
						<GTooltip content={props.label} position="right">
							<props.icon
								className={classNames(
									isActive || match
										? props.activeIconClass || 'text-primary-500'
										: '',
									'flex-shrink-0 h-[24px] w-[24px]'
								)}
								aria-hidden="true"
							/>
						</GTooltip>
					) : (
						<props.icon
							className={classNames(
								isActive || match
									? props.activeIconClass || 'text-primary-500'
									: '',
								'flex-shrink-0 h-[20px] w-[20px]'
							)}
							aria-hidden="true"
						/>
					)}
				</>
			)}
			{!collapsed && (
				<div className="flex items-center gap-1">
					<span
						className={`ml-3 text-lg  ${
							(isActive || match) && 'text-t-heading'
						}`}
					>
						{props.label}
					</span>
					{props?.badge && (
						<GBadge
							text={props.badge.text}
							color={props.badge.color}
							className={props.badge?.className}
						/>
					)}
				</div>
			)}
		</NavLink>
	)
}

export const NavButtonItem = ({
	nested,
	className,
	tooltip,
	disabled,
	icon: Icon,
	onClick,
	badge,
	label
}: NavButtonProps) => {
	const collapsed = useUiStore((s) => s.desktopSidebarCollapsed)

	return (
		<GTooltip content={tooltip ?? ''}>
			<div
				onClick={onClick}
				className={classNames(
					disabled
						? 'text-t-secondary pointer-events-none'
						: 'text-t-menu hover:bg-gray-50 cursor-pointer',
					nested ? 'pl-12' : '',
					'group flex font-bold items-center px-3 py-2 text-sm rounded-md',
					className ? className : ''
				)}
			>
				{Icon && (
					<>
						{collapsed ? (
							<GTooltip content={label} position="right">
								<Icon
									className={classNames('flex-shrink-0 h-[24px] w-[24px]')}
									aria-hidden="true"
								/>
							</GTooltip>
						) : (
							<Icon
								className={classNames('flex-shrink-0 h-[20px] w-[20px]')}
								aria-hidden="true"
							/>
						)}
					</>
				)}
				{!collapsed && (
					<div className="flex items-center gap-1">
						<span className={'ml-3 text-lg'}>{label}</span>
						{badge && (
							<GBadge
								text={badge.text}
								color={badge.color}
								className={badge?.className}
							/>
						)}
					</div>
				)}
			</div>
		</GTooltip>
	)
}
