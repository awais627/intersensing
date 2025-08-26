import { MapChartProps } from './types'
import { RiCheckboxBlankCircleFill } from 'react-icons/ri'
import { ResponsiveChoropleth } from '@nivo/geo'
import { color } from 'utils/colors'

import mapFeatures from './map-features.json'
import { GLoading } from 'components/basic-blocks'

export const MapChart = ({
	data,
	tooltip,
	type,
	noLegend = false,
	scale = 75,
	translation = [0.5, 0.7],
	height = '300',
	legendTranslate = [0, 0],
	symbolShape = 'square'
}: MapChartProps) => {
	if (!data) return <GLoading />

	const maxValue =
		data.reduce((r: number, i: any) => {
			if (i.count > r) r = i.count
			return r
		}, 0) || 0

	const getColors = (type: string) => {
		switch (type) {
			case 'clicks':
			case 'goodClicks':
				return [
					color('primary', 100),
					color('primary', 200),
					color('primary', 300),
					color('primary', 500),
					color('primary', 700),
					color('primary', 900)
				]
			case 'susClicks':
			case 'exclusions':
				return [
					color('purple', 100),
					color('purple', 200),
					color('purple', 300),
					color('purple', 400),
					color('purple', 500),
					color('purple', 600)
				]
			case 'totalClicks':
			case 'conversions':
				return [
					color('green', 100),
					color('green', 200),
					color('green', 300),
					color('green', 400),
					color('green', 500),
					color('green', 600)
				]
			case 'badClicks':
			case 'bad':
				return [
					color('red', 100),
					color('red', 300),
					color('red', 400),
					color('red', 500),
					color('red', 600),
					color('red', 700)
				]
			default:
				return [
					color('red', 100),
					color('red', 300),
					color('red', 400),
					color('red', 500),
					color('red', 600),
					color('red', 700)
				]
		}
	}

	return (
		<div style={{ height: `${height}px` }}>
			<ResponsiveChoropleth
				data={data}
				features={mapFeatures.features}
				margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
				unknownColor={'var(--color-gray-100)'}
				colors={
					type
						? getColors(type)
						: [
								color('red', 100),
								color('red', 300),
								color('red', 400),
								color('red', 500),
								color('red', 600),
								color('red', 700)
						  ]
				}
				isInteractive
				label="properties.name"
				value="count"
				projectionScale={scale}
				projectionTranslation={translation}
				valueFormat=".2s"
				borderWidth={0.5}
				borderColor={color('gray', 500)}
				domain={[0, maxValue < 100 ? 100 : maxValue]}
				legends={
					noLegend
						? []
						: [
								{
									anchor: 'bottom-left',
									direction: 'column',
									justify: true,
									symbolShape: symbolShape as any,
									translateX: legendTranslate[0],
									translateY: legendTranslate[1],
									itemsSpacing: 0,
									itemWidth: 94,
									itemHeight: 18,
									itemDirection: 'left-to-right',
									itemTextColor: 'var(--color-legend-100)',
									itemOpacity: 0.85,
									symbolSize: 18,
									effects: [
										{
											on: 'hover',
											style: {
												itemTextColor: 'var(--color-legend-100)',
												itemOpacity: 1
											}
										}
									]
								}
						  ]
				}
				tooltip={({ feature }) => {
					const properties = (feature as any).properties
					return (
						<div className="border rounded bg-white shadow-sm p-1 flex space-x-1 items-center text-xs">
							<RiCheckboxBlankCircleFill
								className="w-5 h-5"
								style={{ color: feature.color || color('gray', 200) }}
							/>
							{tooltip(feature.data, feature.label || properties.admin)}
						</div>
					)
				}}
			/>
		</div>
	)
}
