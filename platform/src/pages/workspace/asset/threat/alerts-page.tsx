import { PageHeader } from 'components/page-header'
import { PageTitle } from 'utils/page-title'
import { AlertsDashboard } from '../../../../components/alerts-dashboard'

export const AlertsPage = () => {
	return (
		<>
			<PageTitle pageName="IoT Alerts Dashboard" />
			<PageHeader
				title={'IoT Alerts'}
				tagline="Real-time monitoring and management of IoT sensor alerts"
			/>

			<div className="max-w-full mx-auto px-6 sm:px-8">
				<AlertsDashboard />
			</div>
		</>
	)
}
