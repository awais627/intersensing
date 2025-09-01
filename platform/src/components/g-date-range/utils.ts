import moment from 'moment'
import { ranges } from './constants'

export const getDateTexts = (from: Date, to: Date) => {
	if (isLast30Days(from, to))
		return { value: 'Last 30 days', label: 'Last 30 days' }
	if (isLast7Days(from, to))
		return { value: 'Last 7 days', label: 'Last 7 days' }
	if (isThisWeek(from, to)) return { value: 'This week', label: 'This week' }
	if (isLastWeek(from, to)) return { value: 'Last week', label: 'Last week' }
	if (isLastMonth(from, to)) return { value: 'Last month', label: 'Last month' }

	return {
		value: 'Custom',
		label: `${moment(from).format('LL')} - ${moment(to).format('LL')}`
	}
}

const isLast30Days = (from: Date, to: Date) => {
	const startDate = ranges['Last 30 days'].startDate
	const endDate = ranges['Last 30 days'].endDate

	return moment(from).isSame(startDate) && moment(to).isSame(endDate)
}

const isLast7Days = (from: Date, to: Date) => {
	const startDate = ranges['Last 7 days'].startDate
	const endDate = ranges['Last 7 days'].endDate

	return moment(from).isSame(startDate) && moment(to).isSame(endDate)
}

const isThisWeek = (from: Date, to: Date) => {
	const startDate = ranges['This week'].startDate
	const endDate = ranges['This week'].endDate

	return moment(from).isSame(startDate) && moment(to).isSame(endDate)
}

const isLastWeek = (from: Date, to: Date) => {
	const startDate = ranges['Last week'].startDate
	const endDate = ranges['Last week'].endDate

	return moment(from).isSame(startDate) && moment(to).isSame(endDate)
}

const isLastMonth = (from: Date, to: Date) => {
	const startDate = ranges['Last month'].startDate
	const endDate = ranges['Last month'].endDate

	return moment(from).isSame(startDate) && moment(to).isSame(endDate)
}
