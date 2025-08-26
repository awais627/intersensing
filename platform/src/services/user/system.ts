import { DiscountInfoDTO, PricingTierInfoDTO } from 'api-models'
import { ApiClient } from '../api-client'

async function getPricingPlans(): Promise<Array<PricingTierInfoDTO>> {
	const { data } = await ApiClient.client.get('/system/clickguard/plans')
	return data.data
}

async function getCoupon(code: string): Promise<DiscountInfoDTO> {
	const { data } = await ApiClient.client.get(`/system/coupons/${code}`)
	return data.data
}

export const System = {
	getPricingPlans,
	getCoupon
}
