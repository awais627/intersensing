import * as Tooltip from '@radix-ui/react-tooltip'

import { GNewTooltipProps } from './types'

export const GNewTooltip = ({
	children,
	content,
	position = 'bottom',
	delayDuration = 100,
	skipDelayDuration = 0
}: GNewTooltipProps) => {
	return (
		<Tooltip.Provider
			delayDuration={delayDuration}
			skipDelayDuration={skipDelayDuration}
		>
			<Tooltip.Root>
				<Tooltip.Trigger asChild>
					<div>{children}</div>
				</Tooltip.Trigger>
				<Tooltip.Portal>
					{content ? (
						<Tooltip.Content
							className="bg-white text-t-default shadow-lg px-4 py-2 rounded-lg border text-sm max-w-xs whitespace-normal z-[10000005]"
							side={position}
							sideOffset={3}
						>
							{content}
						</Tooltip.Content>
					) : null}
				</Tooltip.Portal>
			</Tooltip.Root>
		</Tooltip.Provider>
	)
}
