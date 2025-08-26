import { CgSpinner } from 'react-icons/cg'
import { classNames } from '../../../utils'

export const GLoading = (props: {
	label?: string
	className?: string
	addMargin?: boolean
	size?: number
}) => {
	const { label, addMargin = true, size = 8 } = props
	return (
		<div
			className={classNames(
				'w-full h-full flex flex-col items-center justify-center',
				addMargin ? 'p-4 m-6' : ''
			)}
		>
			<CgSpinner
				className={`absolute w-${size} h-${size} animate-spin text-primary-500`}
			/>
			{label}
		</div>
	)
}

export const GLazyLoading = () => {
	return (
		<div className="h-96 flex flex-col justify-end items-center text-center space-y-4">
			<CgSpinner className="w-16 h-16 animate-spin text-primary-500" />
			<span className="w-full text-center text-t-secondary">Loading...</span>
		</div>
	)
}
