type LineChartColor = {
	color: string
	shade?: number
}

export interface LineChartProps {
	data: any
	colors: LineChartColor[]
	formatter: (value: number) => string
	negative?: boolean
	noBottomAxis?: boolean
	legend?: any
	enablePoints?: boolean
	lineWidth?: number
	className?: string
	abbreviate?: boolean
}
