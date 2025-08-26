import { RiDonutChartLine, RiFolderChartLine } from 'react-icons/ri'
import { GTransition } from 'components/basic-blocks'
import { NavItem } from 'layout/sidebar/nav-item'

import { Disclosure } from '@headlessui/react'

export const AssetMenu = () => {
	return (
		<GTransition show={true}>
			<div>
				<div>
					<Disclosure as="div" className="pt-4 pl-2" defaultOpen={true}>
						<Disclosure.Button
							className={`group flex w-full items-center justify-between hover:bg-gray-50 ${'bg-gray-100 rounded-md'}`}
						>
							<span className="text-sm/6 font-medium text-white group-aria-[hover]:text-white/80">
								<NavItem
									label="Dashboard"
									to={() => `/dashboard`}
									icon={RiDonutChartLine}
								/>
							</span>
						</Disclosure.Button>
					</Disclosure>
					<div className="pl-2">
						<NavItem
							className="reports-tab"
							label="Reports"
							disabled
							to={() => `/`}
							icon={RiFolderChartLine}
						/>
					</div>
				</div>
			</div>
			<nav className="pt-4 space-y-4"></nav>
		</GTransition>
	)
}
