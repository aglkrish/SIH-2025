"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

const monthlyData = [
  { month: "Jan", appointments: 45, revenue: 12500, patients: 38 },
  { month: "Feb", appointments: 52, revenue: 14200, patients: 42 },
  { month: "Mar", appointments: 48, revenue: 13100, patients: 40 },
  { month: "Apr", appointments: 61, revenue: 16800, patients: 48 },
  { month: "May", appointments: 55, revenue: 15200, patients: 45 },
  { month: "Jun", revenue: 17500, appointments: 63, patients: 52 },
]

const treatmentData = [
  { name: "Abhyanga", value: 35, color: "hsl(var(--primary))" },
  { name: "Shirodhara", value: 25, color: "hsl(var(--secondary))" },
  { name: "Consultation", value: 20, color: "hsl(var(--accent))" },
  { name: "Nasya", value: 12, color: "hsl(var(--chart-4))" },
  { name: "Other", value: 8, color: "hsl(var(--chart-5))" },
]

export function PracticeAnalytics() {
  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Monthly Performance */}
      <Card className="border-green-100">
        <CardHeader>
          <CardTitle className="font-heading">Monthly Performance</CardTitle>
          <CardDescription>Appointments and revenue over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="appointments" fill="hsl(var(--primary))" name="Appointments" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Treatment Distribution */}
      <Card className="border-green-100">
        <CardHeader>
          <CardTitle className="font-heading">Treatment Distribution</CardTitle>
          <CardDescription>Popular treatments this month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={treatmentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {treatmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {treatmentData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-sm text-muted-foreground">
                  {item.name} ({item.value}%)
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Patient Satisfaction */}
      <Card className="border-green-100">
        <CardHeader>
          <CardTitle className="font-heading">Patient Satisfaction</CardTitle>
          <CardDescription>Average ratings and feedback</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">4.8</div>
            <div className="text-sm text-muted-foreground">Average Rating</div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">5 Stars</span>
              <div className="flex-1 mx-3 bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: "78%" }} />
              </div>
              <span className="text-sm text-muted-foreground">78%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">4 Stars</span>
              <div className="flex-1 mx-3 bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: "15%" }} />
              </div>
              <span className="text-sm text-muted-foreground">15%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">3 Stars</span>
              <div className="flex-1 mx-3 bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: "5%" }} />
              </div>
              <span className="text-sm text-muted-foreground">5%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">2 Stars</span>
              <div className="flex-1 mx-3 bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: "2%" }} />
              </div>
              <span className="text-sm text-muted-foreground">2%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <Card className="border-green-100">
        <CardHeader>
          <CardTitle className="font-heading">Key Metrics</CardTitle>
          <CardDescription>Important practice statistics</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">94%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">127</div>
              <div className="text-sm text-muted-foreground">Active Patients</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">8.5</div>
              <div className="text-sm text-muted-foreground">Avg Sessions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">92%</div>
              <div className="text-sm text-muted-foreground">Retention Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
