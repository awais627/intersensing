export const getClickPulseValue = (value: number | null, pulse?: boolean) => {
	if (value === 0 || value === null) {
		return 'N/A'
	}
	if (pulse) {
		return (
			<>
				{Number(value).toFixed(1)}
				<span className="text-[#69707D]"> / 10</span>
			</>
		)
	}

	return Number(value).toFixed(1) + '%'
}

export const getClickPulseColor = (value: number) => {
	if (Number(Number(value).toFixed(1)) <= 3.99) {
		return 'text-red-500'
	}
	if (
		Number(Number(value).toFixed(1)) >= 4 &&
		Number(Number(value).toFixed(1)) <= 5.99
	) {
		return 'text-orange-500'
	}
	if (
		Number(Number(value).toFixed(1)) >= 6 &&
		Number(Number(value).toFixed(1)) <= 7.99
	) {
		return 'text-primary-500'
	}
	if (Number(Number(value).toFixed(1)) >= 8) {
		return 'text-green-500'
	}
}

export const getClickPulseText = (value: number) => {
	if (Number(Number(value).toFixed(1)) <= 3.99) {
		return 'Unhealthy pulse'
	}
	if (
		Number(Number(value).toFixed(1)) >= 4 &&
		Number(Number(value).toFixed(1)) <= 5.99
	) {
		return 'Low quality pulse'
	}
	if (
		Number(Number(value).toFixed(1)) >= 6 &&
		Number(Number(value).toFixed(1)) <= 7.99
	) {
		return 'Decent pulse'
	}
	if (Number(Number(value).toFixed(1)) >= 8) {
		return 'Healthy pulse'
	}
}
