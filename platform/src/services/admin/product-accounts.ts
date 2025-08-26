import { PaginationDTO, ProductAccountDTO, SubscriptionDTO } from 'api-models'
import {
	CancelSubscriptionPayload,
	TrialPayload
} from 'pages/admin/entites/account/info-tab/admin-subscription-actions/types'
import { toQuery } from 'utils'
import { ApiClient } from '../api-client'

const find = async (query?: Record<string, any>): Promise<PaginationDTO> => {
	const { data } = await ApiClient.client.get(
		`/admin/accounts?${toQuery(query)}`
	)
	return data.data
}

const getById = async (id: string): Promise<ProductAccountDTO> => {
	const { data } = await ApiClient.client.get(`/admin/accounts/${id}`)
	return data.data
}

const getStats = async (): Promise<any> => {
	const { data } = await ApiClient.client.get('/admin/accounts/stats')
	return data.data
}

const startTrial = async (
	payload: TrialPayload,
	accountId: string
): Promise<Array<ProductAccountDTO>> => {
	const { data } = await ApiClient.client.post(
		`/admin/accounts/${accountId}/trial`,
		payload
	)
	return data.data
}

const newTrialForInactive = async (
	days: number,
	accountId: string
): Promise<Array<ProductAccountDTO>> => {
	const { data } = await ApiClient.client.post('/admin/subscriptions/trial', {
		account_id: accountId,
		trial: {
			days
		}
	})
	return data.data
}

const getSubscriptions = async (
	subscriptionId: string
): Promise<SubscriptionDTO> => {
	const { data } = await ApiClient.client.get(
		`/admin/subscriptions/${subscriptionId}`
	)
	return data.data
}

const updateTrial = async (
	payload: TrialPayload,
	subscriptionId: string
): Promise<Array<ProductAccountDTO>> => {
	const { data } = await ApiClient.client.post(
		`/admin/subscriptions/${subscriptionId}/trial`,
		payload
	)
	return data.data
}

const cancelSubscription = async (
	payload: CancelSubscriptionPayload,
	subscriptionId: string
): Promise<Array<ProductAccountDTO>> => {
	const { data } = await ApiClient.client.post(
		`/admin/subscriptions/${subscriptionId}/cancel`,
		payload
	)
	return data.data
}

const startSubscription = async (
	payload: { note: string },
	subscriptionId: string
): Promise<Array<ProductAccountDTO>> => {
	const { data } = await ApiClient.client.post(
		`/admin/subscriptions/${subscriptionId}/start`,
		payload
	)
	return data.data
}

const revertSubscription = async (
	payload: { note: string },
	subscriptionId: string
): Promise<Array<ProductAccountDTO>> => {
	const { data } = await ApiClient.client.post(
		`/admin/subscriptions/${subscriptionId}/revert`,
		payload
	)
	return data.data
}

const addDiscount = async (
	payload: { coupon_id: string },
	subscriptionId: string
): Promise<Array<ProductAccountDTO>> => {
	const { data } = await ApiClient.client.post(
		`/admin/subscriptions/${subscriptionId}/discount`,
		payload
	)
	return data.data
}

const getPipeline = async (
	query?: Record<string, any>
): Promise<PaginationDTO> => {
	const { data } = await ApiClient.client.get(
		`/admin/accounts/pipeline-shortening?${toQuery(query)}`
	)
	return data.data
}

export const AdminProductAccounts = {
	find,
	getById,
	getStats,
	startTrial,
	updateTrial,
	cancelSubscription,
	startSubscription,
	revertSubscription,
	addDiscount,
	getSubscriptions,
	newTrialForInactive,
	getPipeline
}
