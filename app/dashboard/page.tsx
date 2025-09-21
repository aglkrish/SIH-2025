"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Loading } from "@/components/loading"

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    console.log('Dashboard redirect - loading:', loading, 'user:', user)
    
    if (!loading && user) {
      console.log('User found, redirecting based on role:', user.role)
      // Redirect to appropriate dashboard based on user role
      if (user.role === 'patient') {
        router.push('/dashboard/patient')
      } else if (user.role === 'practitioner') {
        router.push('/dashboard/practitioner')
      } else {
        // If no valid role, redirect to login
        console.log('Invalid role, redirecting to login')
        router.push('/auth/login')
      }
    } else if (!loading && !user) {
      // If not logged in, redirect to login
      console.log('No user found, redirecting to login')
      router.push('/auth/login')
    }
  }, [user, loading, router])

  // Show loading while determining redirect
  return <Loading type="page" message="Redirecting to your dashboard..." />
}
