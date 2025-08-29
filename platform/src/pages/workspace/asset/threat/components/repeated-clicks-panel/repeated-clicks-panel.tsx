import { GSection } from 'components/basic-blocks'
import { GNewTooltip } from 'components/basic-blocks/g-tooltip/g-new-tooltip'
import { BarChart } from 'components/charts/bar-chart'
import { RiQuestionLine } from 'react-icons/ri'
import { TopOffendersResponse } from '../../../../../../services/telemetry'

export const RepeatedClicksPanel = ({
	data
}: {
	data: TopOffendersResponse | null
}) => {
	// map API response to chart format
	const repeatedMachines =
		data?.topMachines?.map((machine, index) => ({
			number: machine.machineId || `Machine ${index + 1}`,
			count: machine.total
		})) ?? []

	return (
		<GSection containerClassName="-mb-6" loading={false}>
			<div className="h-full relative">
				<div className="flex items-center justify-between pb-6">
					<div className="text-t-default flex flex-row items-center gap-x-1">
						<span className="font-bold text-xl ">Top Machines Alerts</span>
						<GNewTooltip content="Breakdown of how many alerts each machine generated">
							<RiQuestionLine className="w-3 h-3 text-t-default" />
						</GNewTooltip>
					</div>
				</div>

				<div className="flex flex-col gap-2">
					<div className="mb-4">
						<BarChart
							data={repeatedMachines}
							index="number"
							layout="vertical"
							containerClassName="h-[294px]"
							leftPadding={40}
							barPadding={0.9}
							hideAxisLeft={false}
							keys={['count']}
							tooltip={(d) => (
								<>
									<span>{d.number}: </span>
									<span className="font-semibold">
										{Number(d.count).toLocaleString()} Alerts
									</span>
								</>
							)}
						/>
					</div>
				</div>
				<span className="text-sm absolute right-0 bottom-[12px]">Machines</span>
			</div>
		</GSection>
	)
}
