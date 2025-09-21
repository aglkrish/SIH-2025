"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, X } from "lucide-react"
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

interface CancelConfirmationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  session: Session | null
  onCancel: (sessionId: string) => void
}

export function CancelConfirmationDialog({ open, onOpenChange, session, onCancel }: CancelConfirmationDialogProps) {
  const [isCancelling, setIsCancelling] = useState(false)

  const handleCancel = async () => {
    if (!session) return

    setIsCancelling(true)
    try {
      await onCancel(session.id)
      toast.success("Session cancelled successfully!")
      onOpenChange(false)
    } catch (error) {
      console.error('Cancel error:', error)
      toast.error("Failed to cancel session. Please try again.")
    } finally {
      setIsCancelling(false)
    }
  }

  const handleKeep = () => {
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="w-5 h-5" />
            Cancel Session
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to cancel this session? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        {session && (
          <div className="space-y-4">
            {/* Session Details */}
            <Card className="border-red-100 bg-red-50">
              <CardContent className="p-4">
                <h4 className="font-medium text-red-900 mb-2">Session Details</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-red-700">Treatment:</span>
                    <span className="ml-2 font-medium">{session.type}</span>
                  </div>
                  <div>
                    <span className="text-red-700">Practitioner:</span>
                    <span className="ml-2 font-medium">{session.practitioner}</span>
                  </div>
                  <div>
                    <span className="text-red-700">Date & Time:</span>
                    <span className="ml-2 font-medium">
                      {new Date(session.date).toLocaleDateString()} at {session.time}
                    </span>
                  </div>
                  <div>
                    <span className="text-red-700">Duration:</span>
                    <span className="ml-2 font-medium">{session.duration}</span>
                  </div>
                  <div>
                    <span className="text-red-700">Location:</span>
                    <span className="ml-2 font-medium">{session.location}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Warning Message */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-yellow-800">Important:</p>
                  <p className="text-yellow-700 mt-1">
                    Cancelling this session will remove it from your upcoming sessions. 
                    You can book a new session at any time.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={handleKeep} disabled={isCancelling}>
                Keep Session
              </Button>
              <Button
                variant="destructive"
                onClick={handleCancel}
                disabled={isCancelling}
                className="bg-red-600 hover:bg-red-700"
              >
                {isCancelling ? "Cancelling..." : "Yes, Cancel Session"}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
