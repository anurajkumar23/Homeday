"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, Clock, Shield, Sparkles, Heart, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import servicesData from "@/data/services.json";
import { ServiceDrawer } from "@/components/shared/ServiceDrawer";

export function PopularServices() {
  const popularProducts = (servicesData.categories || [])
    .flatMap((c: any) =>
      (c.subCategories || []).flatMap((sc: any) =>
        (sc.products || []).map((p: any) => ({
          ...p,
          category: c.name,
          categoryId: c.id
        }))
      )
    )
    .filter((p: any) => p.popular)
    .slice(0, 8);

  return (
    <section className=" md:py-20 bg-gradient-to-b from-white to-[#204099]/5 dark:from-gray-900 dark:to-gray-800">
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
              className="flex gap-4 pb-4 pl-4 after:content-[''] after:pr-2"
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
                className="min-w-[180px] border-2 border-[#204099] dark:border-blue-400 text-[#204099] dark:text-blue-400 hover:bg-[#204099]/5 dark:hover:bg-blue-900/30 transition-all duration-300"
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

// Zepto/Zomato style minimalistic ServiceCard Component
function ServiceCard({ service, isMobile }: { service: any; isMobile: boolean }) {
  return (
    <Link href={`/category/${service.categoryId || 1}`} className="block h-full">
      <div className={`${isMobile ? 'flex-shrink-0 w-[280px]' : 'w-full'} cursor-pointer h-full`} style={{ scrollSnapAlign: isMobile ? 'start' : undefined }}>
        <Card
          className="group relative border border-gray-100 dark:border-gray-700/40 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white dark:bg-gray-800/80 rounded-[1.5rem] overflow-visible h-full flex flex-col"
        >
          {/* Wishlist Button - Minimal */}
          <button className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/40 dark:bg-black/40 backdrop-blur-md hover:bg-white dark:hover:bg-gray-800 shadow-sm transition-all duration-300 opacity-0 group-hover:opacity-100">
            <Heart className="h-4 w-4 text-gray-700 dark:text-gray-200 hover:text-red-500 transition-colors" />
          </button>

          {/* Service Image (Takes up top half) */}
          <div className="relative h-[200px] w-full p-2">
            <div className="relative h-full w-full rounded-[1.25rem] overflow-hidden">
              <Image
                src={service.image || "/placeholder-service.jpg"}
                alt={service.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes={isMobile ? "280px" : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"}
              />
              {/* Soft gradient overlay for text readability if badges are used */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

              {/* Discount Badge - Top Left */}
              {service.discount && (
                <div className="absolute top-3 left-3">
                  <Badge className="bg-blue-600/95 hover:bg-blue-600 text-white border-0 px-2.5 py-1 text-[10px] uppercase font-bold tracking-wider rounded-lg shadow-md backdrop-blur-md">
                    {service.discount}
                  </Badge>
                </div>
              )}

              {/* Category Pill - Bottom Left over image */}
              <div className="absolute bottom-3 left-3">
                <span className="bg-white/95 dark:bg-gray-900/95 text-gray-800 dark:text-gray-200 text-[10px] font-bold px-2.5 py-1 rounded-md shadow-sm backdrop-blur-md uppercase tracking-wider">
                  {service.category}
                </span>
              </div>
            </div>
          </div>

          <CardContent className="p-5 pt-3 flex-1 flex flex-col justify-between">
            <div>
              {/* Title & Rating Row */}
              <div className="flex justify-between items-start gap-2 mb-1">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2 leading-tight">
                  {service.name}
                </h3>
              </div>

              {/* Rating - Minimal styling */}
              <div className="flex items-center gap-1.5 mb-3">
                <div className="flex items-center">
                  <Star className="h-3.5 w-3.5 fill-[#f5a623] text-[#f5a623]" />
                  <span className="font-bold text-gray-700 dark:text-gray-300 ml-1 text-sm">
                    {service.rating}
                  </span>
                </div>
                <span className="text-gray-400 dark:text-gray-500 text-xs font-medium">
                  ({service.reviews?.toLocaleString() || '1.2k'})
                </span>
              </div>

              {/* Micro details (Time/Verified) */}
              <div className="flex items-center gap-3 text-[11px] font-semibold text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-wide">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>60 Min</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                <div className="flex items-center gap-1 text-green-600 dark:text-green-500">
                  <Shield className="h-3 w-3" />
                  <span>Verified</span>
                </div>
              </div>
            </div>

            {/* Pricing & Add Button Row */}
            <div className="flex items-center justify-between mt-auto">
              <div>
                <div className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-0.5">Starts at</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-black text-gray-900 dark:text-white tracking-tight">
                    {service.price}
                  </span>
                  {service.originalPrice && (
                    <span className="text-sm text-gray-400 line-through font-medium">
                      {service.originalPrice}
                    </span>
                  )}
                </div>
              </div>

              {/* Zepto Style 'Add' Button */}
              <div className="relative group/btn">
                <button
                  className="bg-blue-50 dark:bg-blue-900/30 text-[#204099] dark:text-blue-400 hover:bg-[#204099] dark:hover:bg-blue-600 hover:text-white font-bold py-2 px-5 rounded-xl transition-all duration-300 flex items-center gap-1 shadow-sm border border-blue-100 dark:border-blue-800/50"
                  onClick={(e) => {
                    e.preventDefault(); // Prevent link navigation if just adding to cart
                    console.log("Added to cart", service.id);
                  }}
                >
                  <span>ADD</span>
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Link>
  );
}
