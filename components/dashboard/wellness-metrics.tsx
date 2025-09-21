import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Heart, Brain, Zap, Moon } from "lucide-react"

interface WellnessMetricsProps {
  detailed?: boolean
}

export function WellnessMetrics({ detailed = false }: WellnessMetricsProps) {
  const metrics = [
    { name: "Overall Wellness", value: 85, icon: Heart, color: "text-red-500" },
    { name: "Mental Clarity", value: 78, icon: Brain, color: "text-blue-500" },
    { name: "Energy Level", value: 90, icon: Zap, color: "text-yellow-500" },
    { name: "Sleep Quality", value: 72, icon: Moon, color: "text-purple-500" },
  ]

  return (
    <Card className="border-green-100">
      <CardHeader>
        <CardTitle className="font-heading">Wellness Metrics</CardTitle>
        <CardDescription>Your current health indicators</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {metrics.map((metric) => (
          <div key={metric.name} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <metric.icon className={`w-4 h-4 ${metric.color}`} />
                <span className="text-sm font-medium">{metric.name}</span>
              </div>
              <span className="text-sm text-muted-foreground">{metric.value}%</span>
            </div>
            <Progress value={metric.value} className="h-2" />
            {detailed && (
              <p className="text-xs text-muted-foreground">
                {metric.value >= 80 ? "Excellent" : metric.value >= 60 ? "Good" : "Needs attention"}
              </p>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
