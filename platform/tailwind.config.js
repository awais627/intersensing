/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
require('tailwindcss/defaultTheme')
module.exports = {
	mode: 'jit',
	content: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx}'],
	darkMode: ['class', '[data-mode="dark"]'],
	theme: {
		fontFamily: {
			sans: ['noah', 'Mulish', 'sans-serif'],
			grotesk: ['host-grotesk', 'sans-serif'],
		},
		fontWeight: {
			normal: 400,
			medium: 500,
			bold: 700,
			extrabold: 800
		},
		fontSize: {
			xs: ['10px', '12px'],
			sm: ['12px', '16px'],
			base: ['14px', '20px'],
			lg: ['16px', '24px'],
			xl: ['18px', '28px'],
			'2xl': ['24px', '32px'],
			'3xl': ['30px', '36px'],
			'5xl': ['32px', '40px'],
			'6xl': ['48px', '54px'],
			'7xl': ['72px', '80px'],
			'8xl': ['88px', '96px']
		},

		extend: {
			colors: {
				white: 'var(--background)',

				'primary-100': 'var(--color-primary-100)',
				'primary-200': 'var(--color-primary-200)',
				'primary-300': 'var(--color-primary-300)',
				'primary-400': 'var(--color-primary-400)',
				'primary-500': 'var(--color-primary-500)',
				'primary-600': 'var(--color-primary-600)',
				'primary-700': 'var(--color-primary-700)',
				'primary-800': 'var(--color-primary-800)',
				'primary-900': 'var(--color-primary-900)',

				gray: {
					50: 'var(--color-gray-50)',
					100: 'var(--color-gray-100)',
					200: 'var(--color-gray-200)',
					300: 'var(--color-gray-300)',
					400: 'var(--color-gray-400)',
					500: 'var(--color-gray-500)',
					600: 'var(--color-gray-600)',
					700: 'var(--color-gray-700)'
				},

				red: {
					100: 'var(--color-red-100)',
					300: 'var(--color-red-300)',
					400: 'var(--color-red-400)',
					500: 'var(--color-red-500)',
					600: 'var(--color-red-600)',
					700: 'var(--color-red-700)',
					900: 'var(--color-red-900)'
				},

				amber: {
					100: 'var(--color-amber-100)',
					300: 'var(--color-amber-300)',
					400: 'var(--color-amber-400)',
					500: 'var(--color-amber-500)',
					600: 'var(--color-amber-600)',
					700: 'var(--color-amber-700)',
					900: 'var(--color-amber-900)'
				},

				green: {
					100: 'var(--color-green-100)',
					300: 'var(--color-green-300)',
					400: 'var(--color-green-400)',
					500: 'var(--color-green-500)',
					600: 'var(--color-green-600)',
					700: 'var(--color-green-700)',
					900: 'var(--color-green-900)'
				},

				purple: {
					100: 'var(--color-purple-100)',
					300: 'var(--color-purple-300)',
					400: 'var(--color-purple-400)',
					500: 'var(--color-purple-500)',
					600: 'var(--color-purple-600)',
					700: 'var(--color-purple-700)',
					900: 'var(--color-purple-900)'
				},

				'onboarding-panel': 'var(--onboarding-panel)',

				'card-background': 'var(--card-background)',

				't-light': 'var(--color-text-light)',
				't-dark': 'var(--color-text-dark)',
				't-secondary': 'var(--color-text-secondary)',
				't-tertiary': 'var(--color-text-tertiary)',
				't-border': 'var(--color-text-border)',
				't-title': 'var(--color-text-title)',
				't-heading': 'var(--color-text-heading)',
				't-menu': 'var(--color-text-menu)',
				't-default': 'var(--color-text-default)',
				'badge-default': 'var(--badge-color-default)',
				'badge-selected': 'var(--badge-color-selected)',
				'badge-text-default': 'var(--badge-text-color-default)',
				'badge-text-selected': 'var(--badge-text-color-selected)',
				'badge-primary-100': 'var(--badge-color-green)',
				'badge-primary-600': 'var(--badge-color-green-600)',
				'button-primary': 'var(--button--color-primary)',
				't-border-light': 'var(--border-color-light)',
				't-menu-background': 'var(--menu-background-semi)',
				't-button-secondary': 'var(--button-color-secondary)',
				't-button-text-secondary': 'var(--button-color-secondary-text)',
				't-button-border-secondary': 'var(--button-color-secondary-border)',
				't-button-tertiary': 'var(--button-color-tertiary)',
				't-button-text-tertiary': 'var(--button-color-tertiary-text)',
				't-color-primary-tab': 'var(--color-primary-tab)',
				't-color-tab-border': 'var(--color-tab-border)',
				't-tab-border': 'var(--tab-border)',
				't-input-background': 'var(--input-background)',
				't-input-border': 'var(--input-border)',
				't-border-lighter': 'var(--border-color-lighter)',
				't-border-grey-100': 'var(--border-color-grey-100)',
				't-background-light': 'var(--background-color-light)',
				'secondary-100': 'var(--color-secondary-100)',
				'primary-legend-100': 'var(--color-legend-100)',
				'table-header-background': 'var(--table-header-background)',
				't-table-text-primary': 'var(--text-table-primary)',
				't-selected-menu-item': 'var(--selected-menu-item)',
				'elemental-500': 'var(--button-elemental-500)',
				'select-field': 'var(--select-field-border)',
				'drawer-text-color': 'var(--color-text-drawer)',
				'light-background': 'var(--background-lighter-color)',
				't-border-gray-100': 'var(--border-gray-100)',
				'card-border': 'var(--card-border)',
				't-button': 'var(--text-button)',
				'modal-background': 'var(--modal-background)',
				't-chart': 'var(--color-text-chart)',
				'background-semi': 'var(--menu-background-semi)',
				't-base-blue': 'var(--base-blue)',
				't-desc-gray': 'var(--t-desc-gray)',
				't-gray-hold': 'var(--t-gray-hold)',
				't-gray-input': 'var(--t-gray-input)',
				'b-yellow': 'var(--b-yellow)',
				's-yellow': 'var(--s-yellow)',
				'b-yellow-dark': 'var(--b-yellow-dark)',
				't-blue-active': 'var(--base-blue-active)',
				't-checkbox': 'var(--t-checkbox)',
				't-checkbox-unactive': 'var(--t-checkbox-unactive)',
				't-dark-blue': 'var(--t-dark-blue)',
				't-ad-border': 'var(--t-ad-border)',
				't-ad-text': 'var(--t-ad-text)',
			},

			boxShadow: {
				's-yellow': 'var(--s-yellow)',
			},
			screens: {
				'3xl': '1600px',
				'4xl': '1750px',
				print: { raw: 'print' },
				screen: { raw: 'screen' },
				mobile: { max: '640px' } // Define 'mobile' for screens smaller than 640px
			}
		}
	},
	plugins: [require('@tailwindcss/forms')]
}
