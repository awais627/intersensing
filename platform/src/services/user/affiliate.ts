import { UserDTO } from '../../../../api-models/src'
import { ApiClient } from '../api-client'
import {
	ICreateAffiliate,
	ICreateAffiliateUser,
	IUpdateAffiliate
} from './types'
import { toQuery } from '../../utils'
import { ApiConfig } from '../../config'
import { toast } from 'react-toastify'
import * as streamSaver from 'streamsaver'
import moment from 'moment/moment'
import { IAffiliateDashboardUsers } from '../../pages/user/affiliate/dashboard/types'

const createProfile = async (payload: ICreateAffiliate): Promise<UserDTO> => {
	const { data } = await ApiClient.client.post('/affiliate', payload)
	return data.data
}
const createAffiliateUser = async (
	payload: ICreateAffiliateUser
): Promise<UserDTO> => {
	const { data } = await ApiClient.client.post(
		'/users/create-affiliate',
		payload
	)
	return data.data
}

const updateProfile = async (payload: IUpdateAffiliate): Promise<UserDTO> => {
	const { data } = await ApiClient.client.put('/affiliate', payload)
	return data.data
}

const dashboardStats = async (
	query: Record<string, any>
): Promise<{
	cancellations: number | null
	clicks: number | null
	commission: number | null
	conversions: number | null
	trials: number | null
}> => {
	const { data } = await ApiClient.client.get(
		`/affiliate/dashboard/stats?${toQuery(query)}`
	)
	return data.data
}

const dashboardTimeline = async (query: Record<string, any>): Promise<any> => {
	const { data } = await ApiClient.client.get(
		`/affiliate/dashboard/timeline?${toQuery(query)}`
	)
	return data.data
}

const dashboardUsers = async (
	query: Record<string, any>
): Promise<{ data: IAffiliateDashboardUsers[]; total: number }> => {
	const { data } = await ApiClient.client.get(
		`/affiliate/dashboard/users?${toQuery(query)}`
	)
	return data.data
}

const exportUsers = async (query: Record<string, any>) => {
	const headers = {
		Authorization: `Bearer ${ApiClient.getAuthToken()}`
	}
	const impersonationId = JSON.parse(
		localStorage.getItem('imper_userId') as string
	)
	if (impersonationId)
		Object.assign(headers, { 'Impersonated-User-ID': impersonationId })

	const response = await fetch(
		`${ApiConfig.API_BASE_URL}/affiliate/dashboard/users/export?${toQuery(
			query
		)}`,
		{
			headers
		}
	)
	if (response.body) {
		toast.success('Download started, check your downloads tab')
		const fileStream = streamSaver.createWriteStream(
			`users-export-${moment().format('YYYY-MM-DD')}.csv`
		)
		await response.body.pipeTo(fileStream)
	}
}

export const AffiliateService = {
	createProfile,
	updateProfile,
	dashboardStats,
	dashboardTimeline,
	dashboardUsers,
	exportUsers,
	createAffiliateUser
}
