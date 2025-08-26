import {
	AccountSetupInfoDTO,
	DiscountInfoDTO,
	ProductAccountDTO
} from 'api-models'
import _ from 'lodash'
import { currencySymbols } from './currency'

export function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(' ')
}

export function toQuery(data: any) {
	for (const key in data) {
		const value = `${data[key]}`
		if (Object.prototype.hasOwnProperty.call(data, key)) {
			if (!value || value === '' || value === 'null' || value === 'undefined') {
				delete data[key]
			}
		}
	}
	const params = new URLSearchParams(data)
	return params.toString()
}

export const getPermissionTier = (value?: string) => {
	if (!value) return null
	if (['custom_pro'].includes(value)) return 'pro'
	if (['custom_lite'].includes(value)) return 'lite'
	if (['custom_standard'].includes(value)) return 'standard'
	return value
}

export const getCurrencySymbol = (currency: string | null = 'usd'): string => {
	const symbols: { [key: string]: string } = {
		usd: '$',
		eur: '€',
		gbp: '£',
		aud: 'A$',
		cad: 'C$'
	}

	return currency
		? symbols[currency.toLowerCase()] || currency.toUpperCase()
		: '$'
}

export const formatCurrency = (
	value?: number,
	accuracy: 'cent' | 'dollar' = 'cent',
	currency: string | null = 'usd'
) => {
	if (value === 0) return `${getCurrencySymbol(currency)}0`
	if (!value) return 'Free'
	const moneyValue = accuracy === 'dollar' ? value : value / 100
	return `${getCurrencySymbol(currency)}${Math.floor(moneyValue).toLocaleString(
		undefined,
		{
			minimumFractionDigits: 2,
			maximumFractionDigits: 2
		}
	)}`
}

export const formatCurrencyDiscount = (
	value?: number,
	discount?: { amountOff?: number | null; percentOff?: number | null },
	currency: string | null = 'usd'
) => {
	if (!value) return 'Free'
	if (discount?.amountOff) value = value - discount.amountOff
	if (discount?.percentOff) value = value - value * (discount.percentOff / 100)
	return `${getCurrencySymbol(currency)}${(value / 100).toLocaleString(
		undefined,
		{
			minimumFractionDigits: 2
		}
	)}`
}

export const toFixedWithoutZeros = (num: number, precision: number) =>
	num.toFixed(precision).replace(/\.0+$/, '')

export const formatNumberAbbreviation = (
	value: number,
	decimalFormat = false,
	fraction = 2
) => {
	if (isNaN(value) || !value) {
		return '0'
	}
	const suffixes = ['', 'K', 'M', 'B', 'T']
	const index = Math.floor(Math.log10(value) / 3)
	const result = value / Math.pow(1000, index)
	return decimalFormat
		? Math.trunc(result) + suffixes[index]
		: toFixedWithoutZeros(Number(result.toFixed(fraction)), fraction) +
				suffixes[index]
}

/**
 *
 * @param value
 * @param format Format amount to 200,00 --> 200K
 * @param decimalValues Format amount to 200,00 --> 200K.00
 */

export const formatSpend = (
	value?: number,
	format = false,
	decimalValues = true
) => {
	if (value === 0) return '$0'
	if (!value) return ''
	if (!decimalValues)
		return `$${formatNumberAbbreviation(Number(value), true).toLocaleString()}`
	if (format)
		return `$${formatNumberAbbreviation(Number(value)).toLocaleString()}`
	return `$${value.toLocaleString()}`
}

export const formatPriceInterval = (interval?: string, count?: number) => {
	if (!interval) return ''
	return count === 1 ? `/ ${interval}` : `/ ${count} ${interval}s`
}

export const formatInterval = (
	interval?: string,
	count?: number,
	discountDuration?: string
) => {
	if (!interval) return ''
	if (discountDuration === 'once') return `For one ${interval}`
	return count === 1 ? `/ ${interval}` : `/ ${count} ${interval}s`
}

