import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import React from 'react'
import { RiArrowDownSLine, RiCheckLine } from 'react-icons/ri'
import { twMerge } from 'tailwind-merge'

interface AvailableMetricsProps {
	availableMetrics: {
		name: string
		type: string
	}[]
	selectedMetric: {
		name: string
		type: string
	}
	setSelectedMetric: React.Dispatch<React.SetStateAction<any>>
	assetId: string
	page: string
	card: string
}

export const AvailableMetrics = ({
	availableMetrics,
	selectedMetric,
	setSelectedMetric,
	assetId,
	card,
	page
}: AvailableMetricsProps) => {
	const handleClose = (isOpen: boolean) => {
		if (isOpen) return
	}

	return (
		<DropdownMenu.Root onOpenChange={handleClose} modal={false}>
			<DropdownMenu.Trigger className="truncate h-[30px] px-3 font-bold text-base text-t-default bg-white py-1.5 flex items-center rounded border border-gray-200 hover:bg-gray-100 focus:outline-none z-10">
				{selectedMetric.name}
				<RiArrowDownSLine className="self-center w-4 h-4 cursor-pointer ml-2 -mr-1" />
			</DropdownMenu.Trigger>
			<DropdownMenu.Portal>
				<DropdownMenu.Content
					sideOffset={5}
					align="end"
					className="flex flex-col gap-1 bg-white rounded border border-gray-200 p-2 max-h-[530px]"
				>
					{availableMetrics.map((metric, index) => {
						const isSelected = metric.name === selectedMetric.name
						return (
							<DropdownMenu.CheckboxItem
								key={index}
								checked={isSelected}
								onClick={(e) => {
									e.preventDefault()
									setSelectedMetric(availableMetrics[index])
								}}
								className="flex items-center px-2 py-1 cursor-pointer rounded hover:bg-gray-100 focus:outline-none"
							>
								<DropdownMenu.ItemIndicator>
									<RiCheckLine className="h-4 w-4 text-primary-500" />
								</DropdownMenu.ItemIndicator>
								<span
									className={twMerge('truncate', isSelected ? 'ml-3' : 'ml-7')}
								>
									{metric.name}
								</span>
							</DropdownMenu.CheckboxItem>
						)
					})}
				</DropdownMenu.Content>
			</DropdownMenu.Portal>
		</DropdownMenu.Root>
	)
}
