export interface IUserProfile {
  id: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  avatar?: string
  role: string
  department: string
  lastLogin: string
  createdAt: string
  updatedAt: string
}

export interface IUpdateProfileForm {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
}

export interface IChangePasswordForm {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export interface IProfileValidationErrors {
  firstName?: string
  lastName?: string
  email?: string
  phoneNumber?: string
}

export interface IPasswordValidationErrors {
  currentPassword?: string
  newPassword?: string
  confirmPassword?: string
}
