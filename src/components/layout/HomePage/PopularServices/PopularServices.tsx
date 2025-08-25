"use client";

import Image from "next/image";
import { Star, Clock, Shield, Check, Sparkles, ArrowRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import servicesData from "@/data/services.json";

export function PopularServices() {
  const popularProducts = (servicesData.categories || [])
    .flatMap((c: any) => (c.subCategories || []).flatMap((sc: any) => (sc.products || []).map((p: any) => ({ ...p, category: c.name }))))
    .filter((p: any) => p.popular)
    .slice(0, 8);

  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50/30 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 text-sm font-medium mb-4">
            <Sparkles className="h-4 w-4 mr-2" />
            Most Booked Services
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Our Most Popular Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover the services our customers trust most. Each service is delivered by 
            verified professionals with exceptional ratings and quick response times.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {popularProducts.map((service: any) => (
            <Card 
              key={service.id} 
              className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white dark:bg-gray-800"
            >
              {/* Wishlist button */}
              <button className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 hover:bg-white shadow-md transition-colors">
                <Heart className="h-4 w-4 text-gray-600 hover:text-red-500" />
              </button>
              
              {/* Premium badge for popular items */}
              {service.featured && (
                <div className="absolute top-4 left-4 z-10">
                  <Badge className="bg-gradient-to-r from-amber-500 to-amber-600 text-white border-0 px-3 py-1 text-xs">
                    Premium
                  </Badge>
                </div>
              )}
              
              <div className="relative">
                <div className="relative h-52 rounded-t-lg overflow-hidden">
                  <Image
                    src={service.image || "/placeholder-service.jpg"}
                    alt={service.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <Badge className="absolute top-3 left-3 bg-white/90 text-black hover:bg-white">
                    {service.category}
                  </Badge>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                </div>
              </div>
              
              <CardContent className="p-5">
                {/* Category badge */}
                {/* <div className="mb-3">
                  <Badge variant="outline" className="text-xs font-medium">
                    {service.category}
                  </Badge>
                </div> */}
               
                
                {/* Service title */}
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2 leading-tight mb-3">
                  {service.name}
                </h3>
                
                {/* Rating and price */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1">
                    <div className="flex items-center bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-md">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-gray-900 dark:text-white ml-1 text-sm">
                        {service.rating}
                      </span>
                    </div>
                    <span className="text-muted-foreground text-xs">
                      ({service.reviews.toLocaleString()})
                    </span>
                  </div>
                  
                  <div className="text-right">
                    <div className="font-bold text-xl text-gray-900 dark:text-white">
                      {service.price}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      starting from
                    </div>
                  </div>
                </div>

                {/* Service features */}
                <div className="flex items-center justify-between text-sm mb-4">
                  <div className="flex items-center text-green-600 dark:text-green-400">
                    <Clock className="h-4 w-4 mr-1" />
                    <span className="font-medium">Same Day</span>
                  </div>
                  <div className="flex items-center text-blue-600 dark:text-blue-400">
                    <Shield className="h-4 w-4 mr-1" />
                    <span className="font-medium">Insured</span>
                  </div>
                </div>

                {/* Service highlights */}
                {service.highlights && service.highlights.length > 0 && (
                  <div className="space-y-2 mb-4">
                    {service.highlights.slice(0, 2).map((highlight: string, index: number) => (
                      <div key={index} className="flex items-center text-sm text-muted-foreground">
                        <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        <span className="line-clamp-1">{highlight}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Book button */}
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 transition-all duration-300 group-hover:shadow-lg"
                  size="lg"
                >
                  Book Now
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Can't find what you're looking for?
            </h3>
            <p className="text-muted-foreground text-lg mb-6 max-w-2xl mx-auto">
              We offer 100+ services to meet all your home needs. Our team will help you find the perfect professional.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="outline" 
                className="min-w-[200px] border-2 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Browse All Services
              </Button>
              <Button 
                size="lg" 
                className="min-w-[200px] bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
              >
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}