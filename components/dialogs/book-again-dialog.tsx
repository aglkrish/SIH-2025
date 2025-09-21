"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar as CalendarIcon, Clock, User, Check } from "lucide-react"
import { toast } from "sonner"

interface BookAgainDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  session: any
  onBookAgain: (sessionId: string, newDate: Date, newTime: string) => Promise<void>
}

// Mock available time slots
const availableTimeSlots = [
  "9:00 AM", "10:30 AM", "11:00 AM", "2:00 PM", "3:30 PM", "4:00 PM"
]

export function BookAgainDialog({ open, onOpenChange, session, onBookAgain }: BookAgainDialogProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedTime, setSelectedTime] = useState("")
  const [isBooking, setIsBooking] = useState(false)
  const [currentStep, setCurrentStep] = useState(1) // 1: Confirmation, 2: Date/Time Selection

  const handleConfirm = () => {
    setCurrentStep(2)
  }

  const handleBookAgain = async () => {
    if (!selectedDate || !selectedTime) {
      toast.error("Please select both date and time")
      return
    }

    setIsBooking(true)
    try {
      await onBookAgain(session.id, selectedDate, selectedTime)
      toast.success("Session booked successfully!")
      onOpenChange(false)
      setCurrentStep(1)
      setSelectedDate(new Date())
      setSelectedTime("")
    } catch (error) {
      console.error('Book again error:', error)
      toast.error("Failed to book session. Please try again.")
    } finally {
      setIsBooking(false)
    }
  }

  const handleClose = () => {
    onOpenChange(false)
    setCurrentStep(1)
    setSelectedDate(new Date())
    setSelectedTime("")
  }

  if (!session) return null

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5" />
            {currentStep === 1 ? "Book Again" : "Select Date & Time"}
          </DialogTitle>
          <DialogDescription>
            {currentStep === 1 
              ? "Are you sure you want to book again with the same practitioner?"
              : "Choose your preferred date and time for the new session"
            }
          </DialogDescription>
        </DialogHeader>

        {currentStep === 1 && (
          <div className="space-y-6">
            {/* Session Details */}
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={session.practitionerAvatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {session.practitioner
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-lg">{session.type}</h3>
                  <p className="text-muted-foreground">with {session.practitioner}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                  <span>{session.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span>{session.time} ({session.duration})</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span>{session.practitioner}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-primary">{session.price}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button onClick={handleConfirm} className="bg-primary hover:bg-primary/90">
                Yes, Book Again
              </Button>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            {/* Practitioner Info */}
            <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg">
              <Avatar className="w-12 h-12">
                <AvatarImage src={session.practitionerAvatar || "/placeholder.svg"} />
                <AvatarFallback className="bg-primary/10 text-primary">
                  {session.practitioner
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-lg">{session.type}</h3>
                <p className="text-muted-foreground">with {session.practitioner}</p>
                <Badge className="bg-green-100 text-green-800 mt-1">Same Practitioner</Badge>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Date Selection */}
              <div>
                <Label className="text-sm font-medium mb-3 block">Select Date</Label>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date() || date.getDay() === 0}
                  className="rounded-md border"
                />
              </div>

              {/* Time Selection */}
              <div>
                <Label className="text-sm font-medium mb-3 block">Available Times</Label>
                <div className="grid grid-cols-2 gap-2">
                  {availableTimeSlots.map((time) => (
                    <Button
                      key={time}
                      variant={selectedTime === time ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedTime(time)}
                      className={
                        selectedTime === time
                          ? "bg-primary hover:bg-primary/90"
                          : "bg-transparent"
                      }
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Booking Summary */}
            {selectedDate && selectedTime && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Booking Summary</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Treatment:</span>
                    <span className="font-medium">{session.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Practitioner:</span>
                    <span className="font-medium">{session.practitioner}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Date:</span>
                    <span className="font-medium">{selectedDate.toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time:</span>
                    <span className="font-medium">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="font-medium">Total:</span>
                    <span className="font-bold text-primary">{session.price}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep(1)}>
                Back
              </Button>
              <Button 
                onClick={handleBookAgain}
                disabled={!selectedDate || !selectedTime || isBooking}
                className="bg-primary hover:bg-primary/90"
              >
                {isBooking ? "Booking..." : "Confirm Booking"}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
