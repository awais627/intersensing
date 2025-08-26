import { UserDTO } from '../../../api-models'

const adminAccessLevel = {
	BASIC: 'BASIC',
	FULL: 'FULL',
	SUPER: 'SUPER'
}

export const AdminAccessTypes = {
	view_users: 'view_users',
	view_workspace: 'view_workspace',
	view_website: 'view_website',
	view_ppc_account: 'view_ppc_account',
	view_legacy_invoice: 'view_legacy_invoice',
	view_cg_staff: 'view_cg_staff',
	view_metrics: 'view_metrics',
	view_offers: 'view_offers',
	impersonate: 'impersonate',
	update_cg_staff: 'update_cg_staff',
	make_offer: 'make_offer',
	delete_offer: 'delete_offer',
	dismiss_offer: 'dismiss_offer',
	make_discount: 'make_discount',
	delete_staff: 'delete_staff',
	invite_cg_staff: 'invite_cg_staff'
}

const AdminPrivileges = [
	'view_users',
	'view_workspace',
	'view_website',
	'view_ppc_account',
	'view_legacy_invoice',
	'view_cg_staff',
	'view_offers',
	'impersonate',
	'update_cg_staff',
	'make_offer',
	'delete_offer',
	'dismiss_offer',
	'make_discount',
	'invite_cg_staff'
]

const MemberPrivileges = [
	'view_users',
	'view_workspace',
	'view_website',
	'view_ppc_account',
	'view_legacy_invoice',
	'impersonate'
]

export const hasAdminAccess = (user: UserDTO | null, access: string) => {
	const adminUser = user?.admin
	if (!adminUser) {
		return false
	}
	if (adminUser.access_level === adminAccessLevel.SUPER) {
		return true
	}
	if (adminUser.access_level === adminAccessLevel.FULL) {
		return AdminPrivileges.includes(access)
	}
	if (adminUser.access_level === adminAccessLevel.BASIC) {
		return MemberPrivileges.includes(access)
	}
}
