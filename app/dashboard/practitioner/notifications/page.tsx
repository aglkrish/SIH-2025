"use client"

import { PractitionerLayout } from "@/components/layouts/practitioner-layout"
import { NotificationCenter } from "@/components/notifications/notification-center"
import { NotificationSettings } from "@/components/notifications/notification-settings"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Settings } from "lucide-react"

export default function PractitionerNotificationsPage() {
  return (
    <PractitionerLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-heading font-bold text-3xl text-foreground">Notifications</h1>
          <p className="text-muted-foreground">Manage your notifications and preferences</p>
        </div>

        <Tabs defaultValue="notifications" className="space-y-6">
          <TabsList>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="notifications">
            <NotificationCenter userType="practitioner" />
          </TabsContent>

          <TabsContent value="settings">
            <NotificationSettings userType="practitioner" />
          </TabsContent>
        </Tabs>
      </div>
    </PractitionerLayout>
  )
}
