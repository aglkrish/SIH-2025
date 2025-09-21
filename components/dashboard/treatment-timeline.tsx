"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Clock, Calendar, Activity } from "lucide-react"
import { motion } from "framer-motion"

interface TimelineEvent {
  id: string
  date: string
  title: string
  description: string
  status: "completed" | "in-progress" | "upcoming"
  progress?: number
  type: "treatment" | "assessment" | "consultation"
}

const timelineEvents: TimelineEvent[] = [
  {
    id: "1",
    date: "2024-03-15",
    title: "Initial Consultation",
    description: "Comprehensive health assessment and dosha analysis",
    status: "completed",
    type: "consultation",
  },
  {
    id: "2",
    date: "2024-03-18",
    title: "Panchakarma Preparation",
    description: "Pre-treatment dietary guidelines and lifestyle adjustments",
    status: "completed",
    type: "treatment",
  },
  {
    id: "3",
    date: "2024-03-22",
    title: "Abhyanga Therapy Series",
    description: "Full body oil massage therapy - 8 sessions",
    status: "in-progress",
    progress: 75,
    type: "treatment",
  },
  {
    id: "4",
    date: "2024-03-25",
    title: "Mid-Treatment Assessment",
    description: "Progress evaluation and treatment plan adjustment",
    status: "upcoming",
    type: "assessment",
  },
  {
    id: "5",
    date: "2024-03-30",
    title: "Shirodhara Sessions",
    description: "Continuous oil pouring therapy - 5 sessions",
    status: "upcoming",
    type: "treatment",
  },
]

const getStatusIcon = (status: string) => {
  switch (status) {
    case "completed":
      return <CheckCircle className="w-5 h-5 text-emerald-600" />
    case "in-progress":
      return <Activity className="w-5 h-5 text-blue-600" />
    case "upcoming":
      return <Clock className="w-5 h-5 text-gray-400" />
    default:
      return <Clock className="w-5 h-5 text-gray-400" />
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-emerald-100 text-emerald-800 border-emerald-200"
    case "in-progress":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "upcoming":
      return "bg-gray-100 text-gray-800 border-gray-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

export default function TreatmentTimeline() {
  return (
    <Card className="border-emerald-200">
      <CardHeader>
        <CardTitle className="text-emerald-900 flex items-center">
          <Calendar className="w-5 h-5 mr-2" />
          Treatment Timeline
        </CardTitle>
        <CardDescription>Your personalized treatment journey</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-emerald-200" />

          <div className="space-y-6">
            {timelineEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative flex items-start space-x-4"
              >
                {/* Timeline dot */}
                <div className="relative z-10 flex items-center justify-center w-12 h-12 bg-white border-2 border-emerald-200 rounded-full">
                  {getStatusIcon(event.status)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 pb-6">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-semibold text-emerald-900">{event.title}</h4>
                    <Badge variant="outline" className={getStatusColor(event.status)}>
                      {event.status.replace("-", " ")}
                    </Badge>
                  </div>

                  <p className="text-emerald-700 mb-2">{event.description}</p>

                  <div className="flex items-center space-x-4 text-sm text-emerald-600">
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(event.date).toLocaleDateString()}
                    </span>
                    <Badge variant="secondary" className="bg-emerald-50 text-emerald-700">
                      {event.type}
                    </Badge>
                  </div>

                  {event.progress !== undefined && (
                    <div className="mt-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-emerald-700">Progress</span>
                        <span className="text-sm font-medium text-emerald-900">{event.progress}%</span>
                      </div>
                      <Progress value={event.progress} className="h-2" />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
