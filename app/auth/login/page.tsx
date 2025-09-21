"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Leaf, Eye, EyeOff, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { useEffect } from "react"
import { validationRules, validateForm } from "@/lib/validation"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("patient")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const router = useRouter()
  const { signIn, user } = useAuth()

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      router.push("/dashboard")
    }
  }, [user, router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    // Validate form
    const validation = validateForm(
      { email, password },
      { email: validationRules.email, password: validationRules.password }
    )

    if (!validation.isValid) {
      setErrors(validation.errors)
      return
    }

    try {
      setIsLoading(true)
      
      // Create role-specific email for testing
      let testEmail = email
      if (activeTab === 'practitioner') {
        // Force practitioner role by using a practitioner email
        testEmail = email.includes('@') ? email : `${email}@practitioner.com`
        if (!testEmail.includes('practitioner') && !testEmail.includes('doctor') && !testEmail.includes('dr.') && !testEmail.includes('prac') && !testEmail.includes('admin') && !testEmail.includes('staff')) {
          testEmail = `practitioner.${email}@clinic.com`
        }
      } else {
        // Force patient role by using a patient email
        testEmail = email.includes('@') ? email : `${email}@patient.com`
        if (testEmail.includes('practitioner') || testEmail.includes('doctor') || testEmail.includes('dr.') || testEmail.includes('prac') || testEmail.includes('admin') || testEmail.includes('staff')) {
          testEmail = `patient.${email}@user.com`
        }
      }
      
      console.log('Original email:', email, 'Test email:', testEmail, 'Role:', activeTab)
      
      const result = await signIn(testEmail, password)
      console.log('Login result:', result)
      
      // Wait a moment for state to update, then redirect
      setTimeout(() => {
        console.log('Redirecting to dashboard...')
        router.push("/dashboard")
      }, 100)
    } catch (error) {
      console.error('Login error:', error)
      // Error is handled in the auth context
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <Leaf className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="font-heading font-bold text-2xl text-foreground">AyurSutra</h1>
              <p className="text-sm text-muted-foreground">Panchakarma Management</p>
            </div>
          </div>
        </div>

        <Card className="border-green-100 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="font-heading text-2xl">Welcome Back</CardTitle>
            <CardDescription>Sign in to your account. Select Patient or Practitioner tab to choose your role.</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="patient" className="font-medium">
                  Patient Login
                </TabsTrigger>
                <TabsTrigger value="practitioner" className="font-medium">
                  Practitioner Login
                </TabsTrigger>
              </TabsList>

              <TabsContent value="patient">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="patient-email">Email Address</Label>
                    <Input
                      id="patient-email"
                      type="email"
                      placeholder="Enter your email (any email works)"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className={`border-green-200 focus:border-primary ${errors.email ? 'border-red-500' : ''}`}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="patient-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="patient-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className={`border-green-200 focus:border-primary pr-10 ${errors.password ? 'border-red-500' : ''}`}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                    {errors.password && (
                      <p className="text-sm text-red-600">{errors.password}</p>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <Link href="/auth/forgot-password" className="text-sm text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="practitioner">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="practitioner-email">Email Address</Label>
                    <Input
                      id="practitioner-email"
                      type="email"
                      placeholder="Enter your email (any email works)"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="border-green-200 focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="practitioner-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="practitioner-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="border-green-200 focus:border-primary pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Link href="/auth/forgot-password" className="text-sm text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link href="/auth/register" className="text-primary hover:underline font-medium">
                  Sign up here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
