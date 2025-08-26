import {
	BillingAccountInfoDTO,
	OrganizationDTO,
	ProductAccountDTO,
	SubscriptionDTO,
	UserAccessInfoDTO,
	UserAccessInviteDTO
} from 'api-models'
import {ApiClient} from '../api-client'
import {AccountContactOrganizationDto, AccountPreferencesOrganizationDto} from './types'
import {CancellationRequestInfo} from '../../store/account-store/type'

const find = async (): Promise<Array<ProductAccountDTO>> => {
	const { data } = await ApiClient.client.get('/accounts')
	return data.data
}

const getById = async (id: string): Promise<ProductAccountDTO> => {
	const { data } = await ApiClient.client.get(`/accounts/${id}`)
	return data.data
}

const create = async (payload: {
	tier: string
	price_id: string
	pm_id: string
	auto_upgrade: boolean
	offer_id: null
	org_data: {
		name: string
		billing_contact: {
			name: string
			email: string
		}
	}
}): Promise<ProductAccountDTO> => {
	const { data } = await ApiClient.client.post('/accounts', payload)
	return data.data
}

const autoUpgradeAddLimit = async (
	accountId: string,
	payload: { enabled: boolean }
): Promise<ProductAccountDTO> => {
	const { data } = await ApiClient.client.post(
		`/accounts/${accountId}/auto-upgrade`,
		payload
	)
	return data.data
}

const createWithOffer = async (payload: {
	pm_id: string
	org_data: {
		name: string
		billing_contact: {
			name: string
			email: string
		}
	}
	offer_id: string
}): Promise<ProductAccountDTO> => {
	const { data } = await ApiClient.client.post('/accounts/', payload)
	return data.data
}

const getUsersWithAccess = async (
	accountId: string
): Promise<UserAccessInfoDTO[]> => {
	const { data } = await ApiClient.client.get(`/accounts/${accountId}/users`)
	return data.data
}
const getInvitedUsers = async (
	accountId: string
): Promise<UserAccessInviteDTO[]> => {
	const { data } = await ApiClient.client.get(`/accounts/${accountId}/invites`)
	return data.data
}
const inviteUser = async (
	accountId: string,
	payload: {
		email: string
		access_level: string
	}
): Promise<UserAccessInviteDTO[]> => {
	const { data } = await ApiClient.client.post(
		`/accounts/${accountId}/users`,
		payload
	)
	return data.data
}
const updateUser = async (
	accountId: string,
	userId: string,
	payload: {
		access_level: string
	}
): Promise<UserAccessInviteDTO[]> => {
	const { data } = await ApiClient.client.patch(
		`/accounts/${accountId}/users/${userId}`,
		payload
	)
	return data.data
}
const deleteUser = async (
	accountId: string,
	userId: string
): Promise<UserAccessInviteDTO[]> => {
	const { data } = await ApiClient.client.delete(
		`/accounts/${accountId}/users/${userId}`
	)
	return data.data
}
const deleteAccount = async (
	accountId: string
): Promise<UserAccessInviteDTO[]> => {
	const { data } = await ApiClient.client.delete(`/accounts/${accountId}`)
	return data.data
}
const revokeUserInvitation = async (
	accountId: string,
	inviteId: string
): Promise<UserAccessInviteDTO[]> => {
	const { data } = await ApiClient.client.delete(
		`/accounts/${accountId}/invites/${inviteId}`
	)
	return data.data
}

const updateAccountOrganization = async (
	accountId: string,
	payload: OrganizationDTO
): Promise<ProductAccountDTO[]> => {
	const { data } = await ApiClient.client.patch(
		`/accounts/${accountId}/settings`,
		payload
	)
	return data.data
}

