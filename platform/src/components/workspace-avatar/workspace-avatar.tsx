import { useThemeStore } from 'layout/navbar/store'

interface HeaderProps {
	workspace?: any | null
	size?: number
	src?: string | null
	name?: string | null
}

export const WorkspaceAvatar = ({
	workspace,
	size,
	src,
	name
}: HeaderProps) => {
	const { theme } = useThemeStore()
	return (
		<img
			className={`inline-block h-${size || 10} w-${
				size || 10
			} rounded-full border border-gray-300`}
			src={
				src ||
				workspace?.avatar ||
				`https://eu.ui-avatars.com/api/?name=${
					(workspace?.name && workspace?.name[0]) || name
				}&background=${theme === 'dark' ? '202431' : 'F3F4F6'}&color=${
					theme === 'dark' ? 'F5F5F5' : '343741'
				}`
			}
			alt="workspace icon"
			onError={(e) =>
				(e.currentTarget.src = `https://eu.ui-avatars.com/api/?name=${
					(workspace?.name && workspace?.name[0]) || name
				}&background=${theme === 'dark' ? '202431' : 'F3F4F6'}&color=${
					theme === 'dark' ? 'F5F5F5' : '343741'
				}`)
			}
		/>
	)
}
