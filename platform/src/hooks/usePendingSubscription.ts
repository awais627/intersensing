import { useEffect, useState } from 'react'
import { useStripe } from '@stripe/react-stripe-js'
import { useStores } from './useStores'
import { SubscriptionDTO } from '../../../api-models'
import { toast } from 'react-toastify'
import { ProductAccounts } from '../services/user'
import { setDelay } from '../utils/timeouts'

export const useSubscriptionManagement = ({
	subscription,
	shouldLoad,
	onSuccess
}: {
	subscription: SubscriptionDTO | null | undefined
	shouldLoad?: boolean
	onSuccess?: VoidFunction
}): SubscriptionDTO | null | undefined => {
	const stripe = useStripe()
	const { accountStore, billingStore } = useStores()
	const { account } = accountStore

	const [updatedSubscription, setUpdatedSubscription] = useState<
		SubscriptionDTO | null | undefined
	>(subscription)
	const [clearId, setClearId] = useState<NodeJS.Timeout | undefined>(undefined)

	const onConfirmPayment = async () => {
		const account = accountStore.account
		if (!account || !stripe || !updatedSubscription) return
		const piid = updatedSubscription?.pending_payment_intent
		if (!piid) return
		const pi = await billingStore.getPaymentIntent(account.id, piid)
		const pm = account.billing?.payment_method?.stripe_id
		await stripe.confirmCardPayment(pi.client_secret, { payment_method: pm })
		await setDelay(5000)
		await accountStore.getSubscriptionByAccountId(account.id)
		await accountStore.setAccountForId(account.id)
	}

	async function reFetchSubscription() {
		const sub =
			account && (await ProductAccounts.getSubscriptionByAccountId(account.id))
		sub && setUpdatedSubscription(sub)
	}

	useEffect(() => {
		if (updatedSubscription && shouldLoad) {
			if (updatedSubscription?.pending_payment_intent) {
				onSuccess && onSuccess()
				clearTimeout(clearId)
				onConfirmPayment()
			} else if (updatedSubscription?.payment_failed_reason) {
				;(async () => {
					if (account) {
						await ProductAccounts.clearSubscriptionFailedMessage(account.id)
						await accountStore.getSubscriptionByAccountId(account.id)
					}
				})()
				toast.error(
					updatedSubscription.payment_failed_reason ||
						'Your subscription has been cancelled'
				)
				clearId && clearTimeout(clearId)
				onSuccess && onSuccess()
			} else if (updatedSubscription?.status === 'ACTIVE') {
				;(async () => {
					account && (await accountStore.getSubscriptionByAccountId(account.id))
				})()
				onSuccess && onSuccess()
				clearTimeout(clearId)
			}
		}
	}, [updatedSubscription, shouldLoad])

	useEffect(() => {
		let intervalId: NodeJS.Timeout | undefined
		if (
			!shouldLoad ||
			updatedSubscription?.status !== 'PENDING' ||
			updatedSubscription?.pending_payment_intent
		) {
			clearId && clearTimeout(clearId)
			setClearId(undefined)
		}
		if (
			updatedSubscription?.status === 'PENDING' &&
			shouldLoad &&
			!updatedSubscription?.pending_payment_intent
		) {
			clearId && clearTimeout(clearId)
			intervalId = setInterval(reFetchSubscription, 5000)
			setClearId(intervalId)
		}
		return () => {
			intervalId && clearTimeout(intervalId)
			clearId && clearTimeout(clearId)
			setClearId(undefined)
		}
	}, [updatedSubscription, shouldLoad])

	useEffect(() => {
		if (subscription?.status === 'PENDING') setUpdatedSubscription(subscription)
	}, [subscription])

	useEffect(() => {
		if (!shouldLoad) {
			clearTimeout(clearId)
			setClearId(undefined)
		}
		return () => {
			clearTimeout(clearId)
			setClearId(undefined)
		}
	}, [shouldLoad])

	return subscription
}
