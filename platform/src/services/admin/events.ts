import { EventLogDTO } from 'api-models'
import { toQuery } from 'utils'
import { ApiClient } from '../api-client'

const get = async (
	query?: Record<string, any>
): Promise<{ total: number; data: Array<EventLogDTO> }> => {
	const { data } = await ApiClient.client.get(`/admin/logs?${toQuery(query)}`)
	return data.data
}

export const Events = {
	get
}
