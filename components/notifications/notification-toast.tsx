"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { X, Bell, Calendar, MessageSquare, Star, Clock } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

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

interface NotificationToastProps {
  notifications: ToastNotification[]
  onDismiss: (id: string) => void
}

export function NotificationToast({ notifications, onDismiss }: NotificationToastProps) {
  const [visibleNotifications, setVisibleNotifications] = useState<ToastNotification[]>([])

  useEffect(() => {
    setVisibleNotifications(notifications)

    // Auto-dismiss notifications after their duration
    notifications.forEach((notification) => {
      if (notification.duration) {
        setTimeout(() => {
          onDismiss(notification.id)
        }, notification.duration)
      }
    })
  }, [notifications, onDismiss])

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "appointment":
        return <Calendar className="w-4 h-4" />
      case "reminder":
        return <Clock className="w-4 h-4" />
      case "message":
        return <MessageSquare className="w-4 h-4" />
      case "feedback":
        return <Star className="w-4 h-4" />
      default:
        return <Bell className="w-4 h-4" />
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "appointment":
        return "border-l-primary"
      case "reminder":
        return "border-l-yellow-500"
      case "message":
        return "border-l-blue-500"
      case "feedback":
        return "border-l-purple-500"
      default:
        return "border-l-gray-500"
    }
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      <AnimatePresence>
        {visibleNotifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 300, scale: 0.3 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.5, transition: { duration: 0.2 } }}
            className="w-full"
          >
            <Card
              className={`border-green-100 border-l-4 ${getNotificationColor(notification.type)} shadow-lg bg-white/95 backdrop-blur-sm`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  {notification.avatar ? (
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={notification.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                        {notification.title.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  ) : (
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      {getNotificationIcon(notification.type)}
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-sm text-foreground truncate">{notification.title}</h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDismiss(notification.id)}
                        className="h-6 w-6 p-0 hover:bg-gray-100"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{notification.message}</p>

                    {notification.actionLabel && notification.onAction && (
                      <Button
                        size="sm"
                        onClick={notification.onAction}
                        className="bg-primary hover:bg-primary/90 h-7 text-xs"
                      >
                        {notification.actionLabel}
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
