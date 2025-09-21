import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, User } from "lucide-react"

interface SessionCardProps {
  session: {
    id: string
    type: string
    practitioner: string
    date: string
    time: string
    duration: string
    status: string
    location: string
  }
  onReschedule?: (sessionId: string) => void
  onCancel?: (sessionId: string) => void
}

export function SessionCard({ session, onReschedule, onCancel }: SessionCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="border-green-100">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h4 className="font-heading font-semibold text-foreground">{session.type}</h4>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <User className="w-4 h-4" />
              {session.practitioner}
            </p>
          </div>
          <Badge className={getStatusColor(session.status)}>{session.status}</Badge>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{session.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>
              {session.time} ({session.duration})
            </span>
          </div>
          <div className="flex items-center gap-2 col-span-2">
            <MapPin className="w-4 h-4" />
            <span>{session.location}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 bg-transparent"
            onClick={() => onReschedule?.(session.id)}
          >
            Reschedule
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 bg-transparent"
            onClick={() => onCancel?.(session.id)}
          >
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
