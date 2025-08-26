import { TrackerApiConfig } from './config'

export const trackingScript = (accId: string, assId: string) => {
	return `<script defer type="application/javascript" src="${TrackerApiConfig.API_BASE_URL}/s/${accId}/${assId}"></script>`
}
export const conversionScript = () => {
	return `<script defer type="application/javascript" src="${TrackerApiConfig.API_BASE_URL}/sc"></script>`
}

export const conversionCode = () => {
	return `// simple conversion
CG.conversion()
	`
}

export const conversionCodeWithMessage = () => {
	return `// with message
	CG.conversion('Sample conversion message')
	`
}

export const conversionCodeWithMessageAndValue = () => {
	return `// with message and value 
	CG.conversion('Sample conversion message', 149)
	`
}
