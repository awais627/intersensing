export const AppConfig = {
	ENV: 'stage',
	APP_BASE_URL: 'https://staging.clickguard.com',
	KNOWLEDGEBASE_URL: 'https://help.clickguard.com'
}

export const ApiConfig = {
	API_BASE_URL: 'https://staging.clickguard.com/api',
	API_CFC_URL: 'https://staging.clickguard.com/cfc-api',
	API_WEBSOCKET_URL: 'https://ws-stage.clickguard.com'
}

export const TrackerApiConfig = {
	API_BASE_URL: 'https://tracker-staging.clickguard.com'
}

export const GoogleAuthConfig = {
	AUTH_URL:
		'https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&prompt=consent&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fadwords%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile&response_type=code&client_id=456310919448-dj4kvl1us6ct7sjun9pr6p9g9oktv36p.apps.googleusercontent.com&redirect_uri=https://staging.clickguard.com/oauth/google',
	AUTH_CFC_URL:
		'https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&prompt=consent&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fadwords%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile&response_type=code&client_id=456310919448-dj4kvl1us6ct7sjun9pr6p9g9oktv36p.apps.googleusercontent.com&redirect_uri=https://staging.clickguard.com/click-fraud-calculator/auth'
}

export const FacebookAuthConfig = {
	AUTH_URL:
		'https://www.facebook.com/v22.0/dialog/oauth?client_id=790890108157348&redirect_uri=https://staging.clickguard.com//oauth/facebook&scope=ads_management,ads_read,email&response_type=token'
}

export const BingAuthConfig = {
	AUTH_URL:
		'https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=64977a0a-83f0-4fff-ac63-1b0e18c4aad5&scope=openid%20profile%20https://ads.microsoft.com/msads.manage%20offline_access&response_type=code&redirect_uri=https://staging.clickguard.com/oauth/bing&prompt=login'
}

export const GoogleTagManagerAuthConfig = {
	AUTH_URL:
		'https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&prompt=consent&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile%20https%3A%2F%2Fwww.googleapis.com/auth/tagmanager.edit.containerversions%20https%3A%2F%2Fwww.googleapis.com/auth/tagmanager.edit.containers%20https%3A%2F%2Fwww.googleapis.com/auth/tagmanager.publish&response_type=code&client_id=456310919448-dj4kvl1us6ct7sjun9pr6p9g9oktv36p.apps.googleusercontent.com&redirect_uri=https://staging.clickguard.com/oauth/google'
}

export const StripeConfig = {
	publicKey: 'pk_test_dvm6xRgzXdS5obS83PNmLPPj'
}

export const Auth0Config = {
	domain: 'clickguard-staging.us.auth0.com',
	client_id: 'dpY9tyTG7z3nY9pJ7vZ9kJUIw13cAuyf',
	audience: 'clickguard-stage-api',
	scope: 'read:current_user update:current_user_metadata',
	conection: 'Username-Password-Authentication'
}

export const IntercomConfig = {
	api_base: 'https://api-iam.intercom.io',
	app_id: 'vyj2flut'
}

export const SentryConfig = {
	DNS: ''
}

export const PostHogConfig = {
	REACT_APP_PUBLIC_POSTHOG_KEY: '',
	REACT_APP_PUBLIC_POSTHOG_HOST: ''
}
