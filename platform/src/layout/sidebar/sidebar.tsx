import { GTransition } from 'components/basic-blocks'
import { UserHeader } from 'layout/navbar/user-header'
import DarkLogoIcon from '../../assets/img/apple-touch-icon-dark.svg'
import LogoIcon from '../../assets/img/apple-touch-icon.svg'
import { AssetMenu } from './menus/asset-menu'

export const Sidebar = () => {
	const menuContent = (
		<>
			<GTransition show swap>
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
					<picture>
						<source
							srcSet={DarkLogoIcon}
							className="h-[28px]"
							media="(prefers-color-scheme: dark)"
						/>
						<img className="h-[28px]" src={LogoIcon} alt="logo" />
					</picture>
				</div>
				<div className="border-b border-b-gray-50 mx-4"></div>
				<div
					className={`px-2 pb-4 z-40 overflow-auto overflow-x-hidden transition-all ${'w-[200px]'}`}
				>
					{menuContent}
				</div>
				<div
					className={`divide-y-2 px-2 gap-4 divide-card-border mb-[24px] z-50 flex flex-col flex-grow flex-1 justify-end ${'w-[200px]'}`}
				>
					<UserHeader />
				</div>
			</div>
			{/* mobile sidebar start*/}
			{/* mobile sidebar end*/}
		</>
	)
}
