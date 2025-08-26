import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'
import { useUiStore } from 'store'

export const CollapseSidebar = () => {
	const collapseDesktopSidebar = useUiStore((s) => s.collapseDesktopSidebar)
	const desktopSidebarCollapsed = useUiStore((s) => s.desktopSidebarCollapsed)

	return (
		<div
			className={`flex text-gray-500 text-sm ${
				!desktopSidebarCollapsed ? 'justify-end !important' : 'justify-center'
			}`}
		>
			<button
				onClick={() => {
					collapseDesktopSidebar(!desktopSidebarCollapsed)
				}}
			>
				{!desktopSidebarCollapsed ? (
					<ChevronLeftIcon
						className="h-5 w-5 mr-1 p-1 bg-gray-100 text-t-secondary rounded-full"
						aria-hidden="true"
					/>
				) : (
					<ChevronRightIcon
						className="h-5 w-5 mr-1 p-1 bg-gray-100 text-t-secondary rounded-full"
						aria-hidden="true"
					/>
				)}
			</button>
		</div>
	)
}
