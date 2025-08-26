import { AdAccountDTO } from 'api-models'
import { toast } from 'react-toastify'
import * as streamSaver from 'streamsaver'
import { ApiConfig } from 'config'
import moment from 'moment'
import { toQuery } from 'utils'
import { ApiClient } from '../api-client'

const find = async (
	query?: Record<string, any>
): Promise<{ total: number; data: Array<AdAccountDTO> }> => {
	const { data } = await ApiClient.client.get(
		`/admin/ad-accounts?${toQuery(query)}`
	)
	return data.data
}
const findById = async (adAccountId?: string): Promise<AdAccountDTO> => {
	const { data } = await ApiClient.client.get(
		`/admin/ad-accounts/${adAccountId}`
	)
	return data.data
}

const syncExclusions = async (id: string): Promise<any> => {
	const { data } = await ApiClient.client.post(
		`/admin/ad-accounts/${id}/sync-exclusions`
	)
	return data.data
}

const cleanExclusions = async (id: string, imported: boolean): Promise<any> => {
	const { data } = await ApiClient.client.post(
		`/admin/ad-accounts/${id}/cleanup-exclusions`,
		{ only_imported: imported }
	)
	return data.data
}

const downloadAccounts = async (query: any, tab?: string) => {
	const headers = {
		Authorization: `Bearer ${ApiClient.getAuthToken()}`
	}

	const response = await fetch(
		`${ApiConfig.API_BASE_URL}/admin/accounts/export?${toQuery(query)}`,
		{
			headers
		}
	)
	if (response.body) {
		toast.success('Download started, check your downloads tab')
		const fileStream = streamSaver.createWriteStream(
			`accounts-export-${tab || ''}-${moment().format('YYYY-MM-DD')}.csv`
		)
		response.body.pipeTo(fileStream)
	}
}

export const AdminAdAccounts = {
	find,
	findById,
	downloadAccounts,
	syncExclusions,
	cleanExclusions
}
