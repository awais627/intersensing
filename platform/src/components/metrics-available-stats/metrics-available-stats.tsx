import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { useState } from 'react'
import { RiCheckLine, RiCodeLine, RiSearchLine } from 'react-icons/ri'
import { MetricsAvailableStatsProps } from './types'

export const MetricsAvailableStats = ({
	availableMetrics,
	selectedStats,
	selectedStat,
	setSelectedStats,
	assetId,
	page
}: MetricsAvailableStatsProps) => {
	const [filterInput, setFilterInput] = useState('')

	const filteredAvailableMetrics = filterInput
		? availableMetrics.filter(
				(c) =>
					typeof c.label === 'string' &&
					c.label.toLowerCase().includes(filterInput.toLowerCase())
		  )
		: availableMetrics

	const handleClose = (isOpen: boolean) => {
		if (isOpen) return

		const metrics = Array.from(selectedStats)
	}

	const handleSelectStat = (stat: string) => {
		let newStats: string[]

		if (selectedStats.has(stat)) {
			const array = Array.from(selectedStats)
			const statIndex = array.indexOf(stat)
			const selectedStatIndex = array.indexOf(selectedStat)
			array[statIndex] = selectedStat
			array[selectedStatIndex] = stat
			newStats = array
		} else {
			newStats = Array.from(selectedStats).map((s: string) => {
				if (s === selectedStat) return stat
				return s
			})
		}

		setSelectedStats(new Set(newStats))
	}

	return (
		<DropdownMenu.Root onOpenChange={handleClose} modal={false}>
			<DropdownMenu.Trigger className="font-bold text-t-default bg-white py-1.5 px-3 flex items-center rounded hover:bg-gray-100 focus:outline-none">
				<RiCodeLine className="self-center w-2.5 h-2.5 text-t-default rotate-90 cursor-pointer" />
			</DropdownMenu.Trigger>
			<DropdownMenu.Portal>
				<DropdownMenu.Content
					sideOffset={5}
					align="end"
					className="flex flex-col gap-1 bg-white rounded border border-gray-200 p-2 max-h-[530px] overflow-scroll"
				>
					<div className="flex items-center border-b px-2 mb-2">
						<RiSearchLine className="h-4 w-4 text-t-secondary" />
						<input
							type="text"
							value={filterInput}
							placeholder="Metric..."
							onChange={(e) => {
								setFilterInput(e.target.value)
							}}
							className="h-10 bg-transparent w-full outline-none text-sm focus:ring-0 border-none text-t-secondary"
						/>
					</div>
					{filteredAvailableMetrics.map((metric) => {
						const isSelected = selectedStats.has(metric.key)
						return (
							<DropdownMenu.CheckboxItem
								key={metric.key}
								checked={isSelected}
								onClick={(e) => {
									e.preventDefault()
									handleSelectStat(metric.key)
								}}
								className="flex items-center px-2 py-1 cursor-pointer rounded hover:bg-gray-100 focus:outline-none"
							>
								<DropdownMenu.ItemIndicator>
									<RiCheckLine className="h-4 w-4 text-primary-500" />
								</DropdownMenu.ItemIndicator>
								<span className={isSelected ? 'ml-3' : 'ml-7'}>
									{metric.label}
								</span>
							</DropdownMenu.CheckboxItem>
						)
					})}
				</DropdownMenu.Content>
			</DropdownMenu.Portal>
		</DropdownMenu.Root>
	)
}
