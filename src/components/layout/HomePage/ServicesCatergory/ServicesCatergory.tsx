
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Star, ArrowRight, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import servicesData from "@/data/services.json";

export function ServiceCategories() {
  const [selectedCategory, setSelectedCategory] = useState(servicesData.categories[0]);
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState(
    servicesData.categories[0]?.subCategories?.[0]?.id
  );
  const sectionRef = useRef<HTMLElement>(null);
  const [animateKey, setAnimateKey] = useState(0);

  useEffect(() => {
    const onSelect = (e: Event) => {
      const custom = e as CustomEvent<{ id: number }>;
      const match = servicesData.categories.find((c) => c.id === custom.detail.id);
      if (match) {
        setSelectedCategory(match);
        setSelectedSubCategoryId(match.subCategories?.[0]?.id);
        setAnimateKey((k) => k + 1);
        // Ensure in-view smooth scroll if not already
        sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    window.addEventListener("selectCategory", onSelect as EventListener);
    return () => window.removeEventListener("selectCategory", onSelect as EventListener);
  }, []);

  return (
    <section id="service-categories" ref={sectionRef} className="py-20 bg-background">
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
                      <p className="text-sm text-muted-foreground">{category.description}</p>
                      <div className="flex items-center mt-1">
                        <Users className="h-4 w-4 text-muted-foreground mr-1" />
                        <span className="text-sm text-muted-foreground">
                          {(category.subCategories || []).reduce(
                            (sum: number, sc: any) => sum + ((sc.products || []).length),
                            0
                          )} products
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
            <div key={animateKey} className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
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
                    {(selectedCategory.subCategories || []).reduce(
                      (sum: number, sc: any) => sum + ((sc.products || []).length),
                      0
                    )} Available Products
                  </Badge>
                </div>
              </div>

              {/* Subcategory Tabs */}
              <div className="flex gap-2 flex-wrap">
                {(selectedCategory.subCategories || []).map((sub: any) => (
                  <button
                    key={sub.id}
                    onClick={() => setSelectedSubCategoryId(sub.id)}
                    className={`px-3 py-1 rounded-full text-sm border transition ${
                      selectedSubCategoryId === sub.id
                        ? "bg-primary text-white border-primary"
                        : "bg-transparent text-foreground hover:bg-muted border-border"
                    }`}
                  >
                    {sub.name}
                  </button>
                ))}
              </div>

              {/* Products Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {(selectedCategory.subCategories || [])
                  .find((s: any) => s.id === selectedSubCategoryId)?.products
                  ?.map((product: any) => (
                    <Card key={product.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{product.name}</CardTitle>
                          <Badge variant="outline" className="text-primary font-semibold">
                            {product.price}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="ml-1 font-medium">{product.rating}</span>
                            </div>
                            <span className="text-muted-foreground">
                              ({product.reviews} reviews)
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
