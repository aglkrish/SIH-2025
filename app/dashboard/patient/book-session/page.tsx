"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { PatientLayout } from "@/components/layouts/patient-layout"
import { Clock, Star, ArrowLeft, Check, CalendarDays } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { useSessions } from "@/contexts/sessions-context"
import { useNotifications } from "@/contexts/notification-context"
import { toast } from "sonner"

// Mock data for available practitioners and treatments
const mockPractitioners = [
  {
    id: "1",
    name: "Dr. Priya Sharma",
    specialization: "Panchakarma Specialist",
    rating: 4.9,
    experience: "15 years",
    avatar: "/placeholder.svg?height=60&width=60",
    treatments: ["Abhyanga", "Shirodhara", "Consultation", "Nasya"],
    availability: ["9:00 AM", "10:30 AM", "2:00 PM", "3:30 PM"],
  },
  {
    id: "2",
    name: "Dr. Raj Patel",
    specialization: "Ayurveda Physician",
    rating: 4.8,
    experience: "12 years",
    avatar: "/placeholder.svg?height=60&width=60",
    treatments: ["Consultation", "Shirodhara", "Nasya", "Udvartana"],
    availability: ["10:00 AM", "11:30 AM", "1:00 PM", "4:00 PM"],
  },
]

const mockTreatments = [
  {
    id: "abhyanga",
    name: "Abhyanga",
    description: "Full body oil massage with warm herbal oils",
    duration: "60 min",
    price: "₹9,600",
    priceInUSD: 120,
    benefits: ["Stress relief", "Improved circulation", "Muscle relaxation"],
  },
  {
    id: "shirodhara",
    name: "Shirodhara",
    description: "Continuous pouring of warm oil on the forehead",
    duration: "45 min",
    price: "₹8,000",
    priceInUSD: 100,
    benefits: ["Mental clarity", "Stress reduction", "Better sleep"],
  },
  {
    id: "consultation",
    name: "Consultation",
    description: "Initial assessment and treatment planning",
    duration: "30 min",
    price: "₹6,400",
    priceInUSD: 80,
    benefits: ["Personalized treatment plan", "Health assessment", "Lifestyle guidance"],
  },
  {
    id: "nasya",
    name: "Nasya",
    description: "Nasal administration of medicated oils",
    duration: "30 min",
    price: "₹7,200",
    priceInUSD: 90,
    benefits: ["Respiratory health", "Mental clarity", "Sinus relief"],
  },
]

