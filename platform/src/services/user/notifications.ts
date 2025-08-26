import { NotificationDTO } from 'api-models'
import { toQuery } from 'utils'
import { ApiClient } from '../api-client'

async function find(
	query?: Record<string, string>
): Promise<NotificationDTO[]> {
	const { data } = await ApiClient.client.get(
		`/notifications?${toQuery(query)}`
	)
	return data.data
}
async function read(id: string): Promise<NotificationDTO[]> {
	const { data } = await ApiClient.client.post(`/notifications/${id}/read`)
	return data.data
}
async function readAll(): Promise<NotificationDTO[]> {
	const { data } = await ApiClient.client.post('/notifications/read-all')
	return data.data
}

export const Notifications = {
	find,
	read,
	readAll
}
