"use client"

import React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, MapPin, Phone, Mail, DollarSign, CheckCircle, XCircle, FileText, Star } from "lucide-react"
import { format } from "date-fns"

interface SessionDetailsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  session: {
    id: string
    patient: string
    type: string
    date: string
    time: string
    duration: string
    status: string
    avatar: string
    notes?: string
    practitioner: string
    location: string
    phone?: string
    email?: string
    price?: string
    paymentStatus?: string
    rating?: number
    feedback?: string
    previousSessions?: Array<{
      id: string
      date: string
      type: string
      status: string
      paid: boolean
      rating?: number
    }>
  } | null
}

export function SessionDetailsDialog({ open, onOpenChange, session }: SessionDetailsDialogProps) {
  if (!session) return null

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-green-100 text-green-800"
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
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Session Details
          </DialogTitle>
          <DialogDescription>
            Complete information about this session and patient history
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Patient Information */}
          <div className="flex items-center gap-4 p-4 border rounded-lg">
            <Avatar className="w-16 h-16">
              <AvatarImage src={session.avatar || "/placeholder.svg"} />
              <AvatarFallback className="bg-primary/10 text-primary text-xl">
                {session.patient.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-heading font-semibold text-xl text-foreground">{session.patient}</h3>
              <p className="text-muted-foreground">Patient ID: {session.id}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge className={getStatusColor(session.status)}>{session.status}</Badge>
                {session.paymentStatus && (
                  <Badge className={getPaymentStatusColor(session.paymentStatus)}>
                    {session.paymentStatus}
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Session Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Session Information</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Date:</span>
                  <span className="font-medium">{session.date}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Time:</span>
                  <span className="font-medium">{session.time} ({session.duration})</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Location:</span>
                  <span className="font-medium">{session.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <FileText className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Treatment:</span>
                  <span className="font-medium">{session.type}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Contact Information</h4>
              <div className="space-y-2">
                {session.phone && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Phone:</span>
                    <span className="font-medium">{session.phone}</span>
                  </div>
                )}
                {session.email && (
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Email:</span>
                    <span className="font-medium">{session.email}</span>
                  </div>
                )}
                {session.price && (
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Price:</span>
                    <span className="font-medium">{session.price}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Session Notes */}
          {session.notes && (
            <div className="space-y-2">
              <h4 className="font-semibold text-foreground">Session Notes</h4>
              <div className="p-3 bg-muted rounded-md">
                <p className="text-sm text-foreground">{session.notes}</p>
              </div>
            </div>
          )}

          {/* Rating and Feedback */}
          {session.rating && (
            <div className="space-y-2">
              <h4 className="font-semibold text-foreground">Patient Feedback</h4>
              <div className="p-3 bg-muted rounded-md">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-muted-foreground">Rating:</span>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < session.rating! ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium">({session.rating}/5)</span>
                </div>
                {session.feedback && (
                  <p className="text-sm text-foreground italic">"{session.feedback}"</p>
                )}
              </div>
            </div>
          )}

          {/* Previous Sessions */}
          {session.previousSessions && session.previousSessions.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Previous Sessions</h4>
              <div className="space-y-2">
                {session.previousSessions.map((prevSession) => (
                  <div key={prevSession.id} className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="font-medium text-sm">{prevSession.type}</p>
                        <p className="text-xs text-muted-foreground">{prevSession.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(prevSession.status)} variant="outline">
                        {prevSession.status}
                      </Badge>
                      <div className="flex items-center gap-1">
                        {prevSession.paid ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-600" />
                        )}
                        <span className="text-xs text-muted-foreground">
                          {prevSession.paid ? "Paid" : "Unpaid"}
                        </span>
                      </div>
                      {prevSession.rating && (
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span className="text-xs text-muted-foreground">{prevSession.rating}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Close
            </Button>
            {session.status === "confirmed" && (
              <Button className="flex-1 bg-primary hover:bg-primary/90">
                Start Session
              </Button>
            )}
            {session.status === "in-progress" && (
              <Button className="flex-1 bg-primary hover:bg-primary/90">
                Continue Session
              </Button>
            )}
            {session.status === "completed" && (
              <Button variant="outline" className="flex-1">
                View Report
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
