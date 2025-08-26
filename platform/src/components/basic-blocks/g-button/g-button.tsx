import { FC } from 'react'
import { RiLoader5Line, RiQuestionLine } from 'react-icons/ri'
import { twMerge } from 'tailwind-merge'
import { GbuttonProps } from './types'
import { GTooltip } from '../g-tooltip'
import { classNames } from 'utils'

const commonClasses = [
	'shadow-sm',
	'inline-flex',
	'justify-center',
	'items-center',
	'border',
	'font-medium',
	'mobile:w-full', // Apply 'w-full' only on mobile
	'mobile:!text-lg' // Apply '!text-lg' only on mobile
]

const xxsmallSizeClasses = {
	icon: ['h-4 w-4'],
	button: ['py-1 px-2 text-xs'],
	iconButton: ['text-xs'],
	loading: ['h-4 w-4']
}

const xxxsmallSizeClasses = {
	icon: ['h-3 w-3'],
	button: ['py-1.5 px-3 text-md'],
	iconButton: ['p-2 text-xs'],
	loading: ['h-6 w-6']
}

const xsmallSizeClasses = {
	icon: ['h-4 w-4'],
	button: ['py-1 px-3 text-xs'],
	iconButton: ['py-1 px-1 text-xs'],
	loading: ['h-4 w-4']
}
const smallSizeClasses = {
	icon: ['h-4 w-4'],
	button: ['py-1.5 px-4 text-sm'],
	iconButton: ['py-1.5 px-1.5 text-xs'],
	loading: ['h-5 w-5']
}
const mediumSizeClasses = {
	icon: ['h-4 w-4'],
	button: ['py-2 px-5 text-md'],
	iconButton: ['py-2 px-2 text-xs'],
	loading: ['h-6 w-6']
}
const largeSizeClasses = {
	icon: ['h-6 w-6'],
	button: ['py-2 px-6 text-base'],
	iconButton: ['py-2 px-2 text-xs'],
	loading: ['h-6 w-6']
}
const xlargeSizeClasses = {
	icon: ['h-6 w-6'],
	button: ['py-3 px-7 text-base'],
	iconButton: ['py-3 px-3 text-xs'],
	loading: ['h-6 w-6']
}

const outlinedClasses = (color: string) => {
	return [
		`border-${color}-100 shadow-sm bg-transparent text-${color}-500 hover:bg-${color}-500 hover:text-white focus:ring-${color}-500 disabled:bg-transparent disabled:text-${color}-200 disabled:border-${color}-200`
	]
}
const containedClasses = (
	color: string,
	borderColor?: string,
	hoverColor?: string
) => {
	if (color === 'buttonPrimary') {
		return [
			`border border-t-input-border bg-button-primary shadow-sm text-t-dark hover:bg-gray-50 focus:ring-${color}-500 disabled:bg-${color}-200 disabled:text-gray-400`
		]
	}
	if (color === 'disabled') {
		return ['border border-t-input-border bg-gray-300 shadow-sm text-white']
	}
	if (color === 'gray') {
		return [
			`border border-t-input-border bg-white shadow-sm text-t-dark hover:bg-gray-50 focus:ring-${color}-500 disabled:bg-${color}-200 disabled:text-gray-400`
		]
	}
	if (color === 'red') {
		return [
			`border-transparent shadow-sm bg-${color}-500 text-t-button hover:bg-${color}-700 focus:ring-${color}-500 disabled:bg-${color}-300 disabled:text-gray-50`
		]
	}
	if (color === 'white') {
		return [
			`border border-${
				borderColor !== undefined ? borderColor : 'transparent'
			} bg-gray-100 text-primary-500 hover:bg-${
				hoverColor !== undefined ? hoverColor : 'gray-200'
			} font-semibold`
		]
	}

	if (color === 'yellow') {
		return [
			'bg-b-yellow font-grotesk disabled:opacity-70  text-t-base-blue border-b-yellow-dark  '
		]
	}

	return [
		`border-transparent shadow-sm bg-${color}-500 text-white hover:bg-${color}-600 focus:ring-${color}-500 disabled:bg-${color}-300 disabled:text-gray-50`
	]
}
const textClasses = (color: string) => {
	if (color === 'gray') {
		return [
			`border border-t-input-border shadow-sm bg-white text-t-dark hover:bg-gray-50 focus:ring-${color}-500 disabled:bg-transparent disabled:text-${color}-200`
		]
	}
	return [
		`border border-t-input-border shadow-sm bg-white text-${color}-500 hover:bg-gray-50 focus:ring-${color}-500 disabled:bg-transparent disabled:text-${color}-200`
	]
}
const coloredClasses = (color: string) => {
	if (color === 'gray') {
		return [
			`border border-t-input-border bg-white shadow-sm text-t-dark hover:bg-gray-50 focus:ring-${color}-500 disabled:bg-${color}-200 disabled:text-gray-400`
		]
	}
	return [
		`border-transparent shadow-sm bg-${color}-200 text-${color}-500 hover:bg-${color}-300 focus:ring-${color}-500 disabled:bg-${color}-300 disabled:text-gray-50`
	]
}
const shapes = (shape: 'square' | 'circle') => {
	if (shape === 'square') return ['rounded-md']
	if (shape === 'circle') return ['rounded-full']
	return ['rounded-md']
}

