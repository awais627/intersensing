import { ResponsiveBar } from '@nivo/bar'

import { formatCurrency } from 'utils'

import { SimpleBarChartProps, SimpleBarFormat } from './types'

const formatter = (format: SimpleBarFormat) => {
	if (format === 'dollar')
		return (value: number) => `${formatCurrency(Number(value))}`
	if (format === 'percentage') return (value: number) => `${value}%`
}

export const SimpleBarChart = ({
	data,
	keys,
	colors,
	format = 'number',
	tooltip,
	title,
	children
}: SimpleBarChartProps) => {
	return (
		<div className="w-full">
			<div className="mb-4">{title}</div>
			<div className="h-[10px]">
				<ResponsiveBar
					data={data}
					keys={keys}
					indexBy="id"
					groupMode="stacked"
					margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
					layout="horizontal"
					colors={colors}
					enableGridX={false}
					enableGridY={false}
					enableLabel={false}
					borderWidth={0}
					borderRadius={0}
					valueFormat={formatter(format)}
					tooltip={tooltip}
				/>
			</div>
			{children}
		</div>
	)
}
