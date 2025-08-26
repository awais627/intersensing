import { AssetDTO, ProtectionInfoDTO, ReportRequestDTO } from 'api-models'
import { ApiClient } from '../api-client'
import { AllAccountsAssets } from './types'

async function find(
	productAccountId: string | undefined
): Promise<Array<AssetDTO>> {
	const { data } = await ApiClient.client.get(
		`/accounts/${productAccountId}/assets`
	)
	return data.data
}
async function findAllAssets(): Promise<Array<AllAccountsAssets>> {
	const { data } = await ApiClient.client.get('/accounts/assets')
	return data.data
}

async function getById(
	productAccountId: string,
	id: string
): Promise<AssetDTO> {
	const { data } = await ApiClient.client.get(
		`/accounts/${productAccountId}/assets/${id}`
	)
	return data.data
}
const create = async (
	accountId: string,
	payload: {
		name: string
		link_id: string
		account_number: string
	}
): Promise<AssetDTO> => {
	try {
		const { data } = await ApiClient.client.post(
			`/accounts/${accountId}/assets`,
			payload
		)
		return data.data
	} catch (err: any) {
		return Promise.reject(err)
	}
}

async function remove(productAccountId: string, id: string): Promise<AssetDTO> {
	const { data } = await ApiClient.client.delete(
		`/accounts/${productAccountId}/assets/${id}`
	)
	return data.data
}

const deleteAsset = async (
	accountId: string,
	assetId: string
): Promise<AssetDTO> => {
	const { data } = await ApiClient.client.delete(
		`/accounts/${accountId}/assets/${assetId}`
	)
	return data.data
}

async function updateAssetSettings(
	productAccountId: string,
	id: string,
	payload: {
		name: string
		timezone: string
		currency: string
		color: string
		description: string
	}
): Promise<ReportRequestDTO[]> {
	const { data } = await ApiClient.client.patch(
		`/accounts/${productAccountId}/assets/${id}`,
		payload
	)
	return data.data
}

const setAccountProtection = async (
	accountId: string | undefined,
	assetId: string | undefined,
	payload: ProtectionInfoDTO
): Promise<ProtectionInfoDTO[]> => {
	const { data } = await ApiClient.client.patch(
		`/accounts/${accountId}/assets/${assetId}/protection`,
		payload
	)
	return data.data
}

const updateAssetPhoto = async (
	formData: Partial<FormData>,
	accountId: string,
	assetId: string
): Promise<string> => {
	const { data } = await ApiClient.client.post(
		`/accounts/${accountId}/assets/${assetId}/upload-asset-avatar`,
		formData,
		{
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		}
	)
	return data.data
}
export const Assets = {
	find,
	findAllAssets,
	getById,
	create,
	remove,
	deleteAsset,
	updateAssetSettings,
	setAccountProtection,
	updateAssetPhoto
}
