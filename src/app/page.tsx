import { Header } from "@/components/layout/header"

// import { ServicesSection } from "@/components/services-section"
// import { FeaturesSection } from "@/components/features-section"
// import { TestimonialsSection } from "@/components/testimonials-section"
import { Footer } from "@/components/layout/footer"

import Navbar from "@/components/layout/Navbar"
import { HeroSection } from "@/components/layout/HeroSection"
import ServiceCategories from "@/components/layout/HomePage/ServicesCatergory/ServicesCatergory"
import { PopularServices } from "@/components/layout/HomePage/PopularServices/PopularServices"
import { HowItWorks } from "@/components/layout/HomePage/HowItWorks/page"

import TrendingServices from "@/components/layout/HomePage/Premium/TrendingServices"
import TrustAndGuarantees from "@/components/layout/HomePage/Premium/TrustAndGuarantees"
import DualMarqueeTestimonials from "@/components/layout/HomePage/Premium/DualMarqueeTestimonials"

export default function HomePage() {
  return (
    <div className="min-h-screen ">
      <Navbar />
      <main >
        <HeroSection />

        <ServiceCategories />
        <TrendingServices />
        <PopularServices />
        <HowItWorks />
        <TrustAndGuarantees />
        <DualMarqueeTestimonials />
      </main>
      <Footer />
    </div>
  )
}


