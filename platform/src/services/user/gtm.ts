import {
	AccountLinkDTO,
	GoogleOAuthAccountLinkDTO
} from '../../../../api-models'
import {
	GtmAccount,
	GtmContainer,
	GtmTagDto
} from '../../../../api-models/src/advertiser/gtm'
import { ApiClient } from '../api-client'

const auth = async (
	accountId: string,
	assetId: string,
	auth_code: string
): Promise<GoogleOAuthAccountLinkDTO> => {
	const { data } = await ApiClient.client.post(
		`/accounts/${accountId}/assets/${assetId}/gtm/oauth`,
		{ auth_code }
	)
	return data.data
}

const getGtmAccounts = async (
	accountId: string,
	assetId: string,
	linkId: string
): Promise<Array<GtmAccount>> => {
	const { data } = await ApiClient.client.get(
		`/accounts/${accountId}/assets/${assetId}/gtm/${linkId}/accounts`
	)
	return data.data
}

const getGtmContainers = async (
	accountId: string,
	assetId: string,
	account_id: string,
	linkId: string
): Promise<GtmContainer[]> => {
	const { data } = await ApiClient.client.get(
		`/accounts/${accountId}/assets/${assetId}/gtm/${linkId}/containers?account_id=${account_id}`
	)
	return data.data
}

const getGtmWorkspaces = async (
	accountId: string,
	assetId: string,
	account_id: string,
	container_id: string,
	linkId: string
): Promise<any> => {
	const { data } = await ApiClient.client.get(
		`/accounts/${accountId}/assets/${assetId}/gtm/${linkId}/workspaces?account_id=${account_id}&container_id=${container_id}`
	)
	return data.data
}

const createTag = async (
	accountId: string,
	assetId: string,
	account_id: string,
	container_id: string,
	workspace_id: string,
	linkId: string
): Promise<GoogleOAuthAccountLinkDTO> => {
	const { data } = await ApiClient.client.post(
		`/accounts/${accountId}/assets/${assetId}/gtm/${linkId}/tag?account_id=${account_id}&container_id=${container_id}&workspace_id=${workspace_id}`
	)
	return data.data
}

const getGtmTag = async (
	accountId: string,
	assetId: string
): Promise<GtmTagDto | null> => {
	const { data } = await ApiClient.client.get(
		`/accounts/${accountId}/assets/${assetId}/gtm/tags`
	)
	return data.data
}

const getGtmLinks = async (
	accountId: string
): Promise<GoogleOAuthAccountLinkDTO[]> => {
	const { data } = await ApiClient.client.get(
		`/accounts/${accountId}/links/gtm`
	)
	return data.data
}

async function deleteGtmLink(
	productAccountId: string,
	linkId: string
): Promise<AccountLinkDTO> {
	const { data } = await ApiClient.client.delete(
		`/accounts/${productAccountId}/links/gtm/${linkId}`
	)
	return data.data
}

export const GtmService = {
	auth,
	getGtmAccounts,
	getGtmContainers,
	getGtmWorkspaces,
	getGtmLinks,
	createTag,
	getGtmTag,
	deleteGtmLink
}
