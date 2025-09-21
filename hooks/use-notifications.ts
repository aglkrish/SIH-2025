"use client"

import { useState, useEffect, useCallback } from "react"

interface Notification {
  id: string
  type: "appointment" | "reminder" | "message" | "feedback" | "system"
  title: string
  message: string
  timestamp: Date
  read: boolean
  actionable?: boolean
  avatar?: string
  priority?: "low" | "medium" | "high"
}

interface ToastNotification {
  id: string
  type: "appointment" | "reminder" | "message" | "feedback" | "system"
  title: string
  message: string
  avatar?: string
  actionLabel?: string
  onAction?: () => void
  duration?: number
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [toastNotifications, setToastNotifications] = useState<ToastNotification[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Mock data loading
  useEffect(() => {
    const loadNotifications = async () => {
      setIsLoading(true)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockNotifications: Notification[] = [
        {
          id: "1",
          type: "appointment",
          title: "Upcoming Appointment",
          message: "Your Abhyanga session is scheduled for tomorrow at 10:00 AM",
          timestamp: new Date(Date.now() - 1000 * 60 * 30),
          read: false,
          actionable: true,
          priority: "high",
        },
        {
          id: "2",
          type: "feedback",
          title: "Session Feedback Request",
          message: "Please rate your recent Shirodhara session",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
          read: false,
          actionable: true,
          priority: "medium",
        },
      ]

      setNotifications(mockNotifications)
      setIsLoading(false)
    }

    loadNotifications()
  }, [])

  const addNotification = useCallback((notification: Omit<Notification, "id" | "timestamp">) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
    }

    setNotifications((prev) => [newNotification, ...prev])

    // Also show as toast if high priority
    if (notification.priority === "high") {
      showToast({
        id: newNotification.id,
        type: notification.type,
        title: notification.title,
        message: notification.message,
        avatar: notification.avatar,
        duration: 5000,
      })
    }
  }, [])

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }, [])

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }, [])

  const deleteNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }, [])

  const showToast = useCallback((toast: ToastNotification) => {
    setToastNotifications((prev) => [...prev, toast])
  }, [])

  const dismissToast = useCallback((id: string) => {
    setToastNotifications((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const unreadCount = notifications.filter((n) => !n.read).length

  return {
    notifications,
    toastNotifications,
    isLoading,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    showToast,
    dismissToast,
  }
}
