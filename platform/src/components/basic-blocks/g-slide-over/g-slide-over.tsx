import { Fragment, ReactNode } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { classNames } from '../../../utils'

interface GSlideOverProps {
	children?: ReactNode
	open: boolean
	setOpen: (value: boolean) => void
	position?: 'left' | 'right'
	className?: string
	size?:
		| 'xs'
		| 'sm'
		| 'md'
		| 'lg'
		| 'xl'
		| '2xl'
		| '3xl'
		| '4xl'
		| '5xl'
		| '6xl'
		| '7xl'
}

export const GSlideOver = (props: GSlideOverProps) => {
	const {
		children,
		open,
		setOpen,
		position = 'right',
		className = '',
		size = 'xs'
	} = props

	const maxSize = {
		xs: 'max-w-xs',
		sm: 'max-w-sm',
		md: 'max-w-md',
		lg: 'max-w-lg',
		xl: 'max-w-xl',
		'2xl': 'max-w-2xl',
		'3xl': 'max-w-3xl',
		'4xl': 'max-w-4xl',
		'5xl': 'max-w-5xl',
		'6xl': 'max-w-6xl',
		'7xl': 'max-w-7xl'
	}

	return (
		<Transition show={open} as={Fragment}>
			<Dialog
				open={true}
				onClose={() => setOpen(false)}
				as="div"
				className={`fixed inset-0 flex justify-${
					position === 'left' ? 'start' : 'end'
				} z-40 border-b-2 border-b-primary-500`}
			>
				<Transition.Child
					as={Fragment}
					enter="transition-opacity ease-linear duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="transition-opacity ease-linear duration-300"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<Dialog.Overlay className="fixed inset-0 bg-black/30 bg-opacity-75" />
				</Transition.Child>
				<Transition.Child
					as={'div'}
					enter="transition ease-in-out duration-300 transform"
					enterFrom={
						position === 'left' ? '-translate-x-full' : 'translate-x-full'
					}
					enterTo="translate-x-0"
					leave="transition ease-in-out duration-300 transform"
					leaveFrom="translate-x-0"
					leaveTo={
						position === 'left' ? '-translate-x-full' : 'translate-x-full'
					}
				>
					<div
						className={classNames(
							`relative flex-1 flex flex-col  ${maxSize[size]} w-full h-full pt-5 pb-4 bg-gray-100 overflow-y-auto overflow-x-hidden`,
							className
						)}
					>
						<div className="flex flex-col flex-1">
							<div className="h-full">{children}</div>
						</div>
					</div>
				</Transition.Child>
				<div className="flex-shrink-0 w-0" aria-hidden="true"></div>
			</Dialog>
		</Transition>
	)
}
