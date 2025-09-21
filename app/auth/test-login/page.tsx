"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"

export default function TestLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<"patient" | "practitioner">("patient")
  const router = useRouter()
  const { signIn } = useAuth()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Create email based on role for testing
    const testEmail = role === 'practitioner' ? 'practitioner@test.com' : 'patient@test.com'
    
    try {
      await signIn(testEmail, password || 'password123')
      router.push("/dashboard")
    } catch (error) {
      console.error('Login error:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Test Login</CardTitle>
          <CardDescription>Select role and test login</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label>Select Role</Label>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={role === 'patient' ? 'default' : 'outline'}
                  onClick={() => setRole('patient')}
                  className="flex-1"
                >
                  Patient
                </Button>
                <Button
                  type="button"
                  variant={role === 'practitioner' ? 'default' : 'outline'}
                  onClick={() => setRole('practitioner')}
                  className="flex-1"
                >
                  Practitioner
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Email (auto-generated)</Label>
              <Input
                value={role === 'practitioner' ? 'practitioner@test.com' : 'patient@test.com'}
                disabled
                className="bg-gray-100"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter any password"
              />
            </div>
            
            <Button type="submit" className="w-full">
              Login as {role}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
