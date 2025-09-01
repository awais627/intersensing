/* eslint-disable no-prototype-builtins */
import { useEffect, useState } from 'react'
import { RiMoonLine, RiSunLine } from 'react-icons/ri'
import { useLocation, useNavigate } from 'react-router-dom'

import { useUiStore } from 'store'
import { useShallow } from 'zustand/react/shallow'
import { useThemeStore } from './store'
import { useAuth } from '../../hooks/useAuth'

export const Navbar = () => {
	const { setMobileSidebarOpen, mobileSidebarOpen, desktopSidebarCollapsed } =
		useUiStore(
			useShallow((s) => ({
				setMobileSidebarOpen: s.setMobileSidebarOpen,
				mobileSidebarOpen: s.mobileSidebarOpen,
				desktopSidebarCollapsed: s.desktopSidebarCollapsed
			}))
		)

	const { theme, switchTheme } = useThemeStore()
	const location = useLocation()
	const { logout } = useAuth()
	const navigate = useNavigate()

	const [hasAccess, setHasAccess] = useState(false)
	const [activeTheme, setActiveTheme] = useState(theme || 'light')

	const [open, setOpen] = useState(false)

	/**
	 * Make <picture> <source> elements with media="(prefers-color-scheme:)"
	 * respect custom theme preference overrides.
	 * Otherwise the `media` preference will only respond to the OS-level setting
	 */
	const updateSourceMedia = (colorPreference: 'light' | 'dark'): void => {
		const pictures = document.querySelectorAll('picture')

		pictures.forEach((picture) => {
			const sources: NodeListOf<HTMLSourceElement> = picture.querySelectorAll(`
        source[media*="prefers-color-scheme"],
        source[data-media*="prefers-color-scheme"]
      `)

			sources.forEach((source) => {
				// Preserve the source `media` as a data-attribute
				// to be able to switch between preferences
				if (source?.media.includes('prefers-color-scheme')) {
					source.dataset.media = source.media
				}

				// If the source element `media` target is the `preference`,
				// override it to 'all' to show
				// or set it to 'none' to hide
				if (source?.dataset?.media?.includes(colorPreference)) {
					source.media = 'all'
				} else if (source) {
					source.media = 'none'
				}
			})
		})
	}

	const changeTheme = (theme: 'light' | 'dark') => {
		switchTheme(theme)
		setActiveTheme(theme)
		updateSourceMedia(theme)
	}

	const [width, setWidth] = useState(window.innerWidth)
	const handleWindowSizeChange = () => {
		setWidth(window.innerWidth)
	}
	useEffect(() => {
		if (
			localStorage.theme === 'dark' ||
			(!('theme' in localStorage) &&
				window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			switchTheme('dark')
			setActiveTheme('dark')
		} else {
			switchTheme('light')
			setActiveTheme('light')
		}
	}, [])

	const isMobile = width < 768
	const [welcomeViewOpen, setWelcomeViewOpen] = useState(true)
	// This effect is used to open the welcome view when the user is in setup after payment

	useEffect(() => {
		isMobile && setWelcomeViewOpen(false)
	}, [width])

	return (
		<div
			className={`fixed top-0 left-0 flex-shrink-0 flex h-[72px] bg-white z-20 ${
				desktopSidebarCollapsed
					? 'w-[calc(100%-64px)] md:ml-16'
					: 'w-[calc(100%-200px)] md:ml-[200px]'
			}`}
		>
			<div className="flex-1 flex justify-between gap-4 mx-auto items-center relative"></div>
			<div className="flex flex-row gap-x-2">
				<div className="flex items-center justify-end mr-6">
					<div
						className="w-9 h-9 flex justify-center content-center cursor-pointer p-2 border border-t-border-lighter border-r-0 rounded-l-md"
						onClick={() => {
							changeTheme('light')
						}}
					>
						<RiSunLine
							className={`h-4 w-4  ${
								activeTheme === 'light' ? 'text-primary-500' : 'text-t-default'
							}`}
						/>
					</div>
					<div
						className="w-9 h-9 flex justify-center content-center cursor-pointer p-2 border border-t-border-lighter rounded-r-md"
						onClick={() => {
							changeTheme('dark')
						}}
					>
						<RiMoonLine
							className={`h-4 w-4  ${
								activeTheme === 'dark' ? 'text-primary-500' : 'text-t-default'
							}`}
						/>
					</div>
				</div>
				<div className="flex items-center mr-4">
					<button
						onClick={() => {
							logout()
							navigate('/login')
						}}
						className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors"
					>
						Logout
					</button>
				</div>
			</div>
		</div>
	)
}
