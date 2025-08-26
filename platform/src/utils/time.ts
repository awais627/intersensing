import moment from 'moment'

export const formatDuration = (
	value: number,
	type: 'minutes' | 'hours' | 'days' | 'months'
): string => {
	if (type === 'minutes') {
		const formattedValue = Math.floor(
			moment.duration(value, 'seconds').asMinutes()
		)

		if (formattedValue < 1)
			return `${Math.round(moment.duration(value, 'seconds').asSeconds())} sec`

		return `${formattedValue} min`
	}
	if (type === 'hours') {
		const hours = moment.duration(value, 'seconds').asHours()

		if (hours < 1) return formatDuration(value, 'minutes')

		const minutes =
			Math.floor(moment.duration(value, 'seconds').asMinutes()) % 60
		return `${Math.floor(hours)} h ${minutes} min`
	}
	if (type === 'days') {
		const days = moment.duration(value, 'seconds').asDays()

		if (days < 1) return formatDuration(value, 'hours')

		const hours = Math.floor(moment.duration(value, 'seconds').asHours() % 24)
		const normalizedDays = Math.floor(days)
		const daySuffix = normalizedDays === 1 ? 'day' : 'days'

		return `${normalizedDays} ${daySuffix} ${hours} h`
	}
	const months = moment.duration(value, 'seconds').asMonths()

	if (months < 1) return formatDuration(value, 'days')

	const days = Math.floor(moment.duration(value, 'seconds').asDays() % 30)
	const normalizedMonths = Math.floor(months)
	const monthSuffix = normalizedMonths === 1 ? 'month' : 'months'
	const daySuffix = days === 1 ? 'day' : 'days'

	return `${normalizedMonths} ${monthSuffix} ${days} ${daySuffix}`
}

export const convertToGMT = (originalDate: Date | undefined) => {
	if (!originalDate) return null

	const year = originalDate.getFullYear()
	const month = originalDate.getMonth()
	const date = originalDate.getDate()
	const hours = originalDate.getHours()
	const minutes = originalDate.getMinutes()
	const seconds = originalDate.getSeconds()
	const milliseconds = originalDate.getMilliseconds()

	return new Date(
		Date.UTC(year, month, date, hours, minutes, seconds, milliseconds)
	)
}
