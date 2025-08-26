import { Transition } from '@headlessui/react'
import { twMerge } from 'tailwind-merge'
import { GSectionProps } from './types'
import { GLoading } from '../g-loading'

export const GSection = ({
	title,
	subtitle,
	actions,
	bar,
	children,
	loading,
	className,
	containerClassName,
	lineBreak = false,
	titleClass,
	lineBreakColor,
	alignItems = 'start',
	contentClassName
}: GSectionProps) => {
	return (
		<div
			className={twMerge(
				'relative bg-white rounded-md sm:rounded-lg mb-6 border border-t-border-light',
				containerClassName || ' '
			)}
		>
			<div className={twMerge('py-4 px-6', className || '')}>
				<div
					className={`sm:flex items-${alignItems} justify-between sm:space-x-2 md:space-x-6`}
				>
					{(title || subtitle) && (
						<div className={titleClass || 'mb-4 lg:mb-6'}>
							{title && (
								<h1 className="text-xl font-bold text-t-default">{title}</h1>
							)}
							{subtitle && (
								<div className="text-lg text-t-secondary">{subtitle}</div>
							)}
						</div>
					)}
					{bar && (
						<div className="space-x-2 flex-1 flex sm:justify-start md:justify-end">
							{bar}
						</div>
					)}
					{actions && (
						<div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none space-x-2">
							{actions}
						</div>
					)}
				</div>
				{lineBreak && (
					<hr
						className={`mb-2 ${lineBreakColor && `border-${lineBreakColor}`}`}
					/>
				)}
				<div className={contentClassName || ''}>{children}</div>
			</div>
			<Transition
				show={!!loading}
				enter="transition-opacity duration-150"
				enterFrom="opacity-0"
				enterTo="opacity-100"
				leave="transition-opacity duration-300"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
			>
				<div className="absolute top-0 bottom-0 left-0 right-0 bg-white opacity-90 z-100">
					<GLoading addMargin={false} />
				</div>
			</Transition>
		</div>
	)
}
