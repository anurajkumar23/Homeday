
"use client";

import { useState } from "react";
import { Search, MapPin, Calendar, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import ServiceShowcase from "./HomePage/HeroCard/ShowCase";
import StickyCategoriesBar from "./HomePage/ServicesCatergory/StickyCategoriesBar";
// MobileStickySearch was moved into Navbar compact mode
import MobileCategoriesGrid from "./HomePage/ServicesCatergory/MobileCategoriesGrid";
import MobileStickySearch from "./HomePage/MobileStickySearch";
import PopularSearches from "./HomePage/PopularSearches/PopularSearches";
import ServiceBanner from "@/components/layout/HomePage/Banner/ServiceBanner"
import servicesData from "@/data/services.json"

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = () => {
    console.log("Searching for:", searchQuery, "in", location);
  };

  const popularSearches = servicesData.categories
    .flatMap((c: any) => c.subCategories || [])
    .flatMap((sc: any) => sc.products || [])
    .filter((p: any) => p.popularSearch)
    .map((p: any) => p.name)
    .slice(0, 8);

  return (
    <>
      <StickyCategoriesBar />
      <div>
        <MobileCategoriesGrid />
      </div>
      <div className="md:hidden block bg-white pb-4">
        <ServiceBanner />
      </div>
      <section className="hidden md:block relative bg-gradient-to-br pb-4 from-slate-50 to-blue-50/50 dark:from-gray-900 dark:to-gray-800 md:py-20 overflow-hidden">
        {/* Background Blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#204099]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#204099]/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"></div>

        {/* Full-bleed mobile categories slider */}


        {/* <MobileStickySearch /> */}
        <div className="container mx-auto relative z-10">
          <div className="lg:grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="space-y-4 ">
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                  Find trusted
                  <span className="text-primary block">local services</span>
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-lg">
                  Connect with skilled professionals for all your home service needs.
                  Book instantly, get it done right.
                </p>
              </div>

              {/* Search Form */}
              <Card className="p-8 shadow-2xl shadow-blue-900/5 dark:shadow-none rounded-[2rem] hidden md:block border border-gray-200/50 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl mt-8">
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                      <Input
                        type="text"
                        placeholder="What service do you need?"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 h-12"
                      />
                    </div>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                      <Input
                        type="text"
                        placeholder="Enter your location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="pl-10 h-12"
                      />
                    </div>
                  </div>
                  <Button
                    onClick={handleSearch}
                    className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-[#204099] to-[#173172] hover:from-[#183a8a] hover:to-[#122a64] text-white rounded-xl shadow-lg shadow-[#204099]/20 transition-all duration-300 hover:shadow-[#204099]/40 hover:-translate-y-0.5"
                    size="lg"
                  >
                    Find Services
                  </Button>
                </div>
              </Card>

              {/* Mobile categories grid moved above container for full-bleed */}

              {/* Popular Searches */}
              <PopularSearches
                items={popularSearches}
                onSelect={(val) => setSearchQuery(val)}
              />

              {/* Stats */}
              <div className="md:grid grid-cols-3 gap-6 pl-4 pr-4 pt-8 hidden">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">50K+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Service Providers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">1M+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">4.8★</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Average Rating</div>
                </div>
              </div>
            </div>
            <ServiceShowcase />
          </div>
        </div>
      </section>
    </>
  );
}
