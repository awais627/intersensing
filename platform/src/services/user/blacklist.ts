import { BlockDTO, BlockInfoDTO } from 'api-models'
import { ApiConfig } from 'config'
import moment from 'moment'
import { toast } from 'react-toastify'
import * as streamSaver from 'streamsaver'
import { toQuery } from 'utils'
import { ApiClient } from '../api-client'

const get = async (
	accountId: string,
	query?: Record<string, any>
): Promise<{ total: number; data: BlockDTO[] }> => {
	const { data } = await ApiClient.client.get(
		`/accounts/${accountId}/blocks?${toQuery(query)}`
	)
	return data.data
}

const createBlock = async (
	accountId: string | undefined,
	payload: any
): Promise<BlockInfoDTO> => {
	const { data } = await ApiClient.client.post(
		`/accounts/${accountId}/blocks`,
		payload
	)
	return data.data
}

const deleteBlock = async (
	accountId: string | undefined,
	blockId: string | undefined
): Promise<BlockDTO> => {
	const { data } = await ApiClient.client.delete(
		`/accounts/${accountId}/blocks/${blockId}`
	)
	return data.data
}

const patchBlock = async (
	accountId: string | undefined,
	blockId: string | undefined,
	payload: any
): Promise<BlockDTO> => {
	const { data } = await ApiClient.client.patch(
		`/accounts/${accountId}/blocks/${blockId}`,
		payload
	)
	return data.data
}

const getById = async (
	accountId: string | undefined,
	blockId: string | undefined
): Promise<BlockDTO> => {
	const { data } = await ApiClient.client.get(
		`/accounts/${accountId}/blocks/${blockId}`
	)
	return data.data
}

const exportBlocks = async (
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
		}/accounts/${accountId}/blocks/export/${assetId}?${toQuery(query)}`,
		{
			headers
		}
	)
	if (response.body) {
		toast.success('Download complete. Check your Downloads folder.')
		const fileStream = streamSaver.createWriteStream(
			`blocks-export-${moment().format('YYYY-MM-DD')}.csv`
		)
		response.body.pipeTo(fileStream)
	}
}
export const Blacklist = {
	get,
	getById,
	createBlock,
	deleteBlock,
	patchBlock,
	exportBlocks
}
