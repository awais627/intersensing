export interface TrafficTimelineProps {
	cacheKey: (name: string) => (string | number | undefined)[]
	accountId: string
	assetId: string
	adAccountId?: string
	from: Date
	to: Date
	hasData: boolean
	campaignId?: string
	platform?: string
}
