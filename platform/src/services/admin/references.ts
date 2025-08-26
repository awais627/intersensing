import { PaginationDTO, ReferenceAdsAccountDTO } from 'api-models'
import { toQuery } from 'utils'
import { ApiClient } from '../api-client'

const getDomainsReferences = async (
	query?: Record<string, any>
): Promise<PaginationDTO> => {
	const { data } = await ApiClient.client.get(
		`/admin/ref/domains?${toQuery(query)}`
	)
	return data.data
}
const getGadsReferences = async (
	query?: Record<string, any>
): Promise<{ total: number; data: Array<ReferenceAdsAccountDTO> }> => {
	const { data } = await ApiClient.client.get(
		`/admin/ref/accounts?${toQuery(query)}`
	)
	return data.data
}
const updateGadsReferences = async (
	accountNumber: string,
	body?: Record<string, any>
): Promise<{ data: Array<ReferenceAdsAccountDTO> }> => {
	const { data } = await ApiClient.client.patch(
		`/admin/ref/accounts/${accountNumber}/allow-multiple`,
		body
	)
	return data.data
}
const blockPPCReferences = async (
	accountNumber: string,
	payload: { is_blocked: boolean }
): Promise<{ data: Array<ReferenceAdsAccountDTO> }> => {
	const { data } = await ApiClient.client.patch(
		`/admin/ref/accounts/${accountNumber}/block`,
		payload
	)
	return data.data
}

export const References = {
	getDomainsReferences,
	getGadsReferences,
	updateGadsReferences,
	blockPPCReferences
}
