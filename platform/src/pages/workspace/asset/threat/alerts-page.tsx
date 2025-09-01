import { PageHeader } from 'components/page-header'
import { PageTitle } from 'utils/page-title'
import { AlertsDashboard } from '../../../../components/alerts-dashboard'
import { GDateRange } from '../../../../components/g-date-range'
import React from 'react'
import { DemoBreadcrumbs } from '../../../../components/demo-breadcrumbs'

export const AlertsPage = () => {
	const pageActions = (
		<div className="w-full pr-4 flex items-center justify-between pb-4">
			<DemoBreadcrumbs />
			<GDateRange align="right" demoMode={false} />
		</div>
	)
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
				action={pageActions}
			/>

			<div className="max-w-full mx-auto px-6 sm:px-8">
				<AlertsDashboard />
			</div>
		</>
	)
}
