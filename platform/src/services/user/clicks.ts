import { ClickDTO } from 'api-models'
import { ApiConfig } from 'config'
import moment from 'moment'
import { toast } from 'react-toastify'
import { toQuery } from 'utils'
import { ApiClient } from '../api-client'

const get = async (
	accountId: string,
	query?: Record<string, any>
): Promise<{ total: number; data: ClickDTO[] }> => {
	const { data } = await ApiClient.client.get(
		`/accounts/${accountId}/clicks?${toQuery(query)}`
	)
	return data.data
}

const getById = async (
	accountId?: string,
	clickId?: string
): Promise<ClickDTO> => {
	const { data } = await ApiClient.client.get(
		`/accounts/${accountId}/clicks/${clickId}`
	)
	return data.data
}

const countOrganicClicks = async (
	accountId?: string,
	sessionId?: string
): Promise<number> => {
	const { data } = await ApiClient.client.get(
		`/accounts/${accountId}/clicks/count-organic-clicks/${sessionId}`
	)
	return data.data
}

const exportClicks = async (
	accountId: string,
	assetId: string,
	query?: Record<string, any>
) => {
	const headers = {
		Authorization: `Bearer ${ApiClient.getAuthToken()}`
	}
	const impersonationId = JSON.parse(
		localStorage.getItem('imper_userId') as string
	)
	if (impersonationId)
		Object.assign(headers, { 'Impersonated-User-ID': impersonationId })

	toast.info('Exporting your clicks, this can take some minutes.', {
		autoClose: 4000
	})

	const response = await fetch(
		`${
			ApiConfig.API_BASE_URL
		}/accounts/${accountId}/clicks/export/${assetId}?${toQuery(query)}`,
		{
			headers
		}
	)

	if (response.body) {
		const reader = response.body.getReader()
		const stream = new ReadableStream({
			start(controller) {
				return pump()
				function pump(): Promise<void> {
					return reader.read().then(({ done, value }) => {
						if (done) {
							toast.success('Clicks exported, click your downloads tab.', {
								autoClose: 5000
							})
							controller.close()
							return
						}
						controller.enqueue(value)
						return pump()
					})
				}
			}
		})
		const newResponse = new Response(stream)
		const blob = await newResponse.blob()
		const url = URL.createObjectURL(blob)
		const link = document.createElement('a')
		link.href = url
		link.setAttribute(
			'download',
			`clicks-export-${moment().format('YYYY-MM-DD')}.csv`
		)
		document.body.appendChild(link)
		link.click()
	}
}

export const Clicks = {
	get,
	getById,
	countOrganicClicks,
	exportClicks
}
