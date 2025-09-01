import { RiShareBoxFill } from 'react-icons/ri'
import { classNames, isValidUrl } from 'utils'
import { PageHeaderProps } from './types'

export const PageHeader = (props: PageHeaderProps) => {
	const {
		title,
		action,
		tags,
		subtitle,
		tabs,
		currentTab,
		tabsActions,
		info,
		tagline,
		actionPlacement = 'bottom',
		editAction,
		editActionPlacement = 'top'
	} = props

	return (
		<div className={classNames('flex flex-col pb-4  pt-8')}>
			<div className="w-full flex justify-between items-end">
				<div
					className={classNames(
						'flex justify-between items-end flex-1 min-w-0 pb-6',
						'px-8',
						''
					)}
				>
					<div>
						<div className="flex items-baseline">
							<h2 className="text-t-heading font-bold sm:text-3xl truncate max-w-[45rem]">
								{title}
							</h2>
							{title && isValidUrl(title) && (
								<a
									href={`//${title}`}
									target="_blank"
									className="pl-2 text-primary-500"
								>
									<RiShareBoxFill />
								</a>
							)}
						</div>

						{tags && (
							<div className="flex flex-wrap gap-x-1 font-normal">
								{tagline && tagline}
								{tags.map((item, i) => {
									return (
										item?.label && (
											<div
												key={`page-item-${i}`}
												className="flex items-center text-base text-t-default truncate min-w-min max-w-80"
											>
												{item.icon && item.icon}
												<span
													className={`max-w-[10rem] flex items-center ${
														tagline && 'font-bold'
													}`}
												>
													{item.label && item.label}
													{item.label && isValidUrl(item.label) && (
														<a
															href={`//${item.label}`}
															target="_blank"
															className="pl-2 text-primary-500"
														>
															<RiShareBoxFill />
														</a>
													)}
												</span>
											</div>
										)
									)
								})}
							</div>
						)}
						{subtitle && (
							<div className="flex items-center space-x-2 font-medium sm:truncate">
								{subtitle}
							</div>
						)}
					</div>
				</div>
				{editActionPlacement === 'top' && (
					<div className="flex justify-end items-center flex-1 min-w-0 pb-4 px-4">
						{editAction && (
							<div className="flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
								{editAction}
							</div>
						)}
					</div>
				)}
				{actionPlacement === 'top' && (
					<div className="flex justify-end items-center flex-1 min-w-0 pb-4 px-4">
						{action && (
							<div className="flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
								{action}
							</div>
						)}
					</div>
				)}
			</div>
			{actionPlacement === 'bottom' && (
				<div className="w-full flex min-w-0 px-4">
					{action && (
						<div className="w-full flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
							{action}
						</div>
					)}
				</div>
			)}
			{(tabs && currentTab) || tabsActions || info ? (
				<div className="flex gap-2 px-8 items-center justify-between">
					<div className="w-full">
						{info && <div className="flex-1 flex-wrap">{info}</div>}
						{tabs && currentTab && <div className="flex-1 flex-wrap"> </div>}
					</div>
					{tabsActions && (
						<div className="w-full flex justify-end">{tabsActions}</div>
					)}
				</div>
			) : (
				<></>
			)}
		</div>
	)
}
