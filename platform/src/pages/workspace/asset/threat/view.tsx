import { AnalyticsItem } from 'components/analytics-item'
import { RepeatedClicksPanel } from './components/repeated-clicks-panel'
import { Top10 } from './components/top-10'
import { cardFilterOptions, metrics } from './constants'
import { useState } from 'react'
import {
	getAlertsByIntersensingData,
	getEntriesData,
	getThreadCampaignData,
	getThreadDeviceData,
	getThreadIPData
} from './utils'
import { PieCard } from '../../../../components/pie-card'
import { SourceMapCard } from './components/source-map'
import { PieCharWithMetrics } from './components/pieCharWithMetrics'
import { ThreadTrafficTimeline } from './components/traffic-timeline'

export const ThreatPageView = ({}) => {
	const [deviceType, setTemperatureType] = useState<{
		name: string
		type: string
	}>(cardFilterOptions[0])
	const [ipUsageType, setHumidityType] = useState<{
		name: string
		type: string
	}>(cardFilterOptions[0])
	const [campaignType, setAirQualityType] = useState<{
		name: string
		type: string
	}>(cardFilterOptions[0])
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
						data={getAlertsByIntersensingData()}
						label="Alerts by Intersensing"
						hasData={true}
						infoTooltip={
							<div className="flex flex-col">
								<p>Number of blacklist entities created by Intersensing</p>
							</div>
						}
					/>
				</div>
				<div className="col-span-2 h-full">
					<ThreadTrafficTimeline telemetryData={[]} />
				</div>
			</div>
			<div className="grid grid-cols-3 items-center gap-6 w-full h-[400px]">
				<div className="h-full">
					<PieCard
						containerClassName="h-full"
						data={getEntriesData()}
						label="Sensor Categories"
						hasData={true}
						infoTooltip={
							<div className="flex flex-col">
								<p>Temperature, Humidity, Air Quality</p>
							</div>
						}
					/>
				</div>
				<div className="col-span-2 h-full">
					<Top10 telemetryData={[]} />
				</div>
			</div>
			<div className="grid grid-cols-3 items-center gap-6 w-full h-[400px]">
				<div className="col-span-1 h-full">
					<RepeatedClicksPanel data={null} />
				</div>
				<div className="col-span-2 h-full">
					<SourceMapCard />
				</div>
			</div>
			<div className="flex items-center gap-6 w-full">
				<PieCharWithMetrics
					currencyValue
					data={getThreadDeviceData()}
					label="Temperature Zones"
					loading={false}
					availableMetrics={cardFilterOptions}
					selectedMetric={deviceType}
					setSelectedMetric={setTemperatureType}
					assetId={'assetId'}
					infoTooltip={
						'Shows the distribution of Temperature Zones types for the select metric'
					}
				/>

				<PieCharWithMetrics
					currencyValue
					data={getThreadIPData()}
					loading={false}
					label="Humidity Levels"
					availableMetrics={cardFilterOptions}
					selectedMetric={ipUsageType}
					setSelectedMetric={setHumidityType}
					assetId={'assetId'}
					infoTooltip={
						'Shows the distribution of Humidity Levelse types for the select metric'
					}
				/>

				<PieCharWithMetrics
					currencyValue
					data={getThreadCampaignData()}
					loading={false}
					label="Air Quality Index (AQI)"
					availableMetrics={cardFilterOptions}
					selectedMetric={campaignType}
					setSelectedMetric={setAirQualityType}
					assetId={'assetId'}
					infoTooltip={
						'Shows the distribution of top 3 Air Quality Index (AQI) for the select metric'
					}
				/>
			</div>
		</div>
	)
}
