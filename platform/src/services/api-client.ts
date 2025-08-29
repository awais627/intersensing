import axios from 'axios'
import { ApiConfig } from 'config'

const client = axios.create({
	baseURL:
		process.env.NODE_ENV === 'production'
			? 'https://139.59.67.175'
			: ApiConfig.API_BASE_URL
})

let TOKEN: string | null = null
let IMPERSONATION: string | null = null

client.interceptors.request.use((config) => {
	const token = TOKEN
	const impersonation = IMPERSONATION

	if (token && config.headers) {
		config.headers.Authorization = `Bearer ${token}`
	}

	if (impersonation && config.headers) {
		config.headers['Impersonated-User-ID'] = impersonation
	}
	return config
})

const setLogoutListener = (logout: () => void) => {
	client.interceptors.response.use(undefined, async (error) => {
		if (error?.response?.status === 401) {
			logout()
		}
		return Promise.reject(error)
	})
}
const setUnverifiedEmailError = (navigateToError: () => void) => {
	client.interceptors.response.use(undefined, async (error) => {
		if (error?.response?.status === 423) {
			if (window?.location?.pathname !== '/emails/verify') {
				navigateToError()
			}
		}
		return Promise.reject(error)
	})
}

const setAuthToken = (token: string) => {
	TOKEN = token
}

const getAuthToken = () => TOKEN

const setImpersonation = (value: string | null) => {
	IMPERSONATION = value
}

export const ApiClient = {
	client,
	setAuthToken,
	setImpersonation,
	setLogoutListener,
	setUnverifiedEmailError,
	getAuthToken
}
