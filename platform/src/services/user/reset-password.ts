import { ApiClient } from '../api-client'
import { ResetPasswordDTO } from './types'

const sendPasswordReset = async (email: string): Promise<any> => {
	const { data } = await ApiClient.client.post('/users/reset-password', {
		email
	})
	return data.data
}

const changePassword = async (password: string, code: string): Promise<any> => {
	const { data } = await ApiClient.client.post('/users/change-password', {
		password,
		code
	})
	return data.data
}
const getPasswordRequest = async (code: string): Promise<ResetPasswordDTO> => {
	const { data } = await ApiClient.client.get(
		`/users/change-password-code?code=${code}`
	)
	return data.data
}

export const ResetPasswordService = {
	sendPasswordReset,
	changePassword,
	getPasswordRequest
}
