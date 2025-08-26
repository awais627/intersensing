import {
	AdAccountDTO,
	BingAdsAdAccountDTO,
	FacebookAdsAdAccountDTO,
	GoogleAdsAdAccountDTO
} from 'api-models'

export const castAdAccount = (
	platform: string | null,
	adAccount?: AdAccountDTO
) => {
	if (platform === 'GADS') return adAccount as GoogleAdsAdAccountDTO
	if (platform === 'FADS') return adAccount as FacebookAdsAdAccountDTO
	if (platform === 'BADS') return adAccount as BingAdsAdAccountDTO
}
