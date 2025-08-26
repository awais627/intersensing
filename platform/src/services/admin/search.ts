import { AdAccountDTO, AssetDTO, ProductAccountDTO, UserDTO } from 'api-models'
import { ApiClient } from 'services/api-client'

// Search queries
export type SearchResponse = {
	accounts: ProductAccountDTO[]
	asset: AssetDTO[]
	ad_accounts: AdAccountDTO[]
	users: UserDTO[]
}
const getSearchResults = async (query: string): Promise<SearchResponse> => {
	const { data } = await ApiClient.client.get(
		`/admin/search?query=${query ? encodeURIComponent(query) : ''}`
	)
	return data.data
}
export const adminSearch = {
	getSearchResults
}
