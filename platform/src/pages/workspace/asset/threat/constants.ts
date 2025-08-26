export const metrics = [
	{
		label: 'Current Temperature',
		key: 'temperature',
		tooltip: 'Current measured temperature (°C)'
	},
	{
		label: 'Current Humidity',
		key: 'humidity',
		tooltip: 'Current measured humidity (%)'
	},
	{
		label: 'Current Pressure',
		key: 'pressure',
		tooltip: 'Current measured atmospheric pressure (hPa)'
	},
	{
		label: 'Air Quality Index',
		key: 'airQualityIndex',
		tooltip: 'Current measured air quality index (AQI)'
	},
	{
		label: 'Ratio',
		key: 'ratio',
		tooltip: 'Calculated ratio value'
	}
]

export const cardFilterOptions = [
	{ name: 'Temperature', type: 'bad' },
	{ name: 'Pressure', type: 'exclusions' }
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
