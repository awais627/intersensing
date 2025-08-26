import { AppConfig } from 'config'
import { Users } from './user'

class Service {
	init() {
		try {
			if (typeof zE === 'undefined') return
			if (!['stage', 'production'].includes(AppConfig.ENV)) return

			zE('messenger', 'loginUser', async (callback: (a: string) => void) => {
				const token = await Users.getSupportToken()
				await callback(token)
			})
		} catch (error) {
			console.error('Zendesk init error:', error)
		}
	}

	open() {
		try {
			if (typeof zE === 'undefined') return
			zE('messenger', 'open')
		} catch (error) {
			console.error('Zendesk open error:', error)
		}
	}

	close() {
		try {
			if (typeof zE === 'undefined') return
			zE('messenger', 'close')
		} catch (error) {
			console.error('Zendesk close error:', error)
		}
	}

	hide() {
		try {
			if (typeof zE === 'undefined') return
			zE('messenger', 'hide')
		} catch (error) {
			console.error('Zendesk hide error:', error)
		}
	}

	show() {
		try {
			if (typeof zE === 'undefined') return
			zE('messenger', 'show')
		} catch (error) {
			console.error('Zendesk show error:', error)
		}
	}
}

export const ZendeskService = new Service()
