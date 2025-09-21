"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Calendar,
  Clock,
  Heart,
  TrendingUp,
  Bell,
  MapPin,
  Phone,
  Mail,
  Star,
  Activity,
  Droplets,
  Plus,
} from "lucide-react"
import { PatientLayout } from "@/components/layouts/patient-layout"
import { SessionCard } from "@/components/dashboard/session-card"
import { ProgressChart } from "@/components/dashboard/progress-chart"
import { WellnessMetrics } from "@/components/dashboard/wellness-metrics"
import { AuthGuard } from "@/components/auth/auth-guard"
import { WelcomeMessage } from "@/components/dashboard/welcome-message"
import { useSessions } from "@/contexts/sessions-context"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { api } from "@/lib/api"

// Mock data - replace with real API calls
const mockUpcomingSessions = [
  {
    id: "1",
    type: "Abhyanga",
    practitioner: "Dr. Priya Sharma",
    date: "2024-01-15",
    time: "10:00 AM",
    duration: "60 min",
    status: "confirmed",
    location: "Wellness Center - Room 3",
  },
  {
    id: "2",
    type: "Shirodhara",
    practitioner: "Dr. Raj Patel",
    date: "2024-01-17",
    time: "2:00 PM",
    duration: "45 min",
    status: "pending",
    location: "Wellness Center - Room 1",
  },
  {
    id: "3",
    type: "Panchakarma Consultation",
    practitioner: "Dr. Priya Sharma",
    date: "2024-01-20",
    time: "11:30 AM",
    duration: "30 min",
    status: "confirmed",
    location: "Consultation Room 2",
  },
]

const mockRecentSessions = [
  {
    id: "4",
    type: "Abhyanga",
    practitioner: "Dr. Priya Sharma",
    date: "2024-01-10",
    time: "10:00 AM",
    duration: "60 min",
    status: "completed",
    rating: 5,
    notes: "Excellent session, feeling very relaxed",
  },
  {
    id: "5",
    type: "Nasya",
    practitioner: "Dr. Raj Patel",
    date: "2024-01-08",
    time: "3:00 PM",
    duration: "30 min",
    status: "completed",
    rating: 4,
    notes: "Good treatment, slight improvement in breathing",
  },
]

