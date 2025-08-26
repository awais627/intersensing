import {
	AccountLinkDTO,
	GoogleOAuthAccountLinkDTO,
	MCCAccountLinkDTO
} from 'api-models'
import { ApiClient } from '../api-client'

async function find(productAccountId: string): Promise<Array<AccountLinkDTO>> {
	const { data } = await ApiClient.client.get(
		`/accounts/${productAccountId}/links`
	)
	return data.data
}

async function getById(
	productAccountId: string,
	id: string
): Promise<AccountLinkDTO> {
	const { data } = await ApiClient.client.get(
		`/accounts/${productAccountId}/links/${id}`
	)
	return data.data
}

async function deleteLink(
	productAccountId: string,
	linkId: string,
	deactivatePPC: boolean
): Promise<AccountLinkDTO> {
	const { data } = await ApiClient.client.delete(
		`/accounts/${productAccountId}/links/${linkId}?deactivate=${deactivatePPC}`
	)
	return data.data
}

async function syncLink(
	productAccountId: string,
	linkId: string
): Promise<AccountLinkDTO> {
	const { data } = await ApiClient.client.post(
		`/accounts/${productAccountId}/links/${linkId}/sync`
	)
	return data.data
}

async function createOAuthLink(
	provider: 'google' | 'facebook' | 'bing',
	payload: { auth_code: string },
	productAccountId?: string | null
): Promise<GoogleOAuthAccountLinkDTO> {
	const { data } = await ApiClient.client.post(
		`/accounts/${productAccountId}/links/oauth/${provider}`,
		payload
	)
	return data.data
}

async function createMccLink(
	productAccountId: string,
	payload: { account_number: string; parent_id?: string | null }
): Promise<MCCAccountLinkDTO> {
	const { data } = await ApiClient.client.post(
		`/accounts/${productAccountId}/links/mcc`,
		payload
	)
	return data.data
}

export const AdAccountLinks = {
	find,
	getById,
	createOAuthLink,
	createMccLink,
	deleteLink,
	syncLink
}
