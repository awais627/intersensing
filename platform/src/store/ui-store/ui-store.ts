import { toast } from 'react-toastify'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { UIAction, UIActionState } from './types'

interface UiStoreState {
	modalStatus: boolean
	activePath: string
	context: string
	sidebarCollapsed: boolean
	mobileSidebarOpen: boolean
	mobileUserMenuOpen: boolean
	desktopSidebarCollapsed: boolean
	uiActionState: Record<UIAction, UIActionState> | any
	uiActionError: Record<UIAction, string | undefined> | any
	activeLink: string

	// Action Methods
	setModalState(value: boolean): void
	setActivePage(path: string): void
	collapseSidebar(val: boolean): void
	setMobileSidebarOpen(value: boolean): void
	setMobileUserMenuOpen(value: boolean): void
	collapseDesktopSidebar(value: boolean): void
	setActionState(key: UIAction, state: UIActionState, message?: string): void
	isIdle(key: UIAction): boolean
	isLoading(key: UIAction): boolean
	isErrored(key: UIAction): boolean
	getError(key: UIAction): string | undefined
	setActiveLink(link: string): void
}

const UiStore = immer<UiStoreState>((set, get) => ({
	modalStatus: false,
	setModalState: (value: boolean) => set({ modalStatus: value }),
	activePath: '/',
	context: 'user',
	setActivePage: (path: string) => {
		const newContext = path.startsWith('/workspace/')
			? 'account'
			: path.includes('/asset/')
			? 'asset'
			: path.startsWith('/admin')
			? 'admin'
			: 'user'
		set({ activePath: path, context: newContext })
	},
	sidebarCollapsed: false,
	collapseSidebar: (val: boolean) => set({ sidebarCollapsed: val }),
	mobileSidebarOpen: false,
	setMobileSidebarOpen: (value: boolean) => set({ mobileSidebarOpen: value }),
	mobileUserMenuOpen: false,
	setMobileUserMenuOpen: (value: boolean) => set({ mobileUserMenuOpen: value }),
	desktopSidebarCollapsed: false,
	collapseDesktopSidebar: (value: boolean) =>
		set({ desktopSidebarCollapsed: value }),
	uiActionState: {},
	uiActionError: {},
	activeLink: '/',

	isIdle: (key: UIAction) => get().uiActionState[key] === 'idle',

	isLoading: (key: UIAction) => get().uiActionState[key] === 'loading',

	isErrored: (key: UIAction) => get().uiActionState[key] === 'error',

	getError: (key: UIAction) => get().uiActionError[key],

	setActionState: (key: UIAction, state: UIActionState, message?: string) => {
		set({ uiActionState: { ...get().uiActionState, [key]: state } })
		if (state === 'success' || state === 'error') {
			if (message && state === 'success') {
				toast.success(message)
			}
			if (message && state === 'error') {
				set({ uiActionError: { ...get().uiActionError, [key]: message } })
				toast.error(message)
			}
			setTimeout(() => {
				set({ uiActionError: { ...get().uiActionError, [key]: undefined } })
			}, 3000)
		} else {
			set({ uiActionError: { ...get().uiActionError, [key]: undefined } })
		}
	},
	setActiveLink: (link: string) => set({ activeLink: link })
}))

export const useUiStore = create(UiStore)
