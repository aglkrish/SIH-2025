import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, MessageSquare, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"

interface PatientCardProps {
  patient: {
    id: string
    name: string
    lastVisit: string
    condition: string
    progress: number
    avatar: string
    nextAppointment: string
  }
}

export function PatientCard({ patient }: PatientCardProps) {
  const router = useRouter()

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "text-green-600"
    if (progress >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const handleSchedule = () => {
    router.push("/dashboard/practitioner/schedule")
  }

  const handleMessage = () => {
    router.push("/dashboard/practitioner/messages")
  }

  return (
    <Card className="border-green-100 hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12">
              <AvatarImage src={patient.avatar || "/placeholder.svg"} />
              <AvatarFallback className="bg-primary/10 text-primary">
                {patient.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-heading font-semibold text-foreground">{patient.name}</h4>
              <p className="text-sm text-muted-foreground">{patient.condition}</p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View Profile</DropdownMenuItem>
              <DropdownMenuItem>Schedule Appointment</DropdownMenuItem>
              <DropdownMenuItem>Send Message</DropdownMenuItem>
              <DropdownMenuItem>View History</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Treatment Progress</span>
              <span className={`text-sm font-medium ${getProgressColor(patient.progress)}`}>{patient.progress}%</span>
            </div>
            <Progress value={patient.progress} className="h-2" />
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Last Visit</p>
              <p className="font-medium">{patient.lastVisit}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Next Appointment</p>
              <p className="font-medium">{patient.nextAppointment}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 bg-transparent"
              onClick={handleSchedule}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Schedule
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 bg-transparent"
              onClick={handleMessage}
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Message
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
