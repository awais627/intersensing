import { DiscountInfoDTO } from 'api-models'
import { discountText, formatCurrencyDiscount } from 'utils'

describe('Utils index', () => {
	describe('discountText', () => {
		describe('when the discount is a fixed amount off', () => {
			describe('and the duration is once', () => {
				it('returns amount value off for first payment"', () => {
					const discount = {
						amount_off: 10000,
						percent_off: null,
						duration: 'once',
						months: null
					} as DiscountInfoDTO

					const result = discountText(discount)
					expect(result).toBe('$100 once')
				})
			})

			describe('and the duration is forever', () => {
				it('returns amount value off forever', () => {
					const discount = {
						amount_off: 10000,
						percent_off: null,
						duration: 'forever',
						months: null
					} as DiscountInfoDTO

					const result = discountText(discount)
					expect(result).toBe('$100 forever')
				})
			})

			describe('and the duration is repeating', () => {
				it('returns amount value off for count of months', () => {
					const discount = {
						amount_off: 10000,
						percent_off: null,
						duration: 'repeating',
						months: 3
					} as DiscountInfoDTO

					const result = discountText(discount)
					expect(result).toBe('$100 for 3 months')
				})
			})
		})

		describe('when the discount is by percentage', () => {
			describe('and the duration is once', () => {
				it('returns percentage value off for first payment"', () => {
					const discount = {
						amount_off: null,
						percent_off: 10,
						duration: 'once',
						months: null
					} as DiscountInfoDTO

					const result = discountText(discount)
					expect(result).toBe('10% once')
				})
			})

			describe('and the duration is forever', () => {
				it('returns percentage value off forever', () => {
					const discount = {
						amount_off: null,
						percent_off: 10,
						duration: 'forever',
						months: null
					} as DiscountInfoDTO

					const result = discountText(discount)
					expect(result).toBe('10% forever')
				})
			})

			describe('and the duration is repeating', () => {
				it('returns percentage value off for count of months', () => {
					const discount = {
						amount_off: null,
						percent_off: 10,
						duration: 'repeating',
						months: 3
					} as DiscountInfoDTO

					const result = discountText(discount)
					expect(result).toBe('10% for 3 months')
				})
			})
		})
	})

	describe('formatCurrencyDiscount', () => {
		describe('where there is no value or value is 0', () => {
			it('returns "Free"', () => {
				const result = formatCurrencyDiscount(0, { amountOff: 10000 })
				expect(result).toBe('Free')
			})
		})

		describe('where there is a valid valid', () => {
			describe('and the discount is a fixed amount', () => {
				it('returns the correct final price formatted', () => {
					const result = formatCurrencyDiscount(19900, { amountOff: 10000 })
					expect(result).toBe('$99.00')
				})
			})

			describe('and the discount is by percentage', () => {
				it('returns the correct final price formatted', () => {
					const result = formatCurrencyDiscount(19900, { percentOff: 10 })
					expect(result).toBe('$179.10')
				})
			})
		})
	})
})
