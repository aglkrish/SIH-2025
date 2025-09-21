"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Calendar, Clock, Star, Search, Filter, Plus, MapPin, Phone, ArrowRight, CalendarDays, Star as StarIcon } from "lucide-react"
import { PatientLayout } from "@/components/layouts/patient-layout"
import { useSessions } from "@/contexts/sessions-context"
import { RescheduleDialog } from "@/components/dialogs/reschedule-dialog"
import { CancelConfirmationDialog } from "@/components/dialogs/cancel-confirmation-dialog"
import { BookAgainDialog } from "@/components/dialogs/book-again-dialog"
import { ReceiptDialog } from "@/components/dialogs/receipt-dialog"
import Link from "next/link"
import { toast } from "sonner"

// Sessions are now managed by the SessionsContext

export default function PatientSessionsPage() {
  const { upcomingSessions, pastSessions, loading, error, rescheduleSession, cancelSession, bookAgain } = useSessions()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("upcoming")
  const [showCalendar, setShowCalendar] = useState(false)
  const [ratingDialogOpen, setRatingDialogOpen] = useState(false)
  const [rescheduleDialogOpen, setRescheduleDialogOpen] = useState(false)
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false)
  const [bookAgainDialogOpen, setBookAgainDialogOpen] = useState(false)
  const [receiptDialogOpen, setReceiptDialogOpen] = useState(false)
  const [selectedSession, setSelectedSession] = useState(null)
  const [rating, setRating] = useState(0)
  const [feedback, setFeedback] = useState("")

  // Filter sessions based on search query
  const filteredUpcomingSessions = upcomingSessions.filter(session =>
    session.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    session.practitioner.toLowerCase().includes(searchQuery.toLowerCase()) ||
    session.notes?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredPastSessions = pastSessions.filter(session =>
    session.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    session.practitioner.toLowerCase().includes(searchQuery.toLowerCase()) ||
    session.notes?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleViewCalendar = () => {
    setShowCalendar(true)
    toast.success("Opening calendar view")
  }

  const handleRateSession = (session) => {
    setSelectedSession(session)
    setRating(session.rating || 0)
    setFeedback(session.feedback || "")
    setRatingDialogOpen(true)
  }

  const handleSubmitRating = () => {
    toast.success(`Rating submitted: ${rating} stars`)
    setRatingDialogOpen(false)
    setSelectedSession(null)
    setRating(0)
    setFeedback("")
  }

  const handleReschedule = (session) => {
    setSelectedSession(session)
    setRescheduleDialogOpen(true)
  }

  const handleCancel = (session) => {
    setSelectedSession(session)
    setCancelDialogOpen(true)
  }

  const handleRescheduleConfirm = async (sessionId, newDate, newTime) => {
    try {
      await rescheduleSession(sessionId, newDate, newTime)
    } catch (error) {
      console.error('Reschedule error:', error)
      throw error
    }
  }

  const handleCancelConfirm = async (sessionId) => {
    try {
      await cancelSession(sessionId)
    } catch (error) {
      console.error('Cancel error:', error)
      throw error
    }
  }

  const handleBookAgain = (session) => {
    setSelectedSession(session)
    setBookAgainDialogOpen(true)
  }

  const handleBookAgainConfirm = async (sessionId, newDate, newTime) => {
    try {
      await bookAgain(sessionId, newDate, newTime)
    } catch (error) {
      console.error('Book again error:', error)
      throw error
    }
  }

  const handleViewReceipt = (session) => {
    setSelectedSession(session)
    setReceiptDialogOpen(true)
  }

  return (
    <PatientLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-heading font-bold text-3xl text-foreground">My Sessions</h1>
            <p className="text-muted-foreground">Manage your therapy appointments and view session history</p>
          </div>
          <Button asChild className="bg-primary hover:bg-primary/90 w-fit">
            <Link href="/dashboard/patient/book-session">
              <Plus className="w-4 h-4 mr-2" />
              Book New Session
            </Link>
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-green-100">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{upcomingSessions.length}</p>
                  <p className="text-sm text-muted-foreground">Upcoming Sessions</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-100">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <Star className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{pastSessions.length}</p>
                  <p className="text-sm text-muted-foreground">Completed Sessions</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-100">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Star className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">4.8</p>
                  <p className="text-sm text-muted-foreground">Average Rating</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search sessions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-green-200 focus:border-primary"
            />
          </div>
          <Button variant="outline" className="bg-transparent">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Sessions Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upcoming">Upcoming Sessions</TabsTrigger>
            <TabsTrigger value="past">Past Sessions</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            {loading ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Loading sessions...</p>
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <p className="text-red-500">Error: {error}</p>
              </div>
            ) : filteredUpcomingSessions.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No upcoming sessions found</p>
              </div>
            ) : (
              filteredUpcomingSessions.map((session) => (
              <Card key={session.id} className="border-green-100 hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    <div className="flex items-center gap-4 flex-1">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={session.practitionerAvatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {session.practitioner
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-heading font-semibold text-lg text-foreground">{session.type}</h3>
                          <Badge className={getStatusColor(session.status)}>{session.status}</Badge>
                        </div>
                        <p className="text-muted-foreground mb-2">with {session.practitioner}</p>
                        <p className="text-sm text-muted-foreground">{session.notes}</p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 lg:gap-6">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span>{session.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span>
                            {session.time} ({session.duration})
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span>{session.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="w-4 h-4 text-muted-foreground" />
                          <span>{session.phone}</span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <div className="text-right">
                          <p className="font-semibold text-lg text-primary">{session.price}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="bg-transparent hover:bg-blue-50 hover:text-blue-700"
                            onClick={() => handleReschedule(session)}
                          >
                            Reschedule
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="bg-transparent hover:bg-red-50 hover:text-red-700"
                            onClick={() => handleCancel(session)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-4">
            {loading ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Loading sessions...</p>
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <p className="text-red-500">Error: {error}</p>
              </div>
            ) : filteredPastSessions.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No past sessions found</p>
              </div>
            ) : (
              filteredPastSessions.map((session) => (
              <Card key={session.id} className="border-green-100">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    <div className="flex items-center gap-4 flex-1">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={session.practitionerAvatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {session.practitioner
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-heading font-semibold text-lg text-foreground">{session.type}</h3>
                          <Badge className={getStatusColor(session.status)}>{session.status}</Badge>
                        </div>
                        <p className="text-muted-foreground mb-2">with {session.practitioner}</p>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < session.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">({session.rating}/5)</span>
                        </div>
                        {session.feedback && (
                          <p className="text-sm text-muted-foreground italic">"{session.feedback}"</p>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 lg:gap-6">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span>{session.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span>
                            {session.time} ({session.duration})
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span>{session.location}</span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <div className="text-right">
                          <p className="font-semibold text-lg text-primary">{session.price}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="bg-transparent hover:bg-green-50 hover:text-green-700"
                            onClick={() => handleBookAgain(session)}
                          >
                            Book Again
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="bg-transparent hover:bg-blue-50 hover:text-blue-700"
                            onClick={() => handleViewReceipt(session)}
                          >
                            View Receipt
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              ))
            )}
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <Card className="border-green-100">
          <CardHeader>
            <CardTitle className="font-heading">Quick Actions</CardTitle>
            <CardDescription>Manage your sessions efficiently</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button asChild variant="outline" className="bg-transparent h-auto p-4">
                <Link href="/dashboard/patient/book-session" className="flex items-center gap-3">
                  <Plus className="w-5 h-5 text-primary" />
                  <div className="text-left">
                    <p className="font-medium">Book New Session</p>
                    <p className="text-sm text-muted-foreground">Schedule your next treatment</p>
                  </div>
                  <ArrowRight className="w-4 h-4 ml-auto" />
                </Link>
              </Button>

              <Button variant="outline" className="bg-transparent h-auto p-4" onClick={handleViewCalendar}>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-primary" />
                  <div className="text-left">
                    <p className="font-medium">View Calendar</p>
                    <p className="text-sm text-muted-foreground">See all your appointments</p>
                  </div>
                  <ArrowRight className="w-4 h-4 ml-auto" />
                </div>
              </Button>

              <Button variant="outline" className="bg-transparent h-auto p-4" onClick={() => handleRateSession(pastSessions[0])}>
                <div className="flex items-center gap-3">
                  <Star className="w-5 h-5 text-primary" />
                  <div className="text-left">
                    <p className="font-medium">Rate Sessions</p>
                    <p className="text-sm text-muted-foreground">Provide feedback</p>
                  </div>
                  <ArrowRight className="w-4 h-4 ml-auto" />
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Calendar View Dialog */}
        <Dialog open={showCalendar} onOpenChange={setShowCalendar}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <CalendarDays className="w-5 h-5" />
                Session Calendar
              </DialogTitle>
              <DialogDescription>
                View all your scheduled sessions in calendar format
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-7 gap-2 text-center text-sm font-medium text-muted-foreground">
                <div>Sun</div>
                <div>Mon</div>
                <div>Tue</div>
                <div>Wed</div>
                <div>Thu</div>
                <div>Fri</div>
                <div>Sat</div>
              </div>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 35 }, (_, i) => {
                  const day = i - 6
                  const hasSession = [15, 17, 20].includes(day)
                  return (
                    <div
                      key={i}
                      className={`h-20 p-2 border rounded-lg ${
                        hasSession ? 'bg-primary/10 border-primary' : 'border-gray-200'
                      }`}
                    >
                      <div className="text-sm font-medium">{day > 0 ? day : ''}</div>
                      {hasSession && (
                        <div className="text-xs text-primary mt-1">
                          {day === 15 && 'Abhyanga 10:00 AM'}
                          {day === 17 && 'Shirodhara 2:00 PM'}
                          {day === 20 && 'Consultation 11:30 AM'}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Rating Dialog */}
        <Dialog open={ratingDialogOpen} onOpenChange={setRatingDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <StarIcon className="w-5 h-5" />
                Rate Session
              </DialogTitle>
              <DialogDescription>
                {selectedSession && `Rate your ${selectedSession.type} session with ${selectedSession.practitioner}`}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Rating</Label>
                <div className="flex items-center gap-2 mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className="focus:outline-none"
                    >
                      <StarIcon
                        className={`w-8 h-8 ${
                          star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {rating > 0 ? `${rating} out of 5 stars` : 'Select a rating'}
                </p>
              </div>
              <div>
                <Label htmlFor="feedback" className="text-sm font-medium">
                  Feedback (Optional)
                </Label>
                <Textarea
                  id="feedback"
                  placeholder="Share your experience with this session..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="mt-2"
                  rows={4}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setRatingDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSubmitRating} disabled={rating === 0}>
                  Submit Rating
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Reschedule Dialog */}
        <RescheduleDialog
          open={rescheduleDialogOpen}
          onOpenChange={setRescheduleDialogOpen}
          session={selectedSession}
          onReschedule={handleRescheduleConfirm}
        />

        {/* Cancel Confirmation Dialog */}
        <CancelConfirmationDialog
          open={cancelDialogOpen}
          onOpenChange={setCancelDialogOpen}
          session={selectedSession}
          onCancel={handleCancelConfirm}
        />

        {/* Book Again Dialog */}
        <BookAgainDialog
          open={bookAgainDialogOpen}
          onOpenChange={setBookAgainDialogOpen}
          session={selectedSession}
          onBookAgain={handleBookAgainConfirm}
        />

        {/* Receipt Dialog */}
        <ReceiptDialog
          open={receiptDialogOpen}
          onOpenChange={setReceiptDialogOpen}
          session={selectedSession}
        />
      </div>
    </PatientLayout>
  )
}
