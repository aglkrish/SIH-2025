"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Clock } from "lucide-react"

interface Appointment {
  id: string
  patient: string
  treatment: string
  date: string
  time: string
  duration: number
  status: string
  avatar: string
  notes?: string
}

interface ScheduleCalendarProps {
  appointments: Appointment[]
  onDateSelect?: (date: Date) => void
}

export function ScheduleCalendar({ appointments, onDateSelect }: ScheduleCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }

    return days
  }

  const getAppointmentsForDate = (date: Date | null) => {
    if (!date) return []
    const dateString = date.toISOString().split("T")[0]
    return appointments.filter((apt) => apt.date === dateString)
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const days = getDaysInMonth(currentDate)
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  return (
    <Card className="border-green-100">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="font-heading">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")} className="bg-transparent">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => navigateMonth("next")} className="bg-transparent">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1 mb-4">
          {dayNames.map((day) => (
            <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {days.map((date, index) => {
            const dayAppointments = getAppointmentsForDate(date)
            const isToday = date && date.toDateString() === new Date().toDateString()

            return (
              <div
                key={index}
                className={`min-h-[120px] p-2 border border-green-100 rounded-lg ${
                  date ? "cursor-pointer hover:bg-green-50" : ""
                } ${isToday ? "bg-primary/5 border-primary/30" : ""}`}
                onClick={() => date && onDateSelect?.(date)}
              >
                {date && (
                  <>
                    <div className={`text-sm font-medium mb-2 ${isToday ? "text-primary" : "text-foreground"}`}>
                      {date.getDate()}
                    </div>
                    <div className="space-y-1">
                      {dayAppointments.slice(0, 3).map((appointment) => (
                        <div key={appointment.id} className="text-xs p-1 rounded bg-primary/10 text-primary truncate">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {appointment.time}
                          </div>
                          <div className="truncate">{appointment.patient}</div>
                        </div>
                      ))}
                      {dayAppointments.length > 3 && (
                        <div className="text-xs text-muted-foreground">+{dayAppointments.length - 3} more</div>
                      )}
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
