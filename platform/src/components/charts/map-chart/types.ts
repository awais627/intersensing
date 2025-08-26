import { ReactElement } from 'react'

export interface MapChartProps {
	label: string
	data: any
	tooltip: (data: any, id?: any) => ReactElement
	type?: string
	noLegend?: boolean
	scale?: number
	translation?: [number, number]
	height?: string
	legendTranslate?: [number, number]
	symbolShape?: string
}
