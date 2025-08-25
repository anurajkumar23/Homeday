
"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, ArrowRight, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import servicesData from "@/data/services.json";

export function ServiceCategories() {
  const [selectedCategory, setSelectedCategory] = useState(servicesData.categories[0]);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Popular Service Categories
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose from hundreds of services across different categories. 
            All professionals are verified and rated by customers.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Categories List - Left Side */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-lg font-semibold mb-4">Service Categories</h3>
            {servicesData.categories.map((category) => (
              <Card
                key={category.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                  selectedCategory.id === category.id
                    ? "ring-2 ring-primary bg-primary/5"
                    : "hover:bg-muted/50"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{category.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {category.description}
                      </p>
                      <div className="flex items-center mt-1">
                        <Users className="h-4 w-4 text-muted-foreground mr-1" />
                        <span className="text-sm text-muted-foreground">
                          {category.services.length} services
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Selected Category Details - Right Side */}
          <div className="lg:col-span-8">
            <div className="space-y-6">
              {/* Category Header */}
              <div className="flex items-center space-x-6">
                <div className="relative w-24 h-24 rounded-xl overflow-hidden">
                  <Image
                    src={selectedCategory.image}
                    alt={selectedCategory.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{selectedCategory.name}</h3>
                  <p className="text-muted-foreground text-lg">
                    {selectedCategory.description}
                  </p>
                  <Badge variant="secondary" className="mt-2">
                    {selectedCategory.services.length} Available Services
                  </Badge>
                </div>
              </div>

              {/* Services Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {selectedCategory.services.map((service) => (
                  <Card key={service.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{service.name}</CardTitle>
                        <Badge variant="outline" className="text-primary font-semibold">
                          {service.price}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="ml-1 font-medium">{service.rating}</span>
                          </div>
                          <span className="text-muted-foreground">
                            ({service.reviews} reviews)
                          </span>
                        </div>
                        <Button size="sm">
                          Book Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* View All Button */}
              <div className="text-center pt-6">
                <Button variant="outline" size="lg" className="min-w-[200px]">
                  View All {selectedCategory.name} Services
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
