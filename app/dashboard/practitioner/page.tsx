"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calendar,
  Clock,
  Users,
  TrendingUp,
  Bell,
  Plus,
  Search,
  Filter,
  Star,
  Activity,
  DollarSign,
  CheckCircle,
} from "lucide-react"
import { PractitionerLayout } from "@/components/layouts/practitioner-layout"
import { PatientCard } from "@/components/dashboard/patient-card"
import { AppointmentCard } from "@/components/dashboard/appointment-card"
import { PracticeAnalytics } from "@/components/dashboard/practice-analytics"
import { AuthGuard } from "@/components/auth/auth-guard"
import { WelcomeMessage } from "@/components/dashboard/welcome-message"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { api } from "@/lib/api"

// Mock data - replace with real API calls
const mockTodayAppointments = [
  {
    id: "1",
    patient: "Sarah Johnson",
    type: "Abhyanga",
    time: "9:00 AM",
    duration: "60 min",
    status: "confirmed",
    avatar: "/placeholder.svg?height=40&width=40",
    notes: "First session, discuss treatment plan",
  },
  {
    id: "2",
    patient: "Michael Chen",
    type: "Shirodhara",
    time: "10:30 AM",
    duration: "45 min",
    status: "in-progress",
    avatar: "/placeholder.svg?height=40&width=40",
    notes: "Follow-up session, check stress levels",
  },
  {
    id: "3",
    patient: "Emily Davis",
    type: "Consultation",
    time: "2:00 PM",
    duration: "30 min",
    status: "confirmed",
    avatar: "/placeholder.svg?height=40&width=40",
    notes: "Initial consultation for Panchakarma",
  },
  {
    id: "4",
    patient: "Robert Wilson",
    type: "Nasya",
    time: "3:30 PM",
    duration: "30 min",
    status: "pending",
    avatar: "/placeholder.svg?height=40&width=40",
    notes: "Respiratory issues treatment",
  },
]

const mockRecentPatients = [
  {
    id: "1",
    name: "Sarah Johnson",
    lastVisit: "2024-01-10",
    condition: "Stress Management",
    progress: 85,
    avatar: "/placeholder.svg?height=40&width=40",
    nextAppointment: "2024-01-15",
  },
  {
    id: "2",
    name: "Michael Chen",
    lastVisit: "2024-01-12",
    condition: "Sleep Disorders",
    progress: 72,
    avatar: "/placeholder.svg?height=40&width=40",
    nextAppointment: "2024-01-18",
  },
  {
    id: "3",
    name: "Emily Davis",
    lastVisit: "2024-01-08",
    condition: "Digestive Issues",
    progress: 90,
    avatar: "/placeholder.svg?height=40&width=40",
    nextAppointment: "2024-01-16",
  },
]

export default function PractitionerDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchQuery, setSearchQuery] = useState("")
  const [appointments, setAppointments] = useState([])
  const [patients, setPatients] = useState([])
  const [analytics, setAnalytics] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        
        // Fetch appointments
        const appointmentsResponse = await api.get('/appointments')
        console.log('Fetched appointments:', appointmentsResponse)
        setAppointments(appointmentsResponse.appointments || [])
        
        // Fetch patients
        const patientsResponse = await api.get('/patients')
        console.log('Fetched patients:', patientsResponse)
        setPatients(patientsResponse.patients || [])
        
        // Fetch analytics
        const analyticsResponse = await api.get('/analytics')
        console.log('Fetched analytics:', analyticsResponse)
        setAnalytics(analyticsResponse.analytics || null)
        
      } catch (error) {
        console.error('Error fetching data:', error)
        // Fallback to mock data if API fails
        setAppointments(mockTodayAppointments)
        setPatients(mockRecentPatients)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <AuthGuard requiredRole="practitioner">
      <PractitionerLayout>
        <div className="space-y-6">
        {/* Welcome Message */}
        <WelcomeMessage />

        {/* Action Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="font-heading font-bold text-2xl text-foreground">Your Practice Dashboard</h2>
            <p className="text-muted-foreground">Manage your patients and appointments</p>
          </div>
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              className="bg-transparent"
              onClick={() => router.push("/dashboard/practitioner/calendar")}
            >
              <Calendar className="w-4 h-4 mr-2" />
              View Calendar
            </Button>
            <Button 
              className="bg-primary hover:bg-primary/90"
              onClick={() => router.push("/dashboard/practitioner/new-appointment")}
            >
              <Plus className="w-4 h-4 mr-2" />
              New Appointment
            </Button>
          </div>
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
                  <p className="text-2xl font-bold text-foreground">{loading ? "..." : appointments.length}</p>
                  <p className="text-sm text-muted-foreground">Today's Appointments</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-100">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{loading ? "..." : patients.length}</p>
                  <p className="text-sm text-muted-foreground">Active Patients</p>
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
                  <p className="text-2xl font-bold text-foreground">94%</p>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-100">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">₹10,00,000</p>
                  <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="patients">Patients</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Today's Schedule */}
              <div className="lg:col-span-2">
                <Card className="border-green-100">
                  <CardHeader>
                    <CardTitle className="font-heading flex items-center gap-2">
                      <Clock className="w-5 h-5 text-primary" />
                      Today's Schedule
                    </CardTitle>
                    <CardDescription>Your appointments for January 15, 2024</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {loading ? (
                      <div className="text-center py-4">Loading appointments...</div>
                    ) : (
                      appointments.map((appointment) => (
                        <AppointmentCard key={appointment.id} appointment={appointment} />
                      ))
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions & Recent Activity */}
              <div className="space-y-6">
                {/* Quick Actions */}
                <Card className="border-green-100">
                  <CardHeader>
                    <CardTitle className="font-heading text-lg">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start bg-transparent"
                      onClick={() => router.push("/dashboard/practitioner/treatment-rating")}
                    >
                      <Activity className="w-4 h-4 mr-2" />
                      Update Treatment Plan
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Bell className="w-4 h-4 mr-2" />
                      Send Reminder
                    </Button>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card className="border-green-100">
                  <CardHeader>
                    <CardTitle className="font-heading text-lg">Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Completed Abhyanga session</p>
                        <p className="text-xs text-muted-foreground">Sarah Johnson - 30 min ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center">
                        <Star className="w-4 h-4 text-secondary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Received 5-star rating</p>
                        <p className="text-xs text-muted-foreground">Michael Chen - 1 hour ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                        <Plus className="w-4 h-4 text-accent" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">New patient registered</p>
                        <p className="text-xs text-muted-foreground">Emily Davis - 2 hours ago</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="appointments" className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search appointments..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-green-200 focus:border-primary"
                />
              </div>
              <Button variant="outline" className="bg-transparent">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                New Appointment
              </Button>
            </div>

            <Card className="border-green-100">
              <CardHeader>
                <CardTitle className="font-heading">All Appointments</CardTitle>
                <CardDescription>Manage your appointment schedule</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {loading ? (
                  <div className="text-center py-4">Loading appointments...</div>
                ) : (
                  appointments.map((appointment) => (
                    <AppointmentCard key={appointment.id} appointment={appointment} detailed />
                  ))
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="patients" className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search patients..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-green-200 focus:border-primary"
                />
              </div>
              <Button variant="outline" className="bg-transparent">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Add Patient
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                <div className="col-span-full text-center py-4">Loading patients...</div>
              ) : (
                patients.map((patient) => (
                  <PatientCard key={patient.id} patient={patient} />
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <PracticeAnalytics />
          </TabsContent>
        </Tabs>
        </div>
      </PractitionerLayout>
    </AuthGuard>
  )
}
