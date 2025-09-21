import Link from "next/link"
import { Leaf, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Leaf className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-heading font-bold text-lg">AyurSutra</span>
            </div>
            <p className="text-sm text-secondary-foreground/80">
              Transforming Ayurveda practices with modern technology for better patient care and streamlined operations.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-heading font-semibold">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/about" className="text-sm hover:text-accent transition-colors">
                About Us
              </Link>
              <Link href="/features" className="text-sm hover:text-accent transition-colors">
                Features
              </Link>
              <Link href="/contact" className="text-sm hover:text-accent transition-colors">
                Contact
              </Link>
              <Link href="/faq" className="text-sm hover:text-accent transition-colors">
                FAQ
              </Link>
            </nav>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-heading font-semibold">Services</h3>
            <nav className="flex flex-col gap-2">
              <span className="text-sm text-secondary-foreground/80">Patient Booking</span>
              <span className="text-sm text-secondary-foreground/80">Practitioner Scheduling</span>
              <span className="text-sm text-secondary-foreground/80">Treatment Tracking</span>
              <span className="text-sm text-secondary-foreground/80">Progress Reports</span>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-heading font-semibold">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-accent" />
                <span>support@ayursutra.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-accent" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-accent" />
                <span>123 Wellness Street, Health City</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-sm text-secondary-foreground/80">
            © 2024 AyurSutra. Empowering Ayurveda practitioners with modern technology.
          </p>
        </div>
      </div>
    </footer>
  )
}
