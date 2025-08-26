import { Outlet, useOutletContext, useParams } from 'react-router-dom'

type AssetContextType = {
	accountId: string
	assetId: string
}

export const AssetBase = () => {
	const { accountId, assetId } = useParams()

	return <Outlet context={{ accountId: accountId, assetId: assetId }} />
}

export function useAsset() {
	return useOutletContext<AssetContextType>()
}
