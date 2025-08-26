import { GoogleAdsAdAccountDTO } from 'api-models'
import renderer from 'react-test-renderer'
import { renderOptions } from './render-options'

describe('Utils', () => {
	describe('RenderOptions', () => {
		describe('when platform is Google', () => {
			describe('and it does not have a customized color', () => {
				it('renders correctly with the default color', () => {
					const google = {
						platform: 'GADS',
						color: null,
						name: 'Google Ads AdAccount',
						details: {
							account_number: '123456789'
						}
					} as GoogleAdsAdAccountDTO

					const tree = renderer.create(renderOptions(google))

					expect(tree).toMatchSnapshot()
				})
			})

			describe('and it does have a customized color', () => {
				it('renders correctly with the customized color', () => {
					const google = {
						platform: 'GADS',
						color: '#b91c1c',
						name: 'Google Ads AdAccount',
						details: {
							account_number: '123456789'
						}
					} as GoogleAdsAdAccountDTO

					const tree = renderer.create(renderOptions(google))

					expect(tree).toMatchSnapshot()
				})
			})
		})

		describe('when platform is Facebook', () => {
			describe('and it does not have a customized color', () => {
				it('renders correctly with the default color', () => {
					const facebook = {
						platform: 'FADS',
						color: null,
						name: 'Facebook Ads AdAccount',
						details: {
							account_number: '123456789'
						}
					} as GoogleAdsAdAccountDTO

					const tree = renderer.create(renderOptions(facebook))

					expect(tree).toMatchSnapshot()
				})
			})

			describe('and it does have a customized color', () => {
				it('renders correctly with the customized color', () => {
					const facebook = {
						platform: 'FADS',
						color: '#1d4ed8',
						name: 'Facebook Ads AdAccount',
						details: {
							account_number: '123456789'
						}
					} as GoogleAdsAdAccountDTO

					const tree = renderer.create(renderOptions(facebook))

					expect(tree).toMatchSnapshot()
				})
			})
		})
	})
})
