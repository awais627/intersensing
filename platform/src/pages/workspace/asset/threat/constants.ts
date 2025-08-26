export const metrics = [
	{
		label: 'Elevated threat level',
		key: 'threatLevel',
		tooltip: '% of clicks with threat level high or medium'
	},
	{
		label: 'Elevated bot probability',
		key: 'botProbability',
		tooltip: '% of clicks with bot probability level high'
	},
	{
		label: 'Low user interaction',
		key: 'userInteraction',
		tooltip: '% of clicks with user interaction level low or none '
	},
	{
		label: 'Datacenter traffic',
		key: 'dataCenter',
		tooltip: '% of clicks that came from datacenter'
	},
	{
		label: 'VPN clicks',
		key: 'vpnClicks',
		tooltip: '% of vpn clicks'
	}
]

export const cardFilterOptions = [
	{ name: 'Bad clicks', type: 'bad' },
	{ name: 'Exclusions', type: 'exclusions' }
]

export const repeatedClicksFilterOptions = [
	{ name: 'IP address', type: 'ip' },
	{ name: 'Device', type: 'device' }
]

export const top10Options = [
	{ name: 'Campaigns', type: 'campaigns' },
	{ name: 'Ad groups/sets', type: 'adGroups' },
	{ name: 'Keywords', type: 'keywords' },
	{ name: 'Placements', type: 'placements' },
	{ name: 'Device types', type: 'deviceTypes' },
	{ name: 'IP types', type: 'ipTypes' },
	{ name: 'Countries', type: 'countries' }
]
