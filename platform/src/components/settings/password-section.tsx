import React, { useState } from 'react'
import {
	IChangePasswordForm,
	IPasswordValidationErrors
} from 'types/user-profile'
import {
	RiCheckLine,
	RiEyeLine,
	RiEyeOffLine,
	RiLockLine,
	RiShieldUserLine
} from 'react-icons/ri'

interface PasswordSectionProps {
	onChangePassword: (passwordData: IChangePasswordForm) => void
}

export const PasswordSection: React.FC<PasswordSectionProps> = ({
	onChangePassword
}) => {
	const [formData, setFormData] = useState<IChangePasswordForm>({
		currentPassword: '',
		newPassword: '',
		confirmPassword: ''
	})
	const [errors, setErrors] = useState<IPasswordValidationErrors>({})
	const [showPasswords, setShowPasswords] = useState({
		current: false,
		new: false,
		confirm: false
	})
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [isSuccess, setIsSuccess] = useState(false)

	const validateForm = (): boolean => {
		const newErrors: IPasswordValidationErrors = {}

		if (!formData.currentPassword.trim()) {
			newErrors.currentPassword = 'Current password is required'
		}

		if (!formData.newPassword.trim()) {
			newErrors.newPassword = 'New password is required'
		} else if (formData.newPassword.length < 8) {
			newErrors.newPassword = 'Password must be at least 8 characters long'
		} else if (!/(?=.*[a-z])/.test(formData.newPassword)) {
			newErrors.newPassword =
				'Password must contain at least one lowercase letter'
		} else if (!/(?=.*[A-Z])/.test(formData.newPassword)) {
			newErrors.newPassword =
				'Password must contain at least one uppercase letter'
		} else if (!/(?=.*\d)/.test(formData.newPassword)) {
			newErrors.newPassword = 'Password must contain at least one number'
		} else if (!/(?=.*[@$!%*?&])/.test(formData.newPassword)) {
			newErrors.newPassword =
				'Password must contain at least one special character (@$!%*?&)'
		}

		if (!formData.confirmPassword.trim()) {
			newErrors.confirmPassword = 'Please confirm your new password'
		} else if (formData.newPassword !== formData.confirmPassword) {
			newErrors.confirmPassword = 'Passwords do not match'
		}

		if (formData.currentPassword === formData.newPassword) {
			newErrors.newPassword =
				'New password must be different from current password'
		}

		setErrors(newErrors)
		return Object.keys(newErrors).length === 0
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		if (!validateForm()) {
			return
		}

		setIsSubmitting(true)

		try {
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1000))

			onChangePassword(formData)
			setIsSuccess(true)

			// Reset form
			setFormData({
				currentPassword: '',
				newPassword: '',
				confirmPassword: ''
			})

			// Hide success message after 3 seconds
			setTimeout(() => setIsSuccess(false), 3000)
		} catch (error) {
			console.error('Error changing password:', error)
		} finally {
			setIsSubmitting(false)
		}
	}

	const handleInputChange = (
		field: keyof IChangePasswordForm,
		value: string
	) => {
		setFormData((prev) => ({ ...prev, [field]: value }))
		// Clear error when user starts typing
		if (errors[field]) {
			setErrors((prev) => ({ ...prev, [field]: undefined }))
		}
	}

	const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
		setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }))
	}

	const getPasswordStrength = (
		password: string
	): { score: number; label: string; color: string } => {
		let score = 0
		if (password.length >= 8) score++
		if (/(?=.*[a-z])/.test(password)) score++
		if (/(?=.*[A-Z])/.test(password)) score++
		if (/(?=.*\d)/.test(password)) score++
		if (/(?=.*[@$!%*?&])/.test(password)) score++

		switch (score) {
			case 0:
			case 1:
				return { score, label: 'Very Weak', color: 'bg-red-500' }
			case 2:
				return { score, label: 'Weak', color: 'bg-orange-500' }
			case 3:
				return { score, label: 'Fair', color: 'bg-yellow-500' }
			case 4:
				return { score, label: 'Good', color: 'bg-blue-500' }
			case 5:
				return { score, label: 'Strong', color: 'bg-green-500' }
			default:
				return { score, label: 'Very Weak', color: 'bg-red-500' }
		}
	}

	const passwordStrength = getPasswordStrength(formData.newPassword)

	return (
		<div className="p-6">
			<div className="mb-6">
				<h2 className="text-xl font-semibold ">Change Password</h2>
				<p className="text-gray-600 mt-2">
					Update your password to keep your account secure. Make sure to use a
					strong password that you haven't used elsewhere.
				</p>
			</div>

			{/* Success Message */}
			{isSuccess && (
				<div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
					<div className="flex items-center gap-3">
						<RiCheckLine className="w-5 h-5 text-green-600" />
						<div>
							<h3 className="text-sm font-medium text-green-800">
								Password Updated Successfully
							</h3>
							<p className="text-sm text-green-700">
								Your password has been changed. Please log in with your new
								password on your next session.
							</p>
						</div>
					</div>
				</div>
			)}

			<form onSubmit={handleSubmit} className="space-y-6">
				{/* Current Password */}
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Current Password *
					</label>
					<div className="relative">
						<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
							<RiLockLine className="h-5 w-5 text-gray-400" />
						</div>
						<input
							type={showPasswords.current ? 'text' : 'password'}
							value={formData.currentPassword}
							onChange={(e) =>
								handleInputChange('currentPassword', e.target.value)
							}
							className={`w-full pl-10 pr-12 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
								errors.currentPassword ? 'border-red-500' : 'border-gray-300'
							}`}
							placeholder="Enter your current password"
						/>
						<button
							type="button"
							onClick={() => togglePasswordVisibility('current')}
							className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
						>
							{showPasswords.current ? (
								<RiEyeOffLine className="h-5 w-5" />
							) : (
								<RiEyeLine className="h-5 w-5" />
							)}
						</button>
					</div>
					{errors.currentPassword && (
						<p className="mt-1 text-sm text-red-600">
							{errors.currentPassword}
						</p>
					)}
				</div>

				{/* New Password */}
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						New Password *
					</label>
					<div className="relative">
						<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
							<RiShieldUserLine className="h-5 w-5 text-gray-400" />
						</div>
						<input
							type={showPasswords.new ? 'text' : 'password'}
							value={formData.newPassword}
							onChange={(e) => handleInputChange('newPassword', e.target.value)}
							className={`w-full pl-10 pr-12 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
								errors.newPassword ? 'border-red-500' : 'border-gray-300'
							}`}
							placeholder="Enter your new password"
						/>
						<button
							type="button"
							onClick={() => togglePasswordVisibility('new')}
							className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
						>
							{showPasswords.new ? (
								<RiEyeOffLine className="h-5 w-5" />
							) : (
								<RiEyeLine className="h-5 w-5" />
							)}
						</button>
					</div>

					{/* Password Strength Indicator */}
					{formData.newPassword && (
						<div className="mt-2">
							<div className="flex items-center gap-2 mb-1">
								<div className="flex gap-1">
									{[1, 2, 3, 4, 5].map((level) => (
										<div
											key={level}
											className={`w-2 h-2 rounded-full ${
												level <= passwordStrength.score
													? passwordStrength.color
													: 'bg-gray-200'
											}`}
										/>
									))}
								</div>
								<span
									className={`text-xs font-medium ${
										passwordStrength.score >= 4
											? 'text-green-600'
											: passwordStrength.score >= 3
											? 'text-yellow-600'
											: 'text-red-600'
									}`}
								>
									{passwordStrength.label}
								</span>
							</div>
						</div>
					)}

					{errors.newPassword && (
						<p className="mt-1 text-sm text-red-600">{errors.newPassword}</p>
					)}
				</div>

				{/* Confirm New Password */}
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Confirm New Password *
					</label>
					<div className="relative">
						<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
							<RiShieldUserLine className="h-5 w-5 text-gray-400" />
						</div>
						<input
							type={showPasswords.confirm ? 'text' : 'password'}
							value={formData.confirmPassword}
							onChange={(e) =>
								handleInputChange('confirmPassword', e.target.value)
							}
							className={`w-full pl-10 pr-12 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
								errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
							}`}
							placeholder="Confirm your new password"
						/>
						<button
							type="button"
							onClick={() => togglePasswordVisibility('confirm')}
							className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
						>
							{showPasswords.confirm ? (
								<RiEyeOffLine className="h-5 w-5" />
							) : (
								<RiEyeLine className="h-5 w-5" />
							)}
						</button>
					</div>
					{errors.confirmPassword && (
						<p className="mt-1 text-sm text-red-600">
							{errors.confirmPassword}
						</p>
					)}
				</div>

				{/* Password Requirements */}
				<div className="p-4 bg-gray-50 rounded-lg">
					<h4 className="text-sm font-medium  mb-3">Password Requirements</h4>
					<ul className="space-y-2 text-sm text-gray-600">
						<li
							className={`flex items-center gap-2 ${
								formData.newPassword.length >= 8 ? 'text-green-600' : ''
							}`}
						>
							<RiCheckLine
								className={`w-4 h-4 ${
									formData.newPassword.length >= 8
										? 'text-green-600'
										: 'text-gray-400'
								}`}
							/>
							At least 8 characters long
						</li>
						<li
							className={`flex items-center gap-2 ${
								/(?=.*[a-z])/.test(formData.newPassword) ? 'text-green-600' : ''
							}`}
						>
							<RiCheckLine
								className={`w-4 h-4 ${
									/(?=.*[a-z])/.test(formData.newPassword)
										? 'text-green-600'
										: 'text-gray-400'
								}`}
							/>
							Contains at least one lowercase letter
						</li>
						<li
							className={`flex items-center gap-2 ${
								/(?=.*[A-Z])/.test(formData.newPassword) ? 'text-green-600' : ''
							}`}
						>
							<RiCheckLine
								className={`w-4 h-4 ${
									/(?=.*[A-Z])/.test(formData.newPassword)
										? 'text-green-600'
										: 'text-gray-400'
								}`}
							/>
							Contains at least one uppercase letter
						</li>
						<li
							className={`flex items-center gap-2 ${
								/(?=.*\d)/.test(formData.newPassword) ? 'text-green-600' : ''
							}`}
						>
							<RiCheckLine
								className={`w-4 h-4 ${
									/(?=.*\d)/.test(formData.newPassword)
										? 'text-green-600'
										: 'text-gray-400'
								}`}
							/>
							Contains at least one number
						</li>
						<li
							className={`flex items-center gap-2 ${
								/(?=.*[@$!%*?&])/.test(formData.newPassword)
									? 'text-green-600'
									: ''
							}`}
						>
							<RiCheckLine
								className={`w-4 h-4 ${
									/(?=.*[@$!%*?&])/.test(formData.newPassword)
										? 'text-green-600'
										: 'text-gray-400'
								}`}
							/>
							Contains at least one special character (@$!%*?&)
						</li>
					</ul>
				</div>

				{/* Form Actions */}
				<div className="flex justify-end pt-6 border-t border-gray-200">
					<button
						type="submit"
						disabled={isSubmitting}
						className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{isSubmitting ? (
							<div className="flex items-center gap-2">
								<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
								Updating Password...
							</div>
						) : (
							'Update Password'
						)}
					</button>
				</div>
			</form>
		</div>
	)
}
