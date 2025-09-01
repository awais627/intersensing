import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { RiUserLine, RiLockLine, RiEyeLine, RiEyeOffLine } from 'react-icons/ri'

export const LoginPage = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const [showPassword, setShowPassword] = useState(false)
	const { login } = useAuth()
	const navigate = useNavigate()

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		setError('')

		if (!username || !password) {
			setError('Please enter both username and password')
			return
		}

		const success = login(username, password)
		if (success) {
			navigate('/telemetry') // Redirect to main app
		} else {
			setError('Login failed. Please try again.')
		}
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-secondary-50 to-primary-100 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full">
				{/* Logo/Brand Section */}
				<div className="text-center mb-8">
					<div className="mx-auto h-16 w-16 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full flex items-center justify-center mb-4">
						<RiUserLine className="h-8 w-8 text-white" />
					</div>
					<h2 className="text-3xl font-bold text-gray-900 mb-2">
						Welcome Back
					</h2>
					<p className="text-gray-600">
						Sign in to your account to continue
					</p>
				</div>

				{/* Login Form Card */}
				<div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
					<form onSubmit={handleSubmit} className="space-y-6">
						{/* Username Field */}
						<div>
							<label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
								Username
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<RiUserLine className="h-5 w-5 text-gray-400" />
								</div>
								<input
									id="username"
									name="username"
									type="text"
									required
									className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 placeholder-gray-400"
									placeholder="Enter your username"
									value={username}
									onChange={(e) => setUsername(e.target.value)}
								/>
							</div>
						</div>

						{/* Password Field */}
						<div>
							<label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
								Password
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<RiLockLine className="h-5 w-5 text-gray-400" />
								</div>
								<input
									id="password"
									name="password"
									type={showPassword ? 'text' : 'password'}
									required
									className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 placeholder-gray-400"
									placeholder="Enter your password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
								<button
									type="button"
									className="absolute inset-y-0 right-0 pr-3 flex items-center"
									onClick={() => setShowPassword(!showPassword)}
								>
									{showPassword ? (
										<RiEyeOffLine className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
									) : (
										<RiEyeLine className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
									)}
								</button>
							</div>
						</div>

						{/* Error Message */}
						{error && (
							<div className="bg-red-50 border border-red-200 rounded-lg p-4">
								<div className="flex">
									<div className="flex-shrink-0">
										<svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
											<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
										</svg>
									</div>
									<div className="ml-3">
										<p className="text-sm text-red-800">{error}</p>
									</div>
								</div>
							</div>
						)}

						{/* Submit Button */}
						<button
							type="submit"
							className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
						>
							Sign In
						</button>
					</form>

					{/* Demo Info */}
					<div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
						<div className="flex">
							<div className="flex-shrink-0">
								<svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
									<path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
								</svg>
							</div>
							<div className="ml-3">
								<h3 className="text-sm font-medium text-blue-800">Demo Login</h3>
								<div className="mt-2 text-sm text-blue-700">
									<p>Use any credentials to test the system:</p>
									<p className="mt-1 font-mono text-xs">
										Username: <span className="font-semibold">demo</span> | 
										Password: <span className="font-semibold">demo123</span>
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Footer */}
				<div className="text-center mt-6">
					<p className="text-sm text-gray-500">
						This is a demo application for demonstration purposes only
					</p>
				</div>
			</div>
		</div>
	)
}
