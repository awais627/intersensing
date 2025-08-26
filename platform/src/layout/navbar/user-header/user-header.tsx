import { UserHeaderDropdown } from './user-header-dropdown'
import { UserHeaderMobile } from './user-header-mobile'
import { removeFromLocalStorage } from 'utils'

export const UserHeader = () => {
	const removeImpersonationId = () => {
		removeFromLocalStorage(['selected_account', 'selected_asset'])
		if (localStorage.getItem('imper_userId')) {
			localStorage.removeItem('imper_userId')
		}
	}

	return (
		<>
			<div className="hidden md:block w-full">
				<UserHeaderDropdown removeImpersonationId={removeImpersonationId} />
			</div>
			<div className="md:hidden">
				<UserHeaderMobile removeImpersonationId={removeImpersonationId} />
			</div>
		</>
	)
}
