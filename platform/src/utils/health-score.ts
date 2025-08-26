export const getColorByScore = (
	score: number
): 'red' | 'amber' | 'green' | '' => {
	let color: 'red' | 'amber' | 'green' | '' = ''
	if (score !== undefined) {
		if (score >= 85) {
			color = 'green'
		} else if (score >= 70) {
			color = 'amber'
		}
	}
	return color
}

export const getColorByCsatScore = (
	score: string
): 'red' | 'amber' | 'green' | '' => {
	let color: 'red' | 'amber' | 'green' | '' = ''
	if (score === 'good') {
		color = 'green'
	}
	if (score === 'bad') {
		color = 'amber'
	}
	return color
}

export const getHealthScoreColors = (score: number, theme: string) => {
	const color = getColorByScore(score)

	const textColor = () => {
		if (!color) return theme === 'dark' ? 'text-t-default' : 'text-t-secondary'

		return theme === 'dark' ? `text-${color}-400` : `text-${color}-700`
	}
	const bgColor = () => {
		if (!color) return theme === 'dark' ? 'bg-gray-100' : 'bg-gray-50'

		return theme === 'dark' ? 'bg-badge-selected' : `bg-${color}-100`
	}
	return `${bgColor() || ''} ${textColor() || ''}`
}

export const getCsatScoreColors = (score: string, theme: string) => {
	const color = getColorByCsatScore(score)

	const textColor = () => {
		if (!color) return theme === 'dark' ? 'text-t-default' : 'text-t-secondary'

		return theme === 'dark' ? `text-${color}-400` : `text-${color}-700`
	}
	const bgColor = () => {
		if (!color) return theme === 'dark' ? 'bg-gray-100' : 'bg-gray-50'

		return theme === 'dark' ? 'bg-badge-selected' : `bg-${color}-100`
	}
	return `${bgColor() || ''} ${textColor() || ''}`
}