export default function PatientDashboard() {
  const [activeTab, setActiveTab] = useState("progress")
  const router = useRouter()
  const { upcomingSessions, pastSessions, loading } = useSessions()

  const handleBookNewSession = () => {
    router.push("/dashboard/patient/book-session")
  }

  const handleRescheduleSession = (sessionId: string) => {
    toast.success(`Rescheduling session ${sessionId}`)
    // TODO: Implement reschedule functionality
  }

  const handleCancelSession = (sessionId: string) => {
    toast.success(`Cancelling session ${sessionId}`)
    // TODO: Implement cancel functionality
  }

  const handleEditProfile = () => {
    router.push("/dashboard/patient/profile")
  }

  const handleUpdateHealthInfo = () => {
    toast.success("Opening health information form")
    // TODO: Implement health info update
  }

  const handleUpdatePreferences = () => {
    toast.success("Opening preferences form")
    // TODO: Implement preferences update
  }

  return (
    <AuthGuard requiredRole="patient">
      <PatientLayout>
        <div className="space-y-6">
        {/* Welcome Message */}
        <WelcomeMessage />

        {/* Action Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="font-heading font-bold text-2xl text-foreground">Your Dashboard</h2>
            <p className="text-muted-foreground">Track your wellness journey and manage your treatments</p>
          </div>
          <Button 
            className="bg-primary hover:bg-primary/90 w-fit"
            onClick={handleBookNewSession}
          >
            <Plus className="w-4 h-4 mr-2" />
            Book New Session
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-green-100">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{upcomingSessions.length}</p>
                  <p className="text-sm text-muted-foreground">Upcoming Sessions</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-100">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <Activity className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{pastSessions.length}</p>
                  <p className="text-sm text-muted-foreground">Sessions Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-100">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">85%</p>
                  <p className="text-sm text-muted-foreground">Wellness Score</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-100">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Heart className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">4.8</p>
                  <p className="text-sm text-muted-foreground">Avg. Rating</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>


          <TabsContent value="progress" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <ProgressChart />
              <WellnessMetrics detailed />
            </div>

            {/* Upcoming Sessions */}
            {upcomingSessions.length > 0 && (
              <Card className="border-green-100">
                <CardHeader>
                  <CardTitle className="font-heading">Upcoming Sessions</CardTitle>
                  <CardDescription>Your scheduled appointments</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingSessions.slice(0, 3).map((session) => (
                    <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={session.practitionerAvatar || "/placeholder.svg"} />
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {session.practitioner.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{session.type}</h4>
                          <p className="text-sm text-muted-foreground">with {session.practitioner}</p>
                          <p className="text-sm text-muted-foreground">{session.date} at {session.time}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={session.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                          {session.status}
                        </Badge>
                        <p className="text-sm text-muted-foreground mt-1">{session.duration}</p>
                      </div>
                    </div>
                  ))}
                  {upcomingSessions.length > 3 && (
                    <div className="text-center pt-2">
                      <Button variant="outline" asChild className="bg-transparent">
                        <Link href="/dashboard/patient/sessions">
                          View All Sessions
                        </Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Treatment Progress */}
            <Card className="border-green-100">
              <CardHeader>
                <CardTitle className="font-heading">Treatment Progress</CardTitle>
                <CardDescription>Track your recovery milestones</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Stress Reduction</span>
                    <span className="text-sm text-muted-foreground">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Sleep Quality</span>
                    <span className="text-sm text-muted-foreground">72%</span>
                  </div>
                  <Progress value={72} className="h-2" />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Energy Levels</span>
                    <span className="text-sm text-muted-foreground">90%</span>
                  </div>
                  <Progress value={90} className="h-2" />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Digestive Health</span>
                    <span className="text-sm text-muted-foreground">68%</span>
                  </div>
                  <Progress value={68} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Profile Info */}
              <Card className="border-green-100">
                <CardHeader>
                  <CardTitle className="font-heading">Profile Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src="/placeholder.svg?height=64&width=64" />
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold text-lg">JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-heading font-semibold text-lg">John Doe</h3>
                      <p className="text-muted-foreground">Patient since Jan 2024</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">john.doe@example.com</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">+1 (555) 123-4567</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">San Francisco, CA</span>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full bg-transparent"
                    onClick={handleEditProfile}
                  >
                    Edit Profile
                  </Button>
                </CardContent>
              </Card>

              {/* Health Information */}
              <Card className="border-green-100">
                <CardHeader>
                  <CardTitle className="font-heading">Health Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium">Dosha Type</p>
                      <p className="text-sm text-muted-foreground">Vata-Pitta</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Primary Concerns</p>
                      <p className="text-sm text-muted-foreground">Stress, Sleep Issues</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Allergies</p>
                      <p className="text-sm text-muted-foreground">None reported</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Current Medications</p>
                      <p className="text-sm text-muted-foreground">Ashwagandha, Brahmi</p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full bg-transparent"
                    onClick={handleUpdateHealthInfo}
                  >
                    Update Health Info
                  </Button>
                </CardContent>
              </Card>

              {/* Preferences */}
              <Card className="border-green-100">
                <CardHeader>
                  <CardTitle className="font-heading">Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium">Preferred Practitioner</p>
                      <p className="text-sm text-muted-foreground">Dr. Priya Sharma</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Preferred Time</p>
                      <p className="text-sm text-muted-foreground">Morning (9 AM - 12 PM)</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Notification Preferences</p>
                      <p className="text-sm text-muted-foreground">Email + SMS</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Language</p>
                      <p className="text-sm text-muted-foreground">English</p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full bg-transparent"
                    onClick={handleUpdatePreferences}
                  >
                    Update Preferences
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
        </div>
      </PatientLayout>
    </AuthGuard>
  )
}
