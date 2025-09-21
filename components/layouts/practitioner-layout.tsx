"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import {
  Leaf,
  Home,
  Calendar,
  Users,
  BarChart3,
  Bell,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  FileText,
  MessageCircle,
} from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { useAuth } from "@/contexts/auth-context"
import { NotificationBell } from "@/components/notifications/notification-bell"

interface PractitionerLayoutProps {
  children: React.ReactNode
}

const navigation = [
  { name: "Dashboard", href: "/dashboard/practitioner", icon: Home },
  { name: "Appointments", href: "/dashboard/practitioner/appointments", icon: Calendar },
  { name: "Patients", href: "/dashboard/practitioner/patients", icon: Users },
  { name: "Messages", href: "/dashboard/practitioner/messages", icon: MessageCircle },
  { name: "Analytics", href: "/dashboard/practitioner/analytics", icon: BarChart3 },
  { name: "Reports", href: "/dashboard/practitioner/reports", icon: FileText },
  { name: "Settings", href: "/dashboard/practitioner/settings", icon: Settings },
]

export function PractitionerLayout({ children }: PractitionerLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { logout, user } = useAuth()

  const handleLogout = async () => {
    try {
      await logout()
      router.push("/auth/login")
    } catch (error) {
      // Error is handled in the auth context
    }
  }

  const handleNotificationClick = (notificationId: string) => {
    switch (notificationId) {
      case "new-patient":
        toast.info("Redirecting to patients page...")
        router.push("/dashboard/practitioner/patients")
        break
      case "appointment-reminder":
        toast.info("Redirecting to appointments page...")
        router.push("/dashboard/practitioner/appointments")
        break
      case "treatment-feedback":
        toast.info("Redirecting to analytics page...")
        router.push("/dashboard/practitioner/analytics")
        break
      default:
        toast.success(`Opening notification: ${notificationId}`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 relative">
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23059669' fillOpacity='0.3'%3E%3Cpath d='M40 40c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm20-20c11.046 0 20 8.954 20 20s-8.954 20-20 20-20-8.954-20-20 8.954-20 20-20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/20" onClick={() => setSidebarOpen(false)} />
          <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-xl">
            <div className="flex h-16 items-center justify-between px-6 border-b border-green-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-white" />
                </div>
                <span className="font-heading font-bold text-lg">AyurSutra</span>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>
            <nav className="p-4 space-y-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary text-white"
                        : "text-muted-foreground hover:text-foreground hover:bg-green-50",
                    )}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block lg:w-64 lg:bg-white/95 lg:backdrop-blur-sm lg:border-r lg:border-green-100">
        <div className="flex h-16 items-center px-6 border-b border-green-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-heading font-bold text-lg">AyurSutra</span>
              <p className="text-xs text-muted-foreground">Practitioner Portal</p>
            </div>
          </div>
        </div>
        <nav className="p-4 space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive ? "bg-primary text-white" : "text-muted-foreground hover:text-foreground hover:bg-green-50",
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Main content */}
      <div className="lg:pl-64 relative z-10">
        {/* Top header */}
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-green-100">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6">
            <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu className="w-5 h-5" />
            </Button>

            <div className="flex items-center gap-4 ml-auto">
              {/* Notifications */}
              <NotificationBell />

              {/* Logout Button */}
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setLogoutDialogOpen(true)}
                className="bg-transparent border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>

              {/* User menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" />
                      <AvatarFallback className="bg-primary/10 text-primary">PS</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">Dr. Priya Sharma</p>
                      <p className="text-xs text-muted-foreground">priya.sharma@ayursutra.com</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/practitioner/profile">
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/practitioner/settings">
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 sm:p-6">{children}</main>
      </div>

      {/* Logout Confirmation Dialog */}
      <AlertDialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to sign out? You will need to log in again to access your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout} className="bg-destructive hover:bg-destructive/90">
              Sign Out
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
