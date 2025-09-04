import { PageHeader } from 'components/page-header'
import { PageTitle } from 'utils/page-title'
import { TelemetryDashboard } from '../../../../components'
import { GDateRange } from '../../../../components/g-date-range'
import React, { useEffect } from 'react'
import { DemoBreadcrumbs } from '../../../../components/demo-breadcrumbs'
import { useTelemetry } from '../../../../hooks/useTelemetry'
import { useAISuggestions } from '../../../../contexts/ai-suggestions-context'

export const TelemetryPage = () => {
	const { latestData } = useTelemetry()
	const { setTelemetryData } = useAISuggestions()

	// Update AI suggestions with latest telemetry data
	useEffect(() => {
		if (latestData) {
			setTelemetryData(latestData)
		}
	}, [latestData, setTelemetryData])

	const pageActions = (
		<div className="w-full pr-4 flex items-center justify-between pb-4">
			<DemoBreadcrumbs />
			<GDateRange
				onApply={(e) => handleDateRangeChange({ from: e.from, to: e.to })}
				align="right"
				demoMode={false}
			/>
		</div>
	)
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
				action={pageActions}
			/>

			<div className="max-w-full mx-auto px-6 sm:px-8">
				<TelemetryDashboard />
			</div>
		</>
	)
}
