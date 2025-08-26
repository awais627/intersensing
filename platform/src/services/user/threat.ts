import {
	DashboardFraudRatesDTO,
	DashboardRepeatedClicksDTO,
	DashboardThreatChartsDTO
} from 'api-models'
import { toQuery } from 'utils'
import { ApiClient } from '../api-client'

export const repeatedClicks = async (
	accountId: string,
	assetId: string,
	query: any
): Promise<DashboardRepeatedClicksDTO> => {
	const { data } = await ApiClient.client.get(
		`accounts/${accountId}/assets/${assetId}/dashboard/repeated-clicks?${toQuery(
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
		`accounts/${accountId}/assets/${assetId}/threat/heat-map?${toQuery(query)}`
	)
	return data.data
}

export const sourceMap = async (
	accountId: string,
	assetId: string,
	query: any
): Promise<any[]> => {
	const { data } = await ApiClient.client.get(
		`accounts/${accountId}/assets/${assetId}/dashboard/actions-source-map?${toQuery(
			query
		)}`
	)
	return data.data
}

export const threatCharts = async (
	accountId: string,
	assetId: string,
	query: any
): Promise<DashboardThreatChartsDTO> => {
	const { data } = await ApiClient.client.get(
		`accounts/${accountId}/assets/${assetId}/dashboard/threat-charts?${toQuery(
			query
		)}`
	)
	return data.data
}

export const fraudRates = async (
	accountId: string,
	assetId: string,
	query: any
): Promise<DashboardFraudRatesDTO> => {
	const { data } = await ApiClient.client.get(
		`accounts/${accountId}/assets/${assetId}/dashboard/fraud-rates?${toQuery(
			query
		)}`
	)
	return data.data
}

export const Threat = {
	repeatedClicks,
	heatMap,
	sourceMap,
	threatCharts,
	fraudRates
}
