"use client"

import React, { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { apiService } from '@/lib/api'
import { User, AuthContextType } from '@/types'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for stored user data on app load
    const storedUser = localStorage.getItem('ayursutra_user')
    const storedToken = localStorage.getItem('ayursutra_token')
    
    console.log('Auth context initialization - storedUser:', storedUser, 'storedToken:', storedToken)
    
    if (storedUser && storedToken) {
      try {
        const userData = JSON.parse(storedUser)
        console.log('Parsed user data:', userData)
        setUser(userData)
      } catch (error) {
        console.error('Error parsing stored user:', error)
        localStorage.removeItem('ayursutra_user')
        localStorage.removeItem('ayursutra_token')
      }
    }
    setLoading(false)
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true)
      const response = await apiService.login(email, password)
      
      if (response.success) {
        console.log('Login successful, setting user:', response.user)
        setUser(response.user)
        localStorage.setItem('ayursutra_user', JSON.stringify(response.user))
        localStorage.setItem('ayursutra_token', response.user.token)
        toast.success('Successfully signed in!')
      } else {
        throw new Error(response.message || 'Login failed')
      }
    } catch (error: any) {
      console.error('Sign in error:', error)
      const errorMessage = error.message || 'Failed to sign in. Please try again.'
      toast.error(errorMessage)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (email: string, password: string, displayName: string, role: 'patient' | 'practitioner') => {
    try {
      setLoading(true)
      const response = await apiService.register(email, password, displayName, role)
      
      if (response.success) {
        setUser(response.user)
        localStorage.setItem('ayursutra_user', JSON.stringify(response.user))
        localStorage.setItem('ayursutra_token', response.user.token)
        toast.success('Account created successfully!')
      } else {
        throw new Error(response.message || 'Registration failed')
      }
    } catch (error: any) {
      console.error('Sign up error:', error)
      const errorMessage = error.message || 'Failed to create account. Please try again.'
      toast.error(errorMessage)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      setLoading(true)
      setUser(null)
      localStorage.removeItem('ayursutra_user')
      localStorage.removeItem('ayursutra_token')
      toast.success('Successfully signed out!')
    } catch (error: any) {
      console.error('Logout error:', error)
      toast.error('Failed to sign out. Please try again.')
      throw error
    } finally {
      setLoading(false)
    }
  }

  const value = {
    user,
    loading,
    signIn,
    signUp,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
