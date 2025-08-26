import { RiErrorWarningLine } from 'react-icons/ri'

export const EmptyState = () => {
	return (
		<div className="flex flex-col items-center justify-center w-full p-8 text-center">
			<RiErrorWarningLine className="w-8 h-8 text-gray-500" />
			<h3 className="mt-2 text-md font-medium text-gray-700">
				No traffic data
			</h3>
			<p className="mt-1 text-md text-gray-500">
				Select a different time period
			</p>
		</div>
	)
}