export const searchArray = <T>(
	array: T[],
	searchQuery: string,
	paths: string[]
) => {
	const data = [...array]
	return data.filter((item) => {
		let valid = false
		paths.forEach((path) => {
			if (valid) return
			const pathData = _.get(item, path) as string
			valid = pathData?.trim().toLowerCase().includes(searchQuery.toLowerCase())
		})
		return valid
	})
}
export const millisToMinutesAndSeconds = (millis: number) => {
	const minutes = Math.floor(millis / 60000)
	const seconds = Number(((millis % 60000) / 1000).toFixed(0))
	return minutes + ' mins ' + (seconds < 10 ? '0' : '') + seconds + ' secs '
}

export const valuePercentage = (
	current: number,
	reference: number,
	fixed = 2
) => {
	if (reference === 0) return 0
	return Number(((current / reference) * 100).toFixed(fixed))
}

export const changePercentage = (
	current: number,
	previous: number,
	fixed = 2
) => {
	if (previous === 0) return 0
	if (current === previous) return 0
	return Number((((current - previous) / previous) * 100).toFixed(fixed))
}

export const discountText = (discount: DiscountInfoDTO) => {
	const a =
		discount.amount_off && `$${(discount.amount_off / 100).toLocaleString()}`
	const b = discount.percent_off && `${discount.percent_off}%`
	const c = discount.duration === 'once' && 'once'
	const d = discount.duration === 'forever' && 'forever'
	const e = discount.duration === 'repeating' && `for ${discount.months} months`
	return `${a || b} ${c || d || e}`
}

export const planStepText = (planStep?: AccountSetupInfoDTO['step']) => {
	if (planStep === 'link') return 'Ad platform not linked'
	if (planStep === 'account') return 'PPC account not added'
	if (planStep === 'subscription') return 'Pending activation'
}

export const formatDuration = (value: number) => {
	const seconds = Math.floor((value / 1000) % 60)
	const minutes = Math.floor((value / (1000 * 60)) % 60)

	return minutes > 0
		? minutes + 'm '
		: '' + (seconds > 0 ? seconds + 's' : '') || '0s'
}

export const removeFadPrefix = (fadAccountNumber: string) => {
	const regex = /^act_(.*)/
	const match = regex.exec(fadAccountNumber)
	if (match) return match[1]
	return fadAccountNumber
}

export const formatStatsCard = (
	value?: number,
	maxFractionDigits = 0,
	minimumFractionDigits = 0
) => {
	if (value === 0) return '0'
	if (!value) return ''
	return `${value.toLocaleString(undefined, {
		maximumFractionDigits: maxFractionDigits,
		minimumFractionDigits: minimumFractionDigits
	})}`
}

export const formatNumber = (number: number | null) =>
	number
		? `${number.toLocaleString(undefined, { maximumFractionDigits: 0 })}`
		: '0'

export const formatDecimalNumber = (number: number | null) =>
	number ? `${number.toFixed(2).toLocaleString()}` : '0'

export const sanitizeURL = (url: string | undefined) => {
	if (url)
		return url.endsWith('/')
			? url.replace(/http(s)?(:)?(\/\/)?|(\/\/)?(www\.)?/g, '').slice(0, -1)
			: url.replace(/http(s)?(:)?(\/\/)?|(\/\/)?(www\.)?/g, '')
}

export const formatSpendWithCurrency = (value: number, currency = 'USD') => {
	const sign = currencySymbols[currency] || currency
	return `${sign}${formatStatsCard(Number(value), 2, 2)}`
}

export const getPercentage = (value: number, data: any) => {
	const total = data.reduce((acc: number, item: any) => acc + item.value, 0)
	if (total === 0) return 0
	return ((value / total) * 100).toFixed(2)
}

export const isValidUrl = (urlString: string) => {
	const urlPattern = new RegExp(
		'^(https?:\\/\\/)?' + // validate protocol
			'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
			'((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
			'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
			'(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
			'(\\#[-a-z\\d_]*)?$',
		'i'
	) // validate fragment locator
	return urlPattern.test(urlString)
}

