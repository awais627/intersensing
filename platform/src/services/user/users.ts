import {
	AccessLogDTO,
	UserAccessInviteDTO,
	UserDTO,
	UserIdentityDTO
} from 'api-models'
import { ApiClient } from '../api-client'

const get = async (): Promise<UserDTO> => {
	const { data } = await ApiClient.client.get('/users')
	return data.data
}

const updateLegacyTag = async (payload: { ref: string }): Promise<UserDTO> => {
	const { data } = await ApiClient.client.post(
		'/users/update-legacy-tag',
		payload
	)
	return data.data
}

const updateReferral = async (payload: {
	ref_id: string
	aff_id: string
	aff_token: string
}): Promise<UserDTO> => {
	const { data } = await ApiClient.client.post(
		'/users/update-referral-id',
		payload
	)
	return data.data
}

//*******************/ User Email update /*******************/

const changeMainEmail = async (payload: {
	email: string
}): Promise<UserDTO> => {
	const { data } = await ApiClient.client.post(
		'users/change-main-email',
		payload
	)
	return data.data
}
const updateEmail = async (payload: { email: string }): Promise<UserDTO> => {
	const { data } = await ApiClient.client.post(
		'/users/change-contact-email',
		payload
	)
	return data.data
}

const addNewEmail = async (payload: { email: string }): Promise<UserDTO> => {
	const { data } = await ApiClient.client.post(
		'/users/add-email-address',
		payload
	)
	return data.data
}

const resendVerificationEmail = async (payload: { email: string }) => {
	await ApiClient.client.post('/users/resend-verification-email', payload)
}

const deleteEmail = async (payload: { email: string }): Promise<UserDTO> => {
	const { data } = await ApiClient.client.delete(
		`/users/delete-email-address/${payload.email}`
	)
	return data.data
}

const verifyEmailByCode = async (code: string): Promise<any> => {
	const { data } = await ApiClient.client.get(`/users/confirm-email/${code}`)
	return data.data
}
//*******************/ User profile update /*******************/
const updateProfile = async (payload: {
	name: string
	phone_number: string | null
	timezone: string | null
	country: string | null
	confirm_user?: boolean
	referral?: string | null
}): Promise<UserDTO> => {
	const { data } = await ApiClient.client.patch('/users/basic-info', payload)
	return data.data
}

const updateNotifications = async (payload: {
	app_notification_values: Array<string>
	email_notification_values: Array<string>
}): Promise<UserDTO> => {
	const { data } = await ApiClient.client.patch('/users/notifications', payload)
	return data.data
}

//*******************/ User photo update /*******************/
const updatePhoto = async (formData: Partial<FormData>): Promise<string> => {
	const { data } = await ApiClient.client.post(
		'/users/upload-avatar',
		formData,
		{
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		}
	)
	return data.data
}

//*******************/Login Methods calls /*******************/

const getLoginMethods = async (): Promise<UserIdentityDTO[]> => {
	const { data } = await ApiClient.client.get('/users/identities')
	return data.data
}
const deleteLoginMethod = async (
	id: string,
	provider: string
): Promise<UserIdentityDTO[]> => {
	const { data } = await ApiClient.client.delete(
		`/users/identities/${provider}/${id}`
	)
	return data.data
}
const resetPasswordForLoginMethod = async (
	connection: string
): Promise<UserIdentityDTO[]> => {
	const { data } = await ApiClient.client.post(
		`/users/identities/${connection}/reset-password`
	)
	return data.data
}

//*******************/ Access logs calls /*******************/
const getAccessLogs = async (): Promise<AccessLogDTO[]> => {
	const { data } = await ApiClient.client.get('/users/access-log')
	return data.data
}
//*******************/ MFA  /*******************/
const getUsersEnrollementDetails = async (): Promise<any> => {
	const { data } = await ApiClient.client.get('/users/mfa-enrollments')
	return data.data
}
const toggleMFA = async (payload: { enabled: boolean }): Promise<any> => {
	const { data } = await ApiClient.client.post('/users/toggle-mfa', payload)
	return data.data
}

const getUserAccessInvite = async (
	code: string
): Promise<UserAccessInviteDTO> => {
	const { data } = await ApiClient.client.get(`/users/invite/${code}`)
	return data.data
}

const getUserAccessInviteCode = async (): Promise<{ code: string } | null> => {
	const { data } = await ApiClient.client.get('/users/invite-code')
	return data.data
}

const acceptUserAccessInvite = async (
	code: string
): Promise<UserAccessInviteDTO> => {
	const { data } = await ApiClient.client.post(`/users/join/${code}`)
	return data.data
}

const getSupportToken = async (): Promise<string> => {
	const { data } = await ApiClient.client.get('/users/support-token')
	return data.data
}

const updateVisualPreferences = async (
	preferences: string
): Promise<UserDTO> => {
	const { data } = await ApiClient.client.patch('/users/visual-preferences', {
		preferences
	})
	return data.data
}

export const Users = {
	get,
	addNewEmail,
	changeMainEmail,
	deleteEmail,
	resendVerificationEmail,
	updateEmail,
	verifyEmailByCode,
	updateProfile,
	updatePhoto,
	getLoginMethods,
	resetPasswordForLoginMethod,
	deleteLoginMethod,
	getAccessLogs,
	getUsersEnrollementDetails,
	toggleMFA,
	updateNotifications,
	getUserAccessInvite,
	acceptUserAccessInvite,
	updateLegacyTag,
	getSupportToken,
	updateReferral,
	updateVisualPreferences,
	getUserAccessInviteCode
}
