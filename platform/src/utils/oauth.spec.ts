import { getOAuthCodeKey } from './oauth'

describe('OAuth utils', () => {
	describe('getOAuthCodeKey', () => {
		it('returns the correct code key based on the platform', () => {
			{
				const code = getOAuthCodeKey('FADS')
				expect(code).toBe('facebook_oauth_long_lived_token')
			}
			{
				const code = getOAuthCodeKey('GADS')
				expect(code).toBe('google_oauth_code')
			}
			{
				const code = getOAuthCodeKey('BADS')
				expect(code).toBe('bing_oauth_code')
			}
		})
	})
})
