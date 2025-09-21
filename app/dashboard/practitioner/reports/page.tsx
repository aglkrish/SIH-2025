"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Download, TrendingUp, Users, DollarSign, BarChart3, PieChart } from "lucide-react"
import { PractitionerLayout } from "@/components/layouts/practitioner-layout"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from "recharts"

// Mock data for reports
const monthlyRevenueData = [
  { month: "Jan", revenue: 12000, sessions: 180, patients: 45 },
  { month: "Feb", revenue: 14500, sessions: 208, patients: 52 },
  { month: "Mar", revenue: 13200, sessions: 192, patients: 48 },
  { month: "Apr", revenue: 16800, sessions: 232, patients: 58 },
  { month: "May", revenue: 18200, sessions: 248, patients: 62 },
  { month: "Jun", revenue: 19500, sessions: 268, patients: 67 },
]

const treatmentRevenueData = [
  { name: "Abhyanga", revenue: 8500, sessions: 85, color: "#059669" },
  { name: "Shirodhara", revenue: 6200, sessions: 62, color: "#0d9488" },
  { name: "Panchakarma", revenue: 4800, sessions: 24, color: "#0891b2" },
  { name: "Consultation", revenue: 3200, sessions: 40, color: "#7c3aed" },
  { name: "Yoga Therapy", revenue: 2800, sessions: 35, color: "#dc2626" },
]

const patientSatisfactionData = [
  { rating: "5 Stars", count: 45, percentage: 75 },
  { rating: "4 Stars", count: 12, percentage: 20 },
  { rating: "3 Stars", count: 2, percentage: 3 },
  { rating: "2 Stars", count: 1, percentage: 2 },
]

const weeklyScheduleData = [
  { day: "Mon", sessions: 8, hours: 6.5 },
  { day: "Tue", sessions: 10, hours: 8 },
  { day: "Wed", sessions: 7, hours: 5.5 },
  { day: "Thu", sessions: 9, hours: 7 },
  { day: "Fri", sessions: 6, hours: 5 },
  { day: "Sat", sessions: 4, hours: 3 },
  { day: "Sun", sessions: 0, hours: 0 },
]

