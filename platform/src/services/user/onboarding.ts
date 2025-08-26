import { ProductAccountDTO } from 'api-models'
import { ApiClient } from '../api-client'

async function createProductAccount(payload: any): Promise<ProductAccountDTO> {
	const { data } = await ApiClient.client.post('/onboarding/start', payload)
	return data.data
}

async function setAccountLink(
	accountId: string,
	code: string,
	platform: string
): Promise<ProductAccountDTO> {
	const { data } = await ApiClient.client.patch(
		`/onboarding/${accountId}/link`,
		{ auth_code: code, platform: platform }
	)
	return data.data
}

async function addAccount(
	accountId: string,
	payload: {
		account_number: string
		link_id?: string
		set_tracking_template?: boolean
		set_custom_audience?: boolean
		manager?: boolean
	}
): Promise<{ type: string; data: any }> {
	const { data } = await ApiClient.client.post(
		`/onboarding/${accountId}/ad-account`,
		payload
	)
	return data.data
}

async function addAccounts(
	accountId: string,
	payload: {
		account_numbers: string[]
		link_id?: string
		set_tracking_template?: boolean
		set_custom_audience?: boolean
	}
): Promise<{ type: string; data: any }> {
	const { data } = await ApiClient.client.post(
		`/onboarding/${accountId}/ad-accounts`,
		payload
	)
	return data.data
}

async function activate(
	accountId: string,
	payload: {
		tier: string
		price_id: string
		auto_upgrade: boolean
		extended_trial: boolean
		pm_data?: string | null
		pm_id?: string | null
		coupon_code?: string | null
	}
): Promise<ProductAccountDTO> {
	const { data } = await ApiClient.client.post(
		`/onboarding/${accountId}/billing`,
		payload
	)
	return data.data
}

async function activateWithQuote(
	accountId: string,
	payload: {
		spend: number
		billing_period: string
		pm_data?: string | null
		pm_id?: string | null
	}
): Promise<ProductAccountDTO> {
	const { data } = await ApiClient.client.post(
		`/onboarding/${accountId}/quote`,
		payload
	)
	return data.data
}

async function legacy(accountId: string): Promise<ProductAccountDTO> {
	const { data } = await ApiClient.client.post(
		`/onboarding/${accountId}/legacy`,
		{}
	)
	return data.data
}

async function updateSetup(
	accountId: string,
	payload: {
		step?: string
		auth_id?: string | null
		account_number?: string | null
		configuration?: any
	}
): Promise<ProductAccountDTO> {
	const { data } = await ApiClient.client.patch(
		`/onboarding/${accountId}/setup`,
		payload
	)
	return data.data
}

export const Onboarding = {
	createProductAccount,
	updateSetup,
	addAccount,
	addAccounts,
	activate,
	activateWithQuote,
	setAccountLink,
	legacy
}
