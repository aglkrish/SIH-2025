"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'

interface AuthGuardProps {
  children: React.ReactNode
  redirectTo?: string
  requiredRole?: 'patient' | 'practitioner'
}

export function AuthGuard({ children, redirectTo = '/auth/login', requiredRole }: AuthGuardProps) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push(redirectTo)
    } else if (!loading && user && requiredRole && user.role !== requiredRole) {
      // Redirect to appropriate dashboard based on user's actual role
      router.push('/dashboard')
    }
  }, [user, loading, router, redirectTo, requiredRole])

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  // Don't render children if user is not authenticated
  if (!user) {
    return null
  }

  // Don't render children if user doesn't have the required role
  if (requiredRole && (!user || user.role !== requiredRole)) {
    return null
  }

  return <>{children}</>
}