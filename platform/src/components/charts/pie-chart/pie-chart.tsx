import { ResponsivePie } from '@nivo/pie'
import { RiLoader2Line } from 'react-icons/ri'
import { color } from 'utils/colors'
import { formatSpendWithCurrency } from 'utils'
import { formatNumber } from '../../../utils/helpers'

export const PieChart = ({
	data,
	currencyValue,
	className,
	currency,
	totalValue
}: any) => {
	const CenteredMetric = ({ dataWithArc, centerX, centerY }: any) => {
		let total = 0
		dataWithArc.forEach((datum: any) => {
			total += datum?.value as number | 0
		})

		return (
			<>
				<text
					x={centerX}
					y={centerY - 5}
					textAnchor="middle"
					dominantBaseline="central"
					fill="var(--color-text-default)"
					className="text-t-default font-bold text-base"
					style={{
						fontSize: '1.75rem',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center'
					}}
				>
					{totalValue || (currencyValue
						? formatSpendWithCurrency(total, currency)
						: formatNumber(total))}
				</text>
				<text
					x={centerX}
					y={centerY + 20}
					textAnchor="middle"
					dominantBaseline="central"
					fill="var(--color-text-tertiary)"
					className="text-t-tertiary text-sm"
					style={{
						fontSize: '0.75rem'
					}}
				>
					{totalValue ? 'Average' : 'Total'}
				</text>
			</>
		)
	}

	return (
		<div className={`${className && className} h-[272px]`}>
			<ResponsivePie
				data={data}
				margin={{ top: 5, right: 15, bottom: 10, left: 0 }}
				innerRadius={0.8}
				padAngle={1}
				cornerRadius={3}
				enableArcLabels={false}
				enableArcLinkLabels={false}
				animate={true}
				layers={['arcs', 'arcLabels', 'arcLinkLabels', CenteredMetric]}
				tooltip={({ datum }) => (
					<div className="border rounded bg-white shadow-sm p-1 flex space-x-1 items-center text-xs">
						<RiLoader2Line className="w-5 h-5" style={{ color: datum.color }} />
						{datum.id} :{' '}
						{currencyValue ? formatSpendWithCurrency(datum.value) : datum.value}
					</div>
				)}
				colors={(datum) => {
					const data = datum.data as any
					return color(data.color, data.variant ? data.variant : 500)
				}}
			/>
		</div>
	)
}
