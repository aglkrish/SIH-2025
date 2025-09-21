import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Leaf, Heart, Users, Target, Award, Globe } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-background via-muted/30 to-accent/10">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge variant="secondary" className="mb-6 bg-accent/20 text-accent-foreground hover:bg-accent/30">
            <Leaf className="w-4 h-4 mr-2" />
            About AyurSutra
          </Badge>
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-balance mb-6 text-foreground">
            Bridging Ancient Wisdom with
            <span className="text-primary"> Modern Technology</span>
          </h1>
          <p className="text-xl text-muted-foreground text-pretty mb-8 max-w-2xl mx-auto">
            AyurSutra was born from the vision to empower Ayurveda practitioners with cutting-edge technology while
            preserving the essence of traditional healing practices.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12">
            <Card className="border-border">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="font-heading text-2xl">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  To revolutionize Panchakarma practice management by providing intuitive, comprehensive software
                  solutions that enhance patient care, streamline operations, and preserve the authentic principles of
                  Ayurveda. We believe that technology should serve healing, not complicate it.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="font-heading text-2xl">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  To become the global standard for Ayurveda practice management, enabling practitioners worldwide to
                  deliver exceptional patient care while maintaining the sacred traditions of holistic healing. We
                  envision a world where ancient wisdom and modern efficiency work in perfect harmony.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* The Problem We Solve */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl text-foreground mb-4">The Challenge We Address</h2>
            <p className="text-muted-foreground text-lg">Understanding the unique needs of Panchakarma practitioners</p>
          </div>

          <div className="space-y-8">
            <div className="bg-card p-6 rounded-lg border border-border">
              <h3 className="font-heading font-semibold text-xl mb-4 text-foreground">Complex Scheduling Challenges</h3>
              <p className="text-muted-foreground leading-relaxed">
                Panchakarma treatments require precise timing, sequential therapies, and coordination between multiple
                practitioners. Traditional scheduling methods often lead to conflicts, delays, and suboptimal patient
                experiences.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg border border-border">
              <h3 className="font-heading font-semibold text-xl mb-4 text-foreground">Patient Progress Tracking</h3>
              <p className="text-muted-foreground leading-relaxed">
                Ayurvedic treatments are highly personalized and require continuous monitoring of patient responses,
                constitutional changes, and treatment effectiveness. Manual record-keeping makes it difficult to track
                long-term progress and adjust treatments accordingly.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg border border-border">
              <h3 className="font-heading font-semibold text-xl mb-4 text-foreground">Administrative Overhead</h3>
              <p className="text-muted-foreground leading-relaxed">
                Practitioners spend valuable time on administrative tasks instead of focusing on patient care. From
                appointment scheduling to billing and follow-ups, the administrative burden can overwhelm small to
                medium-sized practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl text-foreground mb-4">Our Core Values</h2>
            <p className="text-muted-foreground text-lg">The principles that guide everything we do</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-border text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="font-heading">Holistic Care</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We believe in treating the whole person, not just symptoms. Our software reflects the holistic
                  approach of Ayurveda.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="font-heading">Practitioner-Centric</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Every feature is designed with practitioners in mind, ensuring workflows that enhance rather than
                  hinder their practice.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="font-heading">Excellence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We strive for excellence in every aspect of our software, from user experience to data security and
                  reliability.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl text-foreground mb-4">Our Team</h2>
            <p className="text-muted-foreground text-lg">
              A passionate blend of Ayurveda experts and technology innovators
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card p-6 rounded-lg border border-border text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10 text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-xl mb-2">Ayurveda Practitioners</h3>
              <p className="text-muted-foreground">
                Our team includes certified Ayurveda practitioners with decades of experience in Panchakarma treatments,
                ensuring our software meets real-world needs.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg border border-border text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-10 h-10 text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-xl mb-2">Technology Experts</h3>
              <p className="text-muted-foreground">
                Our development team combines cutting-edge technology expertise with deep respect for traditional
                healing practices, creating solutions that honor both.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
