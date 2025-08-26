import { Helmet } from 'react-helmet'

interface titleProps {
	pageName: string
	entityName?: string
}

export const PageTitle = (props: titleProps) => {
	const { pageName, entityName } = props

	const pageTitle = entityName
		? `${pageName} - ${entityName} - Intersensing`
		: `${pageName} - Intersensing`

	return (
		<Helmet>
			<title>{pageTitle}</title>
		</Helmet>
	)
}
