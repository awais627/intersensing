import {
	DashboardActionsStatsDTO,
	DashboardBlocksStatsDTO,
	DashboardThreatsStatsDTO,
	ReportDTO,
	ReportRequestDTO
} from 'api-models'

import { toQuery } from 'utils'

import { ApiClient } from '../api-client'

export const stats = async (
	accountId: string,
	assetId: string,
	query: any
): Promise<any> => {
	const { data } = await ApiClient.client.get(
		`accounts/${accountId}/assets/${assetId}/dashboard/stats?${toQuery(query)}`
	)

	return data.data
}

export const oldStats = async (
	accountId: string,

	assetId: string,

	query: any
): Promise<any> => {
	const { data } = await ApiClient.client.get(
		`accounts/${accountId}/assets/${assetId}/dashboard-old/stats?${toQuery(
			query
		)}`
	)

	return data.data
}

export const threatActivity = async (
	accountId: string,

	assetId: string,
	query: any
): Promise<any> => {
	const { data } = await ApiClient.client.get(
		`accounts/${accountId}/assets/${assetId}/dashboard/threat-activity?${toQuery(
			query
		)}`
	)
	return data.data
}

export const threatStats = async (
	accountId: string,
	assetId: string,
	query: any
): Promise<DashboardThreatsStatsDTO> => {
	const { data } = await ApiClient.client.get(
		`accounts/${accountId}/assets/${assetId}/dashboard/threats-stats?${toQuery(
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

export const trafficTimeline = async (
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

export const totalClicks = async (
	accountId: string,

	assetId: string,

	query: any
): Promise<{
	total_clicks: number

	previous_total_clicks: number

	good_clicks: number

	sus_clicks: number

	bad_clicks: number

	unique_visitors: number

	repeated_clicks: number
}> => {
	const { data } = await ApiClient.client.get(
		`accounts/${accountId}/assets/${assetId}/dashboard-old/total-clicks?${toQuery(
			query
		)}`
	)

	return data.data
}

export const totalExclusions = async (
	accountId: string,

	assetId: string,

	query: any
): Promise<{
	total_exclusions: number

	previous_total_exclusions: number

	ip_adresses: number

	devices: number

	placements: number

	audience: number
}> => {
	const { data } = await ApiClient.client.get(
		`accounts/${accountId}/assets/${assetId}/dashboard-old/total-exclusions?${toQuery(
			query
		)}`
	)

	return data.data
}

export const adSpend = async (
	accountId: string,

	assetId: string,

	query: any
): Promise<{
	total_spend: number

	previous_total_spend: number

	commited_spend: number

	reallocated_buget: number
}> => {
	const { data } = await ApiClient.client.get(
		`accounts/${accountId}/assets/${assetId}/dashboard-old/total-ad-spend?${toQuery(
			query
		)}`
	)

	return data.data
}

export const engagement = async (
	accountId: string,

	assetId: string,

	query: any
): Promise<{
	total_clicks: number

	previous_total_clicks: number

	engaged_clicks: number

	previous_engaged_clicks: number

	conversions: number

	previous_conversions: number

	bounce_clicks: number

	previous_bounce_clicks: number

	avg_clicks_per_visitor: number

	previous_avg_clicks_per_visitor: number

	avg_time_on_site: number

	previous_avg_time_on_site: number
}> => {
	const { data } = await ApiClient.client.get(
		`accounts/${accountId}/assets/${assetId}/dashboard-old/engagements?${toQuery(
			query
		)}`
	)

	return data.data
}

export const timeline = async (
	accountId: string,

	assetId: string,

	type: string,

	query: any
): Promise<
	Array<{
		date: string

		count: {
			total: number

			gads: number

			fads: number
		}
	}>
> => {
	const { data } = await ApiClient.client.get(
		`accounts/${accountId}/assets/${assetId}/dashboard-old/timeline?type=${type}&${toQuery(
			query
		)}`
	)

	return data.data
}

export const sourceMap = async (
	accountId: string,

	assetId: string,

	type: string,

	query: any
): Promise<
	Array<{
		country: string

		count: number
	}>
> => {
	const { data } = await ApiClient.client.get(
		`accounts/${accountId}/assets/${assetId}/dashboard-old/source-map?type=${type}&${toQuery(
			query
		)}`
	)

	return data.data
}

export const heatMap = async (
	accountId: string,

	assetId: string,

	type: string,

	query: any
): Promise<
	Array<{
		weekday: number

		hour: number

		count: number
	}>
> => {
	const { data } = await ApiClient.client.get(
		`accounts/${accountId}/assets/${assetId}/dashboard-old/heat-map?type=${type}&${toQuery(
			query
		)}`
	)

	return data.data
}

export const clickPulse = async (
	accountId: string,

	assetId: string,

	query: any
): Promise<{
	click_pulse: number

	previous_click_pulse: number

	cleaner_traffic: number

	previous_cleaner_traffic: number
}> => {
	const { data } = await ApiClient.client.get(
		`accounts/${accountId}/assets/${assetId}/dashboard-old/click-pulse?${toQuery(
			query
		)}`
	)

	return data.data
}

export const recentReports = async (
	accountId: string,

	assetId: string,
	query: any
): Promise<ReportDTO[]> => {
	const { data } = await ApiClient.client.get(
		`accounts/${accountId}/assets/${assetId}/reports?${toQuery(query)}`
	)
	return data.data
}

export const upcomingReports = async (
	accountId: string,
	assetId: string,
	query: any
): Promise<ReportRequestDTO[]> => {
	const { data } = await ApiClient.client.get(
		`accounts/${accountId}/assets/${assetId}/report-requests?${toQuery(query)}`
	)
	return data.data
}

export const websiteProtection = async (
	accountId: string,
	assetId: string,
	protection: number
): Promise<any> => {
	const { data } = await ApiClient.client.patch(
		`accounts/${accountId}/assets/${assetId}/protection-mode`,
		{ mode: protection }
	)
	return data.data
}

export const actionsStats = async (
	accountId: string,
	assetId: string,
	query: any
): Promise<DashboardActionsStatsDTO> => {
	const { data } = await ApiClient.client.get(
		`accounts/${accountId}/assets/${assetId}/dashboard/actions-stats?${toQuery(
			query
		)}`
	)
	return data.data
}

export const blocksStats = async (
	accountId: string,
	assetId: string,
	query: any
): Promise<DashboardBlocksStatsDTO> => {
	const { data } = await ApiClient.client.get(
		`accounts/${accountId}/assets/${assetId}/dashboard/blocks-stats?${toQuery(
			query
		)}`
	)
	return data.data
}

export const Dashboards = {
	stats,
	threatActivity,
	threatStats,
	sourceMapStats,
	trafficTimeline,
	totalClicks,
	totalExclusions,
	adSpend,
	engagement,
	timeline,
	sourceMap,
	heatMap,
	clickPulse,
	recentReports,
	upcomingReports,
	websiteProtection,
	actionsStats,
	blocksStats,
	oldStats
}
