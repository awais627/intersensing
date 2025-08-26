import { OfferDTO, OfferRequestDTO } from 'api-models'
import { ApiClient } from '../api-client'

const find = async (): Promise<Array<OfferDTO>> => {
	const { data } = await ApiClient.client.get('/offers')
	return data.data
}

const acceptOffer = async (
	id: string,
	payload: {
		pm_id?: string
		org_name?: string
		is_in_setup?: boolean
		schedule_subscription_change: boolean
	}
): Promise<OfferDTO> => {
	const { data } = await ApiClient.client.post(`/offers/${id}/accept`, payload)
	return data.data
}

const rejectOffer = async (id: string): Promise<OfferDTO> => {
	const { data } = await ApiClient.client.post(`/offers/${id}/reject`)
	return data.data
}

const findRequests = async (): Promise<Array<OfferRequestDTO>> => {
	const { data } = await ApiClient.client.get('/offers/requests')
	return data.data
}

const createOfferRequest = async (payload: {
	account_id: string | null
	spend: number
	tier: 'pro'
	interval: 'monthly' | 'yearly' | 'quarterly'
	notes: string | null
}): Promise<OfferRequestDTO> => {
	const { data } = await ApiClient.client.post('/offers/requests', payload)
	return data.data
}

const removeOfferRequest = async (id: string): Promise<void> => {
	const { data } = await ApiClient.client.delete(`/offers/requests/${id}`)
	return data.data
}

export const Offers = {
	find,
	findRequests,
	createOfferRequest,
	removeOfferRequest,
	acceptOffer,
	rejectOffer
}
