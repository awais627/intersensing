import { GoogleAdsCampaignDTO } from 'api-models'
import { ApiClient } from '../api-client'

const findById = async (
	adAccountId?: string
): Promise<GoogleAdsCampaignDTO[]> => {
	const { data } = await ApiClient.client.get(
		`/admin/ad-accounts/${adAccountId}/campaigns`
	)
	return data.data
}

export const AdminCampigns = {
	findById
}
