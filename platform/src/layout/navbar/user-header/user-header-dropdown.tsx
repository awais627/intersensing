import { GDropdown } from 'components/basic-blocks/g-dropdown-menu'
import { useNavigate } from 'react-router-dom'
import { MenuLink } from '../menu-link'
import { removeFromLocalStorage } from '../../../utils'

export const UserHeaderDropdown = (props: {
	removeImpersonationId: () => void
}) => {
	const { removeImpersonationId } = props

	return (
		<GDropdown position="top" menuButton={<MenuButton />}>
			{(close?: () => void) => (
				<UserMenuContent
					close={close}
					removeImpersonationId={removeImpersonationId}
				/>
			)}
		</GDropdown>
	)
}

const UserMenuContent = (props: {
	close?: () => void
	removeImpersonationId: () => void
}) => {
	const navigate = useNavigate()

	return (
		<div
			className={
				'ml-6 -mb-8  border w-60 px-2 whitespace-nowrap text-ellipsis rounded-md shadow-lg bg-card-background ring-opacity-5 divide-y divide-gray-100 '
			}
		>
			<div className="py-1">
				<div className="flex items-center space-x-2 px-2 pt-4 pb-2">
					<div className="text-left flex-col flex-1 hidden md:block">
						<p className="text-sm font-bold text-t-heading w-32 truncate">
							Awais
						</p>
						<p className="text-sm text-t-secondary w-32 truncate">Awid meial</p>
					</div>
				</div>
				<>
					<MenuLink
						label={
							<div className="flex gap-2 items-center">
								<>
									<span>Offers</span>
								</>
							</div>
						}
						to={() => 'settings/user/offers'}
						onClickWithNavigation={close}
					/>

					<MenuLink
						label="Profile"
						to={() => '/settings/user/profile'}
						onClickWithNavigation={close}
					/>
					<MenuLink
						label="Notifications"
						to={() => '/settings/user/notification'}
						onClickWithNavigation={close}
					/>
					<MenuLink
						label="Security"
						to={() => '/settings/user/security'}
						onClickWithNavigation={close}
					/>
				</>
			</div>

			<div className="py-1">
				<MenuLink
					label="Logout"
					to={() => '#'}
					onClickWithoutNavigation={() => {
						removeFromLocalStorage(['selected_account', 'selected_asset'])
					}}
				/>
			</div>
		</div>
	)
}

const MenuButton = () => {
	return (
		<div className="flex max-w-full items-center cursor-pointer px-2 py-2 rounded-md  space-x-2 hover:bg-gray-50">
			<div className="w-8 h-8 flex items-center justify-center rounded-md "></div>
			Awais
		</div>
	)
}
