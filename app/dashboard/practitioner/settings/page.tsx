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
import { User, Mail, Phone, MapPin, Shield, Bell, Settings, Save, Edit, Camera, Clock, DollarSign } from "lucide-react"
import { PractitionerLayout } from "@/components/layouts/practitioner-layout"

export default function PractitionerSettingsPage() {
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState("profile")

  // Mock practitioner data
  const [practitionerData, setPractitionerData] = useState({
    firstName: "Priya",
    lastName: "Sharma",
    email: "priya.sharma@ayursutra.com",
    phone: "+1 (555) 123-4567",
    address: "456 Wellness Boulevard, San Francisco, CA 94102",
    dateOfBirth: "1980-04-15",
    gender: "Female",
    licenseNumber: "AYU-CA-2018-001234",
    specialization: "Panchakarma Specialist",
    experience: "15 years",
    education: "BAMS, MD (Ayurveda)",
    languages: "English, Hindi, Sanskrit",
    avatar: "/placeholder.svg?height=120&width=120",
  })

  const [practiceData, setPracticeData] = useState({
    practiceName: "Holistic Ayurveda Center",
    practiceAddress: "456 Wellness Boulevard, San Francisco, CA 94102",
    practicePhone: "+1 (555) 123-4567",
    practiceEmail: "info@holisticayurveda.com",
    website: "www.holisticayurveda.com",
    taxId: "12-3456789",
    licenseExpiry: "2025-12-31",
    insuranceProvider: "Professional Liability Insurance Co.",
    insurancePolicy: "PLI-2024-789456",
  })

  const [availabilityData, setAvailabilityData] = useState({
    mondayStart: "09:00",
    mondayEnd: "17:00",
    mondayEnabled: true,
    tuesdayStart: "09:00",
    tuesdayEnd: "17:00",
    tuesdayEnabled: true,
    wednesdayStart: "09:00",
    wednesdayEnd: "17:00",
    wednesdayEnabled: true,
    thursdayStart: "09:00",
    thursdayEnd: "17:00",
    thursdayEnabled: true,
    fridayStart: "09:00",
    fridayEnd: "17:00",
    fridayEnabled: true,
    saturdayStart: "10:00",
    saturdayEnd: "15:00",
    saturdayEnabled: true,
    sundayStart: "10:00",
    sundayEnd: "15:00",
    sundayEnabled: false,
    sessionDuration: "60",
    breakDuration: "15",
    maxDailyPatients: "10",
  })

  const [treatmentPricing, setTreatmentPricing] = useState({
    consultation: "80",
    abhyanga: "120",
    shirodhara: "100",
    panchakarma: "200",
    nasya: "90",
    udvartana: "110",
    yogaTherapy: "70",
  })

  const [notificationSettings, setNotificationSettings] = useState({
    appointmentBookings: true,
    appointmentCancellations: true,
    appointmentReminders: true,
    patientMessages: true,
    paymentNotifications: true,
    systemUpdates: true,
    marketingEmails: false,
    smsNotifications: true,
    emailNotifications: true,
    pushNotifications: true,
  })

  const handleSave = () => {
    // Mock save functionality
    setIsEditing(false)
    // In real app, this would save to backend
    console.log("Settings saved:", {
      practitionerData,
      practiceData,
      availabilityData,
      treatmentPricing,
      notificationSettings,
    })
  }

  const days = [
    { key: "monday", label: "Monday" },
    { key: "tuesday", label: "Tuesday" },
    { key: "wednesday", label: "Wednesday" },
    { key: "thursday", label: "Thursday" },
    { key: "friday", label: "Friday" },
    { key: "saturday", label: "Saturday" },
    { key: "sunday", label: "Sunday" },
  ]

  return (
    <PractitionerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-heading font-bold text-3xl text-foreground">Practice Settings</h1>
            <p className="text-muted-foreground">Manage your profile, practice, and system preferences</p>
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
                Edit Settings
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
                  <AvatarImage src={practitionerData.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                    {practitionerData.firstName[0]}
                    {practitionerData.lastName[0]}
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
                  Dr. {practitionerData.firstName} {practitionerData.lastName}
                </h2>
                <p className="text-muted-foreground mb-2">{practitionerData.specialization}</p>
                <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Licensed Practitioner
                  </Badge>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    {practitionerData.experience} Experience
                  </Badge>
                  <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                    {practitionerData.education}
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-primary">127</p>
                  <p className="text-sm text-muted-foreground">Active Patients</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">4.8</p>
                  <p className="text-sm text-muted-foreground">Avg Rating</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Settings Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="practice">Practice Info</TabsTrigger>
            <TabsTrigger value="availability">Availability</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card className="border-green-100">
              <CardHeader>
                <CardTitle className="font-heading flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Personal Information
                </CardTitle>
                <CardDescription>Your personal details and professional credentials</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={practitionerData.firstName}
                      onChange={(e) => setPractitionerData({ ...practitionerData, firstName: e.target.value })}
                      disabled={!isEditing}
                      className="border-green-200 focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={practitionerData.lastName}
                      onChange={(e) => setPractitionerData({ ...practitionerData, lastName: e.target.value })}
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
                      value={practitionerData.email}
                      onChange={(e) => setPractitionerData({ ...practitionerData, email: e.target.value })}
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
                      value={practitionerData.phone}
                      onChange={(e) => setPractitionerData({ ...practitionerData, phone: e.target.value })}
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
                      value={practitionerData.address}
                      onChange={(e) => setPractitionerData({ ...practitionerData, address: e.target.value })}
                      disabled={!isEditing}
                      className="pl-10 border-green-200 focus:border-primary"
                      rows={2}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="specialization">Specialization</Label>
                    <Input
                      id="specialization"
                      value={practitionerData.specialization}
                      onChange={(e) => setPractitionerData({ ...practitionerData, specialization: e.target.value })}
                      disabled={!isEditing}
                      className="border-green-200 focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="experience">Experience</Label>
                    <Input
                      id="experience"
                      value={practitionerData.experience}
                      onChange={(e) => setPractitionerData({ ...practitionerData, experience: e.target.value })}
                      disabled={!isEditing}
                      className="border-green-200 focus:border-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="education">Education</Label>
                    <Input
                      id="education"
                      value={practitionerData.education}
                      onChange={(e) => setPractitionerData({ ...practitionerData, education: e.target.value })}
                      disabled={!isEditing}
                      className="border-green-200 focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="licenseNumber">License Number</Label>
                    <Input
                      id="licenseNumber"
                      value={practitionerData.licenseNumber}
                      onChange={(e) => setPractitionerData({ ...practitionerData, licenseNumber: e.target.value })}
                      disabled={!isEditing}
                      className="border-green-200 focus:border-primary"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="languages">Languages</Label>
                  <Input
                    id="languages"
                    value={practitionerData.languages}
                    onChange={(e) => setPractitionerData({ ...practitionerData, languages: e.target.value })}
                    disabled={!isEditing}
                    className="border-green-200 focus:border-primary"
                    placeholder="e.g., English, Hindi, Sanskrit"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="practice" className="space-y-6">
            <Card className="border-green-100">
              <CardHeader>
                <CardTitle className="font-heading flex items-center gap-2">
                  <Settings className="w-5 h-5 text-primary" />
                  Practice Information
                </CardTitle>
                <CardDescription>Details about your practice and business</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="practiceName">Practice Name</Label>
                  <Input
                    id="practiceName"
                    value={practiceData.practiceName}
                    onChange={(e) => setPracticeData({ ...practiceData, practiceName: e.target.value })}
                    disabled={!isEditing}
                    className="border-green-200 focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="practiceAddress">Practice Address</Label>
                  <Textarea
                    id="practiceAddress"
                    value={practiceData.practiceAddress}
                    onChange={(e) => setPracticeData({ ...practiceData, practiceAddress: e.target.value })}
                    disabled={!isEditing}
                    className="border-green-200 focus:border-primary"
                    rows={2}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="practicePhone">Practice Phone</Label>
                    <Input
                      id="practicePhone"
                      value={practiceData.practicePhone}
                      onChange={(e) => setPracticeData({ ...practiceData, practicePhone: e.target.value })}
                      disabled={!isEditing}
                      className="border-green-200 focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="practiceEmail">Practice Email</Label>
                    <Input
                      id="practiceEmail"
                      type="email"
                      value={practiceData.practiceEmail}
                      onChange={(e) => setPracticeData({ ...practiceData, practiceEmail: e.target.value })}
                      disabled={!isEditing}
                      className="border-green-200 focus:border-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={practiceData.website}
                      onChange={(e) => setPracticeData({ ...practiceData, website: e.target.value })}
                      disabled={!isEditing}
                      className="border-green-200 focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="taxId">Tax ID</Label>
                    <Input
                      id="taxId"
                      value={practiceData.taxId}
                      onChange={(e) => setPracticeData({ ...practiceData, taxId: e.target.value })}
                      disabled={!isEditing}
                      className="border-green-200 focus:border-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="licenseExpiry">License Expiry</Label>
                    <Input
                      id="licenseExpiry"
                      type="date"
                      value={practiceData.licenseExpiry}
                      onChange={(e) => setPracticeData({ ...practiceData, licenseExpiry: e.target.value })}
                      disabled={!isEditing}
                      className="border-green-200 focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="insuranceProvider">Insurance Provider</Label>
                    <Input
                      id="insuranceProvider"
                      value={practiceData.insuranceProvider}
                      onChange={(e) => setPracticeData({ ...practiceData, insuranceProvider: e.target.value })}
                      disabled={!isEditing}
                      className="border-green-200 focus:border-primary"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="insurancePolicy">Insurance Policy Number</Label>
                  <Input
                    id="insurancePolicy"
                    value={practiceData.insurancePolicy}
                    onChange={(e) => setPracticeData({ ...practiceData, insurancePolicy: e.target.value })}
                    disabled={!isEditing}
                    className="border-green-200 focus:border-primary"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="availability" className="space-y-6">
            <Card className="border-green-100">
              <CardHeader>
                <CardTitle className="font-heading flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Working Hours
                </CardTitle>
                <CardDescription>Set your availability for each day of the week</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {days.map((day) => (
                  <div key={day.key} className="flex items-center gap-4 p-4 border border-green-100 rounded-lg">
                    <div className="w-24">
                      <Switch
                        checked={availabilityData[`${day.key}Enabled` as keyof typeof availabilityData] as boolean}
                        onCheckedChange={(checked) =>
                          setAvailabilityData({ ...availabilityData, [`${day.key}Enabled`]: checked })
                        }
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="w-20 font-medium">{day.label}</div>
                    <div className="flex items-center gap-2 flex-1">
                      <Input
                        type="time"
                        value={availabilityData[`${day.key}Start` as keyof typeof availabilityData] as string}
                        onChange={(e) =>
                          setAvailabilityData({ ...availabilityData, [`${day.key}Start`]: e.target.value })
                        }
                        disabled={
                          !isEditing ||
                          !(availabilityData[`${day.key}Enabled` as keyof typeof availabilityData] as boolean)
                        }
                        className="border-green-200 focus:border-primary"
                      />
                      <span className="text-muted-foreground">to</span>
                      <Input
                        type="time"
                        value={availabilityData[`${day.key}End` as keyof typeof availabilityData] as string}
                        onChange={(e) =>
                          setAvailabilityData({ ...availabilityData, [`${day.key}End`]: e.target.value })
                        }
                        disabled={
                          !isEditing ||
                          !(availabilityData[`${day.key}Enabled` as keyof typeof availabilityData] as boolean)
                        }
                        className="border-green-200 focus:border-primary"
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-green-100">
              <CardHeader>
                <CardTitle className="font-heading">Session Settings</CardTitle>
                <CardDescription>Configure your session and break durations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sessionDuration">Default Session Duration (minutes)</Label>
                    <Select
                      value={availabilityData.sessionDuration}
                      onValueChange={(value) => setAvailabilityData({ ...availabilityData, sessionDuration: value })}
                      disabled={!isEditing}
                    >
                      <SelectTrigger className="border-green-200 focus:border-primary">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="45">45 minutes</SelectItem>
                        <SelectItem value="60">60 minutes</SelectItem>
                        <SelectItem value="90">90 minutes</SelectItem>
                        <SelectItem value="120">120 minutes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="breakDuration">Break Between Sessions (minutes)</Label>
                    <Select
                      value={availabilityData.breakDuration}
                      onValueChange={(value) => setAvailabilityData({ ...availabilityData, breakDuration: value })}
                      disabled={!isEditing}
                    >
                      <SelectTrigger className="border-green-200 focus:border-primary">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10">10 minutes</SelectItem>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="20">20 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxDailyPatients">Max Patients Per Day</Label>
                    <Select
                      value={availabilityData.maxDailyPatients}
                      onValueChange={(value) => setAvailabilityData({ ...availabilityData, maxDailyPatients: value })}
                      disabled={!isEditing}
                    >
                      <SelectTrigger className="border-green-200 focus:border-primary">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="6">6 patients</SelectItem>
                        <SelectItem value="8">8 patients</SelectItem>
                        <SelectItem value="10">10 patients</SelectItem>
                        <SelectItem value="12">12 patients</SelectItem>
                        <SelectItem value="15">15 patients</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pricing" className="space-y-6">
            <Card className="border-green-100">
              <CardHeader>
                <CardTitle className="font-heading flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-primary" />
                  Treatment Pricing
                </CardTitle>
                <CardDescription>Set your rates for different treatments and services</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="consultation">Consultation</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        id="consultation"
                        type="number"
                        value={treatmentPricing.consultation}
                        onChange={(e) => setTreatmentPricing({ ...treatmentPricing, consultation: e.target.value })}
                        disabled={!isEditing}
                        className="pl-10 border-green-200 focus:border-primary"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="abhyanga">Abhyanga</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        id="abhyanga"
                        type="number"
                        value={treatmentPricing.abhyanga}
                        onChange={(e) => setTreatmentPricing({ ...treatmentPricing, abhyanga: e.target.value })}
                        disabled={!isEditing}
                        className="pl-10 border-green-200 focus:border-primary"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="shirodhara">Shirodhara</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        id="shirodhara"
                        type="number"
                        value={treatmentPricing.shirodhara}
                        onChange={(e) => setTreatmentPricing({ ...treatmentPricing, shirodhara: e.target.value })}
                        disabled={!isEditing}
                        className="pl-10 border-green-200 focus:border-primary"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="panchakarma">Panchakarma</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        id="panchakarma"
                        type="number"
                        value={treatmentPricing.panchakarma}
                        onChange={(e) => setTreatmentPricing({ ...treatmentPricing, panchakarma: e.target.value })}
                        disabled={!isEditing}
                        className="pl-10 border-green-200 focus:border-primary"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nasya">Nasya</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        id="nasya"
                        type="number"
                        value={treatmentPricing.nasya}
                        onChange={(e) => setTreatmentPricing({ ...treatmentPricing, nasya: e.target.value })}
                        disabled={!isEditing}
                        className="pl-10 border-green-200 focus:border-primary"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="udvartana">Udvartana</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        id="udvartana"
                        type="number"
                        value={treatmentPricing.udvartana}
                        onChange={(e) => setTreatmentPricing({ ...treatmentPricing, udvartana: e.target.value })}
                        disabled={!isEditing}
                        className="pl-10 border-green-200 focus:border-primary"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="yogaTherapy">Yoga Therapy</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="yogaTherapy"
                      type="number"
                      value={treatmentPricing.yogaTherapy}
                      onChange={(e) => setTreatmentPricing({ ...treatmentPricing, yogaTherapy: e.target.value })}
                      disabled={!isEditing}
                      className="pl-10 border-green-200 focus:border-primary"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card className="border-green-100">
              <CardHeader>
                <CardTitle className="font-heading flex items-center gap-2">
                  <Bell className="w-5 h-5 text-primary" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>Choose how you want to receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Appointment Bookings</Label>
                    <p className="text-sm text-muted-foreground">Get notified when patients book appointments</p>
                  </div>
                  <Switch
                    checked={notificationSettings.appointmentBookings}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, appointmentBookings: checked })
                    }
                    disabled={!isEditing}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Appointment Cancellations</Label>
                    <p className="text-sm text-muted-foreground">Get notified when appointments are cancelled</p>
                  </div>
                  <Switch
                    checked={notificationSettings.appointmentCancellations}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, appointmentCancellations: checked })
                    }
                    disabled={!isEditing}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Appointment Reminders</Label>
                    <p className="text-sm text-muted-foreground">Receive reminders about upcoming appointments</p>
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
                    <Label>Patient Messages</Label>
                    <p className="text-sm text-muted-foreground">Get notified when patients send messages</p>
                  </div>
                  <Switch
                    checked={notificationSettings.patientMessages}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, patientMessages: checked })
                    }
                    disabled={!isEditing}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Payment Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive updates about payments and invoices</p>
                  </div>
                  <Switch
                    checked={notificationSettings.paymentNotifications}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, paymentNotifications: checked })
                    }
                    disabled={!isEditing}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>System Updates</Label>
                    <p className="text-sm text-muted-foreground">Get notified about system updates and maintenance</p>
                  </div>
                  <Switch
                    checked={notificationSettings.systemUpdates}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, systemUpdates: checked })
                    }
                    disabled={!isEditing}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Marketing Emails</Label>
                    <p className="text-sm text-muted-foreground">Receive promotional content and feature updates</p>
                  </div>
                  <Switch
                    checked={notificationSettings.marketingEmails}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, marketingEmails: checked })
                    }
                    disabled={!isEditing}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-100">
              <CardHeader>
                <CardTitle className="font-heading">Delivery Methods</CardTitle>
                <CardDescription>Choose how you want to receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
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

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive browser push notifications</p>
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
                  Deactivate Account
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PractitionerLayout>
  )
}
