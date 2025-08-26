export const AppConfig = {
	ENV: 'dev',
	APP_BASE_URL: 'https://localhost:3000',
	KNOWLEDGEBASE_URL: 'https://help.clickguard.com'
}

export const ApiConfig = {
	API_BASE_URL: 'http://localhost:9000',
	API_WEBSOCKET_URL: 'http://localhost:9003',
	API_CFC_URL: 'http://localhost:9091'
}

export const TrackerApiConfig = {
	API_BASE_URL: 'http://localhost:9001'
}

export const GoogleAuthConfig = {
	AUTH_URL:
		'https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&prompt=consent&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fadwords%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile&response_type=code&client_id=456310919448-dj4kvl1us6ct7sjun9pr6p9g9oktv36p.apps.googleusercontent.com&redirect_uri=http://localhost:3000/oauth/google',
	AUTH_CFC_URL:
		'https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&prompt=consent&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fadwords%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile&response_type=code&client_id=456310919448-dj4kvl1us6ct7sjun9pr6p9g9oktv36p.apps.googleusercontent.com&redirect_uri=http://localhost:3000/click-fraud-calculator/auth'
}

export const GoogleTagManagerAuthConfig = {
	AUTH_URL:
		'https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&prompt=consent&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile%20https%3A%2F%2Fwww.googleapis.com/auth/tagmanager.edit.containerversions%20https%3A%2F%2Fwww.googleapis.com/auth/tagmanager.edit.containers%20https%3A%2F%2Fwww.googleapis.com/auth/tagmanager.publish&response_type=code&client_id=456310919448-dj4kvl1us6ct7sjun9pr6p9g9oktv36p.apps.googleusercontent.com&redirect_uri=http://localhost:3000/oauth/google'
}

export const FacebookAuthConfig = {
	AUTH_URL:
		'https://www.facebook.com/v22.0/dialog/oauth?client_id=790890108157348&redirect_uri=http://localhost:3000/oauth/facebook&scope=ads_management,ads_read,email&response_type=token'
}

export const BingAuthConfig = {
	AUTH_URL:
		'https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=64977a0a-83f0-4fff-ac63-1b0e18c4aad5&scope=openid%20profile%20https://ads.microsoft.com/msads.manage%20offline_access&response_type=code&redirect_uri=http://localhost:3000/oauth/bing&prompt=login'
}

export const StripeConfig = {
	publicKey: 'pk_test_niklGZPmPAGbafh6tnHkKVB6'
}

export const Auth0Config = {
	domain: 'dev-lsbg5leb.us.auth0.com',
	client_id: 'lPgAOCvlK9et7xn3ZyYCoFjYXPqNxbfX',
	audience: 'ApiClickGuardDev',
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
