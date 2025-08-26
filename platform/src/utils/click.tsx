import { ReactNode } from 'react'
import {
	RiAppleLine,
	RiBug2Fill,
	RiBuilding4Line,
	RiCheckboxCircleLine,
	RiChromeFill,
	RiComputerLine,
	RiEdgeFill,
	RiErrorWarningLine,
	RiHomeWifiLine,
	RiOperaFill,
	RiPulseFill,
	RiQuestionLine,
	RiSafariFill,
	RiServerLine,
	RiSmartphoneLine,
	RiTabletLine,
	RiWindowsLine
} from 'react-icons/ri'
import { SiIos, SiLinux } from 'react-icons/si'
import { PiWatchLight } from 'react-icons/pi'

interface Map {
	[key: string]: { icon: ReactNode; iconSm: ReactNode; label: string }
}

export const ClickStatusMapper = {
	GOOD: { bg: 'bg-green-100', color: 'text-green-700', label: 'Normal' },
	SUSPICIOUS: {
		bg: 'bg-amber-100',
		color: 'text-amber-700',
		label: 'Suspicious'
	},
	BAD: { bg: 'bg-red-100', color: 'text-red-700', label: 'Bad' },
	ORGANIC: { bg: 'bg-gray-100', color: 'text-t-secondary', label: 'Organic' },
	IGNORED: { bg: 'bg-gray-700', color: 'text-white', label: 'Ignored' },
	WHITELSITED: {
		bg: 'bg-gray-700',
		color: 'text-white',
		label: 'Whitelisted'
	}
}

export const ipUsageLabel = (usage: string) => {
	if (usage === 'hosting') return 'Data-center'
	if (usage === 'corporate') return 'Business'
	if (usage === 'consumer') return 'Residential'
}

export const IPUsageMapper = (usage: string | null) => {
	if (usage === 'hosting') {
		return {
			icon: <RiServerLine className="text-red-500 w-5 h-5" />,
			iconSm: <RiServerLine className="text-red-500 w-4 h-4" />,
			label: 'Data-center'
		}
	}
	if (usage === 'corporate') {
		return {
			icon: <RiBuilding4Line className="text-t-secondary w-5 h-5" />,
			iconSm: <RiBuilding4Line className="text-t-secondary w-4 h-4" />,
			label: 'Business'
		}
	}
	if (usage === 'consumer') {
		return {
			icon: <RiHomeWifiLine className="text-t-secondary w-5 h-5" />,
			iconSm: <RiHomeWifiLine className="text-t-secondary w-4 h-4" />,
			label: 'Residential'
		}
	}
	return {
		icon: <RiQuestionLine className={'text-gray-400 w-5 h-5'} />,
		iconSm: <RiQuestionLine className={'text-gray-400 w-4 h-4'} />,
		label: 'Not available'
	}
}

export const ThreatLevelMapper: Map = {
	low: {
		icon: <RiCheckboxCircleLine className={'text-green-500 w-5 h-5'} />,
		iconSm: <RiCheckboxCircleLine className={'text-green-500 w-4 h-4'} />,
		label: 'Low'
	},
	medium: {
		icon: <RiErrorWarningLine className={'text-amber-500 w-5 h-5'} />,
		iconSm: <RiErrorWarningLine className={'text-amber-500 w-4 h-4'} />,
		label: 'Medium'
	},
	high: {
		icon: <RiErrorWarningLine className={'text-red-500 w-5 h-5'} />,
		iconSm: <RiErrorWarningLine className={'text-red-500 w-4 h-4'} />,
		label: 'High'
	}
}

