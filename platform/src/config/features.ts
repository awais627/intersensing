type Feature = Record<string, number | boolean>

export const features: Record<string, Feature> = {
	asset_add: {
		lite: 1,
		standard: 3,
		pro: Number.MAX_VALUE
	},
	ad_account_add: {
		lite: 1,
		standard: 2,
		pro: Number.MAX_VALUE
	},
	team_member_add: {
		lite: 2,
		standard: 5,
		pro: Number.MAX_VALUE
	},
	dashboard_threat: {
		lite: false,
		standard: true,
		pro: true
	},
	dashboard_performance: {
		lite: false,
		standard: false,
		pro: true
	},
	reports_auto: {
		lite: true,
		standard: true,
		pro: true
	},
	reports_demand: {
		lite: false,
		standard: false,
		pro: true
	},
	blacklist: {
		lite: false,
		standard: true,
		pro: true
	},
	protection_cross_account: {
		lite: false,
		standard: true,
		pro: true
	},
	protection_multitarget: {
		lite: false,
		standard: true,
		pro: true
	},
	protection_iprange: {
		lite: false,
		standard: true,
		pro: true
	},
	protection_bots: {
		lite: false,
		standard: true,
		pro: true
	},
	protection_interaction: {
		lite: false,
		standard: true,
		pro: true
	},
	protection_conversion: {
		lite: false,
		standard: false,
		pro: true
	},
	protection_placements: {
		lite: false,
		standard: false,
		pro: true
	},
	auto_upgrade: {
		lite: false,
		standard: true,
		pro: true
	}
}

export const monthlyReportFeatures: Record<string, Feature> = {
	lite: {
		DOMAIN: true
	},
	custom_lite: {
		DOMAIN: true
	},
	standard: {
		DOMAIN: true,
		CAMPAIGN: true,
		KEYWORD: true,
		PLACEMENT: true
	},
	custom_standard: {
		DOMAIN: true,
		CAMPAIGN: true,
		KEYWORD: true,
		PLACEMENT: true
	},
	pro: {
		DOMAIN: true,
		CAMPAIGN: true,
		KEYWORD: true,
		PLACEMENT: true,
		ENGAGEMENT: true
	},
	legacy: {
		DOMAIN: true,
		CAMPAIGN: true,
		KEYWORD: true,
		PLACEMENT: true
	}
}
