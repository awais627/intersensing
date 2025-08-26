import { InvoiceDTO } from 'api-models'
import { ApiClient } from '../api-client'

async function find(accountId: string): Promise<Array<InvoiceDTO>> {
	const { data } = await ApiClient.client.get(`/accounts/${accountId}/invoices`)
	return data.data
}

async function getById(accountId: string, id: string): Promise<InvoiceDTO> {
	const { data } = await ApiClient.client.get(
		`/accounts/${accountId}/invoices/${id}`
	)
	return data.data
}

async function download(accountId: string, id: string): Promise<any> {
	const { data } = await ApiClient.client.request({
		url: `/accounts/${accountId}/invoices/${id}/download`,
		method: 'GET',
		responseType: 'blob'
	})
	const url = window.URL.createObjectURL(new Blob([data]))
	const link = document.createElement('a')
	link.href = url
	link.setAttribute('download', `invoice-${id}.pdf`) //or any other extension
	document.body.appendChild(link)
	link.click()
}

export const Invoices = {
	find,
	getById,
	download
}
