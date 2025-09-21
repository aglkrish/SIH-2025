"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, Search, Filter, Plus, MapPin, Phone, Mail, Edit, CheckCircle, XCircle } from "lucide-react"
import { PractitionerLayout } from "@/components/layouts/practitioner-layout"
import { AuthGuard } from "@/components/auth/auth-guard"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

// Mock data for appointments
const mockAppointments = [
  {
    id: "1",
    patient: "Sarah Johnson",
    patientEmail: "sarah.johnson@email.com",
    patientPhone: "+1 (555) 123-4567",
    treatment: "Abhyanga",
    date: "2024-01-15",
    time: "9:00 AM",
    duration: "60 min",
    status: "confirmed",
    location: "Wellness Center - Room 3",
    avatar: "/placeholder.svg?height=40&width=40",
    notes: "First session, discuss treatment plan. Patient has mild anxiety.",
    price: "$120",
    paymentStatus: "paid",
  },
  {
    id: "2",
    patient: "Michael Chen",
    patientEmail: "michael.chen@email.com",
    patientPhone: "+1 (555) 234-5678",
    treatment: "Shirodhara",
    date: "2024-01-15",
    time: "10:30 AM",
    duration: "45 min",
    status: "in-progress",
    location: "Wellness Center - Room 1",
    avatar: "/placeholder.svg?height=40&width=40",
    notes: "Follow-up session, check stress levels. Responding well to treatment.",
    price: "$100",
    paymentStatus: "paid",
  },
  {
    id: "3",
    patient: "Emily Davis",
    patientEmail: "emily.davis@email.com",
    patientPhone: "+1 (555) 345-6789",
    treatment: "Consultation",
    date: "2024-01-15",
    time: "2:00 PM",
    duration: "30 min",
    status: "confirmed",
    location: "Consultation Room 2",
    avatar: "/placeholder.svg?height=40&width=40",
    notes: "Initial consultation for Panchakarma. Discuss treatment options.",
    price: "$80",
    paymentStatus: "pending",
  },
  {
    id: "4",
    patient: "Robert Wilson",
    patientEmail: "robert.wilson@email.com",
    patientPhone: "+1 (555) 456-7890",
    treatment: "Nasya",
    date: "2024-01-16",
    time: "3:30 PM",
    duration: "30 min",
    status: "pending",
    location: "Wellness Center - Room 2",
    avatar: "/placeholder.svg?height=40&width=40",
    notes: "Respiratory issues treatment. Patient has seasonal allergies.",
    price: "$90",
    paymentStatus: "pending",
  },
  {
    id: "5",
    patient: "Lisa Thompson",
    patientEmail: "lisa.thompson@email.com",
    patientPhone: "+1 (555) 567-8901",
    treatment: "Abhyanga",
    date: "2024-01-17",
    time: "11:00 AM",
    duration: "60 min",
    status: "confirmed",
    location: "Wellness Center - Room 3",
    avatar: "/placeholder.svg?height=40&width=40",
    notes: "Regular maintenance session. Patient is very satisfied with progress.",
    price: "$120",
    paymentStatus: "paid",
  },
]

