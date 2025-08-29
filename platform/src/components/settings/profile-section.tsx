import React, { useEffect, useState } from 'react'
import {
	IProfileValidationErrors,
	IUpdateProfileForm,
	IUserProfile
} from 'types/user-profile'
import {
	RiBuildingLine,
	RiCloseLine,
	RiEditLine,
	RiMailLine,
	RiPhoneLine,
	RiSaveLine,
	RiTimeLine,
	RiUser3Line
} from 'react-icons/ri'
import { format } from 'date-fns'

interface ProfileSectionProps {
	userProfile: IUserProfile
	onUpdateProfile: (profile: IUpdateProfileForm) => void
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({
	userProfile,
	onUpdateProfile
}) => {
	const [isEditing, setIsEditing] = useState(false)
	const [formData, setFormData] = useState<IUpdateProfileForm>({
		firstName: userProfile.firstName,
		lastName: userProfile.lastName,
		email: userProfile.email,
		phoneNumber: userProfile.phoneNumber
	})
	const [errors, setErrors] = useState<IProfileValidationErrors>({})

	useEffect(() => {
		setFormData({
			firstName: userProfile.firstName,
			lastName: userProfile.lastName,
			email: userProfile.email,
			phoneNumber: userProfile.phoneNumber
		})
	}, [userProfile])

	const validateForm = (): boolean => {
		const newErrors: IProfileValidationErrors = {}

		if (!formData.firstName.trim()) {
			newErrors.firstName = 'First name is required'
		}
		if (!formData.lastName.trim()) {
			newErrors.lastName = 'Last name is required'
		}
		if (!formData.email.trim()) {
			newErrors.email = 'Email is required'
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
			newErrors.email = 'Please enter a valid email address'
		}
		if (!formData.phoneNumber.trim()) {
			newErrors.phoneNumber = 'Phone number is required'
		} else if (
			!/^[\+]?[1-9][\d]{0,15}$/.test(
				formData.phoneNumber.replace(/[\s\-\(\)]/g, '')
			)
		) {
			newErrors.phoneNumber = 'Please enter a valid phone number'
		}

		setErrors(newErrors)
		return Object.keys(newErrors).length === 0
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		if (!validateForm()) {
			return
		}

		onUpdateProfile(formData)
		setIsEditing(false)
	}

	const handleCancel = () => {
		setFormData({
			firstName: userProfile.firstName,
			lastName: userProfile.lastName,
			email: userProfile.email,
			phoneNumber: userProfile.phoneNumber
		})
		setErrors({})
		setIsEditing(false)
	}

	const handleInputChange = (
		field: keyof IUpdateProfileForm,
		value: string
	) => {
		setFormData((prev) => ({ ...prev, [field]: value }))
		// Clear error when user starts typing
		if (errors[field]) {
			setErrors((prev) => ({ ...prev, [field]: undefined }))
		}
	}

	return (
		<div className="p-6">
			<div className="flex items-center justify-between mb-6">
				<h2 className="text-xl font-semibold ">Profile Information</h2>
				{!isEditing && (
					<button
						onClick={() => setIsEditing(true)}
						className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
					>
						<RiEditLine className="w-4 h-4" />
						Edit Profile
					</button>
				)}
			</div>

			{/* Profile Header */}
			<div className="flex items-center gap-6 mb-8 p-6 bg-gray-50 rounded-lg">
				<div className="relative">
					<img
						src={userProfile.avatar}
						alt={`${userProfile.firstName} ${userProfile.lastName}`}
						className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
					/>
					<div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
				</div>
				<div className="flex-1">
					<h3 className="text-2xl font-bold ">
						{userProfile.firstName} {userProfile.lastName}
					</h3>
					<p className="text-gray-600 mb-2">{userProfile.role}</p>
					<div className="flex items-center gap-4 text-sm text-gray-500">
						<div className="flex items-center gap-2">
							<RiBuildingLine className="w-4 h-4" />
							{userProfile.department}
						</div>
						<div className="flex items-center gap-2">
							<RiTimeLine className="w-4 h-4" />
							Last login:{' '}
							{format(new Date(userProfile.lastLogin), 'MMM dd, yyyy HH:mm')}
						</div>
					</div>
				</div>
			</div>

			{/* Profile Form */}
			<form onSubmit={handleSubmit} className="space-y-6">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{/* First Name */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							First Name *
						</label>
						<div className="relative">
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
								<RiUser3Line className="h-5 w-5 text-gray-400" />
							</div>
							<input
								type="text"
								value={formData.firstName}
								onChange={(e) => handleInputChange('firstName', e.target.value)}
								disabled={!isEditing}
								className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
									errors.firstName ? 'border-red-500' : 'border-gray-300'
								} ${!isEditing ? 'bg-gray-50 text-gray-500' : 'bg-white'}`}
								placeholder="Enter your first name"
							/>
						</div>
						{errors.firstName && (
							<p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
						)}
					</div>

					{/* Last Name */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Last Name *
						</label>
						<div className="relative">
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
								<RiUser3Line className="h-5 w-5 text-gray-400" />
							</div>
							<input
								type="text"
								value={formData.lastName}
								onChange={(e) => handleInputChange('lastName', e.target.value)}
								disabled={!isEditing}
								className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
									errors.lastName ? 'border-red-500' : 'border-gray-300'
								} ${!isEditing ? 'bg-gray-50 text-gray-500' : 'bg-white'}`}
								placeholder="Enter your last name"
							/>
						</div>
						{errors.lastName && (
							<p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
						)}
					</div>

					{/* Email */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Email Address *
						</label>
						<div className="relative">
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
								<RiMailLine className="h-5 w-5 text-gray-400" />
							</div>
							<input
								type="email"
								value={formData.email}
								onChange={(e) => handleInputChange('email', e.target.value)}
								disabled={!isEditing}
								className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
									errors.email ? 'border-red-500' : 'border-gray-300'
								} ${!isEditing ? 'bg-gray-50 text-gray-500' : 'bg-white'}`}
								placeholder="Enter your email address"
							/>
						</div>
						{errors.email && (
							<p className="mt-1 text-sm text-red-600">{errors.email}</p>
						)}
					</div>

					{/* Phone Number */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Phone Number *
						</label>
						<div className="relative">
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
								<RiPhoneLine className="h-5 w-5 text-gray-400" />
							</div>
							<input
								type="tel"
								value={formData.phoneNumber}
								onChange={(e) =>
									handleInputChange('phoneNumber', e.target.value)
								}
								disabled={!isEditing}
								className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
									errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
								} ${!isEditing ? 'bg-gray-50 text-gray-500' : 'bg-white'}`}
								placeholder="Enter your phone number"
							/>
						</div>
						{errors.phoneNumber && (
							<p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>
						)}
					</div>
				</div>

