import { color } from 'utils/colors'

interface StackedData {
	item: {
		id: string
		value: number
	}
}

export const getStackedData = (data: StackedData[]) => {
	const stack: any = []
	const stackedItem: any = {}
	data.forEach((item: any) => {
		const keys = Object.keys(item)
		keys.forEach(() => {
			stackedItem[item.id] = item.value
		})
	})
	stack.push({ ...stackedItem })
	return stack
}

interface StackedKeys {
	item: {
		key: string
	}
}

export const getStackedKeys = (data: StackedKeys[]) => {
	const keys: string[] = []
	data.forEach((item: any) => {
		const itemKeys = Object.keys(item)
		itemKeys.forEach((key: string) => {
			if (key === 'id') {
				keys.push(item[key])
			}
		})
	})
	return keys
}

interface StackedColors {
	item: {
		key: string
		color: string
		variant?: number
	}
}

export const getStackedColors = (data: StackedColors[]) => {
	const colors: string[] = []
	data.forEach((item: any) => {
		const itemKeys = Object.keys(item)
		itemKeys.forEach((key: string) => {
			if (key === 'color') {
				colors.push(color(item[key], item['variant'] ? item['variant'] : 500))
			}
		})
	})
	return colors
}

export const formatTopCountriesData = (
	data: { count: string | number; id: string; color: string }[] | undefined
) => {
	if (!data || data.length === 0) return { data: [], total: 0 }
	const total = data?.reduce((acc, item) => acc + Number(item.count), 0)
	const sortedData = data
		?.sort((a, b) => Number(b.count) - Number(a.count))
		.filter((item) => item.id !== 'ZZ')

	const unknownCountry = data.find((item) => item.id === 'ZZ')

	if (!sortedData || sortedData.length === 0) return { data: [], total: 0 }
	const top5 = sortedData.slice(0, 5)
	const othersCount =
		sortedData.slice(5).reduce((acc, item) => acc + Number(item.count), 0) +
		Number(unknownCountry?.count || 0)
	if (othersCount > 0) {
		top5.push({
			count: othersCount,
			id: 'Others',
			color: 'red'
		})
	}

	return {
		total,
		data: top5.map((item, index) => ({
			...item,
			value: item.count,
			variant: 700 - index * 100 > 0 ? 700 - index * 100 : 100
		}))
	}
}