export const setItemsToLocalStorage = (
	data: { key: string; value: string }[]
) => {
	data.map(({ value, key }) => {
		window.localStorage.setItem(key, value)
	})
}

export const getFromLocalStorage = (key: string) => {
	return window.localStorage.getItem(key)
}

export const removeFromLocalStorage = (keys: string[]) => {
	keys.map((key) => {
		window.localStorage.removeItem(key)
	})
}

export const getPotentialMRR = (planPrice: number, interval: string) => {
	if (!planPrice) return 0
	const price = interval === 'month' ? planPrice : planPrice / 12
	return price
}

export const potentialMRR = (pipeline: any) => {
	return formatCurrency(
		pipeline &&
			pipeline.reduce((acc: number, item: ProductAccountDTO) => {
				const price = item.billing?.subscription?.next_plan?.price || 0
				const interval =
					item.billing?.subscription?.next_plan?.interval || 'month'
				return acc + getPotentialMRR(price, interval)
			}, 0)
	)
}

export const potentialLostMRR = (pipeline: any) => {
	return formatCurrency(
		pipeline &&
			pipeline.reduce((acc: number, item: ProductAccountDTO) => {
				const type = item.billing?.subscription?.type
				const price =
					(type === 'TRIAL'
						? item.billing?.subscription?.next_plan?.price
						: item.billing?.subscription?.plan?.price) || 0
				const interval =
					(type === 'TRIAL'
						? item.billing?.subscription?.next_plan?.interval
						: item.billing?.subscription?.plan?.interval) || 'month'
				return acc + getPotentialMRR(price, interval)
			}, 0)
	)
}

export const potentialBreachedMRR = (pipeline: any) => {
	return formatCurrency(
		pipeline &&
			pipeline.reduce((acc: number, item: ProductAccountDTO) => {
				const reported_spend = item.reported_spend || 0
				const planSpend = item.billing?.subscription?.plan?.spend || 0
				const potentialGain = reported_spend * 0.005 - planSpend * 0.005
				return acc + potentialGain
			}, 0),
		'dollar'
	)
}

export const MRRBreakDownByPrice = (pipeline: any) => {
	return Object.values(pipeline || {}).reduce(
		(
			acc: {
				price: number
				users: number
				potentialMRR: number
				interval: string
				interval_count: number
				plan: string
				tier: string
			}[],
			item
		) => {
			const type = (item as ProductAccountDTO).billing?.subscription?.type
			const price =
				(type === 'TRIAL'
					? (item as ProductAccountDTO)?.billing?.subscription?.next_plan?.price
					: (item as ProductAccountDTO)?.billing?.subscription?.plan?.price) ||
				0
			const interval =
				(type === 'TRIAL'
					? (item as ProductAccountDTO)?.billing?.subscription?.next_plan
							?.interval
					: (item as ProductAccountDTO)?.billing?.subscription?.plan
							?.interval) || 'month'
			const interval_count =
				(type === 'TRIAL'
					? (item as ProductAccountDTO)?.billing?.subscription?.next_plan
							?.interval_count
					: (item as ProductAccountDTO)?.billing?.subscription?.plan
							?.interval_count) || 1
			const plan =
				(item as ProductAccountDTO)?.billing?.subscription?.plan?.name ||
				'Unknown'
			const tier =
				(item as ProductAccountDTO)?.billing?.subscription?.plan?.tier || 'none'
			const potentialMRR = getPotentialMRR(price, interval)
			const existingPrice = acc.find((p) => p.price === price)
			if (existingPrice) {
				existingPrice.users += 1
				existingPrice.potentialMRR += potentialMRR
			} else {
				acc.push({
					price,
					users: 1,
					potentialMRR,
					interval,
					interval_count,
					plan,
					tier
				})
			}
			return acc
		},
		[]
	)
}
