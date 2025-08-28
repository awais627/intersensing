import React from 'react'
import { Alert } from 'services/telemetry'
import { FaExclamationTriangle, FaExclamationCircle, FaInfoCircle } from 'react-icons/fa'

interface AlertNotificationProps {
  alert: Alert
  onClose: () => void
}

const getSeverityConfig = (severity: Alert['severity']) => {
  switch (severity) {
    case 'critical':
      return {
        icon: FaExclamationTriangle,
        bgColor: 'bg-red-500',
        textColor: 'text-red-800',
        borderColor: 'border-red-300',
        iconColor: 'text-red-600'
      }
    case 'high':
      return {
        icon: FaExclamationCircle,
        bgColor: 'bg-orange-500',
        textColor: 'text-orange-800',
        borderColor: 'border-orange-300',
        iconColor: 'text-orange-600'
      }
    case 'medium':
      return {
        icon: FaExclamationTriangle,
        bgColor: 'bg-yellow-500',
        textColor: 'text-yellow-800',
        borderColor: 'border-yellow-300',
        iconColor: 'text-yellow-600'
      }
    case 'low':
      return {
        icon: FaInfoCircle,
        bgColor: 'bg-blue-500',
        textColor: 'text-blue-800',
        borderColor: 'border-blue-300',
        iconColor: 'text-blue-600'
      }
    case 'warning':
      return {
        icon: FaExclamationTriangle,
        bgColor: 'bg-yellow-500',
        textColor: 'text-yellow-800',
        borderColor: 'border-yellow-300',
        iconColor: 'text-yellow-600'
      }
    default:
      return {
        icon: FaInfoCircle,
        bgColor: 'bg-gray-500',
        textColor: 'text-gray-800',
        borderColor: 'border-gray-300',
        iconColor: 'text-gray-600'
      }
  }
}

export const AlertNotification: React.FC<AlertNotificationProps> = ({ alert, onClose }) => {
  const config = getSeverityConfig(alert.severity)
  const IconComponent = config.icon

  const formatTimestamp = (date: string | Date) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    return dateObj.toLocaleTimeString()
  }

  const getAlertMessage = () => {
    const sensorType = alert.sensor_type
    const operator = alert.operator
    const threshold = alert.threshold
    return `${sensorType} ${operator} ${threshold}`
  }

  const getCurrentValue = () => {
    if (alert.telemetry_data && alert.telemetry_data[alert.sensor_type as keyof typeof alert.telemetry_data]) {
      const value = alert.telemetry_data[alert.sensor_type as keyof typeof alert.telemetry_data]
      return typeof value === 'number' ? value : 0
    }
    return 0
  }

  return (
    <div className={`fixed top-4 right-4 z-50 max-w-sm w-full bg-white rounded-lg shadow-lg border ${config.borderColor} animate-slide-in`}>
      <div className={`p-4 ${config.bgColor} rounded-t-lg`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <IconComponent className={`w-5 h-5 ${config.iconColor}`} />
            <span className={`font-semibold ${config.textColor} capitalize`}>
              {alert.severity} Alert
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            ×
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <h4 className="font-semibold text-gray-900 mb-2">
          Rule: {alert.rule_id}
        </h4>
        <p className="text-gray-700 mb-2">
          {getAlertMessage()}
        </p>
        <p className="text-sm text-gray-500">
          Triggered at: {formatTimestamp(alert.triggered_at)}
        </p>
        
        {alert.telemetry_data && (
          <div className="mt-3 p-2 bg-gray-50 rounded text-sm">
            <span className="font-medium">Current Value: </span>
            <span className="font-semibold">
              {getCurrentValue()}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
