import { PricingTierInfoDTO } from 'api-models'
import { PlatformIcon } from 'components/platform-icon'
import { BsCircleFill } from 'react-icons/bs'
import {
	RiShieldCrossLine,
	RiShieldFlashLine,
	RiShieldLine,
	RiShieldStarLine,
	RiShutDownLine
} from 'react-icons/ri'
import { useThemeStore } from 'layout/navbar/store'
import { AdPlatforms } from './platform'
import { ReactElement } from 'react'

export * from 'react-icons/ri'

export const planTierIconMapper = (
	tier?: PricingTierInfoDTO['tier'],
	size = 6,
	variant: 'contained' | 'text' = 'text'
) => {
	const icons: Record<string, ReactElement> = {
		lite: (
			<RiShieldLine
				className={`h-${size} w-${size} ${
					variant === 'text' ? 'text-red-500' : 'text-white'
				}`}
			/>
		),
		standard: (
			<RiShieldFlashLine
				className={`h-${size} w-${size} ${
					variant === 'text' ? 'text-green-500' : 'text-white'
				}`}
			/>
		),
		pro: (
			<RiShieldStarLine
				className={`h-${size} w-${size} ${
					variant === 'text' ? 'text-primary-500' : 'text-white'
				}`}
			/>
		),
		standard_pro: (
			<RiShieldStarLine
				className={`h-${size} w-${size} ${
					variant === 'text' ? 'text-primary-500' : 'text-white'
				}`}
			/>
		),
		custom_pro: (
			<RiShieldCrossLine
				className={`h-${size} w-${size} ${
					variant === 'text' ? 'text-purple-500' : 'text-white'
				}`}
			/>
		),
		none: (
			<RiShutDownLine
				className={`h-${size} w-${size} ${
					variant === 'text' ? 'text-gray-500' : 'text-white'
				}`}
			/>
		)
	}
	return icons[tier || 'none']
}

export const planTierColorMapper = (
	tier?: PricingTierInfoDTO['tier'],
	size = 6,
	variant: 'contained' | 'text' = 'text'
) => {
	const icons: Record<string, ReactElement> = {
		lite: (
			<BsCircleFill
				className={`h-${size} w-${size} ${
					variant === 'text' ? 'text-red-500' : 'text-white'
				}`}
			/>
		),
		standard: (
			<BsCircleFill
				className={`h-${size} w-${size} ${
					variant === 'text' ? 'text-green-500' : 'text-white'
				}`}
			/>
		),
		pro: (
			<BsCircleFill
				className={`bg-[#0D3EF2] rounded-2xl h-${size} w-${size} ${
					variant === 'text' ? 'text-primary-500' : 'text-white'
				}`}
			/>
		),
		standard_pro: (
			<BsCircleFill
				className={`h-${size} w-${size} ${
					variant === 'text' ? 'text-primary-500' : 'text-white'
				}`}
			/>
		),
		custom_pro: (
			<BsCircleFill
				className={`h-${size} w-${size} ${
					variant === 'text' ? 'text-purple-500' : 'text-white'
				}`}
			/>
		),
		none: (
			<BsCircleFill
				className={`h-${size} w-${size} ${
					variant === 'text' ? 'text-gray-500' : 'text-white'
				}`}
			/>
		)
	}
	return icons[tier || 'none']
}

export const platformMapper = (props: {
	platform: AdPlatforms | null
	size?: number
}) => {
	const { theme } = useThemeStore()
	const { platform, size = 5 } = props

	return {
		icon: (
			<PlatformIcon
				platform={platform}
				className={`${
					theme === 'dark' ? 'bg-gray-100' : 'bg-green-100'
				} p-1 h-${size} w-${size} rounded-md`}
			/>
		)
	}
}
