import React from 'react'
import { ITeamStats } from 'types/team'
import { RiUserLine, RiUserAddLine, RiUserUnfollowLine, RiTimeLine } from 'react-icons/ri'

interface TeamStatsProps {
  stats: ITeamStats
}

export const TeamStats: React.FC<TeamStatsProps> = ({ stats }) => {
  const statCards = [
    {
      title: 'Total Members',
      value: stats.totalMembers,
      icon: RiUserLine,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700'
    },
    {
      title: 'Active Members',
      value: stats.activeMembers,
      icon: RiUserAddLine,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700'
    },
    {
      title: 'Inactive Members',
      value: stats.inactiveMembers,
      icon: RiUserUnfollowLine,
      color: 'bg-gray-500',
      bgColor: 'bg-gray-50',
      textColor: 'text-gray-700'
    },
    {
      title: 'Pending Members',
      value: stats.pendingMembers,
      icon: RiTimeLine,
      color: 'bg-yellow-500',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-700'
    }
  ]

  return (
    <div className="mb-8">
      {/* Main Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => {
          const IconComponent = stat.icon
          return (
            <div key={index} className={`${stat.bgColor} rounded-lg p-6 border border-gray-200`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-full`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Department and Role Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Distribution */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Distribution</h3>
          <div className="space-y-3">
            {stats.departments.map((dept, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{dept.name}</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${(dept.count / stats.totalMembers) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-8 text-right">{dept.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Role Distribution */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Role Distribution</h3>
          <div className="space-y-3">
            {stats.roles.map((role, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 truncate pr-2">{role.name}</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${(role.count / stats.totalMembers) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-8 text-right">{role.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
