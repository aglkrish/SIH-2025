import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { Toaster } from "sonner"
import { AuthProvider } from "@/contexts/auth-context"
import { MessagingProvider } from "@/contexts/messaging-context"
import { NotificationProvider } from "@/contexts/notification-context"
import { SessionsProvider } from "@/contexts/sessions-context"
import ErrorBoundary from "@/components/error-boundary"
import { Loading } from "@/components/loading"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
})

export const metadata: Metadata = {
  title: "AyurSutra - Panchakarma Patient Management Software",
  description:
    "Smart Panchakarma Scheduling & Patient Care - Transform your Ayurveda practice with comprehensive patient management",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable} ${poppins.variable} antialiased`}>
            <ErrorBoundary>
              <AuthProvider>
                <MessagingProvider>
                  <NotificationProvider>
                    <SessionsProvider>
                      <Suspense fallback={<Loading type="page" message="Loading application..." />}>
                        {children}
                      </Suspense>
                      <Analytics />
                      <Toaster />
                    </SessionsProvider>
                  </NotificationProvider>
                </MessagingProvider>
              </AuthProvider>
            </ErrorBoundary>
      </body>
    </html>
  )
}
