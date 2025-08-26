import { toQuery } from 'utils'
import { ApiClient } from '../api-client'

export const generalStats = async (
	accountId: string,
	assetId: string,
	query: any
): Promise<any> => {
	const { data } = await ApiClient.client.get(
		`accounts/${accountId}/assets/${assetId}/dashboard/analytics-stats?${toQuery(
			query
		)}`
	)
	return data.data
}

export const clicksBreakdown = async (
	accountId: string,
	assetId: string,
	query: any
): Promise<any> => {
	const { data } = await ApiClient.client.get(
		`accounts/${accountId}/assets/${assetId}/dashboard/traffic-timeline?${toQuery(
			query
		)}`
	)
	return data.data
}

export const sourceMapStats = async (
	accountId: string,
	assetId: string,
	query: any
): Promise<any> => {
	const { data } = await ApiClient.client.get(
		`accounts/${accountId}/assets/${assetId}/dashboard/source-map?${toQuery(
			query
		)}`
	)
	return data.data
}

export const spendTimeline = async (
	accountId: string,
	assetId: string,
	query: any
): Promise<any> => {
	const { data } = await ApiClient.client.get(
		`accounts/${accountId}/assets/${assetId}/dashboard/spend-timeline?${toQuery(
			query
		)}`
	)
	return data.data
}

export const stats = async (
	accountId: string,
	assetId: string,
	query: any
): Promise<any> => {
	const { data } = await ApiClient.client.get(
		`accounts/${accountId}/assets/${assetId}/analytics/basic-stats?${toQuery(
			query
		)}`
	)
	return data.data
}

export const advancedStats = async (
	accountId: string,
	assetId: string,
	query: any
): Promise<any> => {
	const { data } = await ApiClient.client.get(
		`accounts/${accountId}/assets/${assetId}/analytics/advanced-stats?${toQuery(
			query
		)}`
	)
	return data.data
}

export const timeline = async (
	accountId: string,
	assetId: string,
	query: any
): Promise<any> => {
	const { data } = await ApiClient.client.get(
		`accounts/${accountId}/assets/${assetId}/analytics/timeline?${toQuery(
			query
		)}`
	)
	return data.data
}

export const table = async (
	accountId: string,
	assetId: string,
	query: any
): Promise<any> => {
	const { data } = await ApiClient.client.get(
		`accounts/${accountId}/assets/${assetId}/dashboard/ad-accounts?${toQuery(
			query
		)}`
	)
	return data.data
}

export const sourceMap = async (
	accountId: string,
	assetId: string,
	query: any
): Promise<any> => {
	const { data } = await ApiClient.client.get(
		`accounts/${accountId}/assets/${assetId}/analytics/source-map?${toQuery(
			query
		)}`
	)
	return data.data
}

export const heatMap = async (
	accountId: string,
	assetId: string,
	query: any
): Promise<any> => {
	const { data } = await ApiClient.client.get(
		`accounts/${accountId}/assets/${assetId}/analytics/heat-map?${toQuery(
			query
		)}`
	)
	return data.data
}

export const devices = async (
	accountId: string,
	assetId: string,
	query: any
): Promise<any> => {
	const { data } = await ApiClient.client.get(
		`accounts/${accountId}/assets/${assetId}/analytics/devices?${toQuery(
			query
		)}`
	)
	return data.data
}

export const campaignTypes = async (
	accountId: string,
	assetId: string,
	query: any
): Promise<any> => {
	const { data } = await ApiClient.client.get(
		`accounts/${accountId}/assets/${assetId}/analytics/campaign-types?${toQuery(
			query
		)}`
	)
	return data.data
}

export const Analytics = {
	generalStats,
	clicksBreakdown,
	stats,
	sourceMapStats,
	advancedStats,
	timeline,
	table,
	sourceMap,
	heatMap,
	devices,
	campaignTypes,
	spendTimeline
}
