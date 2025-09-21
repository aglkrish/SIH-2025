"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Clock, Plus, Trash2 } from "lucide-react"

interface TimeSlotManagerProps {
  selectedDate?: Date
}

const defaultTimeSlots = [
  { id: "1", time: "9:00 AM", available: true, booked: false },
  { id: "2", time: "10:00 AM", available: true, booked: true },
  { id: "3", time: "11:00 AM", available: true, booked: false },
  { id: "4", time: "12:00 PM", available: false, booked: false },
  { id: "5", time: "2:00 PM", available: true, booked: false },
  { id: "6", time: "3:00 PM", available: true, booked: true },
  { id: "7", time: "4:00 PM", available: true, booked: false },
  { id: "8", time: "5:00 PM", available: false, booked: false },
]

export function TimeSlotManager({ selectedDate }: TimeSlotManagerProps) {
  const [timeSlots, setTimeSlots] = useState(defaultTimeSlots)

  const toggleAvailability = (id: string) => {
    setTimeSlots((slots) => slots.map((slot) => (slot.id === id ? { ...slot, available: !slot.available } : slot)))
  }

  const addTimeSlot = () => {
    const newSlot = {
      id: Date.now().toString(),
      time: "6:00 PM",
      available: true,
      booked: false,
    }
    setTimeSlots([...timeSlots, newSlot])
  }

  const removeTimeSlot = (id: string) => {
    setTimeSlots((slots) => slots.filter((slot) => slot.id !== id))
  }

  return (
    <Card className="border-green-100">
      <CardHeader>
        <CardTitle className="font-heading flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          Time Slots
        </CardTitle>
        <CardDescription>
          Manage availability for {selectedDate?.toLocaleDateString() || "selected date"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {timeSlots.map((slot) => (
            <div key={slot.id} className="flex items-center justify-between p-3 border border-green-100 rounded-lg">
              <div className="flex items-center gap-3">
                <span className="font-medium">{slot.time}</span>
                {slot.booked && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    Booked
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={slot.available}
                    onCheckedChange={() => toggleAvailability(slot.id)}
                    disabled={slot.booked}
                  />
                  <Label className="text-sm">Available</Label>
                </div>
                <Button variant="ghost" size="sm" onClick={() => removeTimeSlot(slot.id)} disabled={slot.booked}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <Button
          variant="outline"
          onClick={addTimeSlot}
          className="w-full bg-transparent border-dashed border-primary text-primary hover:bg-primary/5"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Time Slot
        </Button>

        <div className="pt-4 border-t border-green-100">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="text-center">
              <div className="text-lg font-bold text-primary">
                {timeSlots.filter((slot) => slot.available && !slot.booked).length}
              </div>
              <div className="text-muted-foreground">Available</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600">{timeSlots.filter((slot) => slot.booked).length}</div>
              <div className="text-muted-foreground">Booked</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
