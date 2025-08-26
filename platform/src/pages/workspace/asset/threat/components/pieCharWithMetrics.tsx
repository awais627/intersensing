import React, { Fragment, ReactElement } from 'react'

import { RiQuestionLine } from 'react-icons/ri'

import { PieChart } from 'components/charts/pie-chart'

import { GLoading, GSection } from 'components/basic-blocks'

import { formatStatsCard, getPercentage } from 'utils'
import { color } from 'utils/colors'

import { Transition } from '@headlessui/react'
import { item } from '../../../../../components/pie-card/types'
import { GNewTooltip } from '../../../../../components/basic-blocks/g-tooltip/g-new-tooltip'
import { AvailableMetrics } from './repeated-clicks-panel/available-metrics'

export interface PieCardProps {
	isLoading?: boolean
	label?: string

	currencyValue?: boolean
	isFilteringByCampaign?: boolean
	data: any
	link?: boolean
	infoTooltip?: string | ReactElement | Element | undefined
	noData?: boolean
	availableMetrics: {
		name: string
		type: string
	}[]
	loading: boolean
	selectedMetric: {
		name: string
		type: string
	}
	setSelectedMetric: React.Dispatch<React.SetStateAction<any>>
	assetId: string
}

export const PieCharWithMetrics = (props: PieCardProps) => {
	const {
		isLoading,
		data,
		label,
		infoTooltip,
		selectedMetric,
		setSelectedMetric,
		availableMetrics,
		loading,
		assetId
	} = props

	return (
		<GSection containerClassName="w-full" loading={loading}>
			<div className="h-auto flex flex-col space-y-3 bg-white text-sm rounded-md relative">
				<div className="flex items-center justify-between">
					<div className="text-gray-500 text-md flex flex-row items-center gap-x-1">
						<div className="text-xl font-bold text-t-default">{label}</div>
						<GNewTooltip content={infoTooltip}>
							<RiQuestionLine className="w-3.5 h-3.5 text-t-dark" />
						</GNewTooltip>
					</div>
					<div className="self-center">
						<AvailableMetrics
							availableMetrics={availableMetrics}
							selectedMetric={selectedMetric}
							setSelectedMetric={setSelectedMetric}
							assetId={assetId}
							page="threat"
							card="device"
						/>
					</div>
				</div>
				<div className="flex items-center gap-4 w-full h-[200px] pt-5">
					<div className="w-[170px] mr-2">
						<PieChart data={data} />
					</div>
					<div className="w-max">
						{data.map((item: item, index: number) => {
							return (
								<Fragment key={index}>
									<div className="flex items-start mb-4">
										<div
											className="w-3 h-3 rounded-full"
											style={{
												background: color(
													item.color,
													item.variant ? item.variant : 500
												)
											}}
										></div>
										<div className="ml-3">
											<div className="flex flex-row justify-start items-center space-x-1 mb-2">
												<p className="text-t-default">{item.id}</p>
											</div>
											{item && (
												<div className="font-bold">
													<>
														{formatStatsCard(item.value)}
														<span> ({getPercentage(item.value, data)}%)</span>
													</>
												</div>
											)}
										</div>
									</div>
								</Fragment>
							)
						})}
					</div>
				</div>
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
		</GSection>
	)
}
