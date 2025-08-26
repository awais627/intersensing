import { classNames } from '../../utils'
import { GBadge } from '../basic-blocks/g-badge'
import { GoArrowDownRight, GoArrowUpRight } from 'react-icons/go'

export const PercentageBadge = ({ change }: { change: number }) => {
	return (
		<div
			className={classNames(
				change < 0 ? 'text-red-500' : 'text-green-500',
				'ml-2 flex items-baseline text-sm'
			)}
		>
			{change < 0 ? (
				<GBadge
					text={
						<>
							<GoArrowDownRight
								className="self-center flex-shrink-0 h-3 w-5 text-red-500"
								aria-hidden="true"
							/>
							<span>{change?.toFixed(1) || 0}%</span>
						</>
					}
					color="red"
				/>
			) : (
				<GBadge
					text={
						<>
							<GoArrowUpRight
								className="self-center flex-shrink-0 h-3 w-5 text-green-500"
								aria-hidden="true"
							/>
							<span>{change?.toFixed(1) || 0}%</span>
						</>
					}
					color="green"
				/>
			)}
		</div>
	)
}
