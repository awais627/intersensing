import { ApiClient } from '../api-client'
import { toQuery } from '../../utils'
import { toast } from 'react-toastify'
import { ApiConfig } from '../../config'
import moment from 'moment/moment'
import { LegacyUserDTO } from '../../pages/admin/legacy-user/types'

const searchByEmail = async (
	email: string
): Promise<LegacyUserDTO | null | undefined> => {
	const { data } = await ApiClient.client.get(
		`/admin/legacy-data/users?email=${email}`
	)
	return data.data
}

const getInvoices = async (query: any): Promise<any> => {
	const { data } = await ApiClient.client.get(
		`admin/legacy-data/invoices?${toQuery(query)}`
	)
	return data.data
}

const downloadInvoice = async (invoiceId: string) => {
	const { data } = await ApiClient.client.request({
		url: `/admin/legacy-data/invoice/${invoiceId}/download`,
		method: 'GET',
		responseType: 'blob'
	})
	const url = window.URL.createObjectURL(new Blob([data]))
	const link = document.createElement('a')
	link.href = url
	link.setAttribute('download', `invoice-${invoiceId}.pdf`) //or any other extension
	document.body.appendChild(link)
	link.click()
}

const exportUser = async (query: Record<string, any>) => {
	const headers = {
		Authorization: `Bearer ${ApiClient.getAuthToken()}`
	}

	toast.info('Exporting Legacy users, this can take some minutes.', {
		autoClose: 4000
	})

	const response = await fetch(
		`${ApiConfig.API_BASE_URL}/admin/legacy-data/users/export?${toQuery(
			query
		)}`,
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
							toast.success(
								'Legacy Users exported, click your downloads tab.',
								{
									autoClose: 5000
								}
							)
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
			`legacy-user-export-${moment().format('YYYY-MM-DD')}.csv`
		)
		document.body.appendChild(link)
		link.click()
	}
}

export const LegacyUserService = {
	searchByEmail,
	getInvoices,
	downloadInvoice,
	exportUser
}
