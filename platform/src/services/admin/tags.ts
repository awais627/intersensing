import { TagInfoDTO, UserDTO } from 'api-models'
import { ApiClient } from '../api-client'

const getSystemTags = async (): Promise<string[]> => {
	const { data } = await ApiClient.client.get('/system/tags')
	return data.data
}
const create = async (userId: string, tag: string): Promise<TagInfoDTO> => {
	const { data } = await ApiClient.client.post(
		`/admin/users/${userId}/add-tag`,
		{ tag: tag }
	)
	return data.data
}
const remove = async (userId: string, tag: string): Promise<UserDTO> => {
	const { data } = await ApiClient.client.post(
		`/admin/users/${userId}/remove-tag`,
		{ tag: tag }
	)
	return data.data
}

export const Tags = {
	create,
	getSystemTags,
	remove
}
