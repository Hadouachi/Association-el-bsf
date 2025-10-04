'use client'

import { useState, useEffect } from 'react'
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react'

export type NotificationType = 'success' | 'error' | 'warning' | 'info'

interface NotificationProps {
  type: NotificationType
  title: string
  message: string
  isVisible: boolean
  onClose: () => void
  autoHide?: boolean
  duration?: number
}

const notificationStyles = {
  success: {
    icon: CheckCircle,
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    textColor: 'text-green-800',
    iconColor: 'text-green-400'
  },
  error: {
    icon: XCircle,
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    textColor: 'text-red-800',
    iconColor: 'text-red-400'
  },
  warning: {
    icon: AlertCircle,
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
    textColor: 'text-yellow-800',
    iconColor: 'text-yellow-400'
  },
  info: {
    icon: AlertCircle,
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-800',
    iconColor: 'text-blue-400'
  }
}

export default function Notification({
  type,
  title,
  message,
  isVisible,
  onClose,
  autoHide = true,
  duration = 5000
}: NotificationProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (isVisible && autoHide) {
      const timer = setTimeout(() => {
        setIsAnimating(true)
        setTimeout(onClose, 300) // Attendre la fin de l'animation
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [isVisible, autoHide, duration, onClose])

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(false)
    }
  }, [isVisible])

  if (!isVisible) return null

  const styles = notificationStyles[type]
  const Icon = styles.icon

  return (
    <div className={`fixed top-4 right-4 z-50 max-w-sm w-full transition-all duration-300 ${
      isAnimating ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'
    }`}>
      <div className={`${styles.bgColor} border ${styles.borderColor} rounded-lg shadow-lg overflow-hidden`}>
        <div className="p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <Icon className={`h-5 w-5 ${styles.iconColor}`} />
            </div>
            <div className="ml-3 flex-1">
              <h3 className={`text-sm font-medium ${styles.textColor}`}>
                {title}
              </h3>
              <p className={`mt-1 text-sm ${styles.textColor} opacity-90`}>
                {message}
              </p>
            </div>
            <div className="ml-4 flex-shrink-0">
              <button
                onClick={onClose}
                className={`inline-flex ${styles.textColor} hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-${styles.bgColor} focus:ring-${styles.iconColor}`}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Hook pour gérer les notifications
export function useNotification() {
  const [notification, setNotification] = useState<{
    type: NotificationType
    title: string
    message: string
    isVisible: boolean
  }>({
    type: 'info',
    title: '',
    message: '',
    isVisible: false
  })

  const showNotification = (type: NotificationType, title: string, message: string) => {
    setNotification({
      type,
      title,
      message,
      isVisible: true
    })
  }

  const hideNotification = () => {
    setNotification(prev => ({ ...prev, isVisible: false }))
  }

  const showSuccess = (title: string, message: string) => {
    showNotification('success', title, message)
  }

  const showError = (title: string, message: string) => {
    showNotification('error', title, message)
  }

  const showWarning = (title: string, message: string) => {
    showNotification('warning', title, message)
  }

  const showInfo = (title: string, message: string) => {
    showNotification('info', title, message)
  }

  return {
    notification,
    showNotification,
    hideNotification,
    showSuccess,
    showError,
    showWarning,
    showInfo
  }
}