const updateAccountPreferencesOrganization = async (
	accountId: string,
	payload: AccountPreferencesOrganizationDto
): Promise<ProductAccountDTO[]> => {
	const { data } = await ApiClient.client.patch(
		`/accounts/${accountId}/workspace-preference`,
		payload
	)
	return data.data
}
const updateAccountContactOrganization = async (
	accountId: string,
	payload: AccountContactOrganizationDto
): Promise<ProductAccountDTO[]> => {
	const { data } = await ApiClient.client.patch(
		`/accounts/${accountId}/workspace-contact`,
		payload
	)
	return data.data
}
const updateAccountBillingInfo = async (
	accountId: string,
	payload: Partial<BillingAccountInfoDTO>
): Promise<ProductAccountDTO[]> => {
	const { data } = await ApiClient.client.patch(
		`/accounts/${accountId}/billing-info`,
		payload
	)
	return data.data
}
const editAccountPaymentMethod = async (
	accountId: string,
	payload: { pm_id: string }
): Promise<ProductAccountDTO[]> => {
	const { data } = await ApiClient.client.post(
		`/accounts/${accountId}/payment-method`,
		payload
	)
	return data.data
}
const startPendingSubscription = async (
	accountId: string,
	payload: { note: string }
): Promise<ProductAccountDTO[]> => {
	const { data } = await ApiClient.client.post(
		`/accounts/${accountId}/subscriptions/start`,
		payload
	)
	return data.data
}

const getSubscriptionByAccountId = async (
	accountId: string
): Promise<SubscriptionDTO> => {
	const { data } = await ApiClient.client.get(
		`/accounts/${accountId}/subscriptions`
	)
	return data.data
}
const clearSubscriptionFailedMessage = async (
	accountId: string
): Promise<SubscriptionDTO> => {
	const { data } = await ApiClient.client.get(
		`/accounts/${accountId}/subscriptions/clear-err-msg`
	)
	return data.data
}

const revertChange = async (
	accountId: string,
	payload: { note: string }
): Promise<SubscriptionDTO> => {
	const { data } = await ApiClient.client.post(
		`/accounts/${accountId}/subscriptions/revert`,
		payload
	)
	return data.data
}
const newSubscription = async (
	accountId: string,
	payload: { tier: string; price_id: string; coupon_code: string | null }
): Promise<SubscriptionDTO> => {
	const { data } = await ApiClient.client.post(
		`/accounts/${accountId}/subscriptions`,
		payload
	)
	return data.data
}
const changeSubscription = async (
	accountId: string,
	payload: { tier: string; price_id: string; coupon_code: string | null }
): Promise<SubscriptionDTO> => {
	const { data } = await ApiClient.client.post(
		`/accounts/${accountId}/subscriptions/change`,
		payload
	)
	return data.data
}
const cancelRequest = async (
	accountId: string,
	payload: CancellationRequestInfo
): Promise<ProductAccountDTO[]> => {
	const { data } = await ApiClient.client.post(
		`/accounts/${accountId}/subscriptions/cancel`,
		payload
	)
	return data.data
}
const removeCancelRequest = async (
	accountId: string
): Promise<ProductAccountDTO[]> => {
	const { data } = await ApiClient.client.delete(
		`/accounts/${accountId}/subscriptions/cancel`
	)
	return data.data
}

const addCoupon = async (
	accountId: string,
	payload: { coupon_code: string }
): Promise<ProductAccountDTO[]> => {
	const { data } = await ApiClient.client.post(
		`/accounts/${accountId}/subscriptions/discount`,
		payload
	)
	return data.data
}

const getPaymentIntent = async (
	accountId: string,
	id: string
): Promise<any> => {
	const { data } = await ApiClient.client.get(
		`/accounts/${accountId}/payment-intent/${id}`
	)
	return data.data
}

const updateAccountPhoto = async (
	formData: Partial<FormData>,
	accountId: string
): Promise<string> => {
	const { data } = await ApiClient.client.post(
		`/accounts/${accountId}/upload-workspace-avatar`,
		formData,
		{
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		}
	)
	return data.data
}

// ppc=true
export const ProductAccounts = {
	find,
	getById,
	create,
	createWithOffer,
	getUsersWithAccess,
	getInvitedUsers,
	inviteUser,
	updateUser,
	deleteUser,
	deleteAccount,
	revokeUserInvitation,
	updateAccountOrganization,
	updateAccountPreferencesOrganization,
	updateAccountContactOrganization,
	updateAccountPhoto,
	updateAccountBillingInfo,
	getSubscriptionByAccountId,
	startPendingSubscription,
	revertChange,
	newSubscription,
	changeSubscription,
	editAccountPaymentMethod,
	cancelRequest,
	removeCancelRequest,
	addCoupon,
	autoUpgradeAddLimit,
	getPaymentIntent,
	clearSubscriptionFailedMessage,
}
