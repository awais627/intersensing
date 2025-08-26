import {
	AdAccountDTO,
	BingAdsUetTagDTO,
	FacebookAdsCampaignDTO,
	GoogleAdsAdAccountDTO,
	GoogleAdsCampaignDTO,
	ProtectionInfoDTO
} from 'api-models'
import { toQuery } from 'utils'
import { ApiClient } from '../api-client'

async function find(
	productAccountId: string,
	query?: Record<string, string>
): Promise<Array<AdAccountDTO>> {
	const { data } = await ApiClient.client.get(
		`/accounts/${productAccountId}/ad-accounts?${toQuery(query)}`
	)
	return data.data.filter(
		(adAccount: AdAccountDTO) => adAccount.status !== 'DELETED'
	)
}

async function getById(
	productAccountId: string,
	id: string
): Promise<AdAccountDTO> {
	const { data } = await ApiClient.client.get(
		`/accounts/${productAccountId}/ad-accounts/${id}`
	)
	return data.data
}

async function createGoogleAdsAccount(
	productAccountId: string,
	payload: {
		account_number: string
		link_id?: string | null
		asset_id?: string | null
	}
): Promise<AdAccountDTO> {
	const { data } = await ApiClient.client.post(
		`/accounts/${productAccountId}/ad-accounts/google-ads`,
		payload
	)
	return data.data
}
const createPPCGoogleAdsAccount = async (
	accountId: string,
	payload: {
		asset_id: string
		link_id: string // account link ID
		account_number: string
		set_tracking_template: boolean
	}
): Promise<GoogleAdsAdAccountDTO> => {
	try {
		const { data } = await ApiClient.client.post(
			`/accounts/${accountId}/ad-accounts/gads`,
			payload
		)
		return data.data
	} catch (err) {
		return Promise.reject(err)
	}
}

const createPPCFacebookAdsAccount = async (
	accountId: string,
	payload: {
		asset_id: string
		link_id: string // account link ID
		account_number: string
		set_custom_audience: boolean
	}
): Promise<GoogleAdsCampaignDTO[]> => {
	try {
		const { data } = await ApiClient.client.post(
			`/accounts/${accountId}/ad-accounts/fads`,
			payload
		)
		return data.data
	} catch (err) {
		return Promise.reject(err)
	}
}

const createPPCBingAdsAccount = async (
	accountId: string,
	payload: {
		asset_id: string
		link_id: string // account link ID
		account_number: string
		customer_id: string
		ad_account_id: string
	}
): Promise<void> => {
	try {
		const { data } = await ApiClient.client.post(
			`/accounts/${accountId}/ad-accounts/bads`,
			payload
		)
		return data.data
	} catch (err) {
		return Promise.reject(err)
	}
}

const sync = async (
	accountId: string | undefined,
	adAccountId: string,
	platform: string
): Promise<AdAccountDTO[]> => {
	const { data } = await ApiClient.client.post(
		`/accounts/${accountId}/ad-accounts/${platform}/${adAccountId}/sync`,
		{}
	)
	return data.data
}

