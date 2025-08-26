export interface ThreatPageProps {
	accountId: string
	assetId: string
	from: Date
	to: Date
	adAccountId?: string
	campaignId?: string
	platform?: string
}

export type MapDataItem = {
	country: string
	count: number
}
