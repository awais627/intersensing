import {
	BingAdsAdAccountDTO,
	FacebookAdsAdAccountDTO,
	GoogleAdsAdAccountDTO
} from 'api-models'

export const platformNameByType: { [key: string]: string } = {
	GADS: 'Google',
	FADS: 'Meta',
	BADS: 'Bing'
}

export type AdPlatforms = 'GADS' | 'FADS' | 'BADS' | 'GTM' | 'other platforms'

export type AdPlatformTypesDTO =
	| GoogleAdsAdAccountDTO
	| FacebookAdsAdAccountDTO
	| BingAdsAdAccountDTO

type AdPlatformTypeDTOMap = {
	GADS: GoogleAdsAdAccountDTO
	FADS: FacebookAdsAdAccountDTO
	BADS: BingAdsAdAccountDTO
}

export const castAdPlatforms = <T extends keyof AdPlatformTypeDTOMap>(
	platform: T,
	adPlatforms: AdPlatformTypesDTO[]
): AdPlatformTypeDTOMap[T][] => {
	return adPlatforms.map((aa) => aa as AdPlatformTypeDTOMap[typeof platform])
}