export default function BookSessionPage() {
  const { user, token } = useAuth()
  const { addSession, refreshSessions } = useSessions()
  const { createNotification } = useNotifications()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedTreatment, setSelectedTreatment] = useState("")
  const [selectedPractitioner, setSelectedPractitioner] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [notes, setNotes] = useState("")
  const [currentStep, setCurrentStep] = useState(1)
  const [isBooking, setIsBooking] = useState(false)

  const handleBooking = async () => {
    console.log('Booking attempt:', {
      selectedDate,
      selectedTime,
      selectedTreatment,
      selectedPractitioner,
      selectedTreatmentData,
      selectedPractitionerData
    })

    if (!selectedDate || !selectedTime || !selectedTreatment || !selectedPractitioner) {
      toast.error("Please fill in all required fields")
      return
    }

    setIsBooking(true)
    try {
      // For now, we'll add the session directly to the context
      // This ensures the booking works immediately while we can work on API integration later
      
      const sessionData = {
        type: selectedTreatmentData?.name || '',
        practitioner: selectedPractitionerData?.name || '',
        practitionerAvatar: selectedPractitionerData?.avatar,
        date: selectedDate.toISOString().split('T')[0],
        time: selectedTime,
        duration: selectedTreatmentData?.duration || '60 min',
        status: 'confirmed' as const,
        location: "Wellness Center - Room 1",
        phone: "+91 98765 43210",
        notes: notes,
        price: selectedTreatmentData?.price || '₹0'
      }

      console.log('Adding session:', sessionData)
      
      // Add session to context
      addSession(sessionData)
      
      // Try to create appointment via API (optional for now)
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/appointments`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            practitionerId: selectedPractitioner,
            treatment: selectedTreatmentData?.name,
            date: selectedDate.toISOString(),
            time: selectedTime,
            duration: parseInt(selectedTreatmentData?.duration || '60'),
            location: "Wellness Center - Room 1",
            notes: notes,
            cost: selectedTreatmentData?.priceInUSD || 0
          })
        })

        if (response.ok) {
          const result = await response.json()
          console.log('Appointment created in backend:', result)
          // Refresh sessions from API
          await refreshSessions()
        } else {
          console.log('Backend API not available, using local storage')
        }
      } catch (apiError) {
        console.log('Backend API not available, using local storage:', apiError)
      }
      
      // Create notification for successful booking
      await createNotification(
        'appointment',
        'Appointment Booked Successfully!',
        `Your ${selectedTreatmentData?.name} session with ${selectedPractitionerData?.name} has been confirmed for ${selectedDate?.toLocaleDateString()} at ${selectedTime}.`,
        sessionData.id || 'new-session'
      )
      
      toast.success("Appointment booked successfully!")
      setCurrentStep(4) // Show confirmation
    } catch (error) {
      console.error('Booking error:', error)
      toast.error("Failed to book appointment. Please try again.")
    } finally {
      setIsBooking(false)
    }
  }

  const handleAddToCalendar = () => {
    if (!selectedDate || !selectedTime || !selectedTreatmentData || !selectedPractitionerData) {
      toast.error("Please complete booking first")
      return
    }

    // Create calendar event data
    const eventData = {
      title: `${selectedTreatmentData.name} with ${selectedPractitionerData.name}`,
      start: new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), 
        parseInt(selectedTime.split(':')[0]), parseInt(selectedTime.split(':')[1].split(' ')[0])),
      duration: selectedTreatmentData.duration,
      location: "Wellness Center - Room 1",
      description: `Treatment: ${selectedTreatmentData.name}\nPractitioner: ${selectedPractitionerData.name}\nNotes: ${notes || 'None'}`
    }

    // Generate calendar URL (Google Calendar)
    const startDate = eventData.start.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
    const endDate = new Date(eventData.start.getTime() + (parseInt(selectedTreatmentData.duration) * 60000))
      .toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
    
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventData.title)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(eventData.description)}&location=${encodeURIComponent(eventData.location)}`
    
    // Open calendar in new tab
    window.open(calendarUrl, '_blank')
    toast.success("Opening calendar to add event")
  }

  const selectedTreatmentData = mockTreatments.find((t) => t.id === selectedTreatment)
  const selectedPractitionerData = mockPractitioners.find((p) => p.id === selectedPractitioner)

  return (
    <PatientLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/dashboard/patient">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <div>
            <h1 className="font-heading font-bold text-3xl text-foreground">Book a Session</h1>
            <p className="text-muted-foreground">Schedule your next wellness appointment</p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center space-x-4 mb-8">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step <= currentStep
                    ? "bg-primary text-white"
                    : step === currentStep + 1
                      ? "bg-primary/20 text-primary"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {step < currentStep ? <Check className="w-4 h-4" /> : step}
              </div>
              {step < 4 && <div className="w-12 h-0.5 bg-muted mx-2" />}
            </div>
          ))}
        </div>

        {currentStep === 1 && (
          <Card className="border-green-100">
            <CardHeader>
              <CardTitle className="font-heading">Select Treatment</CardTitle>
              <CardDescription>Choose the therapy that best suits your needs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {mockTreatments.map((treatment) => (
                  <Card
                    key={treatment.id}
                    className={`cursor-pointer transition-all ${
                      selectedTreatment === treatment.id
                        ? "border-primary bg-primary/5"
                        : "border-green-100 hover:border-primary/50"
                    }`}
                    onClick={() => setSelectedTreatment(treatment.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-heading font-semibold text-lg">{treatment.name}</h3>
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          {treatment.price}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{treatment.description}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {treatment.duration}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Benefits:</p>
                        <ul className="text-sm text-muted-foreground">
                          {treatment.benefits.map((benefit, index) => (
                            <li key={index}>• {benefit}</li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="flex justify-end mt-6">
                <Button
                  onClick={() => setCurrentStep(2)}
                  disabled={!selectedTreatment}
                  className="bg-primary hover:bg-primary/90"
                >
                  Continue
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {currentStep === 2 && (
          <Card className="border-green-100">
            <CardHeader>
              <CardTitle className="font-heading">Select Practitioner</CardTitle>
              <CardDescription>Choose your preferred Ayurveda practitioner</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockPractitioners
                  .filter((p) => p.treatments.includes(selectedTreatmentData?.name || ""))
                  .map((practitioner) => (
                    <Card
                      key={practitioner.id}
                      className={`cursor-pointer transition-all ${
                        selectedPractitioner === practitioner.id
                          ? "border-primary bg-primary/5"
                          : "border-green-100 hover:border-primary/50"
                      }`}
                      onClick={() => setSelectedPractitioner(practitioner.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <Avatar className="w-16 h-16">
                            <AvatarImage src={practitioner.avatar || "/placeholder.svg"} />
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {practitioner.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h3 className="font-heading font-semibold text-lg">{practitioner.name}</h3>
                            <p className="text-muted-foreground">{practitioner.specialization}</p>
                            <div className="flex items-center gap-4 mt-2">
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                <span className="text-sm font-medium">{practitioner.rating}</span>
                              </div>
                              <span className="text-sm text-muted-foreground">{practitioner.experience}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={() => setCurrentStep(1)} className="bg-transparent">
                  Back
                </Button>
                <Button
                  onClick={() => setCurrentStep(3)}
                  disabled={!selectedPractitioner}
                  className="bg-primary hover:bg-primary/90"
                >
                  Continue
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {currentStep === 3 && (
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="border-green-100">
              <CardHeader>
                <CardTitle className="font-heading">Select Date & Time</CardTitle>
                <CardDescription>Choose your preferred appointment slot</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date() || date.getDay() === 0}
                    className="rounded-md border border-green-100"
                  />

                  {selectedDate && (
                    <div>
                      <Label className="text-sm font-medium mb-3 block">Available Times</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {selectedPractitionerData?.availability.map((time) => (
                          <Button
                            key={time}
                            variant={selectedTime === time ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedTime(time)}
                            className={
                              selectedTime === time
                                ? "bg-primary hover:bg-primary/90"
                                : "bg-transparent border-green-200"
                            }
                          >
                            {time}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-100">
              <CardHeader>
                <CardTitle className="font-heading">Additional Notes</CardTitle>
                <CardDescription>Any specific requirements or concerns?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="notes">Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Please share any specific concerns, preferences, or health conditions..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="border-green-200 focus:border-primary"
                    rows={4}
                  />
                </div>

                <div className="space-y-3 p-4 bg-green-50 rounded-lg">
                  <h4 className="font-medium">Booking Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Treatment:</span>
                      <span className="font-medium">{selectedTreatmentData?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Practitioner:</span>
                      <span className="font-medium">{selectedPractitionerData?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Date:</span>
                      <span className="font-medium">{selectedDate?.toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Time:</span>
                      <span className="font-medium">{selectedTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span className="font-medium">{selectedTreatmentData?.duration}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="font-medium">Total:</span>
                      <span className="font-bold text-primary">{selectedTreatmentData?.price}</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setCurrentStep(2)} className="bg-transparent">
                    Back
                  </Button>
                  <Button
                    onClick={handleBooking}
                    disabled={!selectedDate || !selectedTime || isBooking}
                    className="bg-primary hover:bg-primary/90"
                  >
                    {isBooking ? "Booking..." : "Book Session"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {currentStep === 4 && (
          <Card className="border-green-100">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="font-heading font-bold text-2xl text-foreground mb-2">Booking Confirmed!</h2>
              <p className="text-muted-foreground mb-6">
                Your {selectedTreatmentData?.name} session has been successfully booked
              </p>

              <div className="bg-green-50 p-4 rounded-lg mb-6 text-left max-w-md mx-auto">
                <h3 className="font-medium mb-3">Appointment Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Treatment:</span>
                    <span className="font-medium">{selectedTreatmentData?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Practitioner:</span>
                    <span className="font-medium">{selectedPractitionerData?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Date & Time:</span>
                    <span className="font-medium">
                      {selectedDate?.toLocaleDateString()} at {selectedTime}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span className="font-medium">{selectedTreatmentData?.duration}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild className="bg-primary hover:bg-primary/90">
                  <Link href="/dashboard/patient">View Dashboard</Link>
                </Button>
                <Button variant="outline" className="bg-transparent" onClick={handleAddToCalendar}>
                  <CalendarDays className="w-4 h-4 mr-2" />
                  Add to Calendar
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </PatientLayout>
  )
}
