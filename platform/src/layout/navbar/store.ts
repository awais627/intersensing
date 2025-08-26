import { create } from 'zustand'

type Store = {
	theme: string
}

type Action = {
	switchTheme: (theme: Store['theme']) => void
}

export const useThemeStore = create<Store & Action>()((set) => ({
	theme: localStorage.getItem('theme') || ('light' as Store['theme']),
	switchTheme: (theme) => {
		theme === 'light'
			? document.documentElement.classList.remove('dark')
			: document.documentElement.classList.add('dark')
		localStorage.setItem('theme', theme)
		set(() => ({ theme: theme }))
	}
}))
