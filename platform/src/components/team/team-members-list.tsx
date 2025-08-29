import React, { useState } from 'react'
import { ITeamMember } from 'types/team'
import { RiEditLine, RiDeleteBinLine, RiMoreLine, RiUserLine, RiMailLine, RiBuildingLine, RiShieldLine } from 'react-icons/ri'
import { format } from 'date-fns'

interface TeamMembersListProps {
  members: ITeamMember[]
  onRemoveMember: (memberId: string) => void
  onUpdateStatus: (memberId: string, status: ITeamMember['status']) => void
}

export const TeamMembersList: React.FC<TeamMembersListProps> = ({ members, onRemoveMember, onUpdateStatus }) => {
  const [expandedMember, setExpandedMember] = useState<string | null>(null)

  const toggleExpanded = (memberId: string) => {
    setExpandedMember(expandedMember === memberId ? null : memberId)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'inactive': return 'bg-gray-100 text-gray-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return '🟢'
      case 'inactive': return '⚫'
      case 'pending': return '🟡'
      default: return '⚪'
    }
  }

  if (members.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">👥</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No team members found</h3>
        <p className="text-gray-500">Try adjusting your search or filters to find team members.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {members.map((member) => (
        <div key={member.id} className="bg-white rounded-lg border border-gray-200 shadow-sm">
          {/* Member Header */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={member.avatar}
                    alt={`${member.firstName} ${member.lastName}`}
                    className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                  />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full border-2 border-gray-200 flex items-center justify-center">
                    <span className="text-xs">{getStatusIcon(member.status)}</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {member.firstName} {member.lastName}
                  </h3>
                  <p className="text-sm text-gray-600">{member.role}</p>
                  <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <RiMailLine className="w-3 h-3" />
                      {member.email}
                    </span>
                    <span className="flex items-center gap-1">
                      <RiBuildingLine className="w-3 h-3" />
                      {member.department}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(member.status)}`}>
                  {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                </span>
                <button
                  onClick={() => toggleExpanded(member.id)}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <RiMoreLine className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Expanded Member Details */}
          {expandedMember === member.id && (
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Member Information */}
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Member Information</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <RiUserLine className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Full Name</p>
                        <p className="text-sm text-gray-600">{member.firstName} {member.lastName}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <RiMailLine className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Email</p>
                        <p className="text-sm text-gray-600">{member.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <RiBuildingLine className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Department</p>
                        <p className="text-sm text-gray-600">{member.department}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <RiShieldLine className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Role</p>
                        <p className="text-sm text-gray-600">{member.role}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Member Details */}
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Details & Actions</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm font-medium text-gray-900 mb-2">Permissions</p>
                      <div className="flex flex-wrap gap-2">
                        {member.permissions.map((permission, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                          >
                            {permission}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm font-medium text-gray-900 mb-2">Timeline</p>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p>Joined: {format(new Date(member.joinDate), 'MMM dd, yyyy')}</p>
                        <p>Last Active: {format(new Date(member.lastActive), 'MMM dd, yyyy HH:mm')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
                {/* Status Update */}
                <select
                  value={member.status}
                  onChange={(e) => onUpdateStatus(member.id, e.target.value as ITeamMember['status'])}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                </select>

                {/* Edit Button */}
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  <RiEditLine className="w-4 h-4 inline mr-2" />
                  Edit
                </button>

                {/* Remove Button */}
                <button
                  onClick={() => onRemoveMember(member.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <RiDeleteBinLine className="w-4 h-4 inline mr-2" />
                  Remove
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
