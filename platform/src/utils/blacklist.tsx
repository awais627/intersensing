import { BlockDTO } from 'api-models'
import {
	RiComputerLine,
	RiGlobalLine,
	RiMapPin2Line,
	RiSmartphoneLine
} from 'react-icons/ri'

export const mapBlockTypeText: { [key: string]: string } = {
	IP_ADDRESS: 'IP address',
	IP_RANGE: 'IP range',
	DOMAIN_PLACEMENT: 'Domain placement',
	APP_PLACEMENT: 'App placement',
	DEVICE: 'Device ID'
}

export const mapBlockTypeIcon = (type: BlockDTO['type'], size = 4) => {
	if (type === 'IP_ADDRESS' || type === 'IP_RANGE') {
		return <RiMapPin2Line className={`text-green-500 w-${size} h-${size}`} />
	}
	if (type === 'DEVICE')
		return <RiComputerLine className={`text-primary-500 w-${size} h-${size}`} />
	if (type === 'DOMAIN_PLACEMENT')
		return <RiGlobalLine className={`text-primary-500 w-${size} h-${size}`} />
	if (type === 'APP_PLACEMENT')
		return (
			<RiSmartphoneLine className={`text-primary-500 w-${size} h-${size}`} />
		)
}
