export const setDelay = (milliseconds: number) => {
	return new Promise((resolve) => {
		setTimeout(resolve, milliseconds)
	})
}
