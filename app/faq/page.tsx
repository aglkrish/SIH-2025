"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, HelpCircle, MessageCircle, Book, Phone } from "lucide-react"
import Link from "next/link"

interface FAQItem {
  id: string
  question: string
  answer: string
  category: "general" | "booking" | "practitioners" | "technical" | "billing"
}

const faqData: FAQItem[] = [
  {
    id: "1",
    category: "booking",
    question: "How do patients book a Panchakarma session?",
    answer:
      "Patients can book sessions through our user-friendly online portal available 24/7. They simply select their preferred treatment type, choose from available time slots, and receive instant confirmation. The system automatically sends appointment details and preparation instructions via email and SMS. Patients can also reschedule or cancel appointments up to 24 hours in advance through the same portal.",
  },
  {
    id: "2",
    category: "practitioners",
    question: "How are practitioners notified of new appointments?",
    answer:
      "Practitioners receive real-time notifications through multiple channels: in-app notifications, email alerts, and SMS messages. The system sends immediate notifications for new bookings, cancellations, and schedule changes. Practitioners can customize their notification preferences and set quiet hours. The mobile app ensures they stay updated even when away from their computer, with push notifications for urgent updates.",
  },
  {
    id: "3",
    category: "general",
    question: "What makes AyurSutra different from other practice management software?",
    answer:
      "AyurSutra is specifically designed for Ayurveda and Panchakarma practices. Unlike generic healthcare software, we understand the unique requirements of traditional treatments, sequential therapy protocols, and holistic patient assessment methods. Our system includes Ayurveda-specific terminology, Prakriti/Vikriti assessments, and treatment workflows that align with traditional practices while providing modern efficiency.",
  },
  {
    id: "4",
    category: "technical",
    question: "Is my patient data secure and HIPAA compliant?",
    answer:
      "Absolutely. AyurSutra employs enterprise-grade security measures including end-to-end encryption, secure cloud storage, and regular security audits. We are fully HIPAA compliant with role-based access controls, audit trails, and data backup systems. All data is encrypted both in transit and at rest, and we maintain strict access controls to ensure only authorized personnel can access patient information.",
  },
  {
    id: "5",
    category: "technical",
    question: "Can I access AyurSutra on mobile devices?",
    answer:
      "Yes! AyurSutra offers native mobile apps for both iOS and Android, as well as a responsive web interface that works seamlessly on tablets and smartphones. Practitioners can manage schedules, update patient notes, and communicate with patients on the go. Patients can book appointments, receive notifications, and access their treatment history through the mobile app.",
  },
  {
    id: "6",
    category: "billing",
    question: "How does the billing and payment system work?",
    answer:
      "Our integrated billing system automates invoicing and supports multiple payment methods including credit cards, bank transfers, and insurance processing. Patients can pay online during booking or receive automated payment reminders. The system generates detailed financial reports, tracks outstanding payments, and integrates with popular accounting software. You can also set up payment plans for longer treatment programs.",
  },
  {
    id: "7",
    category: "practitioners",
    question: "Can multiple practitioners use the same system?",
    answer:
      "Yes, AyurSutra supports multi-practitioner practices with individual calendars, specialized treatment assignments, and role-based permissions. Each practitioner has their own dashboard while administrators can oversee the entire practice. The system intelligently assigns patients based on practitioner specializations and availability, and supports collaborative care with shared patient notes and treatment plans.",
  },
  {
    id: "8",
    category: "general",
    question: "What kind of support and training do you provide?",
    answer:
      "We provide comprehensive onboarding with personalized training sessions, detailed documentation, video tutorials, and ongoing support. Our support team includes Ayurveda practitioners who understand your workflow. We offer 24/7 technical support for urgent issues, regular webinars for new features, and a dedicated customer success manager for larger practices. Training is included in all plans at no additional cost.",
  },
]

const categories = [
  { id: "all", label: "All Questions", icon: HelpCircle },
  { id: "general", label: "General", icon: Book },
  { id: "booking", label: "Patient Booking", icon: MessageCircle },
  { id: "practitioners", label: "For Practitioners", icon: Phone },
  { id: "technical", label: "Technical", icon: HelpCircle },
  { id: "billing", label: "Billing", icon: MessageCircle },
]

