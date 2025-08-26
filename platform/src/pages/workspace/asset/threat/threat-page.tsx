import { PageHeader } from 'components/page-header'
import { PageTitle } from 'utils/page-title'
import { ThreatPageView } from './view'

export const ThreatPage = () => {
	return (
		<>
			<PageTitle pageName="IoT Telemetry Dashboard" />
			<PageHeader
				title={'IoT Telemetry Dashboard'}
				tagline="Real-time monitoring and analysis of IoT sensor data"
			/>

			<div className="max-w-full mx-auto px-6 sm:px-8">
				<ThreatPageView />
			</div>
		</>
	)
}
