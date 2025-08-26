import { PaginationDTO, UserDTO } from 'api-models'
import { toQuery } from 'utils'
import { ApiClient } from '../api-client'
import { ApiConfig } from 'config'
import { toast } from 'react-toastify'
import * as streamSaver from 'streamsaver'
import moment from 'moment'

const find = async (query?: Record<string, any>): Promise<PaginationDTO> => {
	const { data } = await ApiClient.client.get(`/admin/users?${toQuery(query)}`)
	return data.data
}

const getById = async (id: string): Promise<UserDTO> => {
	const { data } = await ApiClient.client.get(`/admin/users/${id}`)
	return data.data
}
const getStats = async (): Promise<UserDTO> => {
	const { data } = await ApiClient.client.get('/admin/users/stats')
	return data.data
}
const suspendUser = async (
	id: string,
	payload: { suspended_reason: string }
): Promise<UserDTO> => {
	const { data } = await ApiClient.client.post(
		`/admin/users/${id}/suspend`,
		payload
	)
	return data.data
}
const unSuspendUser = async (id: string): Promise<UserDTO> => {
	const { data } = await ApiClient.client.post(`/admin/users/${id}/unsuspend`)
	return data.data
}
const anonymizeUser = async (id: string): Promise<void> => {
	await ApiClient.client.post(`/admin/users/${id}/anonymize`)
}

const exportUsers = async (query: Record<string, any>): Promise<void> => {
	const headers = {
		Authorization: `Bearer ${ApiClient.getAuthToken()}`
	}

	const response = await fetch(
		`${ApiConfig.API_BASE_URL}/admin/users/export?${toQuery(query)}`,
		{
			headers
		}
	)
	if (response.body) {
		toast.success('Download started, check your downloads tab')
		const fileStream = streamSaver.createWriteStream(
			`users-export-${moment().format('YYYY-MM-DD')}.csv`
		)
		response.body.pipeTo(fileStream)
	}
}

export const AdminUsers = {
	find,
	getById,
	getStats,
	suspendUser,
	unSuspendUser,
	anonymizeUser,
	exportUsers
}
