import { Platform } from 'pages/setup/types'

export const getOAuthCodeKey = (platform: Platform) => {
	if (platform === 'FADS') return 'facebook_oauth_long_lived_token'
	if (platform === 'GADS') return 'google_oauth_code'
	if (platform === 'BADS') return 'bing_oauth_code'

	return ''
}
