import { useLocation } from 'react-router-dom'

export function useUrlQuery() {
	const url = useLocation()
	let search
	url.hash.includes('#')
		? (search = url.hash.substring(1))
		: (search = useLocation().search)
	const query = new URLSearchParams(search)
	function paramsToObject(entries: any) {
		const result: any = {}
		for (const [key, value] of entries) {
			// each 'entry' is a [key, value] tupple
			result[key] = value
		}
		return result
	}
	return paramsToObject(query)
}

export function useUrlHash() {
	const hash = useLocation().hash
	return hash ? hash.substring(1) : null
}
