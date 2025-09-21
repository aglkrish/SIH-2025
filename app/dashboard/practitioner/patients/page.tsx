"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Users,
  Search,
  Filter,
  Plus,
  Calendar,
  TrendingUp,
  Heart,
  Phone,
  Mail,
  Edit,
  Eye,
  MessageSquare,
} from "lucide-react"
import { PractitionerLayout } from "@/components/layouts/practitioner-layout"

// Mock data for patients
const mockPatients = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, San Francisco, CA",
    dateOfBirth: "1985-06-15",
    gender: "Female",
    doshaType: "Vata-Pitta",
    joinDate: "2024-01-01",
    lastVisit: "2024-01-10",
    nextAppointment: "2024-01-15",
    condition: "Stress Management",
    progress: 85,
    totalSessions: 12,
    completedSessions: 8,
    avatar: "/placeholder.svg?height=40&width=40",
    status: "active",
    primaryConcerns: "Anxiety, Sleep Issues",
    currentTreatments: "Abhyanga, Meditation",
    notes: "Responding very well to treatment. Significant improvement in stress levels.",
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael.chen@email.com",
    phone: "+1 (555) 234-5678",
    address: "456 Oak Ave, San Francisco, CA",
    dateOfBirth: "1978-03-22",
    gender: "Male",
    doshaType: "Pitta",
    joinDate: "2023-12-15",
    lastVisit: "2024-01-12",
    nextAppointment: "2024-01-18",
    condition: "Sleep Disorders",
    progress: 72,
    totalSessions: 10,
    completedSessions: 6,
    avatar: "/placeholder.svg?height=40&width=40",
    status: "active",
    primaryConcerns: "Insomnia, Work Stress",
    currentTreatments: "Shirodhara, Yoga Therapy",
    notes: "Gradual improvement in sleep quality. Needs to maintain regular schedule.",
  },
  {
    id: "3",
    name: "Emily Davis",
    email: "emily.davis@email.com",
    phone: "+1 (555) 345-6789",
    address: "789 Pine St, San Francisco, CA",
    dateOfBirth: "1992-11-08",
    gender: "Female",
    doshaType: "Kapha",
    joinDate: "2024-01-08",
    lastVisit: "2024-01-08",
    nextAppointment: "2024-01-16",
    condition: "Digestive Issues",
    progress: 90,
    totalSessions: 6,
    completedSessions: 3,
    avatar: "/placeholder.svg?height=40&width=40",
    status: "active",
    primaryConcerns: "IBS, Low Energy",
    currentTreatments: "Panchakarma, Dietary Changes",
    notes: "Excellent response to treatment. Very motivated and compliant.",
  },
  {
    id: "4",
    name: "Robert Wilson",
    email: "robert.wilson@email.com",
    phone: "+1 (555) 456-7890",
    address: "321 Elm St, San Francisco, CA",
    dateOfBirth: "1965-09-12",
    gender: "Male",
    doshaType: "Vata",
    joinDate: "2023-11-20",
    lastVisit: "2024-01-05",
    nextAppointment: "2024-01-20",
    condition: "Respiratory Issues",
    progress: 68,
    totalSessions: 15,
    completedSessions: 10,
    avatar: "/placeholder.svg?height=40&width=40",
    status: "active",
    primaryConcerns: "Asthma, Seasonal Allergies",
    currentTreatments: "Nasya, Pranayama",
    notes: "Steady improvement. Seasonal variations affect progress.",
  },
  {
    id: "5",
    name: "Lisa Thompson",
    email: "lisa.thompson@email.com",
    phone: "+1 (555) 567-8901",
    address: "654 Maple Dr, San Francisco, CA",
    dateOfBirth: "1988-04-30",
    gender: "Female",
    doshaType: "Pitta-Kapha",
    joinDate: "2023-10-10",
    lastVisit: "2024-01-14",
    nextAppointment: "2024-01-21",
    condition: "Weight Management",
    progress: 78,
    totalSessions: 20,
    completedSessions: 16,
    avatar: "/placeholder.svg?height=40&width=40",
    status: "active",
    primaryConcerns: "Metabolism, Joint Pain",
    currentTreatments: "Udvartana, Exercise Therapy",
    notes: "Good progress with weight loss. Needs continued motivation.",
  },
]

export default function PractitionerPatientsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [conditionFilter, setConditionFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("all")
  const [selectedPatient, setSelectedPatient] = useState<any>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false)
  const [messageText, setMessageText] = useState("")
  const router = useRouter()

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      case "new":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "text-green-600"
    if (progress >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const filteredPatients = mockPatients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.condition.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.primaryConcerns.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || patient.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const activePatients = filteredPatients.filter((p) => p.status === "active")
  const newPatients = filteredPatients.filter((p) => new Date(p.joinDate) > new Date("2024-01-01"))
  const highProgressPatients = filteredPatients.filter((p) => p.progress >= 80)

  // Handler functions
  const handleViewPatient = (patient: any) => {
    setSelectedPatient(patient)
    setIsViewModalOpen(true)
  }

  const handleEditPatient = (patient: any) => {
    setSelectedPatient(patient)
    setIsEditModalOpen(true)
  }

  const handleMessagePatient = (patient: any) => {
    setSelectedPatient(patient)
    setIsMessageModalOpen(true)
  }

  const handleSendMessage = () => {
    if (!messageText.trim()) {
      toast.error("Please enter a message")
      return
    }
    
    // TODO: Implement actual messaging system
    toast.success(`Message sent to ${selectedPatient.name}`)
    setMessageText("")
    setIsMessageModalOpen(false)
  }

  const handleScheduleSession = (patient: any) => {
    // Navigate to new appointment page with patient pre-selected
    router.push(`/dashboard/practitioner/new-appointment?patient=${patient.id}`)
  }

  const handleInitialConsultation = (patient: any) => {
    // Navigate to new appointment page for initial consultation
    router.push(`/dashboard/practitioner/new-appointment?patient=${patient.id}&type=consultation`)
  }

  const handleContinueTreatment = (patient: any) => {
    // Navigate to new appointment page to continue treatment
    router.push(`/dashboard/practitioner/new-appointment?patient=${patient.id}&type=continue`)
    toast.success(`Scheduling continued treatment for ${patient.name}`)
  }

  return (
    <PractitionerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-heading font-bold text-3xl text-foreground">Patient Management</h1>
            <p className="text-muted-foreground">Monitor patient progress and manage treatment plans</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90 w-fit">
            <Plus className="w-4 h-4 mr-2" />
            Add New Patient
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-green-100">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{activePatients.length}</p>
                  <p className="text-sm text-muted-foreground">Active Patients</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-100">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{newPatients.length}</p>
                  <p className="text-sm text-muted-foreground">New This Month</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-100">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{highProgressPatients.length}</p>
                  <p className="text-sm text-muted-foreground">High Progress</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-100">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Heart className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {Math.round(mockPatients.reduce((acc, p) => acc + p.progress, 0) / mockPatients.length)}%
                  </p>
                  <p className="text-sm text-muted-foreground">Avg Progress</p>
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
              placeholder="Search patients..."
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
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="new">New</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="bg-transparent">
            <Filter className="w-4 h-4 mr-2" />
            More Filters
          </Button>
        </div>

        {/* Patients Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Patients</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="new">New Patients</TabsTrigger>
            <TabsTrigger value="progress">High Progress</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPatients.map((patient) => (
                <Card key={patient.id} className="border-green-100 hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={patient.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-primary/10 text-primary text-lg">
                          {patient.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-heading font-semibold text-lg text-foreground">{patient.name}</h3>
                          <Badge className={getStatusColor(patient.status)}>{patient.status}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{patient.condition}</p>
                        <p className="text-xs text-muted-foreground">{patient.doshaType}</p>
                      </div>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Treatment Progress</span>
                        <span className={`font-medium ${getProgressColor(patient.progress)}`}>{patient.progress}%</span>
                      </div>
                      <Progress value={patient.progress} className="h-2" />
                    </div>

                    <div className="space-y-2 mb-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Last Visit:</span>
                        <span>{patient.lastVisit}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Next:</span>
                        <span>{patient.nextAppointment}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Sessions:</span>
                        <span>
                          {patient.completedSessions}/{patient.totalSessions}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <p className="text-sm font-medium">Primary Concerns:</p>
                      <p className="text-sm text-muted-foreground">{patient.primaryConcerns}</p>
                    </div>

                    <div className="space-y-2 mb-4">
                      <p className="text-sm font-medium">Current Treatments:</p>
                      <p className="text-sm text-muted-foreground">{patient.currentTreatments}</p>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="bg-transparent flex-1"
                        onClick={() => handleViewPatient(patient)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="bg-transparent flex-1"
                        onClick={() => handleEditPatient(patient)}
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="bg-transparent flex-1"
                        onClick={() => handleMessagePatient(patient)}
                      >
                        <MessageSquare className="w-4 h-4 mr-1" />
                        Message
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="active" className="space-y-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activePatients.map((patient) => (
                <Card key={patient.id} className="border-green-100 hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={patient.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-primary/10 text-primary text-lg">
                          {patient.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-heading font-semibold text-lg text-foreground mb-1">{patient.name}</h3>
                        <p className="text-sm text-muted-foreground">{patient.condition}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Phone className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{patient.phone}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className={`font-medium ${getProgressColor(patient.progress)}`}>{patient.progress}%</span>
                      </div>
                      <Progress value={patient.progress} className="h-2" />
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        className="bg-primary hover:bg-primary/90 flex-1"
                        onClick={() => handleScheduleSession(patient)}
                      >
                        Schedule Session
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="bg-transparent"
                        onClick={() => handleMessagePatient(patient)}
                      >
                        <MessageSquare className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="new" className="space-y-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {newPatients.map((patient) => (
                <Card key={patient.id} className="border-blue-200 hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={patient.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-blue-100 text-blue-600 text-lg">
                          {patient.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-heading font-semibold text-lg text-foreground">{patient.name}</h3>
                          <Badge className="bg-blue-100 text-blue-800">New</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{patient.condition}</p>
                        <p className="text-xs text-muted-foreground">Joined: {patient.joinDate}</p>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <p className="text-sm font-medium">Contact:</p>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          <span>{patient.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          <span>{patient.phone}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        className="bg-primary hover:bg-primary/90 flex-1"
                        onClick={() => handleInitialConsultation(patient)}
                      >
                        Initial Consultation
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="bg-transparent"
                        onClick={() => handleEditPatient(patient)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="progress" className="space-y-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {highProgressPatients.map((patient) => (
                <Card key={patient.id} className="border-green-200 hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={patient.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-green-100 text-green-600 text-lg">
                          {patient.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-heading font-semibold text-lg text-foreground">{patient.name}</h3>
                          <Badge className="bg-green-100 text-green-800">Excellent</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{patient.condition}</p>
                      </div>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Treatment Progress</span>
                        <span className="font-medium text-green-600">{patient.progress}%</span>
                      </div>
                      <Progress value={patient.progress} className="h-2" />
                    </div>

                    <div className="space-y-2 mb-4">
                      <p className="text-sm font-medium">Notes:</p>
                      <p className="text-sm text-muted-foreground">{patient.notes}</p>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        className="bg-green-600 hover:bg-green-700 flex-1"
                        onClick={() => handleContinueTreatment(patient)}
                      >
                        Continue Treatment
                      </Button>
                      <Button variant="outline" size="sm" className="bg-transparent">
                        <TrendingUp className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Patient View Modal */}
        <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Patient Details - {selectedPatient?.name}</DialogTitle>
              <DialogDescription>
                Complete patient information and treatment history
              </DialogDescription>
            </DialogHeader>
            {selectedPatient && (
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={selectedPatient.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                      {selectedPatient.name.split(" ").map((n: string) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-2xl font-bold">{selectedPatient.name}</h3>
                    <p className="text-muted-foreground">{selectedPatient.condition}</p>
                    <Badge className={getStatusColor(selectedPatient.status)}>{selectedPatient.status}</Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Contact Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        <span>{selectedPatient.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        <span>{selectedPatient.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>DOB: {selectedPatient.dateOfBirth}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Health Information</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium">Dosha Type:</span> {selectedPatient.doshaType}
                      </div>
                      <div>
                        <span className="font-medium">Gender:</span> {selectedPatient.gender}
                      </div>
                      <div>
                        <span className="font-medium">Join Date:</span> {selectedPatient.joinDate}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Treatment Progress</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span className={getProgressColor(selectedPatient.progress)}>{selectedPatient.progress}%</span>
                    </div>
                    <Progress value={selectedPatient.progress} className="h-2" />
                    <div className="flex justify-between text-sm">
                      <span>Sessions Completed</span>
                      <span>{selectedPatient.completedSessions}/{selectedPatient.totalSessions}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Primary Concerns</h4>
                  <p className="text-sm text-muted-foreground">{selectedPatient.primaryConcerns}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Current Treatments</h4>
                  <p className="text-sm text-muted-foreground">{selectedPatient.currentTreatments}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Notes</h4>
                  <p className="text-sm text-muted-foreground">{selectedPatient.notes}</p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Patient Edit Modal */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Patient - {selectedPatient?.name}</DialogTitle>
              <DialogDescription>
                Update patient information and treatment details
              </DialogDescription>
            </DialogHeader>
            {selectedPatient && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="patient-name">Full Name</Label>
                    <Input id="patient-name" defaultValue={selectedPatient.name} />
                  </div>
                  <div>
                    <Label htmlFor="patient-email">Email</Label>
                    <Input id="patient-email" defaultValue={selectedPatient.email} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="patient-phone">Phone</Label>
                    <Input id="patient-phone" defaultValue={selectedPatient.phone} />
                  </div>
                  <div>
                    <Label htmlFor="patient-dosha">Dosha Type</Label>
                    <Select defaultValue={selectedPatient.doshaType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vata">Vata</SelectItem>
                        <SelectItem value="pitta">Pitta</SelectItem>
                        <SelectItem value="kapha">Kapha</SelectItem>
                        <SelectItem value="vata-pitta">Vata-Pitta</SelectItem>
                        <SelectItem value="vata-kapha">Vata-Kapha</SelectItem>
                        <SelectItem value="pitta-kapha">Pitta-Kapha</SelectItem>
                        <SelectItem value="tridosha">Tridosha</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="patient-condition">Primary Condition</Label>
                  <Input id="patient-condition" defaultValue={selectedPatient.condition} />
                </div>

                <div>
                  <Label htmlFor="patient-concerns">Primary Concerns</Label>
                  <Textarea id="patient-concerns" defaultValue={selectedPatient.primaryConcerns} />
                </div>

                <div>
                  <Label htmlFor="patient-treatments">Current Treatments</Label>
                  <Textarea id="patient-treatments" defaultValue={selectedPatient.currentTreatments} />
                </div>

                <div>
                  <Label htmlFor="patient-notes">Notes</Label>
                  <Textarea id="patient-notes" defaultValue={selectedPatient.notes} />
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => {
                    toast.success("Patient information updated successfully")
                    setIsEditModalOpen(false)
                  }}>
                    Save Changes
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Message Modal */}
        <Dialog open={isMessageModalOpen} onOpenChange={setIsMessageModalOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Send Message to {selectedPatient?.name}</DialogTitle>
              <DialogDescription>
                Send a message to your patient
              </DialogDescription>
            </DialogHeader>
            {selectedPatient && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="message-text">Message</Label>
                  <Textarea 
                    id="message-text"
                    placeholder="Type your message here..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    rows={4}
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => {
                    setIsMessageModalOpen(false)
                    setMessageText("")
                  }}>
                    Cancel
                  </Button>
                  <Button onClick={handleSendMessage}>
                    Send Message
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </PractitionerLayout>
  )
}
