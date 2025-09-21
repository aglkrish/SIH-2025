"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useAuth } from './auth-context'
import { useNotifications } from './notification-context'
import { toast } from 'sonner'

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

interface SessionsContextType {
  upcomingSessions: Session[]
  pastSessions: Session[]
  loading: boolean
  error: string | null
  addSession: (session: Omit<Session, 'id'>) => void
  updateSession: (id: string, updates: Partial<Session>) => void
  rescheduleSession: (sessionId: string, newDate: Date, newTime: string) => Promise<void>
  cancelSession: (sessionId: string) => Promise<void>
  bookAgain: (sessionId: string, newDate: Date, newTime: string) => Promise<void>
  loadSessions: () => Promise<void>
  refreshSessions: () => Promise<void>
}

const SessionsContext = createContext<SessionsContextType | undefined>(undefined)

export function SessionsProvider({ children }: { children: ReactNode }) {
  const { user, token } = useAuth()
  const { createNotification } = useNotifications()
  const [upcomingSessions, setUpcomingSessions] = useState<Session[]>([])
  const [pastSessions, setPastSessions] = useState<Session[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Load sessions from API or localStorage
  const loadSessions = async () => {
    if (!user) return

    setLoading(true)
    setError(null)

    try {
      // Try to load from API first
      if (token) {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/api/appointments`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })

          if (response.ok) {
            const data = await response.json()
            const sessions: Session[] = data.map((appointment: any) => ({
              id: appointment._id || appointment.id,
              type: appointment.treatment || 'Consultation',
              practitioner: appointment.practitionerName || 'Dr. Smith',
              practitionerAvatar: '/placeholder.svg',
              date: new Date(appointment.date).toISOString().split('T')[0],
              time: appointment.time,
              duration: `${appointment.duration || 60} min`,
              status: appointment.status || 'confirmed',
              location: appointment.location || 'Wellness Center',
              phone: appointment.phone || '+91 98765 43210',
              notes: appointment.notes || '',
              price: `₹${(appointment.cost * 80).toLocaleString()}`,
              rating: appointment.rating,
              feedback: appointment.feedback
            }))

            // Separate upcoming and past sessions
            const now = new Date()
            const upcoming = sessions.filter(session => {
              const sessionDate = new Date(`${session.date} ${session.time}`)
              return sessionDate >= now && session.status !== 'completed' && session.status !== 'cancelled'
            })
            const past = sessions.filter(session => {
              const sessionDate = new Date(`${session.date} ${session.time}`)
              return sessionDate < now || session.status === 'completed' || session.status === 'cancelled'
            })

            setUpcomingSessions(upcoming)
            setPastSessions(past)
            return
          }
        } catch (apiError) {
          console.log('API not available, loading from localStorage:', apiError)
        }
      }

      // For demo purposes, always load demo data
      // Clear any existing data first
      localStorage.removeItem(`sessions_${user.id}`)
      
      // Load demo data for pitch presentation
      const demoPastSessions: Session[] = [
        {
          id: "demo-1",
          type: "Abhyanga",
          practitioner: "Dr. Priya Sharma",
          practitionerAvatar: "/placeholder.svg",
          date: "2024-09-15",
          time: "10:00 AM",
          duration: "60 min",
          status: "completed",
          location: "Wellness Center - Room 1",
          phone: "+91 98765 43210",
          notes: "Full body oil massage with warm herbal oils. Very relaxing session.",
          price: "₹9,600",
          rating: 5,
          feedback: "Excellent session! Dr. Priya was very professional and the treatment was incredibly relaxing. Highly recommend!"
        },
        {
          id: "demo-2",
          type: "Shirodhara",
          practitioner: "Dr. Raj Patel",
          practitionerAvatar: "/placeholder.svg",
          date: "2024-09-10",
          time: "2:00 PM",
          duration: "45 min",
          status: "completed",
          location: "Wellness Center - Room 2",
          phone: "+91 98765 43211",
          notes: "Continuous pouring of warm oil on the forehead. Great for stress relief.",
          price: "₹8,000",
          rating: 4,
          feedback: "Very calming experience. Felt much more relaxed after the session."
        },
        {
          id: "demo-3",
          type: "Consultation",
          practitioner: "Dr. Priya Sharma",
          practitionerAvatar: "/placeholder.svg",
          date: "2024-09-05",
          time: "11:30 AM",
          duration: "30 min",
          status: "completed",
          location: "Wellness Center - Consultation Room",
          phone: "+91 98765 43210",
          notes: "Initial assessment and treatment planning. Discussed health goals and lifestyle.",
          price: "₹6,400",
          rating: 5,
          feedback: "Dr. Priya provided excellent guidance and created a personalized treatment plan for me."
        },
        {
          id: "demo-4",
          type: "Nasya",
          practitioner: "Dr. Raj Patel",
          practitionerAvatar: "/placeholder.svg",
          date: "2024-08-28",
          time: "3:30 PM",
          duration: "30 min",
          status: "completed",
          location: "Wellness Center - Room 3",
          phone: "+91 98765 43211",
          notes: "Nasal administration of medicated oils. Helped with sinus issues.",
          price: "₹7,200",
          rating: 4,
          feedback: "Effective treatment for my sinus problems. Breathing much better now."
        },
        {
          id: "demo-5",
          type: "Abhyanga",
          practitioner: "Dr. Priya Sharma",
          practitionerAvatar: "/placeholder.svg",
          date: "2024-08-20",
          time: "9:00 AM",
          duration: "60 min",
          status: "completed",
          location: "Wellness Center - Room 1",
          phone: "+91 98765 43210",
          notes: "Follow-up Abhyanga session. Continued treatment for muscle tension.",
          price: "₹9,600",
          rating: 5,
          feedback: "Another excellent session. The consistency in treatment is really helping with my muscle tension."
        },
        {
          id: "demo-6",
          type: "Shirodhara",
          practitioner: "Dr. Raj Patel",
          practitionerAvatar: "/placeholder.svg",
          date: "2024-08-15",
          time: "4:00 PM",
          duration: "45 min",
          status: "cancelled",
          location: "Wellness Center - Room 2",
          phone: "+91 98765 43211",
          notes: "Session was cancelled due to emergency.",
          price: "₹8,000",
          rating: undefined,
          feedback: undefined
        }
      ]

      // Separate upcoming and past sessions from demo data
      const now = new Date()
      const upcoming = []
      const past = demoPastSessions

      setUpcomingSessions(upcoming)
      setPastSessions(past)
      
      // Save demo data to localStorage
      localStorage.setItem(`sessions_${user.id}`, JSON.stringify(demoPastSessions))
      }
    } catch (err) {
      console.error('Error loading sessions:', err)
      setError(err instanceof Error ? err.message : 'Failed to load sessions')
    } finally {
      setLoading(false)
    }
  }

  // Add a new session
  const addSession = (session: Omit<Session, 'id'>) => {
    const newSession: Session = {
      ...session,
      id: Date.now().toString()
    }

    setUpcomingSessions(prev => {
      const updated = [newSession, ...prev]
      if (user) {
        const allSessions = [...updated, ...pastSessions]
        localStorage.setItem(`sessions_${user.id}`, JSON.stringify(allSessions))
      }
      return updated
    })

    // Show toast notification
    toast.success(`New Session Booked!`, {
      description: `Your ${session.type} session with ${session.practitioner} has been scheduled for ${session.date} at ${session.time}.`
    })

    // Create notification
    createNotification(
      'appointment',
      'New Session Booked!',
      `Your ${session.type} session with ${session.practitioner} has been scheduled for ${session.date} at ${session.time}.`,
      newSession.id
    )
  }

  // Update a session
  const updateSession = (id: string, updates: Partial<Session>) => {
    setUpcomingSessions(prev => {
      const updated = prev.map(session => 
        session.id === id ? { ...session, ...updates } : session
      )
      if (user) {
        const allSessions = [...updated, ...pastSessions]
        localStorage.setItem(`sessions_${user.id}`, JSON.stringify(allSessions))
      }
      return updated
    })

    setPastSessions(prev => {
      const updated = prev.map(session => 
        session.id === id ? { ...session, ...updates } : session
      )
      if (user) {
        const allSessions = [...upcomingSessions, ...updated]
        localStorage.setItem(`sessions_${user.id}`, JSON.stringify(allSessions))
      }
      return updated
    })
  }

  // Reschedule a session
  const rescheduleSession = async (sessionId: string, newDate: Date, newTime: string) => {
    console.log('SessionsContext: Rescheduling session:', sessionId, newDate, newTime)

    const session = upcomingSessions.find(s => s.id === sessionId)
    if (!session) {
      throw new Error('Session not found')
    }

    const updatedSession = {
      ...session,
      date: newDate.toISOString().split('T')[0],
      time: newTime
    }

    setUpcomingSessions(prev => {
      const updated = prev.map(s => s.id === sessionId ? updatedSession : s)
      if (user) {
        const allSessions = [...updated, ...pastSessions]
        localStorage.setItem(`sessions_${user.id}`, JSON.stringify(allSessions))
        console.log('SessionsContext: Updated sessions after reschedule:', allSessions)
      }
      return updated
    })

    // Show toast notification
    toast.success(`Session Rescheduled!`, {
      description: `Your ${session.type} session with ${session.practitioner} has been rescheduled to ${newDate.toLocaleDateString()} at ${newTime}.`
    })

    await createNotification(
      'appointment',
      'Session Rescheduled!',
      `Your ${session.type} session with ${session.practitioner} has been rescheduled to ${newDate.toLocaleDateString()} at ${newTime}.`,
      sessionId
    )

    try {
      if (token) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/api/appointments/${sessionId}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            date: newDate.toISOString(),
            time: newTime
          })
        })

        if (response.ok) {
          console.log('SessionsContext: Session rescheduled in backend')
          await refreshSessions()
        }
      }
    } catch (apiError) {
      console.log('SessionsContext: Backend API not available for reschedule:', apiError)
    }
  }

  // Cancel a session
  const cancelSession = async (sessionId: string) => {
    console.log('SessionsContext: Cancelling session:', sessionId)

    const session = upcomingSessions.find(s => s.id === sessionId)
    if (!session) {
      throw new Error('Session not found')
    }

    setUpcomingSessions(prev => {
      const updated = prev.filter(s => s.id !== sessionId)
      if (user) {
        const allSessions = [...updated, ...pastSessions]
        localStorage.setItem(`sessions_${user.id}`, JSON.stringify(allSessions))
        console.log('SessionsContext: Updated sessions after cancellation:', allSessions)
      }
      return updated
    })

    // Show toast notification
    toast.success(`Session Cancelled`, {
      description: `Your ${session.type} session with ${session.practitioner} scheduled for ${session.date} at ${session.time} has been cancelled.`
    })

    await createNotification(
      'appointment',
      'Session Cancelled',
      `Your ${session.type} session with ${session.practitioner} scheduled for ${session.date} at ${session.time} has been cancelled.`,
      sessionId
    )

    try {
      if (token) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/api/appointments/${sessionId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        if (response.ok) {
          console.log('SessionsContext: Session cancelled in backend')
          await refreshSessions()
        }
      }
    } catch (apiError) {
      console.log('SessionsContext: Backend API not available for cancellation:', apiError)
    }
  }

  // Book again functionality
  const bookAgain = async (sessionId: string, newDate: Date, newTime: string) => {
    console.log('SessionsContext: Booking again for session:', sessionId, newDate, newTime)

    const originalSession = pastSessions.find(session => session.id === sessionId)
    if (!originalSession) {
      throw new Error('Original session not found')
    }

    const newSession: Session = {
      ...originalSession,
      id: Date.now().toString(), // New ID
      date: newDate.toISOString().split('T')[0],
      time: newTime,
      status: 'confirmed' as const,
      rating: undefined, // Reset rating for new session
      feedback: undefined // Reset feedback for new session
    }

    setUpcomingSessions(prev => {
      const updated = [newSession, ...prev]
      if (user) {
        const allSessions = [...updated, ...pastSessions]
        localStorage.setItem(`sessions_${user.id}`, JSON.stringify(allSessions))
        console.log('SessionsContext: Updated sessions after book again:', allSessions)
      }
      return updated
    })

    // Show toast notification
    toast.success(`Session Booked Again!`, {
      description: `Your ${originalSession.type} session with ${originalSession.practitioner} has been booked for ${newDate.toLocaleDateString()} at ${newTime}.`
    })

    await createNotification(
      'appointment',
      'Session Booked Again!',
      `Your ${originalSession.type} session with ${originalSession.practitioner} has been booked for ${newDate.toLocaleDateString()} at ${newTime}.`,
      newSession.id
    )

    try {
      if (token) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/api/appointments`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            practitionerId: '1', // Mock practitioner ID
            treatment: originalSession.type,
            date: newDate.toISOString(),
            time: newTime,
            duration: parseInt(originalSession.duration),
            location: originalSession.location,
            notes: `Booked again from previous session`,
            cost: parseFloat(originalSession.price.replace(/[₹,]/g, '')) / 80 // Convert INR to USD
          })
        })

        if (response.ok) {
          console.log('SessionsContext: Session booked again in backend')
          await refreshSessions()
        }
      }
    } catch (apiError) {
      console.log('SessionsContext: Backend API not available for book again:', apiError)
    }
  }

  // Refresh sessions from API
  const refreshSessions = async () => {
    await loadSessions()
  }

  // Load sessions when user changes
  useEffect(() => {
    if (user) {
      loadSessions()
    }
  }, [user])

  const value: SessionsContextType = {
    upcomingSessions,
    pastSessions,
    loading,
    error,
    addSession,
    updateSession,
    rescheduleSession,
    cancelSession,
    bookAgain,
    loadSessions,
    refreshSessions
  }

  return (
    <SessionsContext.Provider value={value}>
      {children}
    </SessionsContext.Provider>
  )
}

export function useSessions() {
  const context = useContext(SessionsContext)
  if (context === undefined) {
    throw new Error('useSessions must be used within a SessionsProvider')
  }
  return context
}
