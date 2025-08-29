import { GTransition } from 'components/basic-blocks'
import { RiListSettingsLine } from 'react-icons/ri'
import { useUiStore } from 'store'
import { useShallow } from 'zustand/react/shallow'
import { AssetMenu } from './menus/asset-menu'
import { NavItem } from './nav-item'
import { LuRadioTower, LuUser } from 'react-icons/lu'
import { GSlideOver } from '../../components/basic-blocks/g-slide-over'
import DarkLogoIcon from '../../assets/img/apple-touch-icon-dark.svg'
import DarkLogo from '../../assets/img/cg-logo-white.svg'

export const Sidebar = () => {
	const {
		context,
		mobileSidebarOpen,
		setMobileSidebarOpen,
		desktopSidebarCollapsed
	} = useUiStore(
		useShallow((state) => ({
			context: state.context,
			mobileSidebarOpen: state.mobileSidebarOpen,
			setMobileSidebarOpen: state.setMobileSidebarOpen,
			desktopSidebarCollapsed: state.desktopSidebarCollapsed
		}))
	)

	const menuContent = (
		<>
			<GTransition show>
				<AssetMenu />
			</GTransition>
		</>
	)

	return (
		<>
			<div
				className={
					'hidden md:flex md:flex-col md:fixed  md:inset-y-0 bg-white border-r border-r-gray-100 relative z-20'
				}
			>
				<div className="flex items-center justify-center h-[28px] my-[22px]">
					{!desktopSidebarCollapsed ? (
						<picture>
							<source
								srcSet={DarkLogo}
								className="h-[28px]"
								media="(prefers-color-scheme: dark)"
							/>
							<div className="flex items-center gap-1">
								<LuRadioTower className="h-6 w-6" />{' '}
								<span className="text-lg font-bold">Intersensing</span>
							</div>
						</picture>
					) : (
						<picture>
							<source
								srcSet={DarkLogoIcon}
								className="h-[28px]"
								media="(prefers-color-scheme: dark)"
							/>
							<LuRadioTower className="h-6 w-6" />
						</picture>
					)}
				</div>
				<div className="border-b border-b-gray-50 mx-4"></div>
				<div
					className={`px-2 pb-4 z-40 overflow-auto overflow-x-hidden transition-all ${
						!desktopSidebarCollapsed ? 'w-[200px]' : 'w-auto'
					}`}
				>
					{menuContent}
				</div>
				<div
					className={`divide-y-2 px-2 z-50 flex flex-col flex-grow flex-1 justify-end ${
						!desktopSidebarCollapsed ? 'w-[200px]' : 'w-auto'
					}`}
				></div>
				<div
					className={`divide-y-2 px-2 gap-4 divide-card-border mb-[24px] z-50 flex flex-col flex-grow flex-1 justify-end ${
						!desktopSidebarCollapsed ? 'w-[200px]' : 'w-auto'
					}`}
				>
					{context !== 'admin' && (
						<>
							<div className="space-y-2">
								<NavItem
									className="settings-bar"
									label="Settings"
									activeText={'/settings'}
									to={() => '/settings'}
									icon={RiListSettingsLine}
								/>
							</div>
						</>
					)}
					<div className="pt-4">
						<NavItem
							label="Team"
							to={() => '/team'}
							icon={LuUser}
						/>
						{/*<UserHeader />*/}
					</div>
				</div>
			</div>
			{/* mobile sidebar start*/}
			<div className="flex md:hidden">
				<GSlideOver open={mobileSidebarOpen} setOpen={setMobileSidebarOpen}>
					<div className="w-72 px-4 -z-50 overflow-auto overflow-x-hidden">
						{menuContent}
					</div>
				</GSlideOver>
			</div>
			{/* mobile sidebar end*/}
		</>
	)
}
