import React, { useState } from 'react'
import { TeamStats } from 'components/team/team-stats'
import { TeamMembersList } from 'components/team/team-members-list'
import { AddTeamMemberForm } from 'components/team/add-team-member-form'
import { ITeamMember, ITeamStats, IAddTeamMemberForm } from 'types/team'
import { demoTeamMembers, demoTeamStats } from 'data/demo-team'
import { RiTeamLine, RiAddLine, RiFilterLine } from 'react-icons/ri'

export const TeamPage: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<ITeamMember[]>(demoTeamMembers)
  const [teamStats, setTeamStats] = useState<ITeamStats>(demoTeamStats)
  const [showAddForm, setShowAddForm] = useState(false)
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive' | 'pending'>('all')
  const [filterDepartment, setFilterDepartment] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const handleAddTeamMember = (newMember: IAddTeamMemberForm) => {
    const member: ITeamMember = {
      id: `member-${Date.now()}`,
      ...newMember,
      avatar: `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000000)}?w=150&h=150&fit=crop&crop=face`,
      status: 'pending',
      joinDate: new Date().toISOString(),
      lastActive: new Date().toISOString()
    }

    setTeamMembers(prev => [member, ...prev])
    updateTeamStats([member, ...teamMembers])
    setShowAddForm(false)
  }

  const handleRemoveTeamMember = (memberId: string) => {
    const updatedMembers = teamMembers.filter(member => member.id !== memberId)
    setTeamMembers(updatedMembers)
    updateTeamStats(updatedMembers)
  }

  const handleUpdateMemberStatus = (memberId: string, newStatus: ITeamMember['status']) => {
    const updatedMembers = teamMembers.map(member =>
      member.id === memberId ? { ...member, status: newStatus } : member
    )
    setTeamMembers(updatedMembers)
    updateTeamStats(updatedMembers)
  }

  const updateTeamStats = (members: ITeamMember[]) => {
    const totalMembers = members.length
    const activeMembers = members.filter(m => m.status === 'active').length
    const inactiveMembers = members.filter(m => m.status === 'inactive').length
    const pendingMembers = members.filter(m => m.status === 'pending').length

    const departments = members.reduce((acc, member) => {
      const dept = member.department
      acc[dept] = (acc[dept] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const roles = members.reduce((acc, member) => {
      const role = member.role
      acc[role] = (acc[role] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    setTeamStats({
      totalMembers,
      activeMembers,
      inactiveMembers,
      pendingMembers,
      departments: Object.entries(departments).map(([name, count]) => ({ name, count })),
      roles: Object.entries(roles).map(([name, count]) => ({ name, count }))
    })
  }

  const filteredMembers = teamMembers.filter(member => {
    const matchesStatus = filterStatus === 'all' || member.status === filterStatus
    const matchesDepartment = filterDepartment === 'all' || member.department === filterDepartment
    const matchesSearch = member.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesStatus && matchesDepartment && matchesSearch
  })

  const uniqueDepartments = Array.from(new Set(teamMembers.map(member => member.department)))

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <RiTeamLine className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Team Management</h1>
        </div>
        <p className="text-gray-600 text-lg">
          Manage your team members, view statistics, and control access permissions.
        </p>
      </div>

      {/* Team Statistics */}
      <TeamStats stats={teamStats} />

      {/* Controls and Filters */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search team members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64"
            />
            <RiFilterLine className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>

          {/* Department Filter */}
          <select
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Departments</option>
            {uniqueDepartments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>

        {/* Add Member Button */}
        <button
          onClick={() => setShowAddForm(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <RiAddLine className="w-5 h-5" />
          Add Team Member
        </button>
      </div>

      {/* Add Team Member Form */}
      {showAddForm && (
        <AddTeamMemberForm
          onSubmit={handleAddTeamMember}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      {/* Team Members List */}
      <TeamMembersList
        members={filteredMembers}
        onRemoveMember={handleRemoveTeamMember}
        onUpdateStatus={handleUpdateMemberStatus}
      />
    </div>
  )
}
