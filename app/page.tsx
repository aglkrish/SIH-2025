"use client"

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Calendar, Users, BarChart3, Bell, Shield, Heart, Sparkles, ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-background via-muted/30 to-accent/10">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge variant="secondary" className="mb-6 bg-accent/20 text-accent-foreground hover:bg-accent/30">
            <Sparkles className="w-4 h-4 mr-2" />
            Complete Panchakarma Practice Management
          </Badge>
          <h1 className="font-heading font-bold text-4xl md:text-6xl text-balance mb-6 text-foreground">
            Smart Panchakarma
            <span className="text-primary"> Scheduling & Patient Care</span>
          </h1>
          <p className="text-xl text-muted-foreground text-pretty mb-8 max-w-2xl mx-auto">
            Transform your Ayurveda practice with comprehensive patient management, intelligent scheduling, and holistic
            care tracking designed specifically for Panchakarma treatments.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8">
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/features">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 border-primary text-primary hover:bg-primary/5 bg-transparent"
              >
                Explore Features
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-card">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-heading font-bold text-primary">500+</div>
              <p className="text-muted-foreground">Practitioners Trust Us</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-heading font-bold text-primary">10,000+</div>
              <p className="text-muted-foreground">Patients Managed</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-heading font-bold text-primary">95%</div>
              <p className="text-muted-foreground">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl text-foreground mb-4">
              Everything You Need for Holistic Panchakarma Care
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Comprehensive tools designed specifically for Ayurveda practitioners and Panchakarma therapy management
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-border hover:shadow-lg transition-all hover:border-primary/50">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="font-heading">Patient Booking</CardTitle>
                <CardDescription>
                  Seamless online booking system for patients to schedule Panchakarma treatments with real-time
                  availability
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border hover:shadow-lg transition-all hover:border-primary/50">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="font-heading">Practitioner Scheduling</CardTitle>
                <CardDescription>
                  Intelligent scheduling system that manages practitioner availability and optimizes treatment workflows
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border hover:shadow-lg transition-all hover:border-primary/50">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Bell className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="font-heading">Smart Notifications</CardTitle>
                <CardDescription>
                  Automated reminders for appointments, treatments, and follow-ups via SMS, email, and in-app
                  notifications
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border hover:shadow-lg transition-all hover:border-primary/50">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="font-heading">Progress Reports</CardTitle>
                <CardDescription>
                  Comprehensive analytics and reporting tools to track patient progress and treatment effectiveness
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border hover:shadow-lg transition-all hover:border-primary/50">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="font-heading">Secure & Compliant</CardTitle>
                <CardDescription>
                  HIPAA-compliant data security with role-based access and encrypted patient information storage
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border hover:shadow-lg transition-all hover:border-primary/50">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="font-heading">Holistic Approach</CardTitle>
                <CardDescription>
                  Built specifically for Ayurveda practices with Panchakarma-focused workflows and traditional
                  terminology
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl text-foreground mb-4">Why Choose AyurSutra?</h2>
            <p className="text-muted-foreground text-lg">
              Experience the difference with our Ayurveda-focused approach
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-heading font-semibold mb-2">Ayurveda-Specific Design</h3>
                  <p className="text-muted-foreground">
                    Built from the ground up for Panchakarma practices with traditional terminology and workflows.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-heading font-semibold mb-2">Easy Implementation</h3>
                  <p className="text-muted-foreground">
                    Quick setup with minimal training required. Start managing patients within hours, not weeks.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-heading font-semibold mb-2">24/7 Support</h3>
                  <p className="text-muted-foreground">
                    Dedicated support team with deep understanding of Ayurveda practices and requirements.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-heading font-semibold mb-2">Scalable Solution</h3>
                  <p className="text-muted-foreground">
                    Grows with your practice from single practitioner to multi-location wellness centers.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-heading font-semibold mb-2">Cost Effective</h3>
                  <p className="text-muted-foreground">
                    Reduce administrative overhead and increase efficiency with automated workflows.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-heading font-semibold mb-2">Regular Updates</h3>
                  <p className="text-muted-foreground">
                    Continuous improvements based on practitioner feedback and industry best practices.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-6 text-balance">
            Ready to Transform Your Panchakarma Practice?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 text-pretty">
            Join hundreds of Ayurveda practitioners who trust AyurSutra for their patient management needs. Start your
            free trial today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-8 bg-card text-card-foreground hover:bg-card/90"
              >
                Get Started Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
              >
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
