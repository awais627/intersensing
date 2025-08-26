import {
	FormattedReportDTO,
	ReportDTO,
	ReportRequestDTO,
	ReportRequestPeriodDTO
} from 'api-models'
import { ApiClient } from '../api-client'
import {
	ReportMethod,
	ReportScopeType,
	reportType
} from '../../pages/workspace/asset/reports/types'

async function getRequests(
	productAccountId: string,
	id: string,
	method: ReportMethod
): Promise<ReportRequestDTO[]> {
	const { data } = await ApiClient.client.get(
		`/accounts/${productAccountId}/assets/${id}/report-requests?type=${method}`
	)
	return data.data
}

async function get(
	productAccountId: string,
	id: string,
	type: reportType | null,
	adAccountId: string | null,
	campaignId: string | null,
	search: string | null
): Promise<FormattedReportDTO[]> {
	const { data } = await ApiClient.client.get(
		`/accounts/${productAccountId}/assets/${id}/reports?ad_account_id=${
			adAccountId || ''
		}&campaign_id=${campaignId || ''}&search=${search || ''}&type=${type || ''}`
	)
	return data.data
}

async function toggleAutomatedReports(
	productAccountId: string,
	id: string,
	reportRequestID: string,
	value: boolean
): Promise<ReportRequestDTO[]> {
	const { data } = await ApiClient.client.post(
		`/accounts/${productAccountId}/assets/${id}/report-requests/${reportRequestID}/toggle`,
		{ enabled: value }
	)
	return data.data
}

async function editReport(
	productAccountId: string,
	assetId: string,
	reportRequestID: string,
	payload: {
		scope_type: { id: string; type: ReportScopeType }
		scope: Array<string> | null // array of adAccountIds, ONLY for PPC type report
		period: ReportRequestPeriodDTO
		scheduled_for: number
		label: string
	}
): Promise<ReportRequestDTO[]> {
	const { data } = await ApiClient.client.patch(
		`/accounts/${productAccountId}/assets/${assetId}/report-requests/${reportRequestID}`,
		payload
	)
	return data.data
}

async function runReport(
	productAccountId: string,
	assetId: string,
	payload: {
		type: reportType
		scope: Array<string> | null
		scope_type: { id: string; type: ReportScopeType }
		from: number
		to: number
		label: string | null
		trafficType: string
		query?: Record<string, string> | null
	}
): Promise<ReportRequestDTO[]> {
	const { data } = await ApiClient.client.post(
		`/accounts/${productAccountId}/assets/${assetId}/report-requests`,
		payload
	)
	return data.data
}

async function runAutoReport(
	productAccountId: string,
	assetId: string,
	payload: {
		type: reportType
		scope: Array<string> | null
		scope_type: { id: string; type: ReportScopeType }
		label: string | null
		scheduled_for: number
		period: ReportRequestPeriodDTO
	}
): Promise<ReportRequestDTO[]> {
	const { data } = await ApiClient.client.post(
		`/accounts/${productAccountId}/assets/${assetId}/report-auto-requests`,
		payload
	)
	return data.data
}

async function deleteReportRequest(
	productAccountId: string,
	assetId: string,
	requestId: string
): Promise<ReportRequestDTO[]> {
	const { data } = await ApiClient.client.delete(
		`/accounts/${productAccountId}/assets/${assetId}/report-requests/${requestId}`
	)
	return data.data
}

async function getRecentReports(
	productAccountId: string,
	assetId: string
): Promise<ReportDTO[]> {
	const { data } = await ApiClient.client.get(
		`/accounts/${productAccountId}/assets/${assetId}/recent-reports`
	)
	return data.data
}

export const Reports = {
	get,
	deleteReportRequest,
	runAutoReport,
	getRequests,
	toggleAutomatedReports,
	editReport,
	runReport,
	getRecentReports
}
