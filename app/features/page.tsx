import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Calendar,
  Users,
  BarChart3,
  Bell,
  Shield,
  Heart,
  FileText,
  Smartphone,
  CreditCard,
  Database,
  Zap,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-background via-muted/30 to-accent/10">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge variant="secondary" className="mb-6 bg-accent/20 text-accent-foreground hover:bg-accent/30">
            <Zap className="w-4 h-4 mr-2" />
            Comprehensive Features
          </Badge>
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-balance mb-6 text-foreground">
            Everything You Need for
            <span className="text-primary"> Panchakarma Excellence</span>
          </h1>
          <p className="text-xl text-muted-foreground text-pretty mb-8 max-w-2xl mx-auto">
            Discover how AyurSutra's comprehensive feature set transforms every aspect of your Panchakarma practice,
            from patient booking to treatment completion.
          </p>
        </div>
      </section>

      {/* Core Features Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl text-foreground mb-4">Core Features</h2>
            <p className="text-muted-foreground text-lg">Essential tools for modern Panchakarma practice management</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Patient Booking */}
            <Card className="border-border hover:shadow-lg transition-all hover:border-primary/50">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="font-heading">Patient Booking</CardTitle>
                <CardDescription>
                  Seamless online booking system with real-time availability and treatment-specific scheduling
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    24/7 online booking portal
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    Treatment-specific time slots
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    Automated confirmation emails
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    Waitlist management
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Practitioner Scheduling */}
            <Card className="border-border hover:shadow-lg transition-all hover:border-primary/50">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="font-heading">Practitioner Scheduling</CardTitle>
                <CardDescription>
                  Intelligent scheduling that optimizes practitioner availability and treatment workflows
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    Drag-and-drop calendar interface
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    Multi-practitioner coordination
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    Skill-based assignment
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    Break and availability management
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Smart Notifications */}
            <Card className="border-border hover:shadow-lg transition-all hover:border-primary/50">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Bell className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="font-heading">Smart Notifications</CardTitle>
                <CardDescription>
                  Automated communication system for appointments, reminders, and follow-ups
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    SMS and email reminders
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    Treatment preparation instructions
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    Follow-up care reminders
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    Customizable message templates
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Progress Reports */}
            <Card className="border-border hover:shadow-lg transition-all hover:border-primary/50">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="font-heading">Progress Reports</CardTitle>
                <CardDescription>
                  Comprehensive analytics and reporting tools for patient progress and practice insights
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    Visual progress tracking
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    Treatment effectiveness metrics
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    Practice performance analytics
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    Exportable reports
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Patient Records */}
            <Card className="border-border hover:shadow-lg transition-all hover:border-primary/50">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="font-heading">Digital Patient Records</CardTitle>
                <CardDescription>
                  Comprehensive digital health records with Ayurveda-specific assessment tools
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    Prakriti and Vikriti assessment
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    Treatment history tracking
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    Photo documentation
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    Secure cloud storage
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Security & Compliance */}
            <Card className="border-border hover:shadow-lg transition-all hover:border-primary/50">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="font-heading">Security & Compliance</CardTitle>
                <CardDescription>Enterprise-grade security with healthcare compliance standards</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    HIPAA compliant
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    End-to-end encryption
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    Role-based access control
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    Regular security audits
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Advanced Features */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl text-foreground mb-4">Advanced Features</h2>
            <p className="text-muted-foreground text-lg">
              Powerful tools for growing practices and enhanced patient care
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Smartphone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="font-heading">Mobile App</CardTitle>
                    <CardDescription>Native mobile apps for practitioners and patients</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Stay connected with your practice on the go. Our mobile apps provide full functionality for both
                  practitioners and patients.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    Real-time schedule updates
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    Patient communication
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    Treatment notes on-the-go
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="font-heading">Integrated Billing</CardTitle>
                    <CardDescription>Streamlined payment processing and invoicing</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Simplify your billing process with integrated payment processing, automated invoicing, and financial
                  reporting.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    Online payment processing
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    Automated invoicing
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    Financial reporting
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Database className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="font-heading">Data Analytics</CardTitle>
                    <CardDescription>Advanced insights for practice optimization</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Make data-driven decisions with comprehensive analytics on patient outcomes, practice efficiency, and
                  revenue optimization.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    Patient outcome tracking
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    Revenue analytics
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    Efficiency metrics
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Heart className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="font-heading">Wellness Programs</CardTitle>
                    <CardDescription>Structured programs for holistic patient care</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Create and manage comprehensive wellness programs that extend beyond individual treatments to support
                  long-term patient health.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    Program templates
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    Progress milestones
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    Lifestyle recommendations
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-6 text-balance">
            Ready to Experience These Features?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 text-pretty">
            Start your free trial today and discover how AyurSutra can transform your Panchakarma practice with these
            powerful features.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-8 bg-card text-card-foreground hover:bg-card/90"
              >
                Start Free Trial
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
              >
                Schedule Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
