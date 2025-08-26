import { NoteDTO } from 'api-models'
import { toQuery } from 'utils'
import { ApiClient } from '../api-client'

const get = async (
	topicId: string,
	query?: Record<string, any>
): Promise<{ total: number; data: Array<NoteDTO> }> => {
	const { data } = await ApiClient.client.get(
		`/admin/notes/${topicId}?${toQuery(query)}`
	)
	return data.data
}
const create = async (payload: {
	topic_id: string
	text: string
}): Promise<NoteDTO> => {
	const { data } = await ApiClient.client.post('/admin/notes', payload)
	return data.data
}

const deleteById = async (id: string): Promise<NoteDTO> => {
	const { data } = await ApiClient.client.delete(`/admin/notes/${id}`)
	return data.data
}

const updateById = async (id: string, text: string): Promise<NoteDTO> => {
	const { data } = await ApiClient.client.patch(`/admin/notes/${id}`, { text })
	return data.data
}

export const Notes = {
	create,
	get,
	updateById,
	deleteById
}
