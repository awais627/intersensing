import { GTooltip } from 'components/basic-blocks'
import { GBadge } from 'components/basic-blocks/g-badge'
import { BsInfinity } from 'react-icons/bs'
import { RiQuestionLine } from 'react-icons/ri'
import { AnalyticsItemProps } from './types'
import { PercentageBadge } from './percentage-badge'
import { MetricsAvailableStats } from '../metrics-available-stats'
import { formatNumber } from '../../utils/helpers'

export const AnalyticsItem = (props: AnalyticsItemProps) => {
	const {
		showValue = true,
		tooltipMsg,
		label,
		value,
		change,
		prefix,
		suffix,
		infoTooltip,
		metrics,
		showMetricSelector = true,
		setSelectedMetrics,
		selectedMetric,
		selectedMetrics,
		assetId,
		format
	} = props

	return (
		<div className="grow">
			<div className="px-6 py-2">
				<dt className="pb-2">
					<div className="flex flex-row gap-x-1 justify-between items-center">
						<div className="flex flex-row gap-x-1 items-center ">
							<p className="text-base font-bold text-t-title truncate">
								{label}
							</p>
							{infoTooltip ? (
								<span className="flex">
									<GTooltip content={infoTooltip}>
										<RiQuestionLine className="w-3.5 h-3.5 text-t-dark" />
									</GTooltip>
								</span>
							) : undefined}
						</div>
						{showMetricSelector && selectedMetric && selectedMetrics ? (
							<div className="self-center">
								<>
									<MetricsAvailableStats
										selectedStat={selectedMetric}
										availableMetrics={metrics}
										selectedStats={selectedMetrics}
										setSelectedStats={setSelectedMetrics}
										assetId={assetId}
										page="analytics"
									/>
								</>
							</div>
						) : null}
					</div>
				</dt>
				<dd className="flex items-baseline justify-between">
					{showValue && (
						<>
							<p className="text-2xl font-bold text-t-heading whitespace-nowrap">
								{prefix} {format === 'comma' ? formatNumber(+value) : value}
								{suffix}
							</p>
							<span>
								{change !== undefined && (
									<>
										{typeof change === 'string' &&
										change.toLowerCase() === 'infinity' ? (
											<GBadge
												text={
													<>
														<BsInfinity />%
													</>
												}
												color="green"
											/>
										) : (
											typeof change === 'number' && (
												<PercentageBadge change={change} />
											)
										)}
									</>
								)}
							</span>
						</>
					)}
					{!showValue && (
						<GTooltip content={tooltipMsg}>
							<div className="text-xl pt-1 font-semibold text-t-default">
								N/A
							</div>
						</GTooltip>
					)}
				</dd>
			</div>
		</div>
	)
}