export default function PractitionerAppointmentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("all")
  const [appointments, setAppointments] = useState(mockAppointments)
  const router = useRouter()

  // Handler functions for appointment actions
  const handleEditAppointment = (appointmentId: string) => {
    toast.success(`Editing appointment ${appointmentId}`)
    // TODO: Open edit modal or navigate to edit page
  }

  const handleConfirmAppointment = (appointmentId: string) => {
    setAppointments(prev => 
      prev.map(apt => 
        apt.id === appointmentId 
          ? { ...apt, status: 'confirmed' as const }
          : apt
      )
    )
    toast.success("Appointment confirmed successfully!")
  }

  const handleCancelAppointment = (appointmentId: string) => {
    setAppointments(prev => 
      prev.map(apt => 
        apt.id === appointmentId 
          ? { ...apt, status: 'cancelled' as const }
          : apt
      )
    )
    toast.success("Appointment cancelled successfully!")
  }

  const handleStartSession = (appointmentId: string) => {
    setAppointments(prev => 
      prev.map(apt => 
        apt.id === appointmentId 
          ? { ...apt, status: 'in-progress' as const }
          : apt
      )
    )
    toast.success("Session started!")
  }

  const handleRescheduleAppointment = (appointmentId: string) => {
    toast.success(`Rescheduling appointment ${appointmentId}`)
    // TODO: Open reschedule modal
  }

  const handleSendReminder = (appointmentId: string) => {
    toast.success(`Reminder sent for appointment ${appointmentId}`)
  }

  const handleNewAppointment = () => {
    router.push("/dashboard/practitioner/new-appointment")
  }

  const handleViewCalendar = () => {
    router.push("/dashboard/practitioner/calendar")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "overdue":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.treatment.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || appointment.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const todayAppointments = filteredAppointments.filter((apt) => apt.date === "2024-01-15")
  const upcomingAppointments = filteredAppointments.filter((apt) => apt.date > "2024-01-15")
  const pendingAppointments = filteredAppointments.filter((apt) => apt.status === "pending")

  return (
    <AuthGuard requiredRole="practitioner">
      <PractitionerLayout>
        <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-heading font-bold text-3xl text-foreground">Appointments</h1>
            <p className="text-muted-foreground">Manage your patient appointments and schedule</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="bg-transparent" onClick={handleViewCalendar}>
              <Calendar className="w-4 h-4 mr-2" />
              View Calendar
            </Button>
            <Button className="bg-primary hover:bg-primary/90 w-fit" onClick={handleNewAppointment}>
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
                  <p className="text-2xl font-bold text-foreground">{todayAppointments.length}</p>
                  <p className="text-sm text-muted-foreground">Today's Appointments</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-100">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{upcomingAppointments.length}</p>
                  <p className="text-sm text-muted-foreground">Upcoming</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-100">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{pendingAppointments.length}</p>
                  <p className="text-sm text-muted-foreground">Pending Confirmation</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-100">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{mockAppointments.length}</p>
                  <p className="text-sm text-muted-foreground">Total This Week</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
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
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px] border-green-200 focus:border-primary">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="bg-transparent">
            <Filter className="w-4 h-4 mr-2" />
            More Filters
          </Button>
        </div>

        {/* Appointments Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Appointments</TabsTrigger>
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {filteredAppointments.map((appointment) => (
              <Card key={appointment.id} className="border-green-100 hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    <div className="flex items-center gap-4 flex-1">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={appointment.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {appointment.patient
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-heading font-semibold text-lg text-foreground">{appointment.patient}</h3>
                          <Badge className={getStatusColor(appointment.status)}>{appointment.status}</Badge>
                          <Badge className={getPaymentStatusColor(appointment.paymentStatus)}>
                            {appointment.paymentStatus}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground mb-2">{appointment.treatment}</p>
                        <p className="text-sm text-muted-foreground">{appointment.notes}</p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 lg:gap-6">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span>{appointment.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span>
                            {appointment.time} ({appointment.duration})
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span>{appointment.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="w-4 h-4 text-muted-foreground" />
                          <span>{appointment.patientPhone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="w-4 h-4 text-muted-foreground" />
                          <span>{appointment.patientEmail}</span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <div className="text-right">
                          <p className="font-semibold text-lg text-primary">{appointment.price}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="bg-transparent"
                            onClick={() => handleEditAppointment(appointment.id)}
                          >
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                          {appointment.status === "pending" && (
                            <Button 
                              size="sm" 
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => handleConfirmAppointment(appointment.id)}
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Confirm
                            </Button>
                          )}
                          {appointment.status === "confirmed" && (
                            <Button 
                              size="sm" 
                              className="bg-blue-600 hover:bg-blue-700"
                              onClick={() => handleStartSession(appointment.id)}
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Start Session
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-transparent text-red-600 hover:text-red-700"
                            onClick={() => handleCancelAppointment(appointment.id)}
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="today" className="space-y-4">
            {todayAppointments.map((appointment) => (
              <Card key={appointment.id} className="border-green-100 hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    <div className="flex items-center gap-4 flex-1">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={appointment.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {appointment.patient
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-heading font-semibold text-lg text-foreground">{appointment.patient}</h3>
                          <Badge className={getStatusColor(appointment.status)}>{appointment.status}</Badge>
                        </div>
                        <p className="text-muted-foreground mb-2">{appointment.treatment}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {appointment.time} ({appointment.duration})
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {appointment.location}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="bg-transparent"
                        onClick={() => handleStartSession(appointment.id)}
                      >
                        Start Session
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="bg-transparent"
                        onClick={() => handleRescheduleAppointment(appointment.id)}
                      >
                        Reschedule
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="upcoming" className="space-y-4">
            {upcomingAppointments.map((appointment) => (
              <Card key={appointment.id} className="border-green-100 hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    <div className="flex items-center gap-4 flex-1">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={appointment.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {appointment.patient
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-heading font-semibold text-lg text-foreground">{appointment.patient}</h3>
                          <Badge className={getStatusColor(appointment.status)}>{appointment.status}</Badge>
                        </div>
                        <p className="text-muted-foreground mb-2">{appointment.treatment}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {appointment.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {appointment.time}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="bg-transparent"
                        onClick={() => handleEditAppointment(appointment.id)}
                      >
                        Edit
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="bg-transparent"
                        onClick={() => handleSendReminder(appointment.id)}
                      >
                        Send Reminder
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            {pendingAppointments.map((appointment) => (
              <Card key={appointment.id} className="border-yellow-200 hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    <div className="flex items-center gap-4 flex-1">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={appointment.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {appointment.patient
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-heading font-semibold text-lg text-foreground">{appointment.patient}</h3>
                          <Badge className="bg-yellow-100 text-yellow-800">Pending Confirmation</Badge>
                        </div>
                        <p className="text-muted-foreground mb-2">{appointment.treatment}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {appointment.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {appointment.time}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => handleConfirmAppointment(appointment.id)}
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Confirm
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="bg-transparent text-red-600 hover:text-red-700"
                        onClick={() => handleCancelAppointment(appointment.id)}
                      >
                        <XCircle className="w-4 h-4 mr-1" />
                        Decline
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
        </div>
      </PractitionerLayout>
    </AuthGuard>
  )
}
