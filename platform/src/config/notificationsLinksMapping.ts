import { NotificationDTO } from 'api-models'

export const eventLinkGenerator = (notification: NotificationDTO) => {
	const event = notification.type

	if (event === 'CREDIT_CARD_EXPIRES_SOON')
		return `/settings/workspace/${notification.account_id}/billing?tab=methods`
	if (event === 'CREDIT_CARD_EXPIRED')
		return `/settings/workspace/${notification.account_id}/billing?tab=methods`
	if (event === 'ACCOUNT_TRIAL_ENDED')
		return `/settings/workspace/${notification.account_id}/billing?tab=methods`
	if (event === 'SUBSCRIPTION_CANCELLED') return '/workspaces'

	if (!notification.account_id) return '#'

	if (event === 'ACCOUNT_TRIAL_CANCELLED')
		return `/settings/workspace/${notification.account_id}/billing`
	if (event === 'SERVICE_INTERRUPTION_SOON')
		return `/settings/workspace/${notification.account_id}/billing`
	if (event === 'SERVICE_INTERRUPTED')
		return `/settings/workspace/${notification.account_id}/billing`
	if (event === 'SUBSCRIPTION_RENEWED')
		return `/settings/workspace/${notification.account_id}/billing`
	if (event === 'SUBSCRIPTION_CHANGED')
		return `/settings/workspace/${notification.account_id}/billing`
	if (event === 'SUBSCRIPTION_AUTO_UPGRADED')
		return `/settings/workspace/${notification.account_id}/billing`
	if (event === 'PAYMENT_FAILED')
		return `/settings/workspace/${notification.account_id}/billing`
	if (event === 'ACCOUNT_LINK_CREATED')
		return `/settings/workspace/${notification.account_id}/connections`
	if (event === 'ACCOUNT_LINK_LOST_ACCESS')
		return `/settings/workspace/${notification.account_id}/connections`
	if (event === 'TEAM_MEMBER_INVITED')
		return `/settings/workspace/${notification.account_id}/team-access`
	if (event === 'TEAM_MEMBER_ACCEPTED_INVITE')
		return `/settings/workspace/${notification.account_id}/team-access`

	if (!notification.asset_id) return '#'

	if (event === 'WEBSITE_ADDED')
		return `/workspace/${notification.account_id}/asset/${notification.asset_id}`
	if (event === 'WEBSITE_PROTECTION_CHANGED')
		return `/workspace/${notification.account_id}/asset/${notification.asset_id}/protection`
	if (event === 'WEBSITE_TRACKING_CODE_STATUS_CHANGED')
		return `/settings/workspace/${notification.account_id}/asset/${notification.asset_id}/tracking-code`
	if (event === 'REPORT_STARTED')
		return `/workspace/${notification.account_id}/asset/${notification.asset_id}/reports`
	if (event === 'REPORT_FINISHED')
		return `/workspace/${notification.account_id}/asset/${notification.asset_id}/reports/?tab=downloads`

	if (!notification.ad_account_id) return '#'

	if (event === 'PPC_ACCOUNT_CREATED')
		return `/settings/workspace/${notification.account_id}/asset/${notification.asset_id}/ppc-accounts`
	if (event === 'PPC_ACCOUNT_ERROR')
		return `/settings/workspace/${notification.account_id}/asset/${notification.asset_id}/ppc-accounts`
	if (event === 'PPC_ACCOUNT_TRACKING_SETTINGS_CHANGED')
		return `/settings/workspace/${notification.account_id}/asset/${notification.asset_id}/ppc-accounts`
	if (event === 'PPC_ACCOUNT_PROTECTION_SETTINGS_CHANGED')
		return `/settings/workspace/${notification.account_id}/asset/${notification.asset_id}/ppc-accounts`
	if (event === 'PPC_ACCOUNT_STATUS_CHANGED')
		return `/settings/workspace/${notification.account_id}/asset/${notification.asset_id}/ppc-accounts`

	return '#'
}