export default function PractitionerReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("6months")
  const [activeTab, setActiveTab] = useState("financial")

  const totalRevenue = monthlyRevenueData.reduce((sum, month) => sum + month.revenue, 0)
  const totalSessions = monthlyRevenueData.reduce((sum, month) => sum + month.sessions, 0)
  const avgSessionValue = Math.round(totalRevenue / totalSessions)
  const avgRating = 4.8

  return (
    <PractitionerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-heading font-bold text-3xl text-foreground">Practice Reports</h1>
            <p className="text-muted-foreground">Comprehensive analytics and insights for your practice</p>
          </div>
          <div className="flex gap-3">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-[180px] border-green-200 focus:border-primary">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1month">Last Month</SelectItem>
                <SelectItem value="3months">Last 3 Months</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
                <SelectItem value="1year">Last Year</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-primary hover:bg-primary/90">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-green-100">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">${totalRevenue.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-100">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{totalSessions}</p>
                  <p className="text-sm text-muted-foreground">Total Sessions</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-100">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">${avgSessionValue}</p>
                  <p className="text-sm text-muted-foreground">Avg Session Value</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-100">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{avgRating}</p>
                  <p className="text-sm text-muted-foreground">Avg Rating</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reports Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="financial">Financial</TabsTrigger>
            <TabsTrigger value="patient">Patient Analytics</TabsTrigger>
            <TabsTrigger value="treatment">Treatment Analysis</TabsTrigger>
            <TabsTrigger value="schedule">Schedule Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="financial" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-green-100">
                <CardHeader>
                  <CardTitle className="font-heading flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    Monthly Revenue Trend
                  </CardTitle>
                  <CardDescription>Revenue performance over the last 6 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={monthlyRevenueData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#d1fae5" />
                      <XAxis dataKey="month" stroke="#065f46" />
                      <YAxis stroke="#065f46" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#ecfdf5",
                          border: "1px solid #a7f3d0",
                          borderRadius: "8px",
                        }}
                      />
                      <Line type="monotone" dataKey="revenue" stroke="#059669" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="border-green-100">
                <CardHeader>
                  <CardTitle className="font-heading flex items-center gap-2">
                    <PieChart className="w-5 h-5 text-primary" />
                    Revenue by Treatment
                  </CardTitle>
                  <CardDescription>Treatment contribution to total revenue</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={treatmentRevenueData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="revenue"
                        label={({ name, value }) => `${name}: $${value}`}
                      >
                        {treatmentRevenueData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card className="border-green-100">
              <CardHeader>
                <CardTitle className="font-heading">Financial Summary</CardTitle>
                <CardDescription>Detailed breakdown of financial performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                    <p className="text-2xl font-bold text-foreground">${totalRevenue.toLocaleString()}</p>
                    <Badge className="bg-green-100 text-green-800">+15% vs last period</Badge>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Average Monthly</p>
                    <p className="text-2xl font-bold text-foreground">
                      ${Math.round(totalRevenue / 6).toLocaleString()}
                    </p>
                    <Badge className="bg-blue-100 text-blue-800">Consistent growth</Badge>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Top Treatment</p>
                    <p className="text-2xl font-bold text-foreground">Abhyanga</p>
                    <Badge className="bg-primary/10 text-primary">${treatmentRevenueData[0].revenue}</Badge>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Session Value</p>
                    <p className="text-2xl font-bold text-foreground">${avgSessionValue}</p>
                    <Badge className="bg-accent/10 text-accent">+8% improvement</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="patient" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-green-100">
                <CardHeader>
                  <CardTitle className="font-heading">Patient Growth</CardTitle>
                  <CardDescription>New patient acquisition over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthlyRevenueData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#d1fae5" />
                      <XAxis dataKey="month" stroke="#065f46" />
                      <YAxis stroke="#065f46" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#ecfdf5",
                          border: "1px solid #a7f3d0",
                          borderRadius: "8px",
                        }}
                      />
                      <Bar dataKey="patients" fill="#059669" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="border-green-100">
                <CardHeader>
                  <CardTitle className="font-heading">Patient Satisfaction</CardTitle>
                  <CardDescription>Rating distribution from patient feedback</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {patientSatisfactionData.map((rating, index) => (
                    <div key={rating.rating} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="font-medium min-w-[80px]">{rating.rating}</span>
                        <div className="w-32 bg-green-200 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full" style={{ width: `${rating.percentage}%` }} />
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{rating.count} reviews</span>
                        <span className="font-medium">{rating.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <Card className="border-green-100">
              <CardHeader>
                <CardTitle className="font-heading">Patient Insights</CardTitle>
                <CardDescription>Key metrics about your patient base</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-3xl font-bold text-green-600 mb-2">67</p>
                    <p className="text-sm font-medium text-green-800">Total Active Patients</p>
                    <p className="text-xs text-green-600 mt-1">+12% this month</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-3xl font-bold text-blue-600 mb-2">8.5</p>
                    <p className="text-sm font-medium text-blue-800">Avg Sessions per Patient</p>
                    <p className="text-xs text-blue-600 mt-1">Above industry avg</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <p className="text-3xl font-bold text-purple-600 mb-2">92%</p>
                    <p className="text-sm font-medium text-purple-800">Patient Retention Rate</p>
                    <p className="text-xs text-purple-600 mt-1">Excellent retention</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="treatment" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-green-100">
                <CardHeader>
                  <CardTitle className="font-heading">Treatment Popularity</CardTitle>
                  <CardDescription>Most requested treatments</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {treatmentRevenueData.map((treatment, index) => (
                    <div key={treatment.name} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: treatment.color }} />
                        <span className="font-medium">{treatment.name}</span>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{treatment.sessions} sessions</p>
                        <p className="text-sm text-muted-foreground">${treatment.revenue}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-green-100">
                <CardHeader>
                  <CardTitle className="font-heading">Treatment Effectiveness</CardTitle>
                  <CardDescription>Success rates by treatment type</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">44</p>
                      <p className="text-sm font-medium text-green-800">Sessions/Week</p>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">35h</p>
                      <p className="text-sm font-medium text-blue-800">Hours/Week</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Schedule Utilization</span>
                      <span className="text-green-600 font-semibold">87%</span>
                    </div>
                    <div className="w-full bg-green-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: "87%" }} />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Peak Day Efficiency</span>
                      <span className="text-blue-600 font-semibold">Tuesday</span>
                    </div>
                    <p className="text-sm text-muted-foreground">10 sessions, 8 hours</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-green-100">
              <CardHeader>
                <CardTitle className="font-heading">Schedule Recommendations</CardTitle>
                <CardDescription>Insights to optimize your practice schedule</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-green-800">Optimization Opportunities</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-green-600 rounded-full mt-2" />
                        <span>Consider adding more slots on Tuesday (highest demand)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2" />
                        <span>Friday afternoons show lower utilization</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-purple-600 rounded-full mt-2" />
                        <span>Weekend sessions could increase revenue by 15%</span>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-semibold text-green-800">Performance Highlights</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-green-600 rounded-full mt-2" />
                        <span>87% schedule utilization (above average)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2" />
                        <span>Consistent 6-8 sessions per day</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-purple-600 rounded-full mt-2" />
                        <span>Low cancellation rate (3%)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-green-100">
                <CardHeader>
                  <CardTitle className="font-heading">Weekly Schedule Analysis</CardTitle>
                  <CardDescription>Sessions and hours worked per day</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={weeklyScheduleData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#d1fae5" />
                      <XAxis dataKey="day" stroke="#065f46" />
                      <YAxis stroke="#065f46" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#ecfdf5",
                          border: "1px solid #a7f3d0",
                          borderRadius: "8px",
                        }}
                      />
                      <Bar dataKey="sessions" fill="#059669" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="border-green-100">
                <CardHeader>
                  <CardTitle className="font-heading">Schedule Efficiency</CardTitle>
                  <CardDescription>Utilization and productivity metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">44</p>
                      <p className="text-sm font-medium text-green-800">Sessions/Week</p>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">35h</p>
                      <p className="text-sm font-medium text-blue-800">Hours/Week</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Schedule Utilization</span>
                      <span className="text-green-600 font-semibold">87%</span>
                    </div>
                    <div className="w-full bg-green-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: "87%" }} />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Peak Day Efficiency</span>
                      <span className="text-blue-600 font-semibold">Tuesday</span>
                    </div>
                    <p className="text-sm text-muted-foreground">10 sessions, 8 hours</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-green-100">
              <CardHeader>
                <CardTitle className="font-heading">Schedule Recommendations</CardTitle>
                <CardDescription>Insights to optimize your practice schedule</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-green-800">Optimization Opportunities</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-green-600 rounded-full mt-2" />
                        <span>Consider adding more slots on Tuesday (highest demand)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2" />
                        <span>Friday afternoons show lower utilization</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-purple-600 rounded-full mt-2" />
                        <span>Weekend sessions could increase revenue by 15%</span>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-semibold text-green-800">Performance Highlights</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-green-600 rounded-full mt-2" />
                        <span>87% schedule utilization (above average)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2" />
                        <span>Consistent 6-8 sessions per day</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-purple-600 rounded-full mt-2" />
                        <span>Low cancellation rate (3%)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PractitionerLayout>
  )
}
