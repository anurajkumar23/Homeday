"use client";

import Image from "next/image";
import { Star, Clock, Shield, Sparkles, ArrowRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import servicesData from "@/data/services.json";

export function PopularServices() {
  const popularProducts = (servicesData.categories || [])
    .flatMap((c: any) =>
      (c.subCategories || []).flatMap((sc: any) =>
        (sc.products || []).map((p: any) => ({
          ...p,
          category: c.name
        }))
      )
    )
    .filter((p: any) => p.popular)
    .slice(0, 8);

  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-white to-[#204099]/5 dark:from-gray-900 dark:to-gray-800">
      <div className="md:container md:mx-auto  md:px-6 max-w-7xl">
        {/* Header */}
        <div className="md:text-center mb-2 md:mb-16">
          <div className="inline-flex ml-4 md:ml-0 items-center  justify-center px-4 py-2 rounded-full bg-[#204099]/10 text-[#204099] dark:bg-[#204099]/30 dark:text-white text-sm font-medium mb-4">
            <Sparkles className="h-4 w-4 mr-2 " />
            Most Booked Services
          </div>
          <h2 className="hidden md:block text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-gray-900 dark:text-white">
            Our Most Popular Services
          </h2>
          <p className="hidden md:block text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover the services our customers trust most. Each service is delivered by
            verified professionals with exceptional ratings and quick response times.
          </p>
        </div>

        {/* Services Container */}
        <div className="relative">
          {/* Mobile: Horizontal Scroll */}
          <div className="md:hidden overflow-x-auto scrollbar-hide">
            <div
              className="flex gap-4  pb-4  pl-4 pr-4"
              style={{
                scrollSnapType: 'x mandatory',
                WebkitOverflowScrolling: 'touch'
              }}
            >
              {popularProducts.map((service: any) => (
                <ServiceCard key={service.id} service={service} isMobile={true} />
              ))}
            </div>
          </div>

          {/* Desktop: Grid Layout */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {popularProducts.map((service: any) => (
              <ServiceCard key={service.id} service={service} isMobile={false} />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12 md:mt-16">
          <div className="bg-gradient-to-r from-[#204099]/5 to-[#204099]/10 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 md:p-12 max-w-4xl mx-auto">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Can't find what you're looking for?
            </h3>
            <p className="text-muted-foreground text-base md:text-lg mb-6 max-w-2xl mx-auto leading-relaxed">
              We offer 100+ services to meet all your home needs. Our team will help you find the perfect professional.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="outline"
                className="min-w-[180px] border-2 border-[#204099] text-[#204099] hover:bg-[#204099]/5 transition-all duration-300"
              >
                Browse All Services
              </Button>
              <Button
                size="lg"
                className="min-w-[180px] bg-[#204099] hover:bg-[#204099]/90 text-white transition-all duration-300"
              >
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}

// Simple ServiceCard Component
function ServiceCard({ service, isMobile }: { service: any; isMobile: boolean }) {
  return (
    <Card
      className={`group relative border-0 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white dark:bg-gray-800 rounded-2xl ${
        isMobile 
          ? 'flex-shrink-0 w-[280px]' 
          : 'w-full'
      }`}
      style={{ scrollSnapAlign: isMobile ? 'start' : undefined }}
    >
      {/* Discount Badge */}
      {service.discount && (
        <div className="absolute top-3 left-3 z-10">
          <Badge className="bg-red-500 text-white border-0 px-2 py-1 text-xs font-semibold rounded-lg shadow-sm">
            {service.discount}
          </Badge>
        </div>
      )}

      {/* Wishlist Button */}
      <button className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 hover:bg-white shadow-sm transition-all duration-200">
        <Heart className="h-4 w-4 text-gray-600 hover:text-red-500 transition-colors" />
      </button>

      {/* Service Image */}
      <div className="relative">
        <div className="relative h-48 rounded-t-2xl overflow-hidden">
          <Image
            src={service.image || "/placeholder-service.jpg"}
            alt={service.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes={isMobile ? "280px" : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
          
          {/* Category Badge - Always visible */}
          <div className="absolute bottom-3 left-3">
            <Badge className="border border-[#204099] text-[#204099] bg-white/90 backdrop-blur-sm text-xs font-medium">
              {service.category}
            </Badge>
          </div>
        </div>
      </div>

      <CardContent className="p-4">
        {/* Service Title */}
        <h3 className="text-base font-semibold text-gray-900 dark:text-white line-clamp-2 leading-tight mb-3">
          {service.name}
        </h3>

        {/* Price */}
        <div className="mb-3">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              {service.price}
            </span>
            {service.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                {service.originalPrice}
              </span>
            )}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            starting from
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-4">
          <div className="flex items-center bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-md">
            <Star className="h-3 w-3 fill-green-500 text-green-500" />
            <span className="font-semibold text-gray-900 dark:text-white ml-1 text-sm">
              {service.rating}
            </span>
          </div>
          <span className="text-gray-500 text-xs">
            ({service.reviews?.toLocaleString() || '0'})
          </span>
        </div>

        {/* Features */}
        <div className="flex items-center justify-between text-xs mb-4">
          <div className="flex items-center text-green-600 dark:text-green-400">
            <Clock className="h-3 w-3 mr-1" />
            <span className="font-medium">Same Day</span>
          </div>
          <div className="flex items-center text-blue-600 dark:text-blue-400">
            <Shield className="h-3 w-3 mr-1" />
            <span className="font-medium">Verified</span>
          </div>
        </div>

        {/* Book Button */}
        <Button
          className="w-full bg-[#204099] hover:bg-[#204099]/90 text-white font-semibold py-2.5 transition-all duration-300 rounded-xl text-sm"
          size="sm"
        >
          Book Now
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </CardContent>
    </Card>
  );
}
