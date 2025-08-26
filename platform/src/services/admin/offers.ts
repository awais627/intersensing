import { OfferDTO } from 'api-models'
import { toQuery } from 'utils'
import { ApiClient } from '../api-client'
import { ICreateOfferPayload } from '../../components/create-offer/types'

const find = async (
	query?: Record<string, any>
): Promise<{ total: number; data: Array<OfferDTO> }> => {
	const { data } = await ApiClient.client.get(`/admin/offers?${toQuery(query)}`)
	return data.data
}

const findOffersByUserId = async (id: string): Promise<Array<OfferDTO>> => {
	const { data } = await ApiClient.client.get(`/admin/offers?userId=${id}`)
	return data.data
}

const updateOfferById = async (payload: any, id: string): Promise<OfferDTO> => {
	const data = await ApiClient.client.patch(`/admin/offers/${id}`, payload)
	return data.data
}

const deleteOfferByid = async (id: string): Promise<OfferDTO> => {
	const data = await ApiClient.client.delete(`/admin/offers/${id}`)
	return data.data
}

const getOffersRequests = async (
	query?: Record<string, any>
): Promise<Array<OfferDTO>> => {
	const { data } = await ApiClient.client.get(
		`/admin/offers/requests?${toQuery(query)}`
	)
	return data.data
}

const deleteOfferRequest = async (id: string): Promise<OfferDTO> => {
	const { data } = await ApiClient.client.delete(`/admin/offers/requests/${id}`)
	return data.data
}

const createOffer = async (
	payload: ICreateOfferPayload
): Promise<Array<OfferDTO>> => {
	const { data } = await ApiClient.client.post('/admin/offers', payload)
	return data.data
}
const sendOfferEmail = async (offerId: string): Promise<Array<OfferDTO>> => {
	const { data } = await ApiClient.client.post(
		`/admin/offers/${offerId}/resend-email`
	)
	return data.data
}

export const AdminOffers = {
	find,
	getOffersRequests,
	findOffersByUserId,
	deleteOfferByid,
	deleteOfferRequest,
	sendOfferEmail,
	createOffer,
	updateOfferById
}
