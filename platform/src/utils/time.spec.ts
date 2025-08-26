import { formatDuration } from './time'

describe('Time utils', () => {
	describe('formatDuration', () => {
		describe('when formatting in minutes', () => {
			describe('and the value in seconds correspond less than one full minute', () => {
				it('returns the value formatted in seconds instead of minutes', () => {
					const result = formatDuration(59, 'minutes')
					expect(result).toBe('59 sec')
				})
			})

			describe('and the value in seconds correspond at least one full minute', () => {
				it('returns the value formatted in minutes', () => {
					const result = formatDuration(399, 'minutes')
					expect(result).toBe('6 min')
				})
			})
		})

		describe('when formatting in hours', () => {
			describe('and the value in seconds correspond less than one full hour', () => {
				it('returns the value formatted in minutes instead of hours', () => {
					const result = formatDuration(3000, 'hours')
					expect(result).toBe('50 min')
				})
			})

			describe('and the value in seconds correspond at least one full hour', () => {
				it('returns the value formatted in hours', () => {
					const result = formatDuration(3960, 'hours')
					expect(result).toBe('1 h 6 min')
				})
			})
		})

		describe('when formatting in days', () => {
			describe('and the value in seconds correspond less than one full day', () => {
				it('returns the value formatted in hours instead of days', () => {
					const result = formatDuration(30000, 'days')
					expect(result).toBe('8 h 20 min')
				})
			})

			describe('and the value in seconds correspond at least one full hour', () => {
				it('returns the value formatted in days', () => {
					const result = formatDuration(298800, 'days')
					expect(result).toBe('3 days 11 h')
				})
			})
		})

		describe('when formatting in months', () => {
			describe('and the value in seconds correspond less than one full month', () => {
				it('returns the value formatted in days instead of months', () => {
					const result = formatDuration(2000000, 'months')
					expect(result).toBe('23 days 3 h')
				})
			})

			describe('and the value in seconds correspond at least one full hour', () => {
				it('returns the value formatted in months', () => {
					const result = formatDuration(3000000, 'months')
					expect(result).toBe('1 month 4 days')
				})
			})
		})
	})
})
