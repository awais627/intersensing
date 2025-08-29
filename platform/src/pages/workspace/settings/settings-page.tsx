import React, { useState } from 'react'
import { ProfileSection } from 'components/settings/profile-section'
import { PasswordSection } from 'components/settings/password-section'
import {
	IChangePasswordForm,
	IUpdateProfileForm,
	IUserProfile
} from 'types/user-profile'
import { demoUserProfile } from 'data/demo-user-profile'
import { RiShieldUserLine, RiUserSettingsLine } from 'react-icons/ri'

export const SettingsPage: React.FC = () => {
	const [userProfile, setUserProfile] = useState<IUserProfile>(demoUserProfile)
	const [activeTab, setActiveTab] = useState<'profile' | 'password'>('profile')

	const handleUpdateProfile = (updatedProfile: IUpdateProfileForm) => {
		setUserProfile((prev) => ({
			...prev,
			...updatedProfile,
			updatedAt: new Date().toISOString()
		}))
	}

	const handleChangePassword = (passwordData: IChangePasswordForm) => {
		// In a real app, this would make an API call
		console.log('Password changed:', passwordData)
		// Reset form would be handled by the component
	}

	const tabs = [
		{
			id: 'profile' as const,
			label: 'Profile',
			icon: RiUserSettingsLine,
			description: 'Update your personal information and contact details'
		},
		{
			id: 'password' as const,
			label: 'Password',
			icon: RiShieldUserLine,
			description: 'Change your account password for enhanced security'
		}
	]

	return (
		<div className="p-6 max-w-4xl mx-auto">
			<div className="mb-8">
				<div className="flex items-center gap-3 mb-2">
					<RiUserSettingsLine className="w-8 h-8 text-blue-600" />
					<h1 className="text-3xl font-bold ">Settings</h1>
				</div>
				<p className="text-gray-600 text-lg">
					Manage your account settings, profile information, and security
					preferences.
				</p>
			</div>

			{/* Tab Navigation */}
			<div className="mb-8">
				<div className="border-b border-gray-200">
					<nav className="-mb-px flex space-x-8">
						{tabs.map((tab) => {
							const IconComponent = tab.icon
							return (
								<button
									key={tab.id}
									onClick={() => setActiveTab(tab.id)}
									className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
										activeTab === tab.id
											? 'border-blue-500 text-blue-600'
											: 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
									}`}
								>
									<div className="flex items-center gap-2">
										<IconComponent className="w-5 h-5" />
										{tab.label}
									</div>
								</button>
							)
						})}
					</nav>
				</div>
			</div>

			{/* Tab Content */}
			<div className="bg-white rounded-lg border border-gray-200 shadow-sm">
				{activeTab === 'profile' && (
					<ProfileSection
						userProfile={userProfile}
						onUpdateProfile={handleUpdateProfile}
					/>
				)}

				{activeTab === 'password' && (
					<PasswordSection onChangePassword={handleChangePassword} />
				)}
			</div>
		</div>
	)
}
