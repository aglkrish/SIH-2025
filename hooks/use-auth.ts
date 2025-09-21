"use client"

import { useState, useEffect } from "react"

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: "patient" | "practitioner"
  avatar?: string
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Mock authentication check - replace with real auth logic
    const checkAuth = () => {
      const mockAuth = localStorage.getItem("mockAuth")
      const mockRole = localStorage.getItem("mockRole")

      if (mockAuth === "true") {
        // Mock user data
        setUser({
          id: "1",
          email: "user@example.com",
          firstName: "John",
          lastName: "Doe",
          role: (mockRole as "patient" | "practitioner") || "patient",
        })
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string, role: "patient" | "practitioner") => {
    // Mock login - replace with real auth logic
    localStorage.setItem("mockAuth", "true")
    localStorage.setItem("mockRole", role)

    setUser({
      id: "1",
      email,
      firstName: "John",
      lastName: "Doe",
      role,
    })

    return { success: true }
  }

  const logout = () => {
    localStorage.removeItem("mockAuth")
    localStorage.removeItem("mockRole")
    setUser(null)
  }

  const register = async (userData: any, role: "patient" | "practitioner") => {
    // Mock registration - replace with real auth logic
    localStorage.setItem("mockAuth", "true")
    localStorage.setItem("mockRole", role)

    setUser({
      id: "1",
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      role,
    })

    return { success: true }
  }

  return {
    user,
    isLoading,
    login,
    logout,
    register,
    isAuthenticated: !!user,
  }
}
