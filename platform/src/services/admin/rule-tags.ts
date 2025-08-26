import { RuleTagDTO } from 'api-models/src'
import { ApiClient } from '../api-client'

const findAssetTags = async (
	assetId: string,
	accountId: string
): Promise<Array<RuleTagDTO>> => {
	const { data } = await ApiClient.client.get(
		`/admin/assets/rule-tags/${assetId}?accountId=${accountId}`
	)
	return data.data
}

const findAdAccountTags = async (
	adAccountId: string,
	accountId: string
): Promise<Array<RuleTagDTO>> => {
	const { data } = await ApiClient.client.get(
		`/admin/ad-accounts/rule-tags/${adAccountId}?accountId=${accountId}`
	)
	return data.data
}

export const AdminRuleTags = {
	findAssetTags,
	findAdAccountTags
}
