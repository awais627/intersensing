import { RiArrowRightSLine } from 'react-icons/ri'
import { MdDeviceHub } from 'react-icons/md'

export const DemoBreadcrumbs = () => {
	return (
		<div className="flex items-center px-4">
			<div className={'py-2 px-1 cursor-pointer'}>
				<div className="flex items-center">
					<MdDeviceHub className="h-5 w-5" />

					<p
						className={
							'mx-2 text-t-default max-w-[100px] truncate border-b-primary-300 border-b-2'
						}
					>
						{'Machine'}
					</p>
				</div>
			</div>
			<>
				<RiArrowRightSLine color="#69707D" className="ml-2 mr-3" size={16} />
				<div className={'flex items-center cursor-pointer relative py-2 px-1'}>
					<div className="flex items-center">
						<span
							className={'text-t-default mx-2 truncate max-w-[100px] block'}
						>
							{'Demo device 1'}
						</span>
					</div>
				</div>
			</>
		</div>
	)
}
