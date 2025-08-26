export const buildQueryParams = (props: {
	from: Date
	to: Date
	adAccountId?: string
	campaignId?: string
	platform?: string
}) => {
	const { from, to, adAccountId, campaignId, platform } = props

	const query = {
		dateFrom: from.getTime(),
		dateTo: to.getTime()
	}
	if (adAccountId) Object.assign(query, { adAccountId })
	if (campaignId) Object.assign(query, { campaignId, platform })

	return query
}

export const buildRepeatedData = (data?: any) => {
	if (!data) return
	const values = data.reduce(
		(r: any, i: any) => {
			let key = i.number
			if (key >= 10) key = '10+'
			r[key] += i.count
			return r
		},
		{ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, '10+': 0 }
	)
	return Object.keys(values).map((k) => {
		return {
			number: k,
			count: values[k]
		}
	})
}

export const buildDeepLink = (props: {
	accountId: string
	assetId: string
	level: string
	page: string
	filters?: string
	adAccountId?: string
	campaignId?: string
}) => {
	const { accountId, assetId, level, page, filters, adAccountId, campaignId } =
		props

	if (!filters) return `/workspace/${accountId}/asset/${assetId}/${page}`
	if (level === 'website')
		return `/workspace/${accountId}/asset/${assetId}/${page}?${filters}`
	if (level === 'ad-account')
		return `/workspace/${accountId}/asset/${assetId}/${page}?${filters}&adAccount=${adAccountId}`

	return `/workspace/${accountId}/asset/${assetId}/${page}?${filters}&adAccount=${adAccountId}&campaign=${campaignId}`
}

export const getBlockedByClickGuardData = () => {
	return [
		{
			id: 'IP address',
			value: 0,
			color: 'primary',
			variant: '900'
		},
		{
			id: 'IP range',
			value: 0,
			color: 'primary',
			variant: '700'
		},
		{
			id: 'App placement',
			value: 0,
			color: 'primary',
			variant: '500'
		},
		{
			id: 'Domain placement',
			value: 0,
			color: 'primary',
			variant: '300'
		}
	]
}
export const getBlacklistEntriesData = () => {
	return [
		{
			id: 'IP address',
			value: 0,
			color: 'gray',
			variant: '900'
		},
		{
			id: 'IP range',
			value: 0,
			color: 'gray',
			variant: '700'
		},
		{
			id: 'App placement',
			value: 0,
			color: 'gray',
			variant: '500'
		},
		{
			id: 'Domain placement',
			value: 0,
			color: 'gray',
			variant: '300'
		}
	]
}

export const getThreadDeviceData = () => {
	return [
		{
			id: 'Desktop',
			value: 0,
			color: 'blue',
			variant: '900'
		},
		{
			id: 'Mobile',
			value: 0,
			color: 'blue',
			variant: '700'
		},
		{
			id: 'Table',
			value: 0,
			color: 'blue',
			variant: '500'
		}
	]
}

export const getThreadIPData = () => {
	return [
		{
			id: 'Residential',
			value: 0,
			color: 'amber',
			variant: '900'
		},
		{
			id: 'Business',
			value: 0,
			color: 'amber',
			variant: '700'
		},
		{
			id: 'Data center',
			value: 0,
			color: 'amber',
			variant: '500'
		}
	]
}
export const getThreadCampaignData = () => {
	return [
		{
			id: 'Display',
			value: 0,
			color: 'purple',
			variant: '900'
		},
		{
			id: 'Search',
			value: 0,
			color: 'purple',
			variant: '700'
		}
	]
}
