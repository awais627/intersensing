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
export const removeFromLocalStorage = (keys: string[]) => {
	keys.map((key) => {
		window.localStorage.removeItem(key)
	})
}
