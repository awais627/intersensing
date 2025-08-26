import { ResponsiveHeatMap } from '@nivo/heatmap'
import { GLoading } from 'components/basic-blocks'
import { color } from 'utils/colors'

import { HeatmapChartProps } from './types'

const formatXAxisValues = (v: string) => {
	switch (v.toString()) {
		case '4':
			return '4am'
		case '8':
			return '8am'
		case '12':
			return 'noon'
		case '16':
			return '4pm'
		case '20':
			return '8pm'
		case '0':
			return '12am'
		default:
			return ''
	}
}

const formatYAxisValues = (v: string) => {
	switch (v.toString()) {
		case '1':
			return 'S'
		case '2':
			return 'M'
		case '3':
			return 'T'
		case '4':
			return 'W'
		case '5':
			return 'T'
		case '6':
			return 'F'
		case '7':
			return 'S'
		default:
			return v
	}
}

const getWeekDay = (v: string) => {
	switch (v.toString()) {
		case '1':
			return 'Sunday'
		case '2':
			return 'Monday'
		case '3':
			return 'Tuesday'
		case '4':
			return 'Wednesday'
		case '5':
			return 'Thursday'
		case '6':
			return 'Friday'
		case '7':
			return 'Saturday'
		default:
			return v
	}
}

const getHour = (v: number) => {
	if (v === 24) return 12 + 'am'
	if (v === 0) return 12 + 'am'
	if (v === 12) return 12 + 'pm'
	if (v > 12) return v - 12 + 'pm'
	return v + 'am'
}

const getColor = (type: string) => {
	switch (type) {
		case 'clicks':
			return 'blues'
		case 'exclusions':
			return 'purples'
		case 'conversions':
			return 'greens'
		case 'bad':
			return 'reds'
		default:
			return 'reds'
	}
}

export const HeatmapChart = ({
	data,
	type,
	margin = { top: -8, right: 24, bottom: -20, left: 24 },
	isLoading
}: HeatmapChartProps) => {
	if (!data) return <GLoading />
	if (isLoading) return <GLoading />

	const maxValue =
		data.reduce((r: number, i: any) => {
			for (let j = 0; j < i.data.length; j++) {
				if (i.data[j].y > r) r = i.data[j].y
			}
			return r
		}, 0) || 0

	const theme = {
		axis: {
			ticks: {
				text: {
					fill: 'var(--color-legend-100)',
					fontSize: 10
				}
			}
		}
	}

	return (
		<ResponsiveHeatMap
			inactiveOpacity={1}
			data={data}
			hoverTarget={'row'}
			motionConfig={'gentle'}
			emptyColor={color('gray', 200)}
			margin={margin}
			xOuterPadding={0.4}
			yOuterPadding={0.4}
			xInnerPadding={0.4}
			yInnerPadding={-1.8}
			enableLabels={false}
			cellComponent="circle"
			sizeVariation={{
				sizes: [0.7, 0.7]
			}}
			axisTop={{
				format: formatXAxisValues,
				tickSize: 0,
				tickPadding: -35,
				legendOffset: -72
			}}
			axisLeft={{
				format: formatYAxisValues,
				tickSize: 0,
				tickPadding: 5,
				tickRotation: 0,
				legendOffset: -72
			}}
			colors={{
				type: 'sequential',
				scheme: getColor(type),
				minValue: 0,
				maxValue: maxValue
			}}
			theme={theme}
			tooltip={(props: any) => {
				return (
					<div className="border rounded bg-white shadow-sm p-1 flex space-x-1 items-center text-xs">
						<>
							<span className="">
								{getWeekDay(props.cell.id[0])}, {getHour(props.cell.data.x)}-
								{getHour(props.cell.data.x + 1)}:
							</span>
							<span className="font-semibold">
								{data ? Number(props.cell.data.y) + '' : 'No'} {type}
							</span>
						</>
					</div>
				)
			}}
		/>
	)
}
