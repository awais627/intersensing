export const getStatBarData = (data?: any) => {
	if (!data) return
	const values = data.reduce(
		(r: any, i: any) => {
			let key = i.number
			if (key >= 10) key = '10+'
			r[key] += i.count
			return r
		},
		{ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, '10+': 0 }
	)
	return Object.keys(values)
		.reverse()
		.map((k) => {
			return {
				number: k,
				count: values[k]
			}
		})
}
