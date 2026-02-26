"use client";

import { motion } from "motion/react";
import ServiceShowcase from "./HomePage/HeroCard/ShowCase";
import StickyCategoriesBar from "./HomePage/ServicesCatergory/StickyCategoriesBar";
import MobileCategoriesGrid from "./HomePage/ServicesCatergory/MobileCategoriesGrid";
import PopularSearches from "./HomePage/PopularSearches/PopularSearches";
import ServiceBanner from "@/components/layout/HomePage/Banner/ServiceBanner";
import servicesData from "@/data/services.json";
import { Shield, Star, Clock, Users } from "lucide-react";

export function HeroSection() {
  const popularSearches = servicesData.categories
    .flatMap((c: any) => c.subCategories || [])
    .flatMap((sc: any) => sc.products || [])
    .filter((p: any) => p.popularSearch)
    .map((p: any) => p.name)
    .slice(0, 8);

  return (
    <>
      <StickyCategoriesBar />

      {/* Mobile categories + banner */}
      <div className="md:hidden">
        <MobileCategoriesGrid />
      </div>
      <div className="md:hidden block bg-white dark:bg-gray-950 pb-4">
        <ServiceBanner />
      </div>

      {/* ═══ Desktop Hero Section ═══ */}
      <section className="hidden md:block relative bg-gradient-to-br from-slate-50 to-blue-50/50 dark:from-gray-950 dark:to-gray-900 pt-12 pb-20 overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#204099]/5 dark:bg-blue-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#204099]/5 dark:bg-purple-600/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />

        <div className="container mx-auto relative z-10 px-4 md:px-8">
          <div className="lg:grid lg:grid-cols-2 gap-16 items-center">
            {/* ── Left content ── */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-[3.5rem] font-extrabold text-gray-900 dark:text-white leading-[1.1] tracking-tight">
                  Home Services,{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#204099] to-blue-500">
                    Made Easy
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-lg font-medium leading-relaxed">
                  Book verified professionals for cleaning, cooking, repairs & more. Starting from just ₹49.
                </p>
              </div>

              {/* Popular Searches */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <PopularSearches
                  items={popularSearches}
                  onSelect={() => { }}
                />
              </motion.div>

              {/* Trust Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="grid grid-cols-4 gap-5 pt-6 border-t border-gray-200/60 dark:border-gray-800"
              >
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center h-9 w-9 rounded-xl bg-blue-50 dark:bg-blue-900/30">
                    <Users className="h-4 w-4 text-[#204099] dark:text-blue-400" />
                  </div>
                  <div>
                    <div className="text-lg font-black text-gray-900 dark:text-white leading-none">50K+</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Verified Pros</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center h-9 w-9 rounded-xl bg-green-50 dark:bg-green-900/30">
                    <Shield className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <div className="text-lg font-black text-gray-900 dark:text-white leading-none">1M+</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Customers</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center h-9 w-9 rounded-xl bg-yellow-50 dark:bg-yellow-900/30">
                    <Star className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <div>
                    <div className="text-lg font-black text-gray-900 dark:text-white leading-none">4.8★</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Rating</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center h-9 w-9 rounded-xl bg-purple-50 dark:bg-purple-900/30">
                    <Clock className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <div className="text-lg font-black text-gray-900 dark:text-white leading-none">90min</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Arrival</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* ── Right - Service showcase grid ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="hidden lg:block relative"
            >
              <ServiceShowcase />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
