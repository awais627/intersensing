import { UserDTO } from '../../../api-models'

export const getAccountBadgeColorByStatus = (
	status: 'ACTIVE' | 'INACTIVE' | 'SETUP' | 'DELETED',
	type: 'TRIAL' | 'STANDARD' | 'METERED' | 'WIRE' | undefined
) => {
	return status === 'INACTIVE'
		? 'red'
		: status === 'SETUP'
		? 'gray'
		: type === 'TRIAL'
		? 'primary'
		: status === 'ACTIVE'
		? 'green'
		: 'gray'
}

export const getUserWorkspaceCount = (user: UserDTO) => {
	return Object.values(user.workspace_status || {})
		.filter((status) => status !== 'DELETED')
		.reduce((a, b) => a + b, 0)
}

export const isNoClickGuardAffiliate = (user: UserDTO | null) => {
	return (
		user?.roles && user?.roles?.length === 1 && user.roles[0] === 'AFFILIATE'
	)
}
