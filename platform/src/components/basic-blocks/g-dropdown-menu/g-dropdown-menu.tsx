import { ReactElement, ReactNode, useState } from 'react'
import { Popover } from '@headlessui/react'
import { classNames } from 'utils'
import { usePopper } from 'react-popper'
import { Placement } from '@popperjs/core'
import { GSlideOver } from '../g-slide-over'
import { GTransition } from '../g-transition'

type GDropDownInterface = {
	menuButton: ReactNode
	children: (close?: () => void) => ReactElement
	responsive?: boolean
	handleClick?: () => void
	anchor?: 'left' | 'right'
	position?: Placement
}

export function GDropdown(props: GDropDownInterface) {
	const { menuButton, children, responsive, anchor, position } = props

	const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(
		null
	)
	const [popperElement, setPopperElement] = useState<HTMLElement | null>(null)
	const [arrowElement, setArrowElement] = useState<HTMLElement | null>(null)

	const { styles, attributes } = usePopper(referenceElement, popperElement, {
		placement: position,
		modifiers: [{ name: 'arrow', options: { element: arrowElement } }]
	})

	const [open, setOpen] = useState(false)

	if (responsive)
		return (
			<>
				<div onClick={() => setOpen(true)} className="">
					{menuButton}
				</div>
				<GSlideOver
					position="right"
					open={open}
					setOpen={setOpen}
					className="flex md:hidden"
				>
					<div
						className={classNames(
							'absolute z-10 px-0 mt-0 transform sm:px-0 w-min whitespace-nowrap',
							anchor === 'right' ? 'right-0' : '',
							anchor === 'left' ? 'left-0' : ''
						)}
					>
						{children()}
					</div>
				</GSlideOver>
			</>
		)
	return (
		<div className="w-full">
			<Popover className="w-full items-center z-50 ">
				{({ open, close }) => (
					<>
						<Popover.Button
							ref={setReferenceElement}
							as="div"
							className={classNames('transition-colors ', open ? '' : '')}
							onClick={() =>
								props.handleClick ? props.handleClick() : setOpen(true)
							}
						>
							{menuButton}
							<div ref={setArrowElement} style={styles.arrow} />
						</Popover.Button>
						<div>
							{open && (
								<Popover.Panel
									ref={setPopperElement}
									style={styles.popper}
									className={classNames(
										'absolute px-0 transform sm:px-0 w-min z-40'
									)}
									{...attributes.popper}
								>
									<>
										<GTransition show={true}>{children(close)}</GTransition>
										<div ref={setArrowElement} style={styles.arrow} />
									</>
								</Popover.Panel>
							)}
						</div>
					</>
				)}
			</Popover>
		</div>
	)
}
