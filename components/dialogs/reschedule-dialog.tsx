"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, Calendar as CalendarIcon } from "lucide-react"
import { toast } from "sonner"

interface Session {
  id: string
  type: string
  practitioner: string
  practitionerAvatar?: string
  date: string
  time: string
  duration: string
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled'
  location: string
  phone?: string
  notes?: string
  price: string
  rating?: number
  feedback?: string
}

interface RescheduleDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  session: Session | null
  onReschedule: (sessionId: string, newDate: Date, newTime: string) => void
}

const availableTimes = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
  "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM"
]

export function RescheduleDialog({ open, onOpenChange, session, onReschedule }: RescheduleDialogProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedTime, setSelectedTime] = useState("")
  const [isRescheduling, setIsRescheduling] = useState(false)

  const handleReschedule = async () => {
    if (!session || !selectedDate || !selectedTime) {
      toast.error("Please select both date and time")
      return
    }

    setIsRescheduling(true)
    try {
      await onReschedule(session.id, selectedDate, selectedTime)
      toast.success("Session rescheduled successfully!")
      onOpenChange(false)
      // Reset form
      setSelectedDate(new Date())
      setSelectedTime("")
    } catch (error) {
      console.error('Reschedule error:', error)
      toast.error("Failed to reschedule session. Please try again.")
    } finally {
      setIsRescheduling(false)
    }
  }

  const handleCancel = () => {
    setSelectedDate(new Date())
    setSelectedTime("")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5" />
            Reschedule Session
          </DialogTitle>
          <DialogDescription>
            {session && `Reschedule your ${session.type} session with ${session.practitioner}`}
          </DialogDescription>
        </DialogHeader>

        {session && (
          <div className="space-y-6">
            {/* Current Session Info */}
            <Card className="border-blue-100 bg-blue-50">
              <CardContent className="p-4">
                <h4 className="font-medium text-blue-900 mb-2">Current Session Details</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-blue-700">Date:</span>
                    <span className="ml-2 font-medium">{new Date(session.date).toLocaleDateString()}</span>
                  </div>
                  <div>
                    <span className="text-blue-700">Time:</span>
                    <span className="ml-2 font-medium">{session.time}</span>
                  </div>
                  <div>
                    <span className="text-blue-700">Duration:</span>
                    <span className="ml-2 font-medium">{session.duration}</span>
                  </div>
                  <div>
                    <span className="text-blue-700">Location:</span>
                    <span className="ml-2 font-medium">{session.location}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* New Date and Time Selection */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium mb-3 block">Select New Date</Label>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date() || date.getDay() === 0}
                    className="rounded-md border"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium mb-3 block">Select New Time</Label>
                  <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                    {availableTimes.map((time) => (
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
                        <Clock className="w-3 h-3 mr-1" />
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* New Session Summary */}
            {selectedDate && selectedTime && (
              <Card className="border-green-100 bg-green-50">
                <CardContent className="p-4">
                  <h4 className="font-medium text-green-900 mb-2">New Session Details</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-green-700">New Date:</span>
                      <span className="ml-2 font-medium">{selectedDate.toLocaleDateString()}</span>
                    </div>
                    <div>
                      <span className="text-green-700">New Time:</span>
                      <span className="ml-2 font-medium">{selectedTime}</span>
                    </div>
                    <div>
                      <span className="text-green-700">Duration:</span>
                      <span className="ml-2 font-medium">{session.duration}</span>
                    </div>
                    <div>
                      <span className="text-green-700">Location:</span>
                      <span className="ml-2 font-medium">{session.location}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={handleCancel} disabled={isRescheduling}>
                Cancel
              </Button>
              <Button
                onClick={handleReschedule}
                disabled={!selectedDate || !selectedTime || isRescheduling}
                className="bg-primary hover:bg-primary/90"
              >
                {isRescheduling ? "Rescheduling..." : "Confirm Reschedule"}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
