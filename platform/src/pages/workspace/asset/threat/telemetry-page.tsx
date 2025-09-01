import { PageHeader } from 'components/page-header'
import { PageTitle } from 'utils/page-title'
import { TelemetryDashboard } from '../../../../components'
import { GDateRange } from '../../../../components/g-date-range'
import React from 'react'

export const TelemetryPage = () => {
	const handleDateRangeChange = (e: { from: Date; to: Date }) => {}
	return (
		<>
			<PageTitle pageName="IoT Telemetry Dashboard" />
			<PageHeader
				title={'IoT Telemetry Dashboard'}
				tagline="Real-time monitoring and analysis of IoT sensor data"
				tags={[
					{
						label: 'Alerts'
					}
				]}
				action={
					<div className="w-full pr-4 flex items-center justify-end pb-4">
						<GDateRange
							onApply={(e) => handleDateRangeChange({ from: e.from, to: e.to })}
							align="right"
							demoMode={false}
						/>
					</div>
				}
			/>

			<div className="max-w-full mx-auto px-6 sm:px-8">
				<TelemetryDashboard />
			</div>
		</>
	)
}
