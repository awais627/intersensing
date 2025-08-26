import { ResponsiveBar } from '@nivo/bar'
import { GLoading } from 'components/basic-blocks'
import { RiCheckboxBlankCircleFill } from 'react-icons/ri'
import { twMerge } from 'tailwind-merge'
import { color } from 'utils/colors'
import { BarChartProps } from './types'

export const BarChart = ({
	data,
	index,
	keys,
	layout = 'vertical',
	stacked = false,
	reversed = false,
	leftPadding = 10,
	tooltip,
	containerClassName,
	barPadding = 0.5,
	hideAxisLeft = true,
	axisBottomFormat,
	circleFill = true
}: BarChartProps) => {
	if (!data) return <GLoading />

	const vertical = layout === 'vertical'

	const theme = {
		axis: {
			ticks: {
				text: {
					fill: 'var(--color-legend-100)',
					fontSize: 10
				}
			}
		},
		grid: {
			line: {
				stroke: 'var(--color-gray-500)',
				strokeWidth: 0.5
			}
		}
	}

	return (
		<div
			className={twMerge(
				vertical ? 'h-[200px]' : 'h-[300px]',
				containerClassName
			)}
		>
			<ResponsiveBar
				data={data}
				margin={{
					top: 0,
					right: 10,
					bottom: vertical ? 20 : -10,
					left: leftPadding
				}}
				indexBy={index}
				layout={layout}
				keys={keys}
				colors={({ data, id }) => {
					return data[`color_${id}`] || data['color'] || color('primary', 400)
				}}
				colorBy="id"
				reverse={reversed}
				groupMode={stacked ? 'stacked' : 'grouped'}
				enableLabel={false}
				padding={barPadding}
				theme={theme}
				axisLeft={
					hideAxisLeft
						? null
						: { ticksPosition: 'after', tickSize: 0, tickPadding: 10 }
				}
				axisBottom={vertical ? { format: axisBottomFormat } : null}
				enableGridX={!vertical}
				enableGridY={vertical}
				tooltip={({ id, data, color }) => (
					<div className="border rounded bg-white shadow-sm p-1 flex space-x-1 items-center text-xs">
						{circleFill && (
							<RiCheckboxBlankCircleFill
								className="w-5 h-5"
								style={{ color: color }}
							/>
						)}
						{tooltip(data, id)}
					</div>
				)}
			/>
		</div>
	)
}