export const DeviceTypeMapper: Map = {
	mobile: {
		icon: <RiSmartphoneLine className={'w-5 h-5'} />,
		iconSm: <RiSmartphoneLine className={'w-4 h-4'} />,
		label: 'Mobile'
	},
	tablet: {
		icon: <RiTabletLine className={'w-5 h-5'} />,
		iconSm: <RiTabletLine className={'w-4 h-4'} />,
		label: 'Tablet'
	},
	computer: {
		icon: <RiComputerLine className={'w-5 h-5'} />,
		iconSm: <RiComputerLine className={'w-4 h-4'} />,
		label: 'Computer'
	},
	wearable: {
		icon: <PiWatchLight className={'w-5 h-5'} />,
		iconSm: <PiWatchLight className={'w-4 h-4'} />,
		label: 'Wearable'
	}
}

export const DeviceOsMapper: Map = {
	Windows: {
		icon: <RiWindowsLine className="w-5 h-5" />,
		iconSm: <RiWindowsLine className="w-4 h-4" />,
		label: 'Windows'
	},
	'Mac OS': {
		icon: <RiAppleLine className="w-5 h-5" />,
		iconSm: <RiAppleLine className="w-4 h-4" />,
		label: 'Mac OS'
	},
	linux: {
		icon: <SiLinux className="w-5 h-5" />,
		iconSm: <SiLinux className="w-4 h-4" />,
		label: 'Linux'
	},
	android: {
		icon: <SiLinux className="w-5 h-5" />,
		iconSm: <SiLinux className="w-4 h-4" />,
		label: 'Android'
	},
	iOS: {
		icon: <SiIos className="w-5 h-5" />,
		iconSm: <SiIos className="w-4 h-4" />,
		label: 'iOS'
	}
}

export const DeviceBrowserMapper: Map = {
	Chrome: {
		icon: <RiChromeFill className={'w-5 h-5'} />,
		iconSm: <RiChromeFill className={'w-4 h-4'} />,
		label: 'Chrome'
	},
	Safari: {
		icon: <RiSafariFill className={'w-5 h-5'} />,
		iconSm: <RiSafariFill className={'w-4 h-4'} />,
		label: 'Safari'
	},
	Edge: {
		icon: <RiEdgeFill className={'w-5 h-5'} />,
		iconSm: <RiEdgeFill className={'w-4 h-4'} />,
		label: 'Edge'
	},
	Opera: {
		icon: <RiOperaFill className={'w-5 h-5'} />,
		iconSm: <RiOperaFill className={'w-4 h-4'} />,
		label: 'Opera'
	}
}

export const InteractionMapper: Map = {
	high: {
		icon: <RiPulseFill className={'text-green-500 w-5 h-5'} />,
		iconSm: <RiPulseFill className={'text-green-500 w-4 h-4'} />,
		label: 'High'
	},
	medium: {
		icon: <RiPulseFill className={'text-amber-500 w-5 h-5'} />,
		iconSm: <RiPulseFill className={'text-amber-500 w-4 h-4'} />,
		label: 'Medium'
	},
	low: {
		icon: <RiPulseFill className={'text-red-500 w-5 h-5'} />,
		iconSm: <RiPulseFill className={'text-red-500 w-4 h-4'} />,
		label: 'Low'
	},
	none: {
		icon: <RiPulseFill className={'text-red-500 w-5 h-5'} />,
		iconSm: <RiPulseFill className={'text-red-500 w-4 h-4'} />,
		label: 'None'
	}
}

export const BotProbabilityMapper: Map = {
	high: {
		icon: <RiBug2Fill className={'text-red-500 w-5 h-5'} />,
		iconSm: <RiBug2Fill className={'text-red-500 w-4 h-4'} />,
		label: 'High'
	},
	medium: {
		icon: <RiBug2Fill className={'text-amber-500 w-5 h-5'} />,
		iconSm: <RiBug2Fill className={'text-amber-500 w-4 h-4'} />,
		label: 'Medium'
	},
	low: {
		icon: <RiBug2Fill className={'text-green-500 w-5 h-5'} />,
		iconSm: <RiBug2Fill className={'text-green-500 w-4 h-4'} />,
		label: 'Low'
	}
}
