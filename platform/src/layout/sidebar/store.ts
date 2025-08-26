import { create } from 'zustand'

type Store = {
	checklistOpened: boolean
	adSpendViewOpened: boolean
}

type Action = {
	openChecklist: (open: Store['checklistOpened']) => void
	openAdSpendView: (open: Store['checklistOpened']) => void
}

export const useChecklistStore = create<Store & Action>()((set) => ({
	checklistOpened: false,
	adSpendViewOpened: false,
	openChecklist: (checklistOpened) => {
		set(() => ({ checklistOpened: checklistOpened }))
	},
	openAdSpendView: (adSpendViewOpened) => {
		set(() => ({ adSpendViewOpened: adSpendViewOpened }))
	}
}))
