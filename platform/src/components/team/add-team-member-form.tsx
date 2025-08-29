import React, { useState } from 'react'
import { IAddTeamMemberForm, ITeamMemberValidationErrors } from 'types/team'
import { availableRoles, availableDepartments, availablePermissions } from 'data/demo-team'
import { RiCloseLine, RiUser3Line, RiMailLine, RiBuildingLine, RiShieldLine } from 'react-icons/ri'

interface AddTeamMemberFormProps {
  onSubmit: (member: IAddTeamMemberForm) => void
  onCancel: () => void
}

export const AddTeamMemberForm: React.FC<AddTeamMemberFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<IAddTeamMemberForm>({
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    department: '',
    permissions: ['read']
  })

  const [errors, setErrors] = useState<ITeamMemberValidationErrors>({})

  const validateForm = (): boolean => {
    const newErrors: ITeamMemberValidationErrors = {}

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
    if (!formData.role.trim()) {
      newErrors.role = 'Role is required'
    }
    if (!formData.department.trim()) {
      newErrors.department = 'Department is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    onSubmit(formData)
  }

  const handleInputChange = (field: keyof IAddTeamMemberForm, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field as keyof ITeamMemberValidationErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const togglePermission = (permission: string) => {
    const currentPermissions = formData.permissions
    if (currentPermissions.includes(permission)) {
      handleInputChange('permissions', currentPermissions.filter(p => p !== permission))
    } else {
      handleInputChange('permissions', [...currentPermissions, permission])
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Add Team Member</h2>
            <button
              onClick={onCancel}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <RiCloseLine className="w-6 h-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
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
                  className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.firstName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter first name"
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
                  className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.lastName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter last name"
                />
              </div>
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
              )}
            </div>
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
                className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter email address"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Role and Department */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <RiShieldLine className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  value={formData.role}
                  onChange={(e) => handleInputChange('role', e.target.value)}
                  className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.role ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select a role</option>
                  {availableRoles.map((role) => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>
              {errors.role && (
                <p className="mt-1 text-sm text-red-600">{errors.role}</p>
              )}
            </div>

            {/* Department */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Department *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <RiBuildingLine className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  value={formData.department}
                  onChange={(e) => handleInputChange('department', e.target.value)}
                  className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.department ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select a department</option>
                  {availableDepartments.map((dept) => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
              {errors.department && (
                <p className="mt-1 text-sm text-red-600">{errors.department}</p>
              )}
            </div>
          </div>

          {/* Permissions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Permissions
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {availablePermissions.map((permission) => (
                <label key={permission} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.permissions.includes(permission)}
                    onChange={() => togglePermission(permission)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700 capitalize">{permission}</span>
                </label>
              ))}
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Select the permissions this team member should have. At minimum, all members get 'read' access.
            </p>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Team Member
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