export default function FAQPage() {
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const [activeCategory, setActiveCategory] = useState<string>("all")

  const toggleExpanded = (id: string) => {
    setExpandedItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const filteredFAQs = activeCategory === "all" ? faqData : faqData.filter((faq) => faq.category === activeCategory)

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-background via-muted/30 to-accent/10">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge variant="secondary" className="mb-6 bg-accent/20 text-accent-foreground hover:bg-accent/30">
            <HelpCircle className="w-4 h-4 mr-2" />
            Frequently Asked Questions
          </Badge>
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-balance mb-6 text-foreground">
            Get Answers About
            <span className="text-primary"> AyurSutra</span>
          </h1>
          <p className="text-xl text-muted-foreground text-pretty mb-8 max-w-2xl mx-auto">
            Find answers to common questions about our Panchakarma patient management software. Can't find what you're
            looking for? Contact our support team.
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Category Filter */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => {
                const Icon = category.icon
                return (
                  <Button
                    key={category.id}
                    variant={activeCategory === category.id ? "default" : "outline"}
                    onClick={() => setActiveCategory(category.id)}
                    className={
                      activeCategory === category.id
                        ? "bg-primary hover:bg-primary/90"
                        : "border-border hover:bg-muted/50"
                    }
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {category.label}
                  </Button>
                )
              })}
            </div>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {filteredFAQs.map((faq) => {
              const isExpanded = expandedItems.includes(faq.id)
              return (
                <Card key={faq.id} className="border-border hover:shadow-md transition-shadow">
                  <CardContent className="p-0">
                    <button
                      onClick={() => toggleExpanded(faq.id)}
                      className="w-full p-6 text-left flex items-center justify-between hover:bg-muted/30 transition-colors"
                      aria-expanded={isExpanded}
                      aria-controls={`faq-answer-${faq.id}`}
                    >
                      <h3 className="font-heading font-semibold text-lg pr-4 text-foreground">{faq.question}</h3>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                      )}
                    </button>
                    {isExpanded && (
                      <div
                        id={`faq-answer-${faq.id}`}
                        className="px-6 pb-6 pt-0 border-t border-border/50 animate-in slide-in-from-top-2 duration-200"
                      >
                        <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {filteredFAQs.length === 0 && (
            <div className="text-center py-12">
              <HelpCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-heading font-semibold text-lg mb-2">No questions found</h3>
              <p className="text-muted-foreground">Try selecting a different category or contact our support team.</p>
            </div>
          )}
        </div>
      </section>

      {/* Help Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h2 className="font-heading font-bold text-3xl text-foreground mb-4">Still Have Questions?</h2>
            <p className="text-muted-foreground text-lg">
              Our support team is here to help you get the most out of AyurSutra
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-border text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-xl mb-2">Contact Support</h3>
                <p className="text-muted-foreground mb-4">
                  Get personalized help from our expert support team who understand Ayurveda practices.
                </p>
                <Link href="/contact">
                  <Button className="bg-primary hover:bg-primary/90">Contact Us</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-border text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-xl mb-2">Schedule a Demo</h3>
                <p className="text-muted-foreground mb-4">
                  See AyurSutra in action with a personalized demo tailored to your practice needs.
                </p>
                <Link href="/contact">
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary/5 bg-transparent">
                    Book Demo
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h2 className="font-heading font-bold text-3xl text-foreground mb-4">Additional Resources</h2>
            <p className="text-muted-foreground text-lg">Helpful resources to get you started with AyurSutra</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-border">
              <CardContent className="p-6 text-center">
                <Book className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-heading font-semibold mb-2">User Guide</h3>
                <p className="text-sm text-muted-foreground">
                  Comprehensive documentation covering all features and workflows
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6 text-center">
                <HelpCircle className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-heading font-semibold mb-2">Video Tutorials</h3>
                <p className="text-sm text-muted-foreground">
                  Step-by-step video guides for common tasks and setup procedures
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6 text-center">
                <MessageCircle className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-heading font-semibold mb-2">Community Forum</h3>
                <p className="text-sm text-muted-foreground">
                  Connect with other practitioners and share best practices
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
