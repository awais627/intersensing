import { Fragment, useMemo, useState } from 'react'
import { GSection, GTooltip } from 'components/basic-blocks'
import { PieChart } from 'components/charts/pie-chart'
import { MapChart } from 'components/charts/map-chart'
import { EmptyState } from 'components/empty-state/empty-state'
import { RiQuestionLine } from 'react-icons/ri'
import { classNames, getPercentage } from 'utils'
import { color } from 'utils/colors'
import { CountriesObject } from 'config/countries'
import { formatTopCountriesData } from 'utils/chart'

export const SourceMapCard = () => {
	const [type, setType] = useState<'map' | 'chart'>('map')

	// 🔹 Hardcoded dataset
	const sourceMapType = { name: 'Exclusions', type: 'exclusions' }
	const hardcodedData = [
		{ country: 'US', count: 120 },
		{ country: 'PK', count: 80 },
		{ country: 'IN', count: 60 },
		{ country: 'DE', count: 40 },
		{ country: 'FR', count: 20 }
	]

	const getColor = (type: string) => {
		switch (type) {
			case 'exclusions':
				return 'purple'
			case 'bad':
				return 'red'
			default:
				return 'primary'
		}
	}

	const sourceMapFormattedData =
		hardcodedData.map((i) => ({
			count: i.count,
			id: i.country,
			color: getColor(sourceMapType.type)
		})) || []

	const mapData = hardcodedData.map((i) => ({
		...i,
		id: i.country
	}))

	const { data: countryData, total } = useMemo(
		() => formatTopCountriesData(sourceMapFormattedData),
		[sourceMapFormattedData]
	)

	return (
		<GSection containerClassName="border border-card-border h-full -mb-6">
			<div className="w-full flex flex-col bg-white text-sm rounded-md">
				<div className="flex items-center justify-between">
					<div className="flex items-center">
						<span className="text-lg font-bold mr-2">Threat origins</span>
						<GTooltip content={'Trends of clicks and exclusions on your ads'}>
							<RiQuestionLine className="w-3.5 h-3.5 text-t-dark" />
						</GTooltip>
					</div>
					<div className="flex items-center ml-4">
						<div
							className={classNames(
								'border border-t-border-light text-default font-bold text-md py-2 px-4 cursor-pointer rounded-l',
								type === 'map'
									? 'bg-gray-100 text-primary-500'
									: 'bg-card-background text-t-default'
							)}
							onClick={() => setType('map')}
						>
							Map
						</div>
						<div
							className={classNames(
								'border border-t-border-light text-default font-bold text-md py-2 px-4 cursor-pointer rounded-r',
								type === 'chart'
									? 'bg-gray-100 text-primary-500'
									: 'bg-card-background text-t-default'
							)}
							onClick={() => setType('chart')}
						>
							Chart
						</div>
					</div>
				</div>

				<Fragment>
					{type === 'map' ? (
						<div className="h-[300px] pt-6">
							{mapData.length > 0 ? (
								<MapChart
									symbolShape="circle"
									type={sourceMapType.type}
									label="Source map"
									data={mapData}
									tooltip={(data, id) => (
										<>
											<span>{id}:</span>
											<span className="font-semibold">
												{data ? Number(data.count) : 'No'} {sourceMapType.type}
											</span>
										</>
									)}
								/>
							) : (
								<div className="flex items-center justify-center h-full w-full">
									<EmptyState />
								</div>
							)}
						</div>
					) : (
						<div className="h-full flex items-center justify-center gap-6 mt-4">
							<div className="flex justify-center items-center mr-2">
								<PieChart
									className="h-[250px] w-[300px]"
									data={countryData}
									totalValue={total}
								/>
							</div>
							<div className="w-max ml-2 h-[250px]">
								{countryData.map((item, index) => (
									<Fragment key={index}>
										<div className="flex items-start mb-2">
											<div
												className="w-3 h-3 rounded-full"
												style={{
													background: color(
														item.color,
														item.variant ? item.variant : 700 - index * 100
													)
												}}
											></div>
											<div className="ml-3">
												<p className="text-t-default">
													{CountriesObject[item.id] || item.id}
												</p>
												<div className="font-bold">
													{item.value}{' '}
													<span>
														({getPercentage(Number(item.value), total)}%)
													</span>
												</div>
											</div>
										</div>
									</Fragment>
								))}
							</div>
						</div>
					)}
				</Fragment>
			</div>
		</GSection>
	)
}
