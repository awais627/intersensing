import { PaymentMethodDTO } from 'api-models'
import { ApiClient } from '../api-client'

export const intent = async (): Promise<any> => {
	const { data } = await ApiClient.client.get('/billing/intent')
	return data.data
}

async function find(): Promise<Array<PaymentMethodDTO>> {
	const { data } = await ApiClient.client.get('/billing/methods')
	return data.data
}

async function create(payload: {
	pm_data: string
	account_id: string | null
}): Promise<PaymentMethodDTO> {
	const { data } = await ApiClient.client.post('/billing/methods', payload)
	return data.data
}

async function remove(id: string): Promise<Array<PaymentMethodDTO>> {
	const { data } = await ApiClient.client.delete(`/billing/methods/${id}`)
	return data.data
}

export const PaymentMethods = {
	intent,
	find,
	create,
	remove
}
