import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import { App } from './App'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false // TODO consider
		}
	}
})

const RootApp = () => {
	useEffect(() => {
		const metaTag = document.querySelector("meta[name='viewport']")
		if (metaTag) {
			if (
				window.innerWidth < 1024 &&
				window.location.pathname.includes('admin')
			) {
				metaTag.setAttribute('content', 'width=device-width, initial-scale=0.1')
			} else {
				metaTag.setAttribute('content', 'width=device-width, initial-scale=1')
			}
		}
	}, [])

	return (
		<QueryClientProvider client={queryClient}>
			<App />
			<ToastContainer
				position="bottom-center"
				autoClose={5000}
				hideProgressBar={true}
				newestOnTop={false}
				theme={'colored'}
				className="text-sm"
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				limit={1}
			/>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	)
}

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<RootApp />
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
