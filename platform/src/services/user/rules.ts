// import { AuthConnection } from 'api-models'
import { OwnershipType, RuleDTO } from 'api-models'
import { toQuery } from 'utils'
import { ApiClient } from '../api-client'

async function createCustomRule(props: {
	accountId?: string | null
	payload: {
		asset_id?: string | null
		ad_account_id?: string | null
		campaign_id?: string | null
		rule_data: any
	}
}): Promise<RuleDTO> {
	const { accountId, payload } = props

	const { data } = await ApiClient.client.post(
		`/accounts/${accountId}/rules`,
		payload
	)
	return data.data
}

async function updateCustomRule(props: {
	accountId?: string | null
	ruleId?: string | null
	payload: {
		rule_data: any
	}
}): Promise<RuleDTO> {
	const { accountId, ruleId, payload } = props

	const { data } = await ApiClient.client.put(
		`/accounts/${accountId}/rules/${ruleId}`,
		payload
	)
	return data.data
}

async function listAllRules(props: {
	accountId?: string | null
	query: {
		ownership: OwnershipType
		asset_id?: string | null
		ad_account_id?: string | null
		campaign_id?: string | null
	}
}): Promise<RuleDTO[]> {
	const { accountId, query } = props

	const { data } = await ApiClient.client.get(
		`/accounts/${accountId}/rules?${toQuery(query)}`
	)
	return data.data
}

async function toggleRuleStatus(props: {
	accountId?: string
	id: string
	enabled: boolean
}): Promise<RuleDTO> {
	const { accountId, id, enabled } = props

	const { data } = await ApiClient.client.patch(
		`/accounts/${accountId}/rules/${id}/toggle`,
		{ enabled }
	)
	return data.data
}

async function deleteAllRules(props: {
	accountId?: string
	query: {
		asset_id?: string | null
		ad_account_id?: string | null
		campaign_id?: string | null
	}
}): Promise<void> {
	const { accountId, query } = props

	await ApiClient.client.delete(
		`/accounts/${accountId}/rules?${toQuery(query)}`
	)
}

async function deleteRule(props: {
	accountId?: string
	ruleId?: string
}): Promise<void> {
	const { accountId, ruleId } = props

	await ApiClient.client.delete(`/accounts/${accountId}/rules/${ruleId}`)
}

async function adAccountInheritSettings(props: {
	accountId?: string
	ad_account_id?: string
	inherit: boolean
}): Promise<void> {
	const { accountId, ad_account_id, inherit } = props

	const { data } = await ApiClient.client.patch(
		`/accounts/${accountId}/ad-accounts/${ad_account_id}/rules-settings`,
		{ inherit }
	)
	return data.data
}

async function campaignInheritSettings(props: {
	accountId?: string
	ad_account_id?: string
	campaign_id?: string
	inherit: boolean
	platform: any
}): Promise<void> {
	const { accountId, ad_account_id, campaign_id, inherit, platform } = props

	const { data } = await ApiClient.client.patch(
		`/accounts/${accountId}/ad-accounts/${ad_account_id}/campaigns/${campaign_id}/rules-settings?platform=${platform}`,
		{ inherit }
	)
	return data.data
}

export const Rules = {
	createCustomRule,
	updateCustomRule,
	listAllRules,
	toggleRuleStatus,
	deleteAllRules,
	deleteRule,
	adAccountInheritSettings,
	campaignInheritSettings
}
