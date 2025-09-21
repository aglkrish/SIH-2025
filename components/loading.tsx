"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface LoadingProps {
  type?: 'page' | 'card' | 'inline'
  message?: string
}

export function Loading({ type = 'page', message = 'Loading...' }: LoadingProps) {
  if (type === 'page') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-muted-foreground">{message}</p>
        </div>
      </div>
    )
  }

  if (type === 'card') {
    return (
      <Card className="border-green-100">
        <CardContent className="p-6">
          <div className="space-y-4">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-20 w-full" />
            <div className="flex gap-2">
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-20" />
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
      <span className="text-sm text-muted-foreground">{message}</span>
    </div>
  )
}
