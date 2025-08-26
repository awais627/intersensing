import { toQuery } from 'utils'
import { ApiClient } from '../api-client'

export const repeatedClicks = async (
	accountId: string,
	assetId: string,
	query: any
): Promise<any> => {
	const { data } = await ApiClient.client.get(
		`accounts/${accountId}/assets/${assetId}/dashboard/repeated-clicks?${toQuery(
			query
		)}`
	)
	return data.data
}

export const Threat = {
	repeatedClicks
}
