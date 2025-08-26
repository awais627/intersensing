import { GoogleAdsAdAccountDTO } from 'api-models'
import { BsMeta } from 'react-icons/bs'
import { RiGoogleLine } from 'react-icons/ri'
import { removeFadPrefix } from 'utils'
import { defaultPlatformColor } from 'utils/colors'

export const renderOptions = (option: GoogleAdsAdAccountDTO) => {
	return (
		<div className="flex justify-center items-center gap-x-3">
			<div
				className={'flex items-center justify-center w-6 h-6 rounded-full'}
				style={{
					background: option.color || defaultPlatformColor(option.platform)
				}}
			>
				{option?.platform === 'GADS' ? (
					<RiGoogleLine className="w-4 h-4 text-white" />
				) : (
					<BsMeta className="w-4 h-4 text-white" />
				)}
			</div>
			<div className="flex flex-col">
				<span className="text-xs">{option?.name}</span>
				<span className="text-xs">
					{removeFadPrefix(option?.details.account_number)}
				</span>
			</div>
		</div>
	)
}