				{/* Account Info (Read-only) */}
				<div className="pt-6 border-t border-gray-200">
					<h4 className="text-lg font-medium  mb-4">Account Information</h4>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<label className="block text-sm font-medium text-gray-500 mb-1">
								User ID
							</label>
							<p className="text-sm  font-mono bg-gray-50 px-3 py-2 rounded border">
								{userProfile.id}
							</p>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-500 mb-1">
								Role
							</label>
							<p className="text-sm  bg-gray-50 px-3 py-2 rounded border">
								{userProfile.role}
							</p>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-500 mb-1">
								Department
							</label>
							<p className="text-sm  bg-gray-50 px-3 py-2 rounded border">
								{userProfile.department}
							</p>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-500 mb-1">
								Member Since
							</label>
							<p className="text-sm  bg-gray-50 px-3 py-2 rounded border">
								{format(new Date(userProfile.createdAt), 'MMM dd, yyyy')}
							</p>
						</div>
					</div>
				</div>

				{/* Form Actions */}
				{isEditing && (
					<div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
						<button
							type="button"
							onClick={handleCancel}
							className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
						>
							<RiCloseLine className="w-4 h-4 inline mr-2" />
							Cancel
						</button>
						<button
							type="submit"
							className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
						>
							<RiSaveLine className="w-4 h-4 inline mr-2" />
							Save Changes
						</button>
					</div>
				)}
			</form>
		</div>
	)
}
