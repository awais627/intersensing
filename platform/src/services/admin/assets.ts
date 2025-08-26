import { AssetDTO } from 'api-models'
import { toQuery } from 'utils'
import { ApiClient } from '../api-client'

const find = async (
	query: Record<string, any>
): Promise<{ total: number; data: Array<AssetDTO> }> => {
	const { data } = await ApiClient.client.get(`/admin/assets?${toQuery(query)}`)
	return data.data
}
const findById = async (websiteId?: string): Promise<AssetDTO> => {
	const { data } = await ApiClient.client.get(`/admin/assets/${websiteId}`)
	return data.data
}

export const AdminAssets = {
	find,
	findById
}
