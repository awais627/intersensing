import { PageHeader } from 'components/page-header'
import { PageTitle } from 'utils/page-title'
import { ThreatPageView } from './view'

export const ThreatPage = () => {
	return (
		<>
			<PageTitle pageName="Threat" />
			<PageHeader
				title={'Threat'}
				tagline="Insight and analysis about threat and fraudulent activities for"
			/>

			<div className="max-w-full mx-auto px-6 sm:px-8">
				<ThreatPageView />
			</div>
		</>
	)
}
