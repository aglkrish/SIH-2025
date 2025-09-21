"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Bell, Mail, Smartphone, Clock } from "lucide-react"

interface NotificationSettings {
  email: {
    appointments: boolean
    reminders: boolean
    messages: boolean
    feedback: boolean
    marketing: boolean
  }
  sms: {
    appointments: boolean
    reminders: boolean
    urgent: boolean
  }
  push: {
    appointments: boolean
    reminders: boolean
    messages: boolean
    feedback: boolean
  }
  timing: {
    reminderHours: string
    quietHoursStart: string
    quietHoursEnd: string
    timezone: string
  }
}

const defaultSettings: NotificationSettings = {
  email: {
    appointments: true,
    reminders: true,
    messages: true,
    feedback: true,
    marketing: false,
  },
  sms: {
    appointments: true,
    reminders: false,
    urgent: true,
  },
  push: {
    appointments: true,
    reminders: true,
    messages: true,
    feedback: false,
  },
  timing: {
    reminderHours: "24",
    quietHoursStart: "22:00",
    quietHoursEnd: "08:00",
    timezone: "America/New_York",
  },
}

interface NotificationSettingsProps {
  userType?: "patient" | "practitioner"
}

export function NotificationSettings({ userType = "patient" }: NotificationSettingsProps) {
  const [settings, setSettings] = useState<NotificationSettings>(defaultSettings)
  const [isSaving, setIsSaving] = useState(false)

  const updateEmailSetting = (key: keyof NotificationSettings["email"], value: boolean) => {
    setSettings((prev) => ({
      ...prev,
      email: { ...prev.email, [key]: value },
    }))
  }

  const updateSmsSetting = (key: keyof NotificationSettings["sms"], value: boolean) => {
    setSettings((prev) => ({
      ...prev,
      sms: { ...prev.sms, [key]: value },
    }))
  }

  const updatePushSetting = (key: keyof NotificationSettings["push"], value: boolean) => {
    setSettings((prev) => ({
      ...prev,
      push: { ...prev.push, [key]: value },
    }))
  }

  const updateTimingSetting = (key: keyof NotificationSettings["timing"], value: string) => {
    setSettings((prev) => ({
      ...prev,
      timing: { ...prev.timing, [key]: value },
    }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    // Mock save logic
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="font-heading font-bold text-2xl text-foreground mb-2">Notification Settings</h2>
        <p className="text-muted-foreground">Customize how and when you receive notifications</p>
      </div>

      {/* Email Notifications */}
      <Card className="border-green-100">
        <CardHeader>
          <CardTitle className="font-heading flex items-center gap-2">
            <Mail className="w-5 h-5 text-primary" />
            Email Notifications
          </CardTitle>
          <CardDescription>Receive notifications via email</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="font-medium">Appointment Confirmations</Label>
              <p className="text-sm text-muted-foreground">Get notified when appointments are booked or changed</p>
            </div>
            <Switch
              checked={settings.email.appointments}
              onCheckedChange={(value) => updateEmailSetting("appointments", value)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="font-medium">Appointment Reminders</Label>
              <p className="text-sm text-muted-foreground">Receive reminders before your sessions</p>
            </div>
            <Switch
              checked={settings.email.reminders}
              onCheckedChange={(value) => updateEmailSetting("reminders", value)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="font-medium">Messages</Label>
              <p className="text-sm text-muted-foreground">Get notified about new messages from practitioners</p>
            </div>
            <Switch
              checked={settings.email.messages}
              onCheckedChange={(value) => updateEmailSetting("messages", value)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="font-medium">Feedback Requests</Label>
              <p className="text-sm text-muted-foreground">Receive requests to rate your sessions</p>
            </div>
            <Switch
              checked={settings.email.feedback}
              onCheckedChange={(value) => updateEmailSetting("feedback", value)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="font-medium">Marketing & Updates</Label>
              <p className="text-sm text-muted-foreground">Receive wellness tips and platform updates</p>
            </div>
            <Switch
              checked={settings.email.marketing}
              onCheckedChange={(value) => updateEmailSetting("marketing", value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* SMS Notifications */}
      <Card className="border-green-100">
        <CardHeader>
          <CardTitle className="font-heading flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-primary" />
            SMS Notifications
          </CardTitle>
          <CardDescription>Receive important notifications via text message</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="font-medium">Appointment Confirmations</Label>
              <p className="text-sm text-muted-foreground">Get SMS confirmations for appointments</p>
            </div>
            <Switch
              checked={settings.sms.appointments}
              onCheckedChange={(value) => updateSmsSetting("appointments", value)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="font-medium">Appointment Reminders</Label>
              <p className="text-sm text-muted-foreground">Receive SMS reminders before sessions</p>
            </div>
            <Switch
              checked={settings.sms.reminders}
              onCheckedChange={(value) => updateSmsSetting("reminders", value)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="font-medium">Urgent Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive urgent updates via SMS</p>
            </div>
            <Switch checked={settings.sms.urgent} onCheckedChange={(value) => updateSmsSetting("urgent", value)} />
          </div>
        </CardContent>
      </Card>

      {/* Push Notifications */}
      <Card className="border-green-100">
        <CardHeader>
          <CardTitle className="font-heading flex items-center gap-2">
            <Bell className="w-5 h-5 text-primary" />
            Push Notifications
          </CardTitle>
          <CardDescription>Receive notifications in the app and on your device</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="font-medium">Appointments</Label>
              <p className="text-sm text-muted-foreground">Get push notifications for appointment updates</p>
            </div>
            <Switch
              checked={settings.push.appointments}
              onCheckedChange={(value) => updatePushSetting("appointments", value)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="font-medium">Reminders</Label>
              <p className="text-sm text-muted-foreground">
                Receive push reminders for sessions and wellness check-ins
              </p>
            </div>
            <Switch
              checked={settings.push.reminders}
              onCheckedChange={(value) => updatePushSetting("reminders", value)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="font-medium">Messages</Label>
              <p className="text-sm text-muted-foreground">Get notified about new messages</p>
            </div>
            <Switch
              checked={settings.push.messages}
              onCheckedChange={(value) => updatePushSetting("messages", value)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="font-medium">Feedback Requests</Label>
              <p className="text-sm text-muted-foreground">Receive push notifications for feedback requests</p>
            </div>
            <Switch
              checked={settings.push.feedback}
              onCheckedChange={(value) => updatePushSetting("feedback", value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Timing Settings */}
      <Card className="border-green-100">
        <CardHeader>
          <CardTitle className="font-heading flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            Timing Settings
          </CardTitle>
          <CardDescription>Configure when you receive notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Reminder Timing</Label>
              <Select
                value={settings.timing.reminderHours}
                onValueChange={(value) => updateTimingSetting("reminderHours", value)}
              >
                <SelectTrigger className="border-green-200 focus:border-primary">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 hour before</SelectItem>
                  <SelectItem value="2">2 hours before</SelectItem>
                  <SelectItem value="4">4 hours before</SelectItem>
                  <SelectItem value="24">24 hours before</SelectItem>
                  <SelectItem value="48">48 hours before</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">How far in advance to send appointment reminders</p>
            </div>

            <div className="space-y-2">
              <Label>Timezone</Label>
              <Select
                value={settings.timing.timezone}
                onValueChange={(value) => updateTimingSetting("timezone", value)}
              >
                <SelectTrigger className="border-green-200 focus:border-primary">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="America/New_York">Eastern Time</SelectItem>
                  <SelectItem value="America/Chicago">Central Time</SelectItem>
                  <SelectItem value="America/Denver">Mountain Time</SelectItem>
                  <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">Your local timezone for notifications</p>
            </div>
          </div>

          <Separator />

          <div>
            <Label className="text-base font-medium mb-4 block">Quiet Hours</Label>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm">Start Time</Label>
                <Select
                  value={settings.timing.quietHoursStart}
                  onValueChange={(value) => updateTimingSetting("quietHoursStart", value)}
                >
                  <SelectTrigger className="border-green-200 focus:border-primary">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 24 }, (_, i) => {
                      const hour = i.toString().padStart(2, "0")
                      return (
                        <SelectItem key={i} value={`${hour}:00`}>
                          {hour}:00
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm">End Time</Label>
                <Select
                  value={settings.timing.quietHoursEnd}
                  onValueChange={(value) => updateTimingSetting("quietHoursEnd", value)}
                >
                  <SelectTrigger className="border-green-200 focus:border-primary">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 24 }, (_, i) => {
                      const hour = i.toString().padStart(2, "0")
                      return (
                        <SelectItem key={i} value={`${hour}:00`}>
                          {hour}:00
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              No non-urgent notifications will be sent during these hours
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isSaving} className="bg-primary hover:bg-primary/90">
          {isSaving ? "Saving..." : "Save Settings"}
        </Button>
      </div>
    </div>
  )
}
