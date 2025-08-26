import moment from 'moment'

export const humanizeTime = (value: number): string => {
	const seconds = moment.duration(value).seconds()
	const minutes = moment.duration(value).minutes()
	const hours = Math.trunc(moment.duration(value).asHours())

	// return only the elements that are not 0
	if (hours === 0 && minutes === 0) return `${seconds}s`
	if (hours === 0) return `${minutes}m${seconds}s`
	return `${hours}h${minutes}m${seconds}s`
}
