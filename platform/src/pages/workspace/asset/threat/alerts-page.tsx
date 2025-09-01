import { PageHeader } from 'components/page-header'
import { PageTitle } from 'utils/page-title'
import { AlertsDashboard } from '../../../../components/alerts-dashboard'
import { GDateRange } from '../../../../components/g-date-range'
import React from 'react'

export const AlertsPage = () => {
	return (
		<>
			<PageTitle pageName="IoT Alerts Dashboard" />
			<PageHeader
				title={'IoT Alerts'}
				tagline="Real-time monitoring and management of IoT sensor alerts"
				tags={[
					{
						label: 'Alerts'
					}
				]}
				action={
					<div className="w-full pr-4 flex items-center justify-end pb-4">
						<GDateRange align="right" demoMode={false} />
					</div>
				}
			/>

			<div className="max-w-full mx-auto px-6 sm:px-8">
				<AlertsDashboard />
			</div>
		</>
	)
}
