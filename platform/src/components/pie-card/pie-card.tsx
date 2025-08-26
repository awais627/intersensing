import { Fragment } from 'react'

import { RiQuestionLine } from 'react-icons/ri'
import {
	classNames,
	formatSpendWithCurrency,
	formatStatsCard,
	getPercentage
} from 'utils'
import { PieChart } from '../charts/pie-chart'
import { PieCardProps } from './types'
import { GLoading, GTooltip } from '../basic-blocks'
import { color } from '../../utils/colors'
import { Transition } from '@headlessui/react'
import { EmptyState } from '../../pages/workspace/asset/threat/components/empty-state'

export const PieCard = (props: PieCardProps) => {
	const {
		isLoading,
		currencyValue,
		data,
		label,
		infoTooltip,
		isFilteringByCampaign = false,
		containerClassName,
		hasData
	} = props

	const tooltipMessage = isFilteringByCampaign
		? 'Ad spend metric is not available for individual campaigns'
		: infoTooltip

	return (
		<div
			className={classNames(
				'h-full flex flex-col space-y-3 bg-white p-4 text-sm rounded-md relative border border-card-border',
				containerClassName ?? ''
			)}
		>
			<Fragment>
				<div className="flex items-center">
					<span className="text-lg font-bold mr-2">{label}</span>{' '}
					{tooltipMessage ? (
						<>
							<GTooltip content={tooltipMessage}>
								<RiQuestionLine className="w-3.5 h-3.5 text-t-dark" />
							</GTooltip>
						</>
					) : undefined}
				</div>
				{isFilteringByCampaign ? (
					<div className="text-base font-bold">
						Ad spend metric is not available for individual campaigns
					</div>
				) : (
					<div className="flex items-center justify-between">
						{hasData ? (
							<>
								<div className="w-1/2 mr-2">
									<PieChart
										data={data}
										currencyValue={currencyValue}
										currency={'usd'}
									/>
								</div>
								<div className="w-1/2 ml-2">
									{data.map((item: any, index: number) => {
										return (
											<Fragment key={index}>
												<div className="flex items-start mb-4">
													<div className="ml-3">
														<div className="flex flex-row justify-start items-center space-x-1 mb-2 -ml-4">
															<div
																className="w-3 h-3 rounded-full"
																style={{
																	background: color(
																		item.color,
																		item.variant ? item.variant : 500
																	)
																}}
															></div>
															<p className="text-t-default">{item.id}</p>
														</div>
														{item && (
															<div className="font-bold">
																<>
																	{currencyValue
																		? item.value > 0
																			? `${formatSpendWithCurrency(
																					item.value,
																					'usd'
																			  )} `
																			: 'N/A'
																		: formatStatsCard(item.value)}
																	<span>
																		{' '}
																		({getPercentage(item.value, data)}%)
																	</span>
																</>
															</div>
														)}
													</div>
												</div>
											</Fragment>
										)
									})}
								</div>
							</>
						) : (
							<div className="flex items-center justify-center h-full w-full min-h-[250px]">
								<EmptyState />
							</div>
						)}
					</div>
				)}
			</Fragment>
			<Transition
				show={!!isLoading}
				enter="transition-opacity duration-150"
				enterFrom="opacity-0"
				enterTo="opacity-100"
				leave="transition-opacity duration-300"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
			>
				<div className="absolute top-0 bottom-0 left-0 right-0 bg-white opacity-90 z-100">
					<GLoading addMargin={false} />
				</div>
			</Transition>
		</div>
	)
}
