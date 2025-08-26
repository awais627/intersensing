import {
	AdAccountDTO,
	AssetDTO,
	FacebookAdsCampaignDTO,
	GoogleAdsCampaignDTO
} from 'api-models'
import { sanitizeURL } from 'utils'

interface Entity {
	selectedCampaign: GoogleAdsCampaignDTO | FacebookAdsCampaignDTO | null
	adAccount: AdAccountDTO | null
	asset: AssetDTO | null | undefined
	demoMode?: boolean
}

export const getEntityName = (props: Entity) => {
	const { selectedCampaign, adAccount, asset, demoMode } = props

	if (demoMode) {
		return 'Demo site'
	}

	if (selectedCampaign?.name) {
		return selectedCampaign?.name
	}
	if (adAccount?.name) {
		return adAccount?.name
	}
	if (asset?.name) {
		return sanitizeURL(asset?.name)
	}

	return ''
}
