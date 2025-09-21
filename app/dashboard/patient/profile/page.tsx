"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, Mail, Phone, MapPin, Calendar, Heart, Shield, Bell, Edit, Save, Camera, Settings } from "lucide-react"
import { PatientLayout } from "@/components/layouts/patient-layout"

export default function PatientProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState("personal")

  // Mock user data
  const [userData, setUserData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Wellness Street, San Francisco, CA 94102",
    dateOfBirth: "1985-06-15",
    gender: "Male",
    emergencyContact: "Jane Doe - +1 (555) 987-6543",
    avatar: "/placeholder.svg?height=120&width=120",
  })

  const [healthData, setHealthData] = useState({
    doshaType: "Vata-Pitta",
    primaryConcerns: "Stress, Sleep Issues, Digestive Problems",
    allergies: "None reported",
    currentMedications: "Ashwagandha, Brahmi, Triphala",
    medicalHistory: "No major medical conditions. Occasional migraines.",
    lifestyle: "Sedentary work, moderate exercise, vegetarian diet",
    height: "5'10\"",
    weight: "165 lbs",
  })

  const [preferences, setPreferences] = useState({
    preferredPractitioner: "Dr. Priya Sharma",
    preferredTime: "Morning (9 AM - 12 PM)",
    language: "English",
    treatmentPreferences: "Abhyanga, Shirodhara",
    communicationMethod: "Email + SMS",
  })

  const [notificationSettings, setNotificationSettings] = useState({
    appointmentReminders: true,
    treatmentUpdates: true,
    healthTips: true,
    promotionalEmails: false,
    smsNotifications: true,
    emailNotifications: true,
  })

  const handleSave = () => {
    // Mock save functionality
    setIsEditing(false)
    // In real app, this would save to backend
    console.log("Profile saved:", { userData, healthData, preferences, notificationSettings })
  }

  return (
    <PatientLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-heading font-bold text-3xl text-foreground">My Profile</h1>
            <p className="text-muted-foreground">Manage your personal information and preferences</p>
          </div>
          <div className="flex gap-3">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={() => setIsEditing(false)} className="bg-transparent">
                  Cancel
                </Button>
                <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)} className="bg-primary hover:bg-primary/90">
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            )}
          </div>
        </div>

        {/* Profile Overview Card */}
        <Card className="border-green-100">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={userData.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                    {userData.firstName[0]}
                    {userData.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button
                    size="sm"
                    className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full p-0 bg-primary hover:bg-primary/90"
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                )}
              </div>
              <div className="text-center sm:text-left flex-1">
                <h2 className="font-heading font-bold text-2xl text-foreground">
                  {userData.firstName} {userData.lastName}
                </h2>
                <p className="text-muted-foreground mb-2">Patient since January 2024</p>
                <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Active Patient
                  </Badge>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    {healthData.doshaType}
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-primary">12</p>
                  <p className="text-sm text-muted-foreground">Sessions</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">4.8</p>
                  <p className="text-sm text-muted-foreground">Avg Rating</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="health">Health Info</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-6">
            <Card className="border-green-100">
              <CardHeader>
                <CardTitle className="font-heading flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Personal Information
                </CardTitle>
                <CardDescription>Your basic personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={userData.firstName}
                      onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
                      disabled={!isEditing}
                      className="border-green-200 focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={userData.lastName}
                      onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
                      disabled={!isEditing}
                      className="border-green-200 focus:border-primary"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="email"
                      type="email"
                      value={userData.email}
                      onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                      disabled={!isEditing}
                      className="pl-10 border-green-200 focus:border-primary"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="phone"
                      value={userData.phone}
                      onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                      disabled={!isEditing}
                      className="pl-10 border-green-200 focus:border-primary"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 text-muted-foreground w-4 h-4" />
                    <Textarea
                      id="address"
                      value={userData.address}
                      onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                      disabled={!isEditing}
                      className="pl-10 border-green-200 focus:border-primary"
                      rows={2}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={userData.dateOfBirth}
                        onChange={(e) => setUserData({ ...userData, dateOfBirth: e.target.value })}
                        disabled={!isEditing}
                        className="pl-10 border-green-200 focus:border-primary"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select
                      value={userData.gender}
                      onValueChange={(value) => setUserData({ ...userData, gender: value })}
                      disabled={!isEditing}
                    >
                      <SelectTrigger className="border-green-200 focus:border-primary">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                        <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergencyContact">Emergency Contact</Label>
                  <Input
                    id="emergencyContact"
                    value={userData.emergencyContact}
                    onChange={(e) => setUserData({ ...userData, emergencyContact: e.target.value })}
                    disabled={!isEditing}
                    className="border-green-200 focus:border-primary"
                    placeholder="Name - Phone Number"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="health" className="space-y-6">
            <Card className="border-green-100">
              <CardHeader>
                <CardTitle className="font-heading flex items-center gap-2">
                  <Heart className="w-5 h-5 text-primary" />
                  Health Information
                </CardTitle>
                <CardDescription>Your health profile and medical information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Dosha Type</Label>
                    <div className="p-3 bg-muted rounded-md">
                      <p className="font-medium">{healthData.doshaType}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Lifestyle</Label>
                    <div className="p-3 bg-muted rounded-md">
                      <p className="font-medium">{healthData.lifestyle}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Height</Label>
                    <div className="p-3 bg-muted rounded-md">
                      <p className="font-medium">{healthData.height}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Weight</Label>
                    <div className="p-3 bg-muted rounded-md">
                      <p className="font-medium">{healthData.weight}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Primary Health Concerns</Label>
                  <div className="p-3 bg-muted rounded-md">
                    <p className="font-medium">{healthData.primaryConcerns}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Allergies</Label>
                  <div className="p-3 bg-muted rounded-md">
                    <p className="font-medium">{healthData.allergies}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Current Medications/Supplements</Label>
                  <div className="p-3 bg-muted rounded-md">
                    <p className="font-medium">{healthData.currentMedications}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Medical History</Label>
                  <div className="p-3 bg-muted rounded-md">
                    <p className="font-medium">{healthData.medicalHistory}</p>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button asChild className="w-full bg-primary hover:bg-primary/90">
                    <Link href="/dashboard/patient/profile/health-info">
                      <Heart className="w-4 h-4 mr-2" />
                      Update Health Information
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-6">
            <Card className="border-green-100">
              <CardHeader>
                <CardTitle className="font-heading flex items-center gap-2">
                  <Settings className="w-5 h-5 text-primary" />
                  Treatment Preferences
                </CardTitle>
                <CardDescription>Your preferred practitioners and treatment settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Preferred Practitioner</Label>
                  <div className="p-3 bg-muted rounded-md">
                    <p className="font-medium">{preferences.preferredPractitioner}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Preferred Appointment Time</Label>
                  <div className="p-3 bg-muted rounded-md">
                    <p className="font-medium">{preferences.preferredTime}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Preferred Language</Label>
                  <div className="p-3 bg-muted rounded-md">
                    <p className="font-medium">{preferences.language}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Preferred Treatments</Label>
                  <div className="p-3 bg-muted rounded-md">
                    <p className="font-medium">{preferences.treatmentPreferences}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Communication Method</Label>
                  <div className="p-3 bg-muted rounded-md">
                    <p className="font-medium">{preferences.communicationMethod}</p>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button asChild className="w-full bg-primary hover:bg-primary/90">
                    <Link href="/dashboard/patient/profile/preferences">
                      <Settings className="w-4 h-4 mr-2" />
                      Update Preferences
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
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
              </CardContent>
            </Card>

            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="font-heading flex items-center gap-2 text-red-700">
                  <Shield className="w-5 h-5" />
                  Account Security
                </CardTitle>
                <CardDescription>Manage your account security settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full bg-transparent">
                  Change Password
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  Enable Two-Factor Authentication
                </Button>
                <Button variant="destructive" className="w-full">
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PatientLayout>
  )
}