export const GButton: FC<GbuttonProps> = (props) => {
	const {
		label,
		children,
		type = 'text',
		variant = 'contained',
		labelClassName,
		color = 'neutral',
		shape = 'square',
		size = 'md',
		loading = false,
		disabled = loading || false,
		icon: Icon,
		iconPlacement = 'left',
		onClick,
		style = {},
		className,
		tooltipPosition,
		borderColor,
		hoverColor,
		iconClassName = '',
		loader
	} = props

	const sizes = {
		xxs: xxsmallSizeClasses,
		xxxs: xxxsmallSizeClasses,
		xs: xsmallSizeClasses,
		sm: smallSizeClasses,
		md: mediumSizeClasses,
		lg: largeSizeClasses,
		xl: xlargeSizeClasses
	}

	const variants = {
		buttonPrimary: {
			contained: containedClasses('buttonPrimary'),
			outlined: outlinedClasses('buttonPrimary'),
			text: textClasses('buttonPrimary'),
			colored: coloredClasses('buttonPrimary')
		},
		primary: {
			contained: containedClasses('primary'),
			outlined: outlinedClasses('primary'),
			text: textClasses('primary'),
			colored: coloredClasses('primary')
		},
		secondary: {
			contained: containedClasses('violet'),
			outlined: outlinedClasses('violet'),
			text: textClasses('violet'),
			colored: coloredClasses('violet')
		},
		success: {
			contained: containedClasses('green'),
			outlined: outlinedClasses('green'),
			text: textClasses('green'),
			colored: coloredClasses('green')
		},
		yellow: {
			contained: containedClasses('yellow'),
			outlined: outlinedClasses('yellow'),
			text: textClasses('yellow'),
			colored: coloredClasses('yellow')
		},
		warning: {
			contained: containedClasses('amber'),
			outlined: outlinedClasses('amber'),
			text: textClasses('amber'),
			colored: coloredClasses('amber')
		},
		danger: {
			contained: containedClasses('red'),
			outlined: outlinedClasses('red'),
			text: textClasses('red'),
			colored: coloredClasses('red')
		},
		purple: {
			contained: containedClasses('purple'),
			outlined: outlinedClasses('purple'),
			text: textClasses('purple'),
			colored: coloredClasses('purple')
		},
		neutral: {
			contained: containedClasses('gray'),
			outlined: outlinedClasses('gray'),
			text: textClasses('gray'),
			colored: textClasses('gray')
		},
		white: {
			contained: containedClasses('white'),
			outlined: containedClasses('white'),
			text: containedClasses('white'),
			colored: containedClasses('white', borderColor, hoverColor)
		},
		disabled: {
			contained: containedClasses('disabled'),
			outlined: outlinedClasses('gray'),
			text: textClasses('gray'),
			colored: coloredClasses('gray')
		}
	}

	const variantColorClasses = variants[color][variant]
	const sizeClasses = sizes[size]
	const shapeClasses = shapes(shape)

	if (type === 'icon') {
		return (
			<button
				onClick={onClick}
				disabled={disabled}
				style={style}
				type={'button'}
				className={twMerge(
					...commonClasses,
					...variantColorClasses,
					...sizeClasses.iconButton,
					...shapeClasses,
					className || ''
				)}
			>
				{loading ? (
					<RiLoader5Line
						className={classNames(
							'animate-spin !shadow-none !bg-transparent border-none pointer-events-none',
							...variantColorClasses,
							...sizeClasses.loading
						)}
					/>
				) : children || label ? (
					<GTooltip
						position={tooltipPosition ? tooltipPosition : 'bottom'}
						content={<span className="text-t-dark">{children || label}</span>}
					>
						{Icon ? (
							<Icon
								className={classNames(...sizeClasses.icon, iconClassName)}
								aria-hidden="true"
							/>
						) : (
							<RiQuestionLine
								className={classNames(...sizeClasses.icon, iconClassName)}
							/>
						)}
					</GTooltip>
				) : Icon ? (
					<Icon
						className={classNames(...sizeClasses.icon, iconClassName)}
						aria-hidden="true"
					/>
				) : (
					<RiQuestionLine className={classNames(...sizeClasses.icon)} />
				)}
			</button>
		)
	}

	return (
		<button
			onClick={onClick}
			disabled={disabled}
			style={style}
			type={'button'}
			className={twMerge(
				...commonClasses,
				...variantColorClasses,
				...sizeClasses.button,
				...shapeClasses,
				className || ''
			)}
		>
			{loading && (
				<RiLoader5Line
					className={classNames(
						'absolute animate-spin !shadow-none !bg-transparent border-none hover:bg-transparent',
						...variantColorClasses,
						...sizeClasses.loading
					)}
				/>
			)}
			{Icon && iconPlacement === 'left' && (
				<Icon
					className={classNames(
						...sizeClasses.icon,
						iconClassName,
						'mr-2 -ml-1'
					)}
					aria-hidden="true"
				/>
			)}
			<span className={` ${loading && 'invisible'} ${labelClassName ?? ''}`}>
				{children || label}
			</span>
			{Icon && iconPlacement === 'right' && (
				<Icon
					className={classNames(
						...sizeClasses.icon,
						iconClassName,
						'ml-2 -mr-1'
					)}
					aria-hidden="true"
				/>
			)}
		</button>
	)
}
