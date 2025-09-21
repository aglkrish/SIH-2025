"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Check, Clock, Calendar, Star, MessageSquare, Settings, Trash2 } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

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

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "appointment",
    title: "Upcoming Appointment",
    message: "Your Abhyanga session with Dr. Priya Sharma is scheduled for tomorrow at 10:00 AM",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    read: false,
    actionable: true,
    avatar: "/placeholder.svg?height=40&width=40",
    priority: "high",
  },
  {
    id: "2",
    type: "feedback",
    title: "Session Feedback Request",
    message: "Please rate your recent Shirodhara session with Dr. Raj Patel",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    read: false,
    actionable: true,
    priority: "medium",
  },
  {
    id: "3",
    type: "message",
    title: "New Message",
    message: "Dr. Priya Sharma sent you a message about your treatment plan",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
    read: true,
    actionable: true,
    avatar: "/placeholder.svg?height=40&width=40",
    priority: "medium",
  },
  {
    id: "4",
    type: "reminder",
    title: "Wellness Check-in",
    message: "Time for your daily wellness check-in. How are you feeling today?",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
    read: true,
    actionable: true,
    priority: "low",
  },
  {
    id: "5",
    type: "system",
    title: "Profile Updated",
    message: "Your health information has been successfully updated",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    read: true,
    priority: "low",
  },
]

interface NotificationCenterProps {
  userType?: "patient" | "practitioner"
}

export function NotificationCenter({ userType = "patient" }: NotificationCenterProps) {
  const [notifications, setNotifications] = useState(mockNotifications)
  const [activeTab, setActiveTab] = useState("all")

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
      case "system":
        return <Settings className="w-4 h-4" />
      default:
        return <Bell className="w-4 h-4" />
    }
  }

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case "high":
        return "text-red-500"
      case "medium":
        return "text-yellow-500"
      case "low":
        return "text-green-500"
      default:
        return "text-muted-foreground"
    }
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === "all") return true
    if (activeTab === "unread") return !notification.read
    return notification.type === activeTab
  })

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <Card className="border-green-100 w-full max-w-2xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Bell className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle className="font-heading">Notifications</CardTitle>
              <CardDescription>Stay updated with your wellness journey</CardDescription>
            </div>
          </div>
          {unreadCount > 0 && <Badge className="bg-primary text-white">{unreadCount}</Badge>}
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <div className="flex items-center justify-between">
            <TabsList className="grid grid-cols-4 w-fit">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread">Unread</TabsTrigger>
              <TabsTrigger value="appointment">Appointments</TabsTrigger>
              <TabsTrigger value="message">Messages</TabsTrigger>
            </TabsList>
            {unreadCount > 0 && (
              <Button variant="outline" size="sm" onClick={markAllAsRead} className="bg-transparent">
                <Check className="w-4 h-4 mr-2" />
                Mark All Read
              </Button>
            )}
          </div>

          <TabsContent value={activeTab} className="space-y-3">
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-8">
                <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No notifications found</p>
              </div>
            ) : (
              filteredNotifications.map((notification) => (
                <Card
                  key={notification.id}
                  className={`border transition-all hover:shadow-sm ${
                    notification.read ? "border-green-100" : "border-primary/30 bg-primary/5"
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      {notification.avatar ? (
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={notification.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {notification.title.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      ) : (
                        <div
                          className={`w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center ${getPriorityColor(notification.priority)}`}
                        >
                          {getNotificationIcon(notification.type)}
                        </div>
                      )}

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4
                            className={`font-medium text-sm ${notification.read ? "text-muted-foreground" : "text-foreground"}`}
                          >
                            {notification.title}
                          </h4>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">
                              {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteNotification(notification.id)}
                              className="h-6 w-6 p-0 hover:bg-destructive/10 hover:text-destructive"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                        <p className={`text-sm ${notification.read ? "text-muted-foreground" : "text-foreground"}`}>
                          {notification.message}
                        </p>

                        {notification.actionable && (
                          <div className="flex gap-2 mt-3">
                            {!notification.read && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => markAsRead(notification.id)}
                                className="bg-transparent"
                              >
                                <Check className="w-3 h-3 mr-1" />
                                Mark Read
                              </Button>
                            )}
                            {notification.type === "appointment" && (
                              <Button size="sm" className="bg-primary hover:bg-primary/90">
                                View Details
                              </Button>
                            )}
                            {notification.type === "feedback" && (
                              <Button size="sm" className="bg-primary hover:bg-primary/90">
                                Rate Session
                              </Button>
                            )}
                            {notification.type === "message" && (
                              <Button size="sm" className="bg-primary hover:bg-primary/90">
                                Reply
                              </Button>
                            )}
                            {notification.type === "reminder" && (
                              <Button size="sm" className="bg-primary hover:bg-primary/90">
                                Check In
                              </Button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
