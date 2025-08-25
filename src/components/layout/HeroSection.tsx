
"use client";

import { useState } from "react";
import { Search, MapPin, Calendar, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import ServiceShowcase from "./HomePage/HeroCard/ShowCase";

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = () => {
    console.log("Searching for:", searchQuery, "in", location);
  };

  const popularSearches = [
    "House Cleaning",
    "Plumbing",
    "Electrical Work",
    "Painting",
    "Appliance Repair"
  ];

  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-16">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
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
            <Card className="p-6 shadow-lg">
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
                  className="w-full h-12 text-lg font-semibold"
                  size="lg"
                >
                  Find Services
                </Button>
              </div>
            </Card>

            {/* Popular Searches */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Popular searches:
              </p>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((search, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="rounded-full"
                    onClick={() => setSearchQuery(search)}
                  >
                    {search}
                  </Button>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
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

          {/* Right Content - Hero Image */}
          {/* <div className="relative hidden md:block ">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop"
                alt="Professional service provider"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            
            
            <Card className="absolute -bottom-6 -left-6 p-4 shadow-lg bg-white dark:bg-gray-800">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <div className="font-semibold">Same Day Service</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Available 24/7</div>
                </div>
              </div>
            </Card>
            
            <Card className="absolute -top-6 -right-6 p-4 shadow-lg bg-white dark:bg-gray-800">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">4.8★</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Trusted Reviews</div>
              </div>
            </Card>
          </div> */}
<ServiceShowcase/>
        </div>
      </div>
    </section>
  );
}
