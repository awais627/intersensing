import { AnalyticsItem } from 'components/analytics-item'
import { RepeatedClicksPanel } from './components/repeated-clicks-panel'
import { Top10 } from './components/top-10'
import { cardFilterOptions, metrics, top10Options } from './constants'
import { useState } from 'react'
import {
	getBlacklistEntriesData,
	getBlockedByIntersensingData,
	getThreadCampaignData,
	getThreadDeviceData,
	getThreadIPData
} from './utils'
import { PieCard } from '../../../../components/pie-card'
import { SourceMapCard } from './components/source-map'
import { PieCharWithMetrics } from './components/pieCharWithMetrics'
import { ThreadTrafficTimeline } from './components/traffic-timeline'

export const ThreatPageView = ({}) => {
	const [deviceType, setDeviceType] = useState<{
		name: string
		type: string
	}>(cardFilterOptions[0])
	const [ipUsageType, setIpUsageType] = useState<{
		name: string
		type: string
	}>(cardFilterOptions[0])
	const [campaignType, setCampaignType] = useState<{
		name: string
		type: string
	}>(cardFilterOptions[0])
	const [top10Type, setTop10Type] = useState<{
		name: string
		type: string
	}>(top10Options[0])
	return (
		<div className="flex items-center justify-center flex-col gap-6 w-full">
			<div className="flex py-2 items-stretch bg-white rounded-lg divide-x border border-card-border w-full">
				{metrics.map((metric, index) => (
					<AnalyticsItem
						assetId={'assetId'}
						metrics={metrics}
						key={index}
						label={metric.label}
						showMetricSelector={false}
						value={100}
						change={2}
						infoTooltip={<div className="flex flex-col">{metric.tooltip}</div>}
					/>
				))}
			</div>
			<div className="grid grid-cols-3 items-center gap-6 w-full h-[400px]">
				<div className="h-full">
					<PieCard
						containerClassName="h-full"
						data={getBlockedByIntersensingData()}
						label="Blocked by Intersensing"
						hasData={true}
						infoTooltip={
							<div className="flex flex-col">
								<p>Number of blacklist entities created by Intersensing</p>
							</div>
						}
					/>
				</div>
				<div className="col-span-2 h-full">
					<ThreadTrafficTimeline />
				</div>
			</div>
			<div className="grid grid-cols-3 items-center gap-6 w-full h-[400px]">
				<div className="h-full">
					<PieCard
						containerClassName="h-full"
						data={getBlacklistEntriesData()}
						label="Blacklist entries"
						hasData={true}
						infoTooltip={
							<div className="flex flex-col">
								<p>Number of protective actions Intersensing has taken</p>
							</div>
						}
					/>
				</div>
				<div className="col-span-2 h-full">
					<Top10 />
				</div>
			</div>
			<div className="grid grid-cols-3 items-center gap-6 w-full h-[400px]">
				<div className="col-span-1 h-full">
					<RepeatedClicksPanel />
				</div>
				<div className="col-span-2 h-full">
					<SourceMapCard />
				</div>
			</div>
			<div className="flex items-center gap-6 w-full">
				<PieCharWithMetrics
					currencyValue
					data={getThreadDeviceData()}
					label="Devices"
					loading={false}
					availableMetrics={cardFilterOptions}
					selectedMetric={deviceType}
					setSelectedMetric={setDeviceType}
					assetId={'assetId'}
					infoTooltip={
						'Shows the distribution of device types for the select metric'
					}
				/>

				<PieCharWithMetrics
					currencyValue
					data={getThreadIPData()}
					loading={false}
					label="IP usage"
					availableMetrics={cardFilterOptions}
					selectedMetric={ipUsageType}
					setSelectedMetric={setIpUsageType}
					assetId={'assetId'}
					infoTooltip={
						'Shows the distribution of IP usage types for the select metric'
					}
				/>

				<PieCharWithMetrics
					currencyValue
					data={getThreadCampaignData()}
					loading={false}
					label="Campaign types"
					availableMetrics={cardFilterOptions}
					selectedMetric={campaignType}
					setSelectedMetric={setCampaignType}
					assetId={'assetId'}
					infoTooltip={
						'Shows the distribution of top 3 campaign types for the select metric'
					}
				/>
			</div>
		</div>
	)
}
