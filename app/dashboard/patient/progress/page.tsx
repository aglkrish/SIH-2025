"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Calendar, TrendingUp, Activity, Heart, Zap } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { motion } from "framer-motion"
import { PatientLayout } from "@/components/layouts/patient-layout"

const progressData = [
  { date: "2024-01-01", wellness: 65, energy: 60, sleep: 70, stress: 40 },
  { date: "2024-01-15", wellness: 70, energy: 65, sleep: 75, stress: 35 },
  { date: "2024-02-01", wellness: 75, energy: 70, sleep: 80, stress: 30 },
  { date: "2024-02-15", wellness: 80, energy: 75, sleep: 85, stress: 25 },
  { date: "2024-03-01", wellness: 85, energy: 80, sleep: 90, stress: 20 },
]


const treatmentProgress = [
  { treatment: "Abhyanga", sessions: 12, completed: 8, effectiveness: 85 },
  { treatment: "Shirodhara", sessions: 8, completed: 5, effectiveness: 90 },
  { treatment: "Panchakarma", sessions: 21, completed: 15, effectiveness: 88 },
  { treatment: "Yoga Therapy", sessions: 20, completed: 18, effectiveness: 92 },
]

export default function ProgressPage() {
  const [selectedMetric, setSelectedMetric] = useState("wellness")

  return (
    <PatientLayout>
      <div className="container mx-auto p-6 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-emerald-900">Progress Tracking</h1>
            <p className="text-emerald-600 mt-2">Monitor your wellness journey and treatment effectiveness</p>
          </div>
          <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">
            <Calendar className="w-4 h-4 mr-2" />
            Last updated: Today
          </Badge>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="wellness">Wellness Metrics</TabsTrigger>
            <TabsTrigger value="treatments">Treatment Progress</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Card className="border-emerald-200">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-emerald-700">Overall Wellness</CardTitle>
                    <TrendingUp className="h-4 w-4 text-emerald-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-emerald-900">85%</div>
                    <p className="text-xs text-emerald-600">+12% from last month</p>
                    <Progress value={85} className="mt-2" />
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Card className="border-emerald-200">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-emerald-700">Energy Level</CardTitle>
                    <Zap className="h-4 w-4 text-emerald-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-emerald-900">80%</div>
                    <p className="text-xs text-emerald-600">+8% from last month</p>
                    <Progress value={80} className="mt-2" />
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <Card className="border-emerald-200">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-emerald-700">Sleep Quality</CardTitle>
                    <Activity className="h-4 w-4 text-emerald-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-emerald-900">90%</div>
                    <p className="text-xs text-emerald-600">+15% from last month</p>
                    <Progress value={90} className="mt-2" />
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <Card className="border-emerald-200">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-emerald-700">Stress Level</CardTitle>
                    <Heart className="h-4 w-4 text-emerald-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-emerald-900">20%</div>
                    <p className="text-xs text-emerald-600">-20% from last month</p>
                    <Progress value={20} className="mt-2" />
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <Card className="border-emerald-200">
              <CardHeader>
                <CardTitle className="text-emerald-900">Wellness Trend</CardTitle>
                <CardDescription>Your wellness journey over the past 3 months</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={progressData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#d1fae5" />
                    <XAxis dataKey="date" stroke="#065f46" />
                    <YAxis stroke="#065f46" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#ecfdf5",
                        border: "1px solid #a7f3d0",
                        borderRadius: "8px",
                      }}
                    />
                    <Line type="monotone" dataKey="wellness" stroke="#059669" strokeWidth={3} />
                    <Line type="monotone" dataKey="energy" stroke="#0d9488" strokeWidth={2} />
                    <Line type="monotone" dataKey="sleep" stroke="#0891b2" strokeWidth={2} />
                    <Line type="monotone" dataKey="stress" stroke="#dc2626" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="wellness" className="space-y-6">
            <Card className="border-emerald-200">
              <CardHeader>
                <CardTitle className="text-emerald-900">Detailed Wellness Metrics</CardTitle>
                <CardDescription>Track your daily wellness indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {["wellness", "energy", "sleep", "stress"].map((metric) => (
                    <Button
                      key={metric}
                      variant={selectedMetric === metric ? "default" : "outline"}
                      onClick={() => setSelectedMetric(metric)}
                      className="capitalize"
                    >
                      {metric}
                    </Button>
                  ))}
                </div>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={progressData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#d1fae5" />
                    <XAxis dataKey="date" stroke="#065f46" />
                    <YAxis stroke="#065f46" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#ecfdf5",
                        border: "1px solid #a7f3d0",
                        borderRadius: "8px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey={selectedMetric}
                      stroke="#059669"
                      strokeWidth={3}
                      dot={{ fill: "#059669", strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="treatments" className="space-y-6">
            <div className="grid gap-6">
              {treatmentProgress.map((treatment, index) => (
                <motion.div
                  key={treatment.treatment}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-emerald-200">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-emerald-900">{treatment.treatment}</CardTitle>
                        <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">
                          {treatment.effectiveness}% effective
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-emerald-700">Progress</span>
                          <span className="text-emerald-900 font-medium">
                            {treatment.completed}/{treatment.sessions} sessions
                          </span>
                        </div>
                        <Progress value={(treatment.completed / treatment.sessions) * 100} className="h-2" />
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-emerald-700">Effectiveness</span>
                          <span className="text-emerald-900 font-medium">{treatment.effectiveness}%</span>
                        </div>
                        <Progress value={treatment.effectiveness} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

        </Tabs>
      </div>
    </PatientLayout>
  )
}
