import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

import { Popover } from '@headlessui/react'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { DateRange } from 'react-date-range'

import { RiArrowDownSLine } from 'react-icons/ri'
import { useSearchParams } from 'react-router-dom'
import { color as themeColor } from 'utils/colors'
import { options, ranges } from './constants'
import { GDateRangeProps, Options } from './types'
import { getDateTexts } from './utils'
import { GButton, GTooltip, GTransition } from '../basic-blocks'

export const GDateRange = (props: GDateRangeProps) => {
	const {
		onChange,
		onApply,
		label,
		buttonLabel,
		align = 'left',
		variant,
		color,
		size,
		loading = false,
		demoMode,
		minDate,
		applyFiltersOnMounting = true
	} = props
	const [searchParams, setSearchParams] = useSearchParams()

	const startDate = searchParams.get('from')
		? moment(Number(searchParams.get('from'))).toDate()
		: moment().subtract(30, 'days').startOf('day').toDate()
	const endDate = searchParams.get('to')
		? moment(Number(searchParams.get('to'))).toDate()
		: moment().endOf('day').toDate()

	const dateTexts = getDateTexts(startDate, endDate)
	const [range, setRange] = useState({
		startDate,
		endDate,
		key: 'selection'
	})
	const [value, setValue] = useState(dateTexts.value)
	const internalButtonLabel = dateTexts.label

	useEffect(() => {
		if (!applyFiltersOnMounting) return

		if (onChange) {
			onChange({
				from: startDate,
				to: endDate
			})
		}
		if (onApply) {
			onApply({
				from: startDate,
				to: endDate
			})
		}
	}, [])

	const handlePeriodChange = (option: Options) => {
		setValue(option)

		if (onChange) {
			onChange({
				from: ranges[option].startDate,
				to: ranges[option].endDate
			})
		}

		if (option === 'Custom') {
			return
		}
		setRange(ranges[option])
	}

	const handleSelect = (ranges: any) => {
		const { startDate, endDate, key } = ranges.selection
		handlePeriodChange('Custom')
		if (onChange) {
			onChange({
				from: startDate,
				to: endDate
			})
		}
		setRange({
			startDate: startDate,
			endDate: moment(endDate).endOf('day').toDate(),
			key: key
		})
	}

	const handleApply = () => {
		const { startDate, endDate } = range
		if (onApply) {
			searchParams.set('from', startDate.getTime().toString())
			searchParams.set('to', endDate.getTime().toString())
			setSearchParams(searchParams)
			onApply({
				from: startDate,
				to: endDate
			})
		}
	}

	return (
		<div className="flex">
			<div>
				{label && (
					<div className="block text-sm font-medium text-t-dark">{label}</div>
				)}
				<Popover className="flex relative w-full flex-col z-10">
					{({ open }) => (
						<>
							<Popover.Button as="div" className="w-max">
								<GButton
									variant={variant || 'contained'}
									color={color || 'neutral'}
									size={size || 'md'}
									label={buttonLabel || internalButtonLabel}
									className="text-t-default"
									icon={RiArrowDownSLine}
									iconPlacement="right"
								/>
							</Popover.Button>
							<GTransition show={open}>
								<Popover.Panel
									className={`absolute top-0  ${
										align === 'left' ? 'left-0' : 'right-0'
									}`}
								>
									<div className="rounded-lg shadow-lg overflow-hidden bg-white">
										<div className="flex justify-start">
											<div className="flex flex-col justify-between border-r border border-t-border-lighter rounded-l-lg">
												<div className="relative grid gap-1 px-5 py-2  ">
													<div>
														{options.map((option, index) => (
															<li
																key={index}
																className={`list-none flex items-center cursor-pointer justify-start truncate -mx-5 px-4 py-3 hover:bg-gray-50 ${
																	value === option && 'bg-gray-100'
																} ${option === 'Custom' && 'border-t'}`}
																onClick={() => handlePeriodChange(option)}
															>
																<p className="text-sm font-medium text-t-dark truncate">
																	{option}
																</p>
															</li>
														))}
													</div>
												</div>
											</div>
											<div>
												<DateRange
													ranges={[range]}
													onChange={handleSelect}
													minDate={minDate || new Date('2000-01-01')}
													rangeColors={[themeColor('primary')]}
													className="bg-white"
												/>
												{onApply && (
													<div className="flex justify-end items-center px-4 pb-4">
														<GTooltip
															content={
																demoMode
																	? 'This action is disabled when demo data is displayed'
																	: ''
															}
														>
															<GButton
																disabled={demoMode}
																label="Apply"
																variant="contained"
																color="primary"
																size="sm"
																onClick={() => handleApply()}
																loading={loading}
															/>
														</GTooltip>
													</div>
												)}
											</div>
										</div>
									</div>
								</Popover.Panel>
							</GTransition>
						</>
					)}
				</Popover>
			</div>
			<div className="flex-1"></div>
		</div>
	)
}
