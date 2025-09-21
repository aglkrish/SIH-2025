"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const mockData = [
  { date: "Jan 1", wellness: 65, stress: 75, energy: 60 },
  { date: "Jan 8", wellness: 70, stress: 70, energy: 65 },
  { date: "Jan 15", wellness: 75, stress: 65, energy: 70 },
  { date: "Jan 22", wellness: 80, stress: 60, energy: 75 },
  { date: "Jan 29", wellness: 85, stress: 55, energy: 80 },
]

export function ProgressChart() {
  return (
    <Card className="border-green-100">
      <CardHeader>
        <CardTitle className="font-heading">Wellness Progress</CardTitle>
        <CardDescription>Track your improvement over time</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="date" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="wellness"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={{ fill: "hsl(var(--primary))" }}
                name="Wellness Score"
              />
              <Line
                type="monotone"
                dataKey="energy"
                stroke="hsl(var(--secondary))"
                strokeWidth={2}
                dot={{ fill: "hsl(var(--secondary))" }}
                name="Energy Level"
              />
              <Line
                type="monotone"
                dataKey="stress"
                stroke="hsl(var(--destructive))"
                strokeWidth={2}
                dot={{ fill: "hsl(var(--destructive))" }}
                name="Stress Level"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
