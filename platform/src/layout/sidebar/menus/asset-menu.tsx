import {
	RiAlertLine,
	RiDonutChartLine,
	RiFolderChartLine
} from 'react-icons/ri'
import { GTransition } from 'components/basic-blocks'
import { NavItem } from 'layout/sidebar/nav-item'
import { SiOpentelemetry } from 'react-icons/si'

export const AssetMenu = () => {
	return (
		<GTransition show={true}>
			<div>
				<div>
					<div className="pl-2">
						<NavItem
							label="Dashboard"
							to={() => `/dashboard`}
							icon={RiDonutChartLine}
						/>
						<NavItem
							label="Telemetry"
							to={() => `/telemetry`}
							icon={SiOpentelemetry}
						/>
						<NavItem label="Alerts" to={() => `/alerts`} icon={RiAlertLine} />
					</div>
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
