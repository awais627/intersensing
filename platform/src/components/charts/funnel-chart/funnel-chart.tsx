import { FunnelChartProps } from './types'
import { ResponsiveFunnel } from '@nivo/funnel'
import { color } from 'utils/colors'
import { useThemeStore } from 'layout/navbar/store'

export const FunnelChart = ({ data }: FunnelChartProps) => {
	const { theme } = useThemeStore()

	return (
		<div className="h-[300px]">
			<ResponsiveFunnel
				data={data}
				margin={{ top: 10, right: 0, bottom: 0, left: 0 }}
				direction="horizontal"
				shapeBlending={0.5}
				valueFormat="=-,.1d"
				colors={[color('primary'), color('purple'), color('green')]}
				borderWidth={5}
				borderColor={{ from: 'color', modifiers: [] }}
				labelColor={theme === 'dark' ? '#000' : '#fff'}
				beforeSeparatorLength={20}
				beforeSeparatorOffset={10}
				afterSeparatorLength={20}
				afterSeparatorOffset={10}
				currentBorderWidth={10}
				tooltip={({ part }) => (
					<div className="border rounded bg-white shadow-sm p-1 flex space-x-1 items-center text-xs">
						<span>{part.data.id}</span>:
						<span className="font-semibold">
							{Number(part.data.value).toLocaleString()}
						</span>
					</div>
				)}
				theme={{
					labels: {
						text: { fontWeight: 'bold' }
					},
					grid: {
						line: {
							stroke: 'var(--color-gray-500)',
							strokeWidth: 0.5
						}
					}
				}}
			/>
		</div>
	)
}
