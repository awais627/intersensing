import { UserDTO } from 'api-models'
import { AppConfig } from 'config'
import moment from 'moment'

const userGuiding = (window as any).userGuiding

class Service {
	init(user: UserDTO) {
		if (!['stage', 'production'].includes(AppConfig.ENV)) {
			return
		}

		if (!userGuiding) {
			return
		}

		userGuiding.identify(user.id, {
			email: user.email,
			name: user.name,
			created_at: moment(user.created_at).unix(),
			country: user.country,
			used_trial: user.used_trial || false,
			is_paying: user.is_paying || false,
			is_managing: user.is_managing || false
		})
	}
}

export const UserGuidingService = new Service()
