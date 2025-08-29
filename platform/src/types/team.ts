export interface ITeamMember {
  id: string
  firstName: string
  lastName: string
  email: string
  role: string
  department: string
  avatar?: string
  status: 'active' | 'inactive' | 'pending'
  joinDate: string
  lastActive: string
  permissions: string[]
}

export interface IAddTeamMemberForm {
  firstName: string
  lastName: string
  email: string
  role: string
  department: string
  permissions: string[]
}

export interface ITeamMemberValidationErrors {
  firstName?: string
  lastName?: string
  email?: string
  role?: string
  department?: string
}

export interface ITeamStats {
  totalMembers: number
  activeMembers: number
  inactiveMembers: number
  pendingMembers: number
  departments: { name: string; count: number }[]
  roles: { name: string; count: number }[]
}
