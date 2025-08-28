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
	{ name: 'Temperature', type: 'temperature' },
	{ name: 'Pressure', type: 'pressure' },
	{ name: 'Humidity', type: 'humidity' }
]

export const alertFilterOptions = [
	{ name: 'Critical', type: 'critical' },
	{ name: 'High', type: 'high' },
	{ name: 'Medium', type: 'medium' },
	{ name: 'Low', type: 'low' },
	{ name: 'Warning', type: 'warning' },
	{ name: 'Resolved', type: 'resolved' }
]

export const alertTypeFilterOptions = [
	{ name: 'All Types', type: 'all' },
	{ name: 'Temperature', type: 'Temperature' },
	{ name: 'Humidity', type: 'Humidity' },
	{ name: 'Pressure', type: 'Pressure' },
	{ name: 'Air Quality', type: 'eCO2' },
	{ name: 'TVOC', type: 'TVOC' },
	{ name: 'PM1.0', type: 'PM1.0' },
	{ name: 'PM2.5', type: 'PM2.5' }
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
