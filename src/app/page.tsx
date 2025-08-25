import { Header } from "@/components/layout/header"

// import { ServicesSection } from "@/components/services-section"
// import { FeaturesSection } from "@/components/features-section"
// import { TestimonialsSection } from "@/components/testimonials-section"
import { Footer } from "@/components/layout/footer"
import HeroSection from "@/components/layout/hero-section"
import { Navbar } from "@/components/layout/Navbar"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        {/* <ServiceCategories />
        <PopularServices />
        <HowItWorks />
        <Testimonials /> */}
      </main>
      <Footer />
    </div>
  )
}


