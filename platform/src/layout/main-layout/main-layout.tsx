import { Navbar } from 'layout/navbar'
import { Sidebar } from 'layout/sidebar'
import { ReactNode } from 'react'
import { useUiStore } from 'store'

export const MainLayout = (props: { children: ReactNode }) => {
	const { children } = props
	const desktopSidebarCollapsed = useUiStore(
		(state) => state.desktopSidebarCollapsed
	)

	return (
		<div>
			<div>
				<div className="flex min-h-[calc(100vh-72px)] ">
					<Navbar />
					<Sidebar />
					<main
						className={`flex-1 overflow-hidden pt-[4.5rem] pb-16 ${
							desktopSidebarCollapsed ? 'md:ml-20' : 'md:ml-[200px]'
						}`}
					>
						{children}
					</main>
				</div>
			</div>
		</div>
	)
}
