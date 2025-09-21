"use client"

import type React from "react"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, AlertCircle } from "lucide-react"

interface FormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters"
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // Simulate form submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log("[v0] Form submitted:", formData)
      setIsSubmitted(true)
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
    } catch (error) {
      console.error("[v0] Form submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-2xl text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>
            <h1 className="font-heading font-bold text-3xl text-foreground mb-4">Thank You!</h1>
            <p className="text-muted-foreground text-lg mb-8">
              Your message has been sent successfully. We'll get back to you within 24 hours.
            </p>
            <Button onClick={() => setIsSubmitted(false)} className="bg-primary hover:bg-primary/90">
              Send Another Message
            </Button>
          </div>
        </section>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-background via-muted/30 to-accent/10">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge variant="secondary" className="mb-6 bg-accent/20 text-accent-foreground hover:bg-accent/30">
            <Mail className="w-4 h-4 mr-2" />
            Get In Touch
          </Badge>
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-balance mb-6 text-foreground">
            Contact Our
            <span className="text-primary"> AyurSutra Team</span>
          </h1>
          <p className="text-xl text-muted-foreground text-pretty mb-8 max-w-2xl mx-auto">
            Have questions about AyurSutra? Want to schedule a demo? We're here to help you transform your Panchakarma
            practice.
          </p>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="font-heading text-2xl">Send Us a Message</CardTitle>
                <p className="text-muted-foreground">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">
                        Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className={errors.name ? "border-destructive" : ""}
                        placeholder="Your full name"
                      />
                      {errors.name && (
                        <div className="flex items-center gap-2 text-sm text-destructive">
                          <AlertCircle className="w-4 h-4" />
                          {errors.name}
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">
                        Email <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className={errors.email ? "border-destructive" : ""}
                        placeholder="your@email.com"
                      />
                      {errors.email && (
                        <div className="flex items-center gap-2 text-sm text-destructive">
                          <AlertCircle className="w-4 h-4" />
                          {errors.email}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone (Optional)</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject (Optional)</Label>
                      <Input
                        id="subject"
                        type="text"
                        value={formData.subject}
                        onChange={(e) => handleInputChange("subject", e.target.value)}
                        placeholder="Demo request, pricing, etc."
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">
                      Message <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      className={`min-h-32 ${errors.message ? "border-destructive" : ""}`}
                      placeholder="Tell us about your practice and how we can help..."
                    />
                    {errors.message && (
                      <div className="flex items-center gap-2 text-sm text-destructive">
                        <AlertCircle className="w-4 h-4" />
                        {errors.message}
                      </div>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="font-heading text-2xl">Contact Information</CardTitle>
                  <p className="text-muted-foreground">Reach out to us through any of these channels.</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold mb-1">Email</h3>
                      <p className="text-muted-foreground">support@ayursutra.com</p>
                      <p className="text-sm text-muted-foreground">We respond within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold mb-1">Phone</h3>
                      <p className="text-muted-foreground">+1 (555) 123-4567</p>
                      <p className="text-sm text-muted-foreground">Monday - Friday, 9 AM - 6 PM EST</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold mb-1">Address</h3>
                      <p className="text-muted-foreground">123 Wellness Street</p>
                      <p className="text-muted-foreground">Health City, HC 12345</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="font-heading text-2xl">Business Hours</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-primary" />
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <span className="font-medium">Monday - Friday</span>
                          <span className="text-muted-foreground">9:00 AM - 6:00 PM</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-primary" />
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <span className="font-medium">Saturday</span>
                          <span className="text-muted-foreground">10:00 AM - 4:00 PM</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-primary" />
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <span className="font-medium">Sunday</span>
                          <span className="text-muted-foreground">Closed</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 p-4 bg-accent/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <strong>Emergency Support:</strong> For urgent technical issues, our emergency support line is
                      available 24/7 for existing customers.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
