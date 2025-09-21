"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Leaf, Eye, EyeOff, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { toast } from "sonner"

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("patient")
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  
  // Form state
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [license, setLicense] = useState("")
  const [clinic, setClinic] = useState("")
  
  const router = useRouter()
  const { signUp, user } = useAuth()

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      if (user.role === 'patient') {
        router.push("/dashboard/patient")
      } else if (user.role === 'practitioner') {
        router.push("/dashboard/practitioner")
      }
    }
  }, [user, router])

  const handleRegister = async (e: React.FormEvent, userType: string) => {
    e.preventDefault()
    
    if (!agreedToTerms) {
      toast.error("Please agree to the terms and conditions")
      return
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long")
      return
    }

    try {
      setIsLoading(true)
      const displayName = `${firstName} ${lastName}`.trim()
      const role = userType as 'patient' | 'practitioner'
      await signUp(email, password, displayName, role)
      // Redirect will happen automatically via useEffect
    } catch (error) {
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
            <CardTitle className="font-heading text-2xl">Create Account</CardTitle>
            <CardDescription>Join AyurSutra to begin your holistic wellness journey</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="patient" className="font-medium">
                  Patient
                </TabsTrigger>
                <TabsTrigger value="practitioner" className="font-medium">
                  Practitioner
                </TabsTrigger>
              </TabsList>

              <TabsContent value="patient">
                <form onSubmit={(e) => handleRegister(e, "patient")} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="patient-first-name">First Name</Label>
                      <Input
                        id="patient-first-name"
                        placeholder="First name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        className="border-green-200 focus:border-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="patient-last-name">Last Name</Label>
                      <Input
                        id="patient-last-name"
                        placeholder="Last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        className="border-green-200 focus:border-primary"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="patient-email">Email Address</Label>
                    <Input
                      id="patient-email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="border-green-200 focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="patient-phone">Phone Number</Label>
                    <Input
                      id="patient-phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="border-green-200 focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="patient-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="patient-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
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
                  <div className="space-y-2">
                    <Label htmlFor="patient-confirm-password">Confirm Password</Label>
                    <div className="relative">
                      <Input
                        id="patient-confirm-password"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="border-green-200 focus:border-primary pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="patient-terms"
                      checked={agreedToTerms}
                      onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                    />
                    <Label htmlFor="patient-terms" className="text-sm">
                      I agree to the{" "}
                      <Link href="/terms" className="text-primary hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-primary hover:underline">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90"
                    disabled={isLoading || !agreedToTerms}
                  >
                    {isLoading ? "Creating Account..." : "Create Patient Account"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="practitioner">
                <form onSubmit={(e) => handleRegister(e, "practitioner")} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="practitioner-first-name">First Name</Label>
                      <Input
                        id="practitioner-first-name"
                        placeholder="First name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        className="border-green-200 focus:border-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="practitioner-last-name">Last Name</Label>
                      <Input
                        id="practitioner-last-name"
                        placeholder="Last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        className="border-green-200 focus:border-primary"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="practitioner-email">Email Address</Label>
                    <Input
                      id="practitioner-email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="border-green-200 focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="practitioner-license">License Number</Label>
                    <Input
                      id="practitioner-license"
                      placeholder="Enter your license number"
                      value={license}
                      onChange={(e) => setLicense(e.target.value)}
                      required
                      className="border-green-200 focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="practitioner-clinic">Clinic/Practice Name</Label>
                    <Input
                      id="practitioner-clinic"
                      placeholder="Enter your clinic name"
                      value={clinic}
                      onChange={(e) => setClinic(e.target.value)}
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
                        placeholder="Create a password"
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
                  <div className="space-y-2">
                    <Label htmlFor="practitioner-confirm-password">Confirm Password</Label>
                    <div className="relative">
                      <Input
                        id="practitioner-confirm-password"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="border-green-200 focus:border-primary pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="practitioner-terms"
                      checked={agreedToTerms}
                      onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                    />
                    <Label htmlFor="practitioner-terms" className="text-sm">
                      I agree to the{" "}
                      <Link href="/terms" className="text-primary hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-primary hover:underline">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90"
                    disabled={isLoading || !agreedToTerms}
                  >
                    {isLoading ? "Creating Account..." : "Create Practitioner Account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/auth/login" className="text-primary hover:underline font-medium">
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
