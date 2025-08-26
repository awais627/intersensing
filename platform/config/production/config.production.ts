export const AppConfig = {
	ENV: 'production',
	APP_BASE_URL: 'https://app.clickguard.com',
	KNOWLEDGEBASE_URL: 'https://help.clickguard.com/'
}

export const ApiConfig = {
	API_BASE_URL: 'https://app.clickguard.com/api',
	API_CFC_URL: 'https://app.clickguard.com/cfc-api',
	API_WEBSOCKET_URL: 'https://ws.clickguard.com'
}

export const TrackerApiConfig = {
	API_BASE_URL: 'https://pulse.clickguard.com'
}

export const GoogleAuthConfig = {
	AUTH_URL:
		'https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&prompt=consent&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fadwords%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile&response_type=code&client_id=456310919448-3f8rqg7u7gtrpcecc4nt2o7gvjajgum1.apps.googleusercontent.com&redirect_uri=https%3A%2F%2Fapp.clickguard.com%2Foauth%2Fgoogle',
	AUTH_CFC_URL:
		'https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&prompt=consent&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fadwords%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile&response_type=code&client_id=456310919448-3f8rqg7u7gtrpcecc4nt2o7gvjajgum1.apps.googleusercontent.com&redirect_uri=https%3A%2F%2Fapp.clickguard.com%2Fclick-fraud-calculator%2Fauth'
}

export const GoogleTagManagerAuthConfig = {
	AUTH_URL:
		'https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&prompt=consent&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile%20https%3A%2F%2Fwww.googleapis.com/auth/tagmanager.edit.containerversions%20https%3A%2F%2Fwww.googleapis.com/auth/tagmanager.edit.containers%20https%3A%2F%2Fwww.googleapis.com/auth/tagmanager.publish&response_type=code&client_id=456310919448-3f8rqg7u7gtrpcecc4nt2o7gvjajgum1.apps.googleusercontent.com&redirect_uri=https%3A%2F%2Fapp.clickguard.com%2Foauth%2Fgoogle'
}

export const FacebookAuthConfig = {
	AUTH_URL:
		'https://www.facebook.com/v22.0/dialog/oauth?client_id=790890108157348&redirect_uri=https://app.clickguard.com//oauth/facebook&scope=ads_management,ads_read,email&response_type=token'
}

export const BingAuthConfig = {
	AUTH_URL:
		'https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=64977a0a-83f0-4fff-ac63-1b0e18c4aad5&scope=openid%20profile%20https://ads.microsoft.com/msads.manage%20offline_access&response_type=code&redirect_uri=https://app.clickguard.com/oauth/bing&prompt=login'
}

export const StripeConfig = {
	publicKey: 'pk_live_ON0UephboK6VvACM1tprpXdr'
}

export const Auth0Config = {
	domain: 'auth.clickguard.com',
	client_id: 'c6aN8OFe7QywZiJO24OOB6qbYSoClBAp',
	audience: 'clickguard-api',
	scope: 'read:current_user update:current_user_metadata',
	conection: 'Username-Password-Authentication'
}

export const IntercomConfig = {
	api_base: 'https://api-iam.intercom.io',
	app_id: 'vyj2flut'
}

export const SentryConfig = {
	DNS: 'https://d15b61d71b5d411e88fdfb5e87782c98@o974324.ingest.us.sentry.io/4504196866179072'
}

export const PostHogConfig = {
	REACT_APP_PUBLIC_POSTHOG_KEY:
		'phc_HoxLwHp6H9zGYmVjImWmMBRfcbwoLJciRweNxY8jV5G',
	REACT_APP_PUBLIC_POSTHOG_HOST: 'https://us.i.posthog.com'
}
