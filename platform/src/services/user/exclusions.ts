import { BigQueryExclusionDTO } from 'api-models'
import { ApiConfig } from 'config'
import moment from 'moment'
import { toast } from 'react-toastify'
import * as streamSaver from 'streamsaver'
import { toQuery } from 'utils'
import { ApiClient } from '../api-client'

const get = async (
	accountId: string,
	query?: Record<string, any>
): Promise<{ total: number; data: BigQueryExclusionDTO[] }> => {
	const { data } = await ApiClient.client.get(
		`/accounts/${accountId}/exclusions?${toQuery(query)}`
	)
	return data.data
}

const deleteExclusion = async (
	accountId: string,
	adAccountId: string,
	exclusionId: string
): Promise<void> => {
	await ApiClient.client.delete(
		`/accounts/${accountId}/exclusions/${exclusionId}?adAccountId=${adAccountId}`
	)
}

const exportExclusions = async (
	accountId: string,
	assetId: string,
	query?: Record<string, any>
) => {
	const headers = {
		Authorization: `Bearer ${ApiClient.getAuthToken()}`
	}
	const impersonationId = JSON.parse(
		localStorage.getItem('imper_userId') as string
	)
	if (impersonationId)
		Object.assign(headers, { 'Impersonated-User-ID': impersonationId })

	const response = await fetch(
		`${
			ApiConfig.API_BASE_URL
		}/accounts/${accountId}/exclusions/export/${assetId}?${toQuery(query)}`,
		{
			headers
		}
	)
	if (response.body) {
		toast.success('Download started, check your downloads tab')
		const fileStream = streamSaver.createWriteStream(
			`exclusions-export-${moment().format('YYYY-MM-DD')}.csv`
		)
		response.body.pipeTo(fileStream)
	}
}

export const Exclusions = {
	get,
	deleteExclusion,
	exportExclusions
}
