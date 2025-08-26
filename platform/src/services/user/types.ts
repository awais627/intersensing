import { AssetDTO, ProductAccountDTO } from 'api-models'

export interface AllAccountsAssets extends ProductAccountDTO {
	assets: AssetDTO[] | null
}

export interface AccountPreferencesOrganizationDto {
	name: string
	sector: string | null
	industry: string | null
	description?: string | null
	beta_testing?: boolean
}

export interface AccountContactOrganizationDto {
	primary_contact?: {
		name: string
		email: string
		phone_number: string | null
	} | null

	billing_contact?: {
		name: string
		email: string
		phone_number: string | null
	} | null

	technical_contact?: {
		name: string
		email: string
		phone_number: string | null
	} | null

	data_protection_officer: {
		name: string
		email: string
		phone_number: string | null
	} | null
}

export interface ICreateAffiliate {
	[key: string]: string | boolean
	first_name: string
	last_name: string
	email: string
	timezone: string
	token: string
	paypal_email: string
	notifications: boolean
}

export interface ICreateAffiliateUser {
	[key: string]: string
	first_name: string
	last_name: string
	email: string
	password: string
	confirm_password: string
}

export interface IUpdateAffiliate {
	first_name: string
	last_name: string
	email: string
	timezone: string
	paypal_email: string
	notifications: boolean
}

export interface ResetPasswordDTO {
	email: string
	code: string
	created_at: Date
	expires_at: Date
	expired: boolean
}
