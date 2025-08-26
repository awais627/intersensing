import { PaginationDTO } from '../../../../api-models/src'
import { ApiClient } from '../api-client'
import { toQuery } from '../../utils'
import { UserDTO } from '../../../../api-models'
import { AdminTeamInvites } from '../../../../api-models/src/admin/team'

const find = async (query?: Record<string, any>): Promise<PaginationDTO> => {
	const { data } = await ApiClient.client.get(`/admin/team?${toQuery(query)}`)
	return data.data
}

const patchRole = async (
	id: string,
	role: 'BASIC' | 'FULL' | 'SUPER'
): Promise<UserDTO> => {
	const { data } = await ApiClient.client.patch(`/admin/team/${id}`, { role })
	return data.data
}
const deleteAdmin = async (id: string): Promise<UserDTO> => {
	const { data } = await ApiClient.client.delete(`/admin/team/${id}`)
	return data.data
}
const getInviteByCode = async (code: string): Promise<AdminTeamInvites> => {
	const { data } = await ApiClient.client.get(`/admin/team-invite/${code}`)
	return data.data
}
const acceptTeamInvite = async (code: string): Promise<UserDTO> => {
	const { data } = await ApiClient.client.patch(
		`/admin/accept-team-invite/${code}`
	)
	return data.data
}
const deleteTeamInvite = async (id: string): Promise<UserDTO> => {
	const { data } = await ApiClient.client.delete(`/admin/team-invite/${id}`)
	return data.data
}

const sendInvites = async (
	invites: {
		email: string
		access: 'SUPER' | 'FULL' | 'BASIC'
	}[]
): Promise<any> => {
	const response = await ApiClient.client.post('/admin/team/invites', {
		invites
	})
	return response.data
}
const getInvites = async (): Promise<any> => {
	const response = await ApiClient.client.get('/admin/team/invites')
	return response.data.data
}

export const AdminTeam = {
	find,
	patchRole,
	deleteAdmin,
	sendInvites,
	getInviteByCode,
	acceptTeamInvite,
	deleteTeamInvite,
	getInvites
}
