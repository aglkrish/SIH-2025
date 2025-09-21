"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, Search, Filter, Plus, MapPin, Phone, Mail, ArrowLeft, CheckCircle, XCircle, ChevronLeft, ChevronRight } from "lucide-react"
import { PractitionerLayout } from "@/components/layouts/practitioner-layout"
import { AuthGuard } from "@/components/auth/auth-guard"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

// Mock data for calendar appointments
const mockCalendarAppointments = [
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
  {
    id: "6",
    patient: "David Martinez",
    patientEmail: "david.martinez@email.com",
    patientPhone: "+1 (555) 678-9012",
    treatment: "Panchakarma",
    date: "2024-01-18",
    time: "9:30 AM",
    duration: "120 min",
    status: "confirmed",
    location: "Wellness Center - Room 1",
    avatar: "/placeholder.svg?height=40&width=40",
    notes: "Full Panchakarma treatment. Patient is in good health condition.",
    price: "$200",
    paymentStatus: "paid",
  },
  {
    id: "7",
    patient: "Anna Rodriguez",
    patientEmail: "anna.rodriguez@email.com",
    patientPhone: "+1 (555) 789-0123",
    treatment: "Shirodhara",
    date: "2024-01-19",
    time: "2:30 PM",
    duration: "45 min",
    status: "confirmed",
    location: "Wellness Center - Room 2",
    avatar: "/placeholder.svg?height=40&width=40",
    notes: "Stress relief session. Patient has been experiencing work pressure.",
    price: "$100",
    paymentStatus: "paid",
  },
  {
    id: "8",
    patient: "James Brown",
    patientEmail: "james.brown@email.com",
    patientPhone: "+1 (555) 890-1234",
    treatment: "Consultation",
    date: "2024-01-20",
    time: "10:00 AM",
    duration: "30 min",
    status: "pending",
    location: "Consultation Room 1",
    avatar: "/placeholder.svg?height=40&width=40",
    notes: "Follow-up consultation. Review treatment progress.",
    price: "$80",
    paymentStatus: "pending",
  },
]

// Calendar view component
const CalendarView = ({ appointments, selectedDate, onDateSelect }: {
  appointments: any[],
  selectedDate: string,
  onDateSelect: (date: string) => void
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]
  
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay()
  
  const getAppointmentsForDate = (date: string) => {
    return appointments.filter(apt => apt.date === date)
  }
  
  const formatDate = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    return date.toISOString().split('T')[0]
  }
  
  const renderCalendarDays = () => {
    const days = []
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 border border-gray-200"></div>)
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = formatDate(day)
      const dayAppointments = getAppointmentsForDate(dateStr)
      const isSelected = selectedDate === dateStr
      
      days.push(
        <div 
          key={day} 
          className={`h-24 border border-gray-200 p-1 cursor-pointer hover:bg-gray-50 ${
            isSelected ? 'bg-primary/10 border-primary' : ''
          }`}
          onClick={() => onDateSelect(dateStr)}
        >
          <div className="text-sm font-medium mb-1">{day}</div>
          <div className="space-y-1">
            {dayAppointments.slice(0, 2).map((apt) => (
              <div 
                key={apt.id}
                className={`text-xs p-1 rounded truncate ${
                  apt.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                  apt.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  apt.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}
              >
                {apt.time} - {apt.patient}
              </div>
            ))}
            {dayAppointments.length > 2 && (
              <div className="text-xs text-gray-500">
                +{dayAppointments.length - 2} more
              </div>
            )}
          </div>
        </div>
      )
    }
    
    return days
  }
  
  return (
    <Card className="border-green-100">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="font-heading">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </CardTitle>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-0 border border-gray-200 rounded-lg overflow-hidden">
          {/* Day headers */}
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="bg-gray-50 p-2 text-center text-sm font-medium border-b border-gray-200">
              {day}
            </div>
          ))}
          {/* Calendar days */}
          {renderCalendarDays()}
        </div>
      </CardContent>
    </Card>
  )
}

export default function CalendarPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedDate, setSelectedDate] = useState("2024-01-15")
  const [appointments, setAppointments] = useState(mockCalendarAppointments)
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

  const handleCreateNewAppointment = () => {
    toast.success("Opening new appointment form...")
    // TODO: Open create appointment modal
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

  const selectedDateAppointments = filteredAppointments.filter(apt => apt.date === selectedDate)

  return (
    <AuthGuard requiredRole="practitioner">
      <PractitionerLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => router.back()}
                className="bg-transparent"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="font-heading font-bold text-3xl text-foreground">Calendar View</h1>
                <p className="text-muted-foreground">View and manage appointments in calendar format</p>
              </div>
            </div>
            <Button className="bg-primary hover:bg-primary/90 w-fit" onClick={handleCreateNewAppointment}>
              <Plus className="w-4 h-4 mr-2" />
              Create New Appointment
            </Button>
          </div>

          {/* Calendar View */}
          <CalendarView 
            appointments={appointments}
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
          />

          {/* Selected Date Appointments */}
          <Card className="border-green-100">
            <CardHeader>
              <CardTitle className="font-heading">
                Appointments for {new Date(selectedDate).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </CardTitle>
              <CardDescription>
                {selectedDateAppointments.length} appointment{selectedDateAppointments.length !== 1 ? 's' : ''} scheduled
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedDateAppointments.length > 0 ? (
                <div className="space-y-4">
                  {selectedDateAppointments.map((appointment) => (
                    <Card key={appointment.id} className="border-green-100">
                      <CardContent className="p-4">
                        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                          <div className="flex items-center gap-4 flex-1">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                              <span className="text-primary font-semibold">
                                {appointment.patient
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </span>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="font-heading font-semibold text-lg text-foreground">{appointment.patient}</h3>
                                <Badge className={getStatusColor(appointment.status)}>{appointment.status}</Badge>
                                <Badge className={getPaymentStatusColor(appointment.paymentStatus)}>
                                  {appointment.paymentStatus}
                                </Badge>
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
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No appointments scheduled for this date</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </PractitionerLayout>
    </AuthGuard>
  )
}

