import { UserDTO } from 'api-models'

export const triggerLinkedInConversion = (user: UserDTO | null) => {
	if (!user) return
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	window.dataLayer = window.dataLayer || []
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	window.dataLayer.push({
		event: 'ec_form_submit',
		user_data: {
			email: user?.email,
			phone_number: user.phone_number?.startsWith('+')
				? user.phone_number
				: `+${user?.phone_number}`,
			name: user?.name
		}
	})

	console.log('GTM Event Pushed:', {
		event: 'ec_form_submit',
		user_data: {
			email: user?.email,
			phone_number: user.phone_number?.startsWith('+')
				? user.phone_number
				: `+${user.phone_number}`,
			name: user.name
		}
	})
}
