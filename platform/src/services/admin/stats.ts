import {
	AdminDashboardStatsDTO,
	AdminMetricsTimelineDTO,
	AdminRevenueStatsDTO,
	AdminUserMetrcisStatsDTO
} from 'api-models'
import { AdminRevenueTimelineDTO } from 'api-models/src/admin/timeline'
import { AdminDateFilterRangeType } from 'pages/admin/types'
import { ApiClient } from 'services/api-client'
import { toQuery } from 'utils'

const getAdminStats = async (): Promise<AdminDashboardStatsDTO> => {
	const { data } = await ApiClient.client.get('admin/stats')
	return data.data
}

const getAdminRevenueStats = async (
	query: AdminDateFilterRangeType
): Promise<AdminRevenueStatsDTO[]> => {
	const { data } = await ApiClient.client.get(
		`admin/revenue/stats?${toQuery(query)}`
	)
	return data.data
}

const getAdminRevenueTimeline = async (
	query: AdminDateFilterRangeType
): Promise<AdminRevenueTimelineDTO[]> => {
	const { data } = await ApiClient.client.get(
		`admin/revenue/timeline?${toQuery(query)}`
	)
	return data.data
}

const getAdminMetricsStats = async (
	query: AdminDateFilterRangeType
): Promise<AdminUserMetrcisStatsDTO> => {
	const { data } = await ApiClient.client.get(`admin/metrics?${toQuery(query)}`)
	return data.data
}

const getAdminMetricsTimeline = async (
	query: AdminDateFilterRangeType
): Promise<AdminMetricsTimelineDTO[]> => {
	const { data } = await ApiClient.client.get(
		`admin/metrics/timeline?${toQuery(query)}`
	)
	return data.data
}

export const AdminStats = {
	getAdminStats,
	getAdminRevenueStats,
	getAdminRevenueTimeline,
	getAdminMetricsStats,
	getAdminMetricsTimeline
}