const setAdAccountProtection = async (
	accountId: string | undefined,
	adAccountId: string | undefined,
	payload: ProtectionInfoDTO
): Promise<AdAccountDTO[]> => {
	const { data } = await ApiClient.client.patch(
		`/accounts/${accountId}/ad-accounts/${adAccountId}/protection`,
		payload
	)
	return data.data
}
const setCampaignProtection = async (
	accountId: string,
	adAccountId: string,
	campaignId: string,
	payload: ProtectionInfoDTO,
	platform?: AdAccountDTO['platform']
): Promise<GoogleAdsCampaignDTO | FacebookAdsCampaignDTO> => {
	const { data } = await ApiClient.client.patch(
		`/accounts/${accountId}/ad-accounts/${adAccountId}/campaigns/${campaignId}/protection?platform=${platform}`,
		payload
	)
	return data.data
}
const getGoogleCampaigns = async (
	accountId: string,
	adAccountId: string
): Promise<GoogleAdsCampaignDTO[]> => {
	const { data } = await ApiClient.client.get(
		`/accounts/${accountId}/ad-accounts/gads/${adAccountId}/campaigns`
	)
	return data.data
}
const getFacebookCampaigns = async (
	accountId: string,
	adAccountId: string
): Promise<FacebookAdsCampaignDTO[]> => {
	const { data } = await ApiClient.client.get(
		`/accounts/${accountId}/ad-accounts/fads/${adAccountId}/campaigns`
	)
	return data.data
}
const getBingCampaigns = async (
	accountId: string,
	adAccountId: string
): Promise<FacebookAdsCampaignDTO[]> => {
	const { data } = await ApiClient.client.get(
		`/accounts/${accountId}/ad-accounts/bads/${adAccountId}/campaigns`
	)
	return data.data
}
const updateTrackingToggles = async (
	accountId: string,
	adAccountId: string,
	payload: {
		set_tracking_template: boolean
		automated_tracking: boolean
	}
): Promise<GoogleAdsCampaignDTO[]> => {
	const { data } = await ApiClient.client.patch(
		`/accounts/${accountId}/ad-accounts/gads/${adAccountId}/tracking`,
		payload
	)
	return data.data
}
const updateGadsSettingsAccessLink = async (
	accountId: string,
	adAccountId: string,
	payload: { link_id: string }
): Promise<void> => {
	const { data } = await ApiClient.client.patch(
		`/accounts/${accountId}/ad-accounts/gads/${adAccountId}/link`,
		payload
	)
	return data.data
}
const updateFadsSettingsAccessLink = async (
	accountId: string,
	adAccountId: string,
	payload: { link_id: string }
): Promise<void> => {
	const { data } = await ApiClient.client.patch(
		`/accounts/${accountId}/ad-accounts/fads/${adAccountId}/link`,
		payload
	)
	return data.data
}
const updateBadsSettingsAccessLink = async (
	accountId: string,
	adAccountId: string,
	payload: { link_id: string }
): Promise<void> => {
	const { data } = await ApiClient.client.patch(
		`/accounts/${accountId}/ad-accounts/bads/${adAccountId}/link`,
		payload
	)
	return data.data
}
const updateSettingsAccountProtection = async (
	accountId: string,
	adAccountId: string,
	payload: { active: boolean }
): Promise<GoogleAdsCampaignDTO[]> => {
	const { data } = await ApiClient.client.post(
		`/accounts/${accountId}/ad-accounts/${adAccountId}/toggle-active`,
		payload
	)
	return data.data
}
const updateGadsAdAccountSettings = async (
	accountId: string,
	adAccountId: string,
	payload: {
		name: string
		color: string
		currency: string
		timezone: string
		ignored_campaigns: string[]
	}
): Promise<GoogleAdsCampaignDTO[]> => {
	const { data } = await ApiClient.client.patch(
		`/accounts/${accountId}/ad-accounts/gads/${adAccountId}/settings`,
		payload
	)
	return data.data
}
const updateFadsAdAccountSettings = async (
	accountId: string,
	adAccountId: string,
	payload: {
		name: string
		color: string
		currency: string
		timezone: string
		set_custom_audience: boolean
	}
): Promise<GoogleAdsCampaignDTO[]> => {
	const { data } = await ApiClient.client.patch(
		`/accounts/${accountId}/ad-accounts/fads/${adAccountId}/settings`,
		payload
	)
	return data.data
}
const updateBadsAdAccountSettings = async (
	accountId: string,
	adAccountId: string,
	payload: {
		name: string
		color: string
		currency: string
		timezone: string
		set_custom_audience: boolean
	}
): Promise<GoogleAdsCampaignDTO[]> => {
	const { data } = await ApiClient.client.patch(
		`/accounts/${accountId}/ad-accounts/bads/${adAccountId}/settings`,
		payload
	)
	return data.data
}
const deleteAdAccountAccount = async (
	accountId: string,
	adAccountId: string
): Promise<GoogleAdsCampaignDTO[]> => {
	const { data } = await ApiClient.client.delete(
		`/accounts/${accountId}/ad-accounts/${adAccountId}`
	)
	return data.data
}

const getAccountAdPixels = async (
	accountId: string,
	adAccountId: string
): Promise<string[]> => {
	const { data } = await ApiClient.client.get(
		`/accounts/${accountId}/ad-accounts/fads/${adAccountId}/ad-pixels`
	)
	return data.data
}

const getBingUetTags = async (
	accountId: string,
	adAccountId: string
): Promise<BingAdsUetTagDTO[]> => {
	const { data } = await ApiClient.client.get(
		`/accounts/${accountId}/ad-accounts/bads/${adAccountId}/uet-tags`
	)
	return data.data
}

const sendMccLinkRequest = async (
	accountId: string,
	adAccountId: string
): Promise<BingAdsUetTagDTO[]> => {
	const { data } = await ApiClient.client.post(
		`/accounts/${accountId}/ad-accounts/gads/${adAccountId}/send-invite`
	)
	return data.data
}
const sendMccLinkRequests = async (
	accountId: string
): Promise<BingAdsUetTagDTO[]> => {
	const { data } = await ApiClient.client.post(
		`/accounts/${accountId}/ad-accounts/gads/invite-all`
	)
	return data.data
}

const skipMccSupport = async (
	accountId: string,
	adAccountId: string
): Promise<BingAdsUetTagDTO[]> => {
	const { data } = await ApiClient.client.post(
		`/accounts/${accountId}/ad-accounts/gads/${adAccountId}/skip-mcc-support`
	)
	return data.data
}

const skipMccSupportAll = async (
	accountId: string
): Promise<BingAdsUetTagDTO[]> => {
	const { data } = await ApiClient.client.post(
		`/accounts/${accountId}/ad-accounts/gads/skip-mcc-support-all`
	)
	return data.data
}

const suppressMccSupportAll = async (
	accountId: string
): Promise<BingAdsUetTagDTO[]> => {
	const { data } = await ApiClient.client.post(
		`/accounts/${accountId}/ad-accounts/gads/suppress-mcc-support-all`
	)
	return data.data
}

export const AdAccounts = {
	find,
	getById,
	createGoogleAdsAccount,
	skipMccSupportAll,
	sendMccLinkRequests,
	skipMccSupport,
	suppressMccSupportAll,
	sendMccLinkRequest,
	createPPCGoogleAdsAccount,
	createPPCFacebookAdsAccount,
	createPPCBingAdsAccount,
	sync,
	setAdAccountProtection,
	setCampaignProtection,
	getGoogleCampaigns,
	getFacebookCampaigns,
	getBingCampaigns,
	updateTrackingToggles,
	updateGadsSettingsAccessLink,
	updateFadsSettingsAccessLink,
	updateBadsSettingsAccessLink,
	updateSettingsAccountProtection,
	updateGadsAdAccountSettings,
	updateFadsAdAccountSettings,
	updateBadsAdAccountSettings,
	deleteAdAccountAccount,
	getAccountAdPixels,
	getBingUetTags
}
