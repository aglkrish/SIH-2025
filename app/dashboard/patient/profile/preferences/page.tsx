"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Settings, ArrowLeft, Save, Bell, Clock, Globe, User } from "lucide-react"
import { PatientLayout } from "@/components/layouts/patient-layout"
import Link from "next/link"
import { toast } from "sonner"

export default function PreferencesPage() {
  const [isEditing, setIsEditing] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  const [preferences, setPreferences] = useState({
    preferredPractitioner: "Dr. Priya Sharma",
    preferredTime: "Morning (9 AM - 12 PM)",
    language: "English",
    treatmentPreferences: "Abhyanga, Shirodhara",
    communicationMethod: "Email + SMS",
    preferredLocation: "Wellness Center - Main Branch",
    sessionDuration: "60 minutes",
    reminderTime: "24 hours before",
    followUpFrequency: "Weekly",
    consultationType: "In-person"
  })

  const [notificationSettings, setNotificationSettings] = useState({
    appointmentReminders: true,
    treatmentUpdates: true,
    healthTips: true,
    promotionalEmails: false,
    smsNotifications: true,
    emailNotifications: true,
    pushNotifications: true,
    reminderEmails: true,
    followUpReminders: true,
    practitionerMessages: true
  })

  const [privacySettings, setPrivacySettings] = useState({
    shareHealthData: true,
    allowResearch: false,
    marketingConsent: false,
    dataRetention: "5 years",
    profileVisibility: "Private"
  })

  const handleSave = async () => {
    setIsSaving(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Save to localStorage for demo purposes
      localStorage.setItem('patient_preferences', JSON.stringify({
        preferences,
        notificationSettings,
        privacySettings
      }))
      
      toast.success("Preferences updated successfully!")
      setIsEditing(false)
    } catch (error) {
      toast.error("Failed to update preferences. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    toast.info("Changes cancelled")
  }

  return (
    <PatientLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" asChild className="bg-transparent">
              <Link href="/dashboard/patient/profile">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Profile
              </Link>
            </Button>
            <div>
              <h1 className="font-heading font-bold text-3xl text-foreground">Preferences & Settings</h1>
              <p className="text-muted-foreground">Customize your treatment experience and communication preferences</p>
            </div>
          </div>
          <div className="flex gap-3">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={handleCancel} className="bg-transparent">
                  Cancel
                </Button>
                <Button onClick={handleSave} disabled={isSaving} className="bg-primary hover:bg-primary/90">
                  <Save className="w-4 h-4 mr-2" />
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)} className="bg-primary hover:bg-primary/90">
                <Settings className="w-4 h-4 mr-2" />
                Edit Preferences
              </Button>
            )}
          </div>
        </div>

        {/* Preferences Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Treatment Preferences */}
          <Card className="border-green-100">
            <CardHeader>
              <CardTitle className="font-heading flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Treatment Preferences
              </CardTitle>
              <CardDescription>Your preferred practitioners and treatment settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="preferredPractitioner">Preferred Practitioner</Label>
                <Select
                  value={preferences.preferredPractitioner}
                  onValueChange={(value) => setPreferences({ ...preferences, preferredPractitioner: value })}
                  disabled={!isEditing}
                >
                  <SelectTrigger className="border-green-200 focus:border-primary">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Dr. Priya Sharma">Dr. Priya Sharma</SelectItem>
                    <SelectItem value="Dr. Raj Patel">Dr. Raj Patel</SelectItem>
                    <SelectItem value="Dr. Anita Gupta">Dr. Anita Gupta</SelectItem>
                    <SelectItem value="Dr. Vikram Singh">Dr. Vikram Singh</SelectItem>
                    <SelectItem value="No preference">No preference</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="preferredTime">Preferred Appointment Time</Label>
                <Select
                  value={preferences.preferredTime}
                  onValueChange={(value) => setPreferences({ ...preferences, preferredTime: value })}
                  disabled={!isEditing}
                >
                  <SelectTrigger className="border-green-200 focus:border-primary">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Early Morning (6 AM - 9 AM)">Early Morning (6 AM - 9 AM)</SelectItem>
                    <SelectItem value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</SelectItem>
                    <SelectItem value="Afternoon (12 PM - 5 PM)">Afternoon (12 PM - 5 PM)</SelectItem>
                    <SelectItem value="Evening (5 PM - 8 PM)">Evening (5 PM - 8 PM)</SelectItem>
                    <SelectItem value="No preference">No preference</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="preferredLocation">Preferred Location</Label>
                <Select
                  value={preferences.preferredLocation}
                  onValueChange={(value) => setPreferences({ ...preferences, preferredLocation: value })}
                  disabled={!isEditing}
                >
                  <SelectTrigger className="border-green-200 focus:border-primary">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Wellness Center - Main Branch">Wellness Center - Main Branch</SelectItem>
                    <SelectItem value="Wellness Center - Downtown">Wellness Center - Downtown</SelectItem>
                    <SelectItem value="Wellness Center - Suburbs">Wellness Center - Suburbs</SelectItem>
                    <SelectItem value="Home Visit">Home Visit</SelectItem>
                    <SelectItem value="No preference">No preference</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sessionDuration">Preferred Session Duration</Label>
                <Select
                  value={preferences.sessionDuration}
                  onValueChange={(value) => setPreferences({ ...preferences, sessionDuration: value })}
                  disabled={!isEditing}
                >
                  <SelectTrigger className="border-green-200 focus:border-primary">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30 minutes">30 minutes</SelectItem>
                    <SelectItem value="45 minutes">45 minutes</SelectItem>
                    <SelectItem value="60 minutes">60 minutes</SelectItem>
                    <SelectItem value="90 minutes">90 minutes</SelectItem>
                    <SelectItem value="120 minutes">120 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="consultationType">Consultation Type</Label>
                <Select
                  value={preferences.consultationType}
                  onValueChange={(value) => setPreferences({ ...preferences, consultationType: value })}
                  disabled={!isEditing}
                >
                  <SelectTrigger className="border-green-200 focus:border-primary">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="In-person">In-person</SelectItem>
                    <SelectItem value="Video call">Video call</SelectItem>
                    <SelectItem value="Phone call">Phone call</SelectItem>
                    <SelectItem value="No preference">No preference</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="treatmentPreferences">Preferred Treatments</Label>
                <Textarea
                  id="treatmentPreferences"
                  value={preferences.treatmentPreferences}
                  onChange={(e) => setPreferences({ ...preferences, treatmentPreferences: e.target.value })}
                  disabled={!isEditing}
                  className="border-green-200 focus:border-primary"
                  rows={3}
                  placeholder="List your preferred treatments (e.g., Abhyanga, Shirodhara, Nasya, etc.)..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Communication Preferences */}
          <Card className="border-green-100">
            <CardHeader>
              <CardTitle className="font-heading flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary" />
                Communication Preferences
              </CardTitle>
              <CardDescription>How you prefer to receive information and updates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="language">Preferred Language</Label>
                <Select
                  value={preferences.language}
                  onValueChange={(value) => setPreferences({ ...preferences, language: value })}
                  disabled={!isEditing}
                >
                  <SelectTrigger className="border-green-200 focus:border-primary">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Hindi">Hindi</SelectItem>
                    <SelectItem value="Sanskrit">Sanskrit</SelectItem>
                    <SelectItem value="Spanish">Spanish</SelectItem>
                    <SelectItem value="French">French</SelectItem>
                    <SelectItem value="German">German</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="communicationMethod">Primary Communication Method</Label>
                <Select
                  value={preferences.communicationMethod}
                  onValueChange={(value) => setPreferences({ ...preferences, communicationMethod: value })}
                  disabled={!isEditing}
                >
                  <SelectTrigger className="border-green-200 focus:border-primary">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Email only">Email only</SelectItem>
                    <SelectItem value="SMS only">SMS only</SelectItem>
                    <SelectItem value="Email + SMS">Email + SMS</SelectItem>
                    <SelectItem value="Phone calls">Phone calls</SelectItem>
                    <SelectItem value="App notifications">App notifications</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reminderTime">Appointment Reminder Time</Label>
                <Select
                  value={preferences.reminderTime}
                  onValueChange={(value) => setPreferences({ ...preferences, reminderTime: value })}
                  disabled={!isEditing}
                >
                  <SelectTrigger className="border-green-200 focus:border-primary">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1 hour before">1 hour before</SelectItem>
                    <SelectItem value="2 hours before">2 hours before</SelectItem>
                    <SelectItem value="6 hours before">6 hours before</SelectItem>
                    <SelectItem value="12 hours before">12 hours before</SelectItem>
                    <SelectItem value="24 hours before">24 hours before</SelectItem>
                    <SelectItem value="2 days before">2 days before</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="followUpFrequency">Follow-up Frequency</Label>
                <Select
                  value={preferences.followUpFrequency}
                  onValueChange={(value) => setPreferences({ ...preferences, followUpFrequency: value })}
                  disabled={!isEditing}
                >
                  <SelectTrigger className="border-green-200 focus:border-primary">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Daily">Daily</SelectItem>
                    <SelectItem value="Weekly">Weekly</SelectItem>
                    <SelectItem value="Bi-weekly">Bi-weekly</SelectItem>
                    <SelectItem value="Monthly">Monthly</SelectItem>
                    <SelectItem value="As needed">As needed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="border-green-100">
            <CardHeader>
              <CardTitle className="font-heading flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />
                Notification Settings
              </CardTitle>
              <CardDescription>Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Appointment Reminders</Label>
                  <p className="text-sm text-muted-foreground">Get notified about upcoming appointments</p>
                </div>
                <Switch
                  checked={notificationSettings.appointmentReminders}
                  onCheckedChange={(checked) =>
                    setNotificationSettings({ ...notificationSettings, appointmentReminders: checked })
                  }
                  disabled={!isEditing}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Treatment Updates</Label>
                  <p className="text-sm text-muted-foreground">Receive updates about your treatment progress</p>
                </div>
                <Switch
                  checked={notificationSettings.treatmentUpdates}
                  onCheckedChange={(checked) =>
                    setNotificationSettings({ ...notificationSettings, treatmentUpdates: checked })
                  }
                  disabled={!isEditing}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Health Tips</Label>
                  <p className="text-sm text-muted-foreground">Get wellness tips and health advice</p>
                </div>
                <Switch
                  checked={notificationSettings.healthTips}
                  onCheckedChange={(checked) =>
                    setNotificationSettings({ ...notificationSettings, healthTips: checked })
                  }
                  disabled={!isEditing}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Practitioner Messages</Label>
                  <p className="text-sm text-muted-foreground">Receive messages from your practitioners</p>
                </div>
                <Switch
                  checked={notificationSettings.practitionerMessages}
                  onCheckedChange={(checked) =>
                    setNotificationSettings({ ...notificationSettings, practitionerMessages: checked })
                  }
                  disabled={!isEditing}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Follow-up Reminders</Label>
                  <p className="text-sm text-muted-foreground">Reminders for follow-up appointments</p>
                </div>
                <Switch
                  checked={notificationSettings.followUpReminders}
                  onCheckedChange={(checked) =>
                    setNotificationSettings({ ...notificationSettings, followUpReminders: checked })
                  }
                  disabled={!isEditing}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Promotional Emails</Label>
                  <p className="text-sm text-muted-foreground">Receive offers and promotional content</p>
                </div>
                <Switch
                  checked={notificationSettings.promotionalEmails}
                  onCheckedChange={(checked) =>
                    setNotificationSettings({ ...notificationSettings, promotionalEmails: checked })
                  }
                  disabled={!isEditing}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive email notifications</p>
                </div>
                <Switch
                  checked={notificationSettings.emailNotifications}
                  onCheckedChange={(checked) =>
                    setNotificationSettings({ ...notificationSettings, emailNotifications: checked })
                  }
                  disabled={!isEditing}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>SMS Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive text message notifications</p>
                </div>
                <Switch
                  checked={notificationSettings.smsNotifications}
                  onCheckedChange={(checked) =>
                    setNotificationSettings({ ...notificationSettings, smsNotifications: checked })
                  }
                  disabled={!isEditing}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive push notifications on your device</p>
                </div>
                <Switch
                  checked={notificationSettings.pushNotifications}
                  onCheckedChange={(checked) =>
                    setNotificationSettings({ ...notificationSettings, pushNotifications: checked })
                  }
                  disabled={!isEditing}
                />
              </div>
            </CardContent>
          </Card>

          {/* Privacy Settings */}
          <Card className="border-green-100">
            <CardHeader>
              <CardTitle className="font-heading flex items-center gap-2">
                <Settings className="w-5 h-5 text-primary" />
                Privacy Settings
              </CardTitle>
              <CardDescription>Control your data privacy and sharing preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Share Health Data</Label>
                  <p className="text-sm text-muted-foreground">Allow practitioners to access your health information</p>
                </div>
                <Switch
                  checked={privacySettings.shareHealthData}
                  onCheckedChange={(checked) =>
                    setPrivacySettings({ ...privacySettings, shareHealthData: checked })
                  }
                  disabled={!isEditing}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Allow Research</Label>
                  <p className="text-sm text-muted-foreground">Allow anonymized data to be used for research</p>
                </div>
                <Switch
                  checked={privacySettings.allowResearch}
                  onCheckedChange={(checked) =>
                    setPrivacySettings({ ...privacySettings, allowResearch: checked })
                  }
                  disabled={!isEditing}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Marketing Consent</Label>
                  <p className="text-sm text-muted-foreground">Receive marketing communications</p>
                </div>
                <Switch
                  checked={privacySettings.marketingConsent}
                  onCheckedChange={(checked) =>
                    setPrivacySettings({ ...privacySettings, marketingConsent: checked })
                  }
                  disabled={!isEditing}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dataRetention">Data Retention Period</Label>
                <Select
                  value={privacySettings.dataRetention}
                  onValueChange={(value) => setPrivacySettings({ ...privacySettings, dataRetention: value })}
                  disabled={!isEditing}
                >
                  <SelectTrigger className="border-green-200 focus:border-primary">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1 year">1 year</SelectItem>
                    <SelectItem value="3 years">3 years</SelectItem>
                    <SelectItem value="5 years">5 years</SelectItem>
                    <SelectItem value="10 years">10 years</SelectItem>
                    <SelectItem value="Indefinitely">Indefinitely</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="profileVisibility">Profile Visibility</Label>
                <Select
                  value={privacySettings.profileVisibility}
                  onValueChange={(value) => setPrivacySettings({ ...privacySettings, profileVisibility: value })}
                  disabled={!isEditing}
                >
                  <SelectTrigger className="border-green-200 focus:border-primary">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Public">Public</SelectItem>
                    <SelectItem value="Private">Private</SelectItem>
                    <SelectItem value="Practitioners only">Practitioners only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PatientLayout>
  )
}
