"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar as CalendarIcon, Clock, User, MapPin, ArrowLeft, Plus, Search, Filter } from "lucide-react"
import { PractitionerLayout } from "@/components/layouts/practitioner-layout"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { format } from "date-fns"

interface Appointment {
  id: string
  patient: string
  type: string
  date: string
  time: string
  duration: string
  status: string
  avatar: string
  notes?: string
  phone?: string
  email?: string
}

export default function PractitionerSchedulePage() {
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)

  // Mock appointments data
  const mockAppointments: Appointment[] = [
    {
      id: "1",
      patient: "Sarah Johnson",
      type: "Abhyanga",
      date: "2024-01-15",
      time: "9:00 AM",
      duration: "60 min",
      status: "confirmed",
      avatar: "/placeholder.svg",
      notes: "First session, discuss treatment plan",
      phone: "+1 (555) 123-4567",
      email: "sarah.johnson@example.com"
    },
    {
      id: "2",
      patient: "Michael Chen",
      type: "Shirodhara",
      date: "2024-01-15",
      time: "10:30 AM",
      duration: "45 min",
      status: "in-progress",
      avatar: "/placeholder.svg",
      notes: "Follow-up session, check stress levels",
      phone: "+1 (555) 234-5678",
      email: "michael.chen@example.com"
    },
    {
      id: "3",
      patient: "Emily Davis",
      type: "Consultation",
      date: "2024-01-15",
      time: "2:00 PM",
      duration: "30 min",
      status: "confirmed",
      avatar: "/placeholder.svg",
      notes: "Initial consultation for Panchakarma",
      phone: "+1 (555) 345-6789",
      email: "emily.davis@example.com"
    },
    {
      id: "4",
      patient: "Robert Wilson",
      type: "Nasya",
      date: "2024-01-15",
      time: "3:30 PM",
      duration: "30 min",
      status: "pending",
      avatar: "/placeholder.svg",
      notes: "Respiratory issues treatment",
      phone: "+1 (555) 456-7890",
      email: "robert.wilson@example.com"
    },
    {
      id: "5",
      patient: "Lisa Anderson",
      type: "Abhyanga",
      date: "2024-01-16",
      time: "9:00 AM",
      duration: "60 min",
      status: "confirmed",
      avatar: "/placeholder.svg",
      notes: "Regular maintenance session",
      phone: "+1 (555) 567-8901",
      email: "lisa.anderson@example.com"
    }
  ]

  useEffect(() => {
    // Simulate loading appointments
    setTimeout(() => {
      setAppointments(mockAppointments)
      setLoading(false)
    }, 1000)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.type.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || appointment.status === statusFilter
    const matchesDate = selectedDate ? appointment.date === format(selectedDate, "yyyy-MM-dd") : true
    
    return matchesSearch && matchesStatus && matchesDate
  })

  const handleReschedule = (appointmentId: string) => {
    toast.success(`Rescheduling appointment ${appointmentId}`)
    // TODO: Implement reschedule functionality
  }

  const handleCancel = (appointmentId: string) => {
    toast.success(`Cancelling appointment ${appointmentId}`)
    // TODO: Implement cancel functionality
  }

  const handleStartSession = (appointmentId: string) => {
    toast.success(`Starting session for appointment ${appointmentId}`)
    // TODO: Implement start session functionality
  }

  const getAppointmentsForDate = (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd")
    return appointments.filter(apt => apt.date === dateStr).length
  }

  return (
    <PractitionerLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="font-heading font-bold text-3xl text-foreground">Schedule Management</h1>
            <p className="text-muted-foreground">Manage your appointments and schedule</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-1">
            <Card className="border-green-100">
              <CardHeader>
                <CardTitle className="font-heading flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5 text-primary" />
                  Calendar
                </CardTitle>
                <CardDescription>Select a date to view appointments</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border mx-auto"
                  modifiers={{
                    hasAppointments: (date) => getAppointmentsForDate(date) > 0
                  }}
                  modifiersStyles={{
                    hasAppointments: {
                      backgroundColor: "#10B981",
                      color: "white",
                      borderRadius: "4px"
                    }
                  }}
                />
                <div className="mt-4 text-center">
                  <p className="text-sm text-muted-foreground">
                    {selectedDate ? format(selectedDate, "EEEE, MMMM do, yyyy") : "Select a date"}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Appointments List */}
          <div className="lg:col-span-2">
            <Card className="border-green-100">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="font-heading">Appointments</CardTitle>
                    <CardDescription>
                      {selectedDate ? `Appointments for ${format(selectedDate, "MMMM do, yyyy")}` : "All appointments"}
                    </CardDescription>
                  </div>
                  <Button className="bg-primary hover:bg-primary/90">
                    <Plus className="w-4 h-4 mr-2" />
                    New Appointment
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {/* Filters */}
                <div className="flex gap-4 mb-6">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        placeholder="Search patients or treatments..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 border-green-200 focus:border-primary"
                      />
                    </div>
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-48 border-green-200 focus:border-primary">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Appointments */}
                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                    <p className="text-muted-foreground mt-2">Loading appointments...</p>
                  </div>
                ) : filteredAppointments.length === 0 ? (
                  <div className="text-center py-8">
                    <CalendarIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No appointments found</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredAppointments.map((appointment) => (
                      <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-4">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={appointment.avatar} />
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {appointment.patient.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-heading font-semibold text-foreground">{appointment.patient}</h4>
                            <p className="text-sm text-muted-foreground">{appointment.type}</p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {appointment.time} ({appointment.duration})
                              </span>
                              {appointment.phone && (
                                <span className="flex items-center gap-1">
                                  <User className="w-3 h-3" />
                                  {appointment.phone}
                                </span>
                              )}
                            </div>
                            {appointment.notes && (
                              <p className="text-xs text-muted-foreground mt-1 italic">{appointment.notes}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge className={getStatusColor(appointment.status)}>
                            {appointment.status}
                          </Badge>
                          <div className="flex gap-2">
                            {appointment.status === "confirmed" && (
                              <Button size="sm" onClick={() => handleStartSession(appointment.id)}>
                                Start
                              </Button>
                            )}
                            {appointment.status === "pending" && (
                              <Button size="sm" variant="outline" onClick={() => handleReschedule(appointment.id)}>
                                Reschedule
                              </Button>
                            )}
                            <Button size="sm" variant="outline" onClick={() => handleCancel(appointment.id)}>
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PractitionerLayout>
  )
}