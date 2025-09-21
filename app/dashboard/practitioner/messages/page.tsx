"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { MessageCircle, Send, ArrowLeft, Search, Phone, Mail, Clock, User } from "lucide-react"
import { PractitionerLayout } from "@/components/layouts/practitioner-layout"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { format } from "date-fns"

interface Message {
  id: string
  sender: string
  recipient: string
  content: string
  timestamp: string
  isRead: boolean
  type: "text" | "appointment" | "reminder"
}

interface Patient {
  id: string
  name: string
  avatar: string
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
  phone?: string
  email?: string
}

export default function PractitionerMessagesPage() {
  const router = useRouter()
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [newMessage, setNewMessage] = useState("")
  const [patients, setPatients] = useState<Patient[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)

  // Mock patients data
  const mockPatients: Patient[] = [
    {
      id: "1",
      name: "Sarah Johnson",
      avatar: "/placeholder.svg",
      lastMessage: "Thank you for the excellent session today!",
      lastMessageTime: "2024-01-15T14:30:00Z",
      unreadCount: 2,
      phone: "+1 (555) 123-4567",
      email: "sarah.johnson@example.com"
    },
    {
      id: "2",
      name: "Michael Chen",
      avatar: "/placeholder.svg",
      lastMessage: "Can we reschedule tomorrow's appointment?",
      lastMessageTime: "2024-01-15T12:15:00Z",
      unreadCount: 1,
      phone: "+1 (555) 234-5678",
      email: "michael.chen@example.com"
    },
    {
      id: "3",
      name: "Emily Davis",
      avatar: "/placeholder.svg",
      lastMessage: "I have a question about my treatment plan",
      lastMessageTime: "2024-01-15T10:45:00Z",
      unreadCount: 0,
      phone: "+1 (555) 345-6789",
      email: "emily.davis@example.com"
    },
    {
      id: "4",
      name: "Robert Wilson",
      avatar: "/placeholder.svg",
      lastMessage: "The Nasya treatment was very helpful",
      lastMessageTime: "2024-01-14T16:20:00Z",
      unreadCount: 0,
      phone: "+1 (555) 456-7890",
      email: "robert.wilson@example.com"
    },
    {
      id: "5",
      name: "Lisa Anderson",
      avatar: "/placeholder.svg",
      lastMessage: "Looking forward to my next session",
      lastMessageTime: "2024-01-14T09:30:00Z",
      unreadCount: 1,
      phone: "+1 (555) 567-8901",
      email: "lisa.anderson@example.com"
    }
  ]

  // Mock messages data
  const mockMessages: { [patientId: string]: Message[] } = {
    "1": [
      {
        id: "1",
        sender: "Sarah Johnson",
        recipient: "Dr. Priya Sharma",
        content: "Thank you for the excellent session today! I'm feeling much more relaxed.",
        timestamp: "2024-01-15T14:30:00Z",
        isRead: false,
        type: "text"
      },
      {
        id: "2",
        sender: "Dr. Priya Sharma",
        recipient: "Sarah Johnson",
        content: "You're very welcome, Sarah! I'm glad the Abhyanga session was beneficial. Remember to drink plenty of water and rest well.",
        timestamp: "2024-01-15T14:35:00Z",
        isRead: true,
        type: "text"
      },
      {
        id: "3",
        sender: "Sarah Johnson",
        recipient: "Dr. Priya Sharma",
        content: "I will! When should I schedule my next session?",
        timestamp: "2024-01-15T14:40:00Z",
        isRead: false,
        type: "text"
      }
    ],
    "2": [
      {
        id: "4",
        sender: "Michael Chen",
        recipient: "Dr. Priya Sharma",
        content: "Can we reschedule tomorrow's appointment? I have an emergency meeting.",
        timestamp: "2024-01-15T12:15:00Z",
        isRead: false,
        type: "appointment"
      }
    ],
    "3": [
      {
        id: "5",
        sender: "Emily Davis",
        recipient: "Dr. Priya Sharma",
        content: "I have a question about my treatment plan. Should I continue with the same herbs?",
        timestamp: "2024-01-15T10:45:00Z",
        isRead: true,
        type: "text"
      }
    ]
  }

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setPatients(mockPatients)
      setLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    if (selectedPatient) {
      setMessages(mockMessages[selectedPatient] || [])
    }
  }, [selectedPatient])

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const selectedPatientData = patients.find(p => p.id === selectedPatient)

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedPatient) return

    const newMsg: Message = {
      id: Date.now().toString(),
      sender: "Dr. Priya Sharma",
      recipient: selectedPatientData?.name || "",
      content: newMessage,
      timestamp: new Date().toISOString(),
      isRead: true,
      type: "text"
    }

    setMessages(prev => [...prev, newMsg])
    setNewMessage("")
    toast.success("Message sent successfully!")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <PractitionerLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="font-heading font-bold text-3xl text-foreground">Messages</h1>
            <p className="text-muted-foreground">Communicate with your patients</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Patients List */}
          <div className="lg:col-span-1">
            <Card className="border-green-100 h-full">
              <CardHeader>
                <CardTitle className="font-heading flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-primary" />
                  Patients
                </CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search patients..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-green-200 focus:border-primary"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[calc(100vh-300px)]">
                  {loading ? (
                    <div className="p-4 text-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto"></div>
                      <p className="text-muted-foreground mt-2 text-sm">Loading...</p>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      {filteredPatients.map((patient) => (
                        <div
                          key={patient.id}
                          className={`p-4 cursor-pointer hover:bg-muted/50 transition-colors border-b ${
                            selectedPatient === patient.id ? "bg-primary/5 border-l-4 border-l-primary" : ""
                          }`}
                          onClick={() => setSelectedPatient(patient.id)}
                        >
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <Avatar className="w-10 h-10">
                                <AvatarImage src={patient.avatar} />
                                <AvatarFallback className="bg-primary/10 text-primary">
                                  {patient.name.split(" ").map(n => n[0]).join("")}
                                </AvatarFallback>
                              </Avatar>
                              {patient.unreadCount > 0 && (
                                <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs bg-red-500">
                                  {patient.unreadCount}
                                </Badge>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-foreground truncate">{patient.name}</h4>
                              <p className="text-sm text-muted-foreground truncate">{patient.lastMessage}</p>
                              <p className="text-xs text-muted-foreground">
                                {format(new Date(patient.lastMessageTime), "MMM d, h:mm a")}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Messages */}
          <div className="lg:col-span-2">
            <Card className="border-green-100 h-full flex flex-col">
              {selectedPatient ? (
                <>
                  <CardHeader className="border-b">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={selectedPatientData?.avatar} />
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {selectedPatientData?.name.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-heading font-semibold text-foreground">{selectedPatientData?.name}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            {selectedPatientData?.phone && (
                              <span className="flex items-center gap-1">
                                <Phone className="w-3 h-3" />
                                {selectedPatientData.phone}
                              </span>
                            )}
                            {selectedPatientData?.email && (
                              <span className="flex items-center gap-1">
                                <Mail className="w-3 h-3" />
                                {selectedPatientData.email}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="flex-1 p-0">
                    <ScrollArea className="h-[calc(100vh-400px)] p-4">
                      <div className="space-y-4">
                        {messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${message.sender === "Dr. Priya Sharma" ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`max-w-[70%] p-3 rounded-lg ${
                                message.sender === "Dr. Priya Sharma"
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted"
                              }`}
                            >
                              <p className="text-sm">{message.content}</p>
                              <p className={`text-xs mt-1 ${
                                message.sender === "Dr. Priya Sharma" 
                                  ? "text-primary-foreground/70" 
                                  : "text-muted-foreground"
                              }`}>
                                {format(new Date(message.timestamp), "h:mm a")}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>

                    <Separator />

                    <div className="p-4">
                      <div className="flex gap-2">
                        <Textarea
                          placeholder="Type your message..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={handleKeyPress}
                          className="flex-1 border-green-200 focus:border-primary resize-none"
                          rows={2}
                        />
                        <Button 
                          onClick={handleSendMessage}
                          disabled={!newMessage.trim()}
                          className="bg-primary hover:bg-primary/90"
                        >
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </>
              ) : (
                <CardContent className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <MessageCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-heading font-semibold text-lg text-foreground mb-2">Select a Patient</h3>
                    <p className="text-muted-foreground">Choose a patient from the list to start messaging</p>
                  </div>
                </CardContent>
              )}
            </Card>
          </div>
        </div>
      </div>
    </PractitionerLayout>
  )
}