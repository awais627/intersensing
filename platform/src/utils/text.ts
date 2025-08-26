export const capitalizeFirstLetter = (string: string) => {
	return `${string.charAt(0).toLocaleUpperCase()}${string
		.slice(1)
		.toLocaleLowerCase()}`
}

export const capitalizeFirstLetterFromArray = (data: string[]) => {
	return data.map((v) => capitalizeFirstLetter(v))
}

export const truncateString = (value: string, width: number) => {
	if (value.length > width) {
		return value.substring(0, width) + '...'
	} else {
		return value
	}
}
