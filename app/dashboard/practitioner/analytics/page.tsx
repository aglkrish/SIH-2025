"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Users, Calendar, TrendingUp, Activity, Star } from "lucide-react"
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
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { motion } from "framer-motion"
import { PractitionerLayout } from "@/components/layouts/practitioner-layout"

const monthlyData = [
  { month: "Jan", patients: 45, sessions: 180, revenue: 12000 },
  { month: "Feb", patients: 52, sessions: 208, revenue: 14500 },
  { month: "Mar", patients: 48, sessions: 192, revenue: 13200 },
  { month: "Apr", patients: 58, sessions: 232, revenue: 16800 },
  { month: "May", patients: 62, sessions: 248, revenue: 18200 },
  { month: "Jun", patients: 67, sessions: 268, revenue: 19500 },
]

const treatmentData = [
  { name: "Abhyanga", value: 35, color: "#059669" },
  { name: "Shirodhara", value: 25, color: "#0d9488" },
  { name: "Panchakarma", value: 20, color: "#0891b2" },
  { name: "Yoga Therapy", value: 15, color: "#7c3aed" },
  { name: "Other", value: 5, color: "#dc2626" },
]

const patientSatisfaction = [
  { rating: "5 Stars", count: 45, percentage: 75 },
  { rating: "4 Stars", count: 12, percentage: 20 },
  { rating: "3 Stars", count: 2, percentage: 3 },
  { rating: "2 Stars", count: 1, percentage: 2 },
  { rating: "1 Star", count: 0, percentage: 0 },
]

export default function AnalyticsPage() {
  return (
    <PractitionerLayout>
      <div className="container mx-auto p-6 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-emerald-900">Practice Analytics</h1>
            <p className="text-emerald-600 mt-2">Comprehensive insights into your practice performance</p>
          </div>
          <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">
            <Calendar className="w-4 h-4 mr-2" />
            Last 6 months
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="border-emerald-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-emerald-700">Total Patients</CardTitle>
                <Users className="h-4 w-4 text-emerald-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-emerald-900">67</div>
                <p className="text-xs text-emerald-600">+8% from last month</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="border-emerald-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-emerald-700">Monthly Sessions</CardTitle>
                <Activity className="h-4 w-4 text-emerald-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-emerald-900">268</div>
                <p className="text-xs text-emerald-600">+12% from last month</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="border-emerald-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-emerald-700">Average Rating</CardTitle>
                <Star className="h-4 w-4 text-emerald-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-emerald-900">4.8</div>
                <p className="text-xs text-emerald-600">+0.2 from last month</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card className="border-emerald-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-emerald-700">Monthly Revenue</CardTitle>
                <TrendingUp className="h-4 w-4 text-emerald-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-emerald-900">$19.5K</div>
                <p className="text-xs text-emerald-600">+15% from last month</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="patients">Patient Analytics</TabsTrigger>
            <TabsTrigger value="treatments">Treatment Analysis</TabsTrigger>
            <TabsTrigger value="satisfaction">Satisfaction</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-emerald-200">
                <CardHeader>
                  <CardTitle className="text-emerald-900">Monthly Growth</CardTitle>
                  <CardDescription>Patient and session trends over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={monthlyData}>
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
                      <Line type="monotone" dataKey="patients" stroke="#059669" strokeWidth={3} />
                      <Line type="monotone" dataKey="sessions" stroke="#0d9488" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="border-emerald-200">
                <CardHeader>
                  <CardTitle className="text-emerald-900">Revenue Trend</CardTitle>
                  <CardDescription>Monthly revenue performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthlyData}>
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
                      <Bar dataKey="revenue" fill="#059669" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="treatments" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-emerald-200">
                <CardHeader>
                  <CardTitle className="text-emerald-900">Treatment Distribution</CardTitle>
                  <CardDescription>Popular treatments in your practice</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={treatmentData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {treatmentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="border-emerald-200">
                <CardHeader>
                  <CardTitle className="text-emerald-900">Treatment Details</CardTitle>
                  <CardDescription>Breakdown of treatment popularity</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {treatmentData.map((treatment, index) => (
                    <motion.div
                      key={treatment.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: treatment.color }} />
                        <span className="text-emerald-900 font-medium">{treatment.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-emerald-700">{treatment.value}%</span>
                        <Progress value={treatment.value} className="w-20 h-2" />
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="satisfaction" className="space-y-6">
            <Card className="border-emerald-200">
              <CardHeader>
                <CardTitle className="text-emerald-900">Patient Satisfaction</CardTitle>
                <CardDescription>Rating distribution from patient feedback</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {patientSatisfaction.map((rating, index) => (
                  <motion.div
                    key={rating.rating}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-emerald-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-emerald-900 font-medium min-w-[80px]">{rating.rating}</span>
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Number.parseInt(rating.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-emerald-700 min-w-[60px]">{rating.count} reviews</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={rating.percentage} className="w-32 h-2" />
                        <span className="text-emerald-900 font-medium min-w-[40px]">{rating.percentage}%</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PractitionerLayout>
  )
}
