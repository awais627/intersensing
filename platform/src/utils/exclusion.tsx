import { BigQueryExclusionDTO } from 'api-models'
import moment from 'moment'

import { GBadge } from 'components/basic-blocks/g-badge'

export const mapExclusionType: { [key: string]: string } = {
	IP_ADDRESS: 'IP address',
	IP_RANGE: 'IP range',
	DOMAIN_PLACEMENT: 'Domain placement',
	APP_PLACEMENT: 'App placement',
	AUDIENCE: 'Audience',
	DEVICE: 'Device'
}

export const exclusionStatusBadge = (props: {
	exclusion: BigQueryExclusionDTO
}) => {
	const { exclusion } = props

	if (exclusion.removed_at) {
		return {
			status: 'removed',
			badge: (
				<GBadge
					text="Removed"
					className="font-bold px-3 py-1 rounded-lg mr-2"
					color="amber"
				/>
			)
		}
	}

	if (exclusion.error_message) {
		const targetDate = moment(exclusion.excluded_at)
		const currentDate = moment()
		const hoursDifference = currentDate.diff(targetDate, 'hours')

		if (hoursDifference < 24) {
			return {
				status: 'pending',
				badge: (
					<GBadge
						text="Pending"
						className="font-bold px-3 py-1 rounded-lg mr-2"
						color="gray"
					/>
				)
			}
		} else {
			return {
				status: 'failed',
				badge: (
					<GBadge
						text="Failed"
						className="font-bold px-3 py-1 rounded-lg mr-2"
						color="red"
					/>
				)
			}
		}
	}

	if (exclusion.error_message) {
		return {
			status: 'failed',
			badge: (
				<GBadge
					text="Failed"
					className="font-bold px-3 py-1 rounded-lg mr-2"
					color="red"
				/>
			)
		}
	}

	if (moment(exclusion.expires_at).isBefore(moment())) {
		return {
			status: 'expired',
			badge: (
				<GBadge
					text="Expired"
					className="font-bold px-3 py-1 rounded-lg mr-2"
					color="white"
				/>
			)
		}
	}

	return {
		status: 'active',
		badge: (
			<GBadge
				text="Active"
				className="font-bold px-3 py-1 rounded-lg mr-2"
				color="green"
			/>
		)
	}
}
