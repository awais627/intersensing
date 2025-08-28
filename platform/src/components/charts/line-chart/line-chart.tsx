import { ResponsiveLine } from '@nivo/line'
import { GLoading } from 'components/basic-blocks'
import moment from 'moment'
import { RiLoader2Line } from 'react-icons/ri'
import { color } from 'utils/colors'
import { LineChartProps } from './types'
import { formatNumberAbbreviation } from '../../../utils'

export const LineChart = ({
	data,
	colors,
	formatter,
	noBottomAxis,
	legend,
	enablePoints = true,
	lineWidth = 3,
	className,
	abbreviate = true
}: LineChartProps) => {
	if (!data) return <GLoading />

	const coloredData = data.map((d: any, i: number) => {
		d.colorName = colors[i]
		return d
	})
	const formattedColors = colors.map((c) => color(c.color, c.shade || 500))

	const theme = {
		grid: {
			line: {
				stroke: 'var(--color-gray-500)',
				strokeWidth: 0.5
			}
		}
	}

	return (
		<div className={`${className} h-[250px]`}>
			<ResponsiveLine
				data={coloredData}
				enableGridX={false}
				margin={{ top: 20, right: 0, bottom: 20, left: 40 }}
				colors={formattedColors}
				curve={'monotoneX'}
				axisLeft={{
					renderTick: (tick) => {
						const value = formatter(tick.value).replace(',', '')
						return (
							<g transform={`translate(${-35},${tick.y - 15})`}>
								<text
									x={1}
									y={2}
									dy={16}
									textAnchor="start"
									fontSize={10}
									fill="var(--color-gray-500)"
								>
									{abbreviate
										? formatNumberAbbreviation(Number(value) || 0, false, 1)
										: value}
								</text>
							</g>
						)
					}
				}}
				xFormat="time:%Y-%m-%d"
				axisBottom={
					noBottomAxis
						? null
						: {
								tickSize: 5,
								tickPadding: 5,
								tickValues: 'every 2 days',
								renderTick: (tick) => {
									const x = tick.x
									const y = tick.y
									return (
										<g transform={`translate(${x},${y})`}>
											<text
												x={1}
												y={1}
												dy={16}
												textAnchor="start"
												fontSize={10}
												fill="var(--color-gray-500)"
											>
												{moment(tick.value).isValid()
													? moment(tick.value).format('MM DD').replace(' ', '.')
													: tick.value}
											</text>
										</g>
									)
								},
								tickRotation: 0
						  }
				}
				legends={legend}
				enableGridY={true}
				enablePointLabel={false}
				enableArea={false}
				areaOpacity={1}
				areaBlendMode="normal"
				pointSize={8}
				lineWidth={lineWidth}
				enablePoints={enablePoints}
				pointBorderWidth={1}
				useMesh={true}
				enableSlices={false}
				theme={theme}
				tooltip={({ point }) => (
					<div className="border rounded bg-white shadow-sm p-1 flex space-x-1 items-center text-xs">
						<RiLoader2Line className="w-5 h-5" style={{ color: point.color }} />
						<span>{moment(Number(point.data.x)).format('MMM Do')}</span>:
						<span className="font-semibold">
							{formatter(Number(point.data.y))} {point.id.split('.')[0]}{' '}
						</span>
					</div>
				)}
			/>
		</div>
	)
}
