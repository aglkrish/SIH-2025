"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { X } from "lucide-react"

interface AppointmentFormProps {
  onClose: () => void
  onSave: () => void
}

export function AppointmentForm({ onClose, onSave }: AppointmentFormProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [formData, setFormData] = useState({
    patient: "",
    treatment: "",
    time: "",
    duration: "",
    notes: "",
  })

  const handleSave = () => {
    // Mock save logic
    console.log("Saving appointment:", { ...formData, date: selectedDate })
    onSave()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto border-green-100">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="font-heading">New Appointment</CardTitle>
              <CardDescription>Schedule a new session for your patient</CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="patient">Patient Name</Label>
                <Input
                  id="patient"
                  placeholder="Enter patient name"
                  value={formData.patient}
                  onChange={(e) => setFormData({ ...formData, patient: e.target.value })}
                  className="border-green-200 focus:border-primary"
                />
              </div>

              <div>
                <Label htmlFor="treatment">Treatment Type</Label>
                <Select
                  value={formData.treatment}
                  onValueChange={(value) => setFormData({ ...formData, treatment: value })}
                >
                  <SelectTrigger className="border-green-200 focus:border-primary">
                    <SelectValue placeholder="Select treatment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="abhyanga">Abhyanga</SelectItem>
                    <SelectItem value="shirodhara">Shirodhara</SelectItem>
                    <SelectItem value="consultation">Consultation</SelectItem>
                    <SelectItem value="nasya">Nasya</SelectItem>
                    <SelectItem value="udvartana">Udvartana</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="time">Time</Label>
                  <Select value={formData.time} onValueChange={(value) => setFormData({ ...formData, time: value })}>
                    <SelectTrigger className="border-green-200 focus:border-primary">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="9:00 AM">9:00 AM</SelectItem>
                      <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                      <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                      <SelectItem value="2:00 PM">2:00 PM</SelectItem>
                      <SelectItem value="3:00 PM">3:00 PM</SelectItem>
                      <SelectItem value="4:00 PM">4:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="duration">Duration</Label>
                  <Select
                    value={formData.duration}
                    onValueChange={(value) => setFormData({ ...formData, duration: value })}
                  >
                    <SelectTrigger className="border-green-200 focus:border-primary">
                      <SelectValue placeholder="Duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="45">45 minutes</SelectItem>
                      <SelectItem value="60">60 minutes</SelectItem>
                      <SelectItem value="90">90 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Additional notes or special instructions..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="border-green-200 focus:border-primary"
                  rows={3}
                />
              </div>
            </div>

            <div>
              <Label className="block mb-3">Select Date</Label>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => date < new Date()}
                className="rounded-md border border-green-100"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onClose} className="bg-transparent">
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
              Save Appointment
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
