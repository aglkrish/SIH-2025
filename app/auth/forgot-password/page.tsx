"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Leaf, ArrowLeft, Mail } from "lucide-react"
import Link from "next/link"

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Mock password reset - replace with real logic
    setTimeout(() => {
      setIsLoading(false)
      setEmailSent(true)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link
            href="/auth/login"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Sign In
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
            <CardTitle className="font-heading text-2xl">Reset Password</CardTitle>
            <CardDescription>
              {emailSent
                ? "Check your email for reset instructions"
                : "Enter your email to receive password reset instructions"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {emailSent ? (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Mail className="w-8 h-8 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-heading font-semibold text-lg">Email Sent!</h3>
                  <p className="text-muted-foreground text-sm">
                    We've sent password reset instructions to your email address. Please check your inbox and follow the
                    link to reset your password.
                  </p>
                </div>
                <div className="space-y-2">
                  <Button asChild className="w-full bg-primary hover:bg-primary/90">
                    <Link href="/auth/login">Back to Sign In</Link>
                  </Button>
                  <Button variant="ghost" className="w-full" onClick={() => setEmailSent(false)}>
                    Resend Email
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    required
                    className="border-green-200 focus:border-primary"
                  />
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
                  {isLoading ? "Sending..." : "Send Reset Instructions"}
                </Button>
              </form>
            )}

            {!emailSent && (
              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Remember your password?{" "}
                  <Link href="/auth/login" className="text-primary hover:underline font-medium">
                    Sign in here
                  </Link>
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
