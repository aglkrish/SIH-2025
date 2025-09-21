"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, User, Receipt, Download, Printer } from "lucide-react"
import { toast } from "sonner"

interface ReceiptDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  session: any
}

export function ReceiptDialog({ open, onOpenChange, session }: ReceiptDialogProps) {
  if (!session) return null

  // Generate receipt data
  const receiptData = {
    receiptNumber: `AYR-${session.id.slice(-6).toUpperCase()}`,
    date: session.date,
    time: session.time,
    treatment: session.type,
    practitioner: session.practitioner,
    duration: session.duration,
    location: session.location,
    price: session.price,
    paymentMethod: "Credit Card",
    paymentStatus: "Paid",
    transactionId: `TXN-${Date.now().toString().slice(-8)}`,
    issuedDate: new Date().toLocaleDateString(),
    issuedTime: new Date().toLocaleTimeString()
  }

  const handleDownload = () => {
    // Create a simple text receipt for download
    const receiptText = `
AYURSUTRA WELLNESS CENTER
Receipt

Receipt Number: ${receiptData.receiptNumber}
Date: ${receiptData.issuedDate}
Time: ${receiptData.issuedTime}

PATIENT INFORMATION:
Name: [Patient Name]
Email: [Patient Email]

SERVICE DETAILS:
Treatment: ${receiptData.treatment}
Practitioner: ${receiptData.practitioner}
Date: ${receiptData.date}
Time: ${receiptData.time}
Duration: ${receiptData.duration}
Location: ${receiptData.location}

PAYMENT INFORMATION:
Amount: ${receiptData.price}
Payment Method: ${receiptData.paymentMethod}
Status: ${receiptData.paymentStatus}
Transaction ID: ${receiptData.transactionId}

Thank you for choosing AyurSutra!
    `.trim()

    const blob = new Blob([receiptText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `receipt-${receiptData.receiptNumber}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    toast.success("Receipt downloaded successfully!")
  }

  const handlePrint = () => {
    window.print()
    toast.success("Receipt sent to printer!")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Receipt className="w-5 h-5" />
            Payment Receipt
          </DialogTitle>
          <DialogDescription>
            Receipt for your {session.type} session
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Receipt Header */}
          <div className="text-center border-b pb-4">
            <h2 className="text-2xl font-bold text-primary">AYURSUTRA</h2>
            <p className="text-muted-foreground">Wellness Center</p>
            <p className="text-sm text-muted-foreground mt-2">
              Receipt #{receiptData.receiptNumber}
            </p>
          </div>

          {/* Receipt Details */}
          <div className="space-y-4">
            {/* Service Information */}
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <User className="w-4 h-4" />
                Service Details
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>Date: {receiptData.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span>Time: {receiptData.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>Treatment: {receiptData.treatment}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>Duration: {receiptData.duration}</span>
                </div>
                <div className="flex items-center gap-2 col-span-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>Location: {receiptData.location}</span>
                </div>
              </div>
            </div>

            {/* Practitioner Information */}
            <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
              <Avatar className="w-12 h-12">
                <AvatarImage src={session.practitionerAvatar || "/placeholder.svg"} />
                <AvatarFallback className="bg-primary/10 text-primary">
                  {session.practitioner
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-semibold">Practitioner</h4>
                <p className="text-muted-foreground">{receiptData.practitioner}</p>
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Payment Information</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Service Fee:</span>
                  <span className="font-medium">{receiptData.price}</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment Method:</span>
                  <span className="font-medium">{receiptData.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span>Status:</span>
                  <Badge className="bg-green-100 text-green-800">{receiptData.paymentStatus}</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Transaction ID:</span>
                  <span className="font-mono text-xs">{receiptData.transactionId}</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Total Paid:</span>
                    <span className="text-primary">{receiptData.price}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Receipt Footer */}
            <div className="text-center text-sm text-muted-foreground border-t pt-4">
              <p>Receipt issued on {receiptData.issuedDate} at {receiptData.issuedTime}</p>
              <p className="mt-2">Thank you for choosing AyurSutra Wellness Center!</p>
              <p>For any queries, contact us at support@ayursutra.com</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={handleDownload}>
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button variant="outline" onClick={handlePrint}>
              <Printer className="w-4 h-4 mr-2" />
              Print
            </Button>
            <Button onClick={() => onOpenChange(false)} className="bg-primary hover:bg-primary/90">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
