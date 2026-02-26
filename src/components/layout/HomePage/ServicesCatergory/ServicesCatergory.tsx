"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ArrowRight, Users, Clock, Shield } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import servicesData from "@/data/services.json";
import { ServiceDrawer } from "@/components/shared/ServiceDrawer";

export default function ServiceCategories() {
  const [category, setCategory] = useState(servicesData.categories[0]);
  const [subId, setSubId] = useState(category.subCategories?.[0]?.id);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const animateKey = `${category.id}-${subId}`;
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onSelect = (e: Event) => {
      const id = (e as CustomEvent<{ id: number }>).detail.id;
      const next = servicesData.categories.find(c => c.id === id);
      if (!next) return;

      setCategory(next);
      setSubId(next.subCategories?.[0]?.id);
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      if (window.matchMedia("(max-width: 767px)").matches) setDrawerOpen(true);
    };
    window.addEventListener("selectCategory", onSelect as EventListener);
    return () => window.removeEventListener("selectCategory", onSelect as EventListener);
  }, []);

  const currentSub = category.subCategories?.find(s => s.id === subId);

  /* ───────── Touch Gesture Logic for Mobile Drawer ───────── */
  const drawerScrollRef = useRef<HTMLDivElement>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [touchCurrentY, setTouchCurrentY] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (drawerScrollRef.current && drawerScrollRef.current.scrollTop === 0) {
      setTouchStartY(e.touches[0].clientY);
      setIsDragging(true);
    }
  };

  // Lock body scroll and intercept Hardware Back Button
  useEffect(() => {
    const handlePopState = () => {
      if (drawerOpen && window.location.hash !== '#category') {
        setDrawerOpen(false);
      }
    };

    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
      window.history.pushState(null, '', window.location.pathname + window.location.search + '#category');
      window.addEventListener('popstate', handlePopState);
    } else {
      document.body.style.overflow = '';
      if (window.location.hash === '#category') {
        window.history.back();
      }
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('popstate', handlePopState);
    };
  }, [drawerOpen]);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || touchStartY === null) return;
    const currentY = e.touches[0].clientY;
    const deltaY = currentY - touchStartY;
    if (deltaY > 0) {
      e.preventDefault();
      setTouchCurrentY(currentY);
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging || touchStartY === null || touchCurrentY === null) {
      setIsDragging(false);
      setTouchStartY(null);
      setTouchCurrentY(null);
      return;
    }
    const deltaY = touchCurrentY - touchStartY;
    if (deltaY > 100) {
      setDrawerOpen(false);
    }
    setTouchCurrentY(null);
    setTouchStartY(null);
    setIsDragging(false);
  };

  const translateY = isDragging && touchStartY !== null && touchCurrentY !== null
    ? Math.max(0, touchCurrentY - touchStartY)
    : 0;

  /* ───────── Reusable Details Panel ───────── */
  const Details = (
    <div key={animateKey} className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      {/* Category Header */}
      <div className="flex items-center gap-5">
        <div className="relative h-20 w-20 overflow-hidden rounded-2xl shadow-md flex-shrink-0">
          <Image src={category.image} alt={category.name} fill className="object-cover" unoptimized />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{category.name}</h3>
          <p className="text-base text-gray-500 dark:text-gray-400">{category.description}</p>
          <Badge variant="secondary" className="mt-2 dark:bg-gray-700 dark:text-gray-300">
            {category.subCategories?.reduce(
              (sum, s) => sum + (s.products?.length ?? 0),
              0
            )}{" "}
            Services Available
          </Badge>
        </div>
      </div>

      {/* Sub-Category Selection Chips */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Choose a service</h4>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {category.subCategories?.map(sub => {
            const isSelected = subId === sub.id;
            return (
              <button
                key={sub.id}
                onClick={() => setSubId(sub.id)}
                className={`group flex flex-col items-center p-3 rounded-2xl transition-all duration-300
                  ${isSelected
                    ? 'bg-primary/10 dark:bg-primary/20 ring-1 ring-primary/30'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
              >
                <div className={`relative h-14 w-14 overflow-hidden rounded-full mb-2 transition-transform duration-300
                  ${isSelected ? 'scale-110 shadow-md' : 'group-hover:scale-105'}`}>
                  <Image src={sub.image} alt={sub.name} fill className="object-cover scale-[1.2]" unoptimized />
                </div>
                <span className={`text-xs font-semibold text-center leading-tight transition-colors
                  ${isSelected ? 'text-primary dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}`}>
                  {sub.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Product Cards — Redesigned with images & Link routing */}
      <div className="grid gap-4 md:grid-cols-2">
        {currentSub?.products?.map(p => (
          <ServiceDrawer product={p} categoryName={category.name} key={p.id}>
            <div className="block group cursor-pointer">
              <Card className="overflow-hidden transition-all duration-300 border border-gray-100 dark:border-gray-700/50 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5 bg-white dark:bg-gray-800/60">
                <CardContent className="p-0">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="relative w-28 h-28 flex-shrink-0 overflow-hidden">
                      <Image
                        src={p.image || currentSub.image || category.image}
                        alt={p.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        unoptimized
                      />
                      {/* Discount badge */}
                      {(p as any).discount && (
                        <div className="absolute top-2 left-2">
                          <Badge className="bg-green-500 hover:bg-green-500 text-white border-0 text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm">
                            {(p as any).discount}
                          </Badge>
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 py-3 pr-4">
                      <h5 className="font-bold text-sm text-gray-900 dark:text-white mb-1 group-hover:text-primary transition-colors line-clamp-1">{p.name}</h5>

                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-2">
                        <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold text-sm text-gray-700 dark:text-gray-300">{p.rating}</span>
                        <span className="text-xs text-gray-400">({p.reviews?.toLocaleString()} reviews)</span>
                      </div>

                      {/* Micro details */}
                      <div className="flex items-center gap-3 text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{(p as any).duration || "60 min"}</span>
                        </div>
                        {(p as any).slot && (
                          <div className="flex items-center gap-1 relative overflow-hidden max-w-[80px]">
                            <span className="truncate">{(p as any).slot}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1 text-green-600 dark:text-green-500 ml-auto">
                          <Shield className="h-3 w-3" />
                          <span>Verified</span>
                        </div>
                      </div>

                      {/* Price + CTA */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-base font-black text-gray-900 dark:text-white">{p.price}</span>
                          {p.originalPrice && (
                            <span className="text-xs text-gray-400 line-through">{p.originalPrice}</span>
                          )}
                        </div>
                        <span className="bg-primary/10 dark:bg-primary/20 text-primary dark:text-blue-400 text-xs font-bold px-3 py-1.5 rounded-lg group-hover:bg-primary group-hover:text-white transition-all duration-300">
                          Book →
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </ServiceDrawer>
        ))}
      </div>

      {/* View All */}
      <div className="pt-4 text-center hidden md:block">
        <Link href={`/category/${category.id}`}>
          <Button variant="outline" size="lg" className="min-w-[200px] border-[#204099]/20 text-[#204099] hover:bg-[#204099]/5 dark:border-blue-400/30 dark:text-blue-400 dark:hover:bg-blue-900/10">
            View All {category.name} Services
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );

  return (
    <>
      <section id="service-categories" ref={sectionRef} className="bg-background py-20 hidden md:block">
        <div className="container mx-auto px-4">
          {/* Heading */}
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold lg:text-4xl text-gray-900 dark:text-white">Popular Service Categories</h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-500 dark:text-gray-400">
              Choose from hundreds of services across different categories. All professionals are verified and rated by customers.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-12">
            {/* Left Sidebar */}
            <div className="space-y-2 lg:col-span-4">
              <h3 className="mb-4 text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Service Categories</h3>

              {servicesData.categories.map(c => {
                const total = c.subCategories?.reduce(
                  (sum, sc) => sum + (sc.products?.length ?? 0),
                  0
                );
                const isActive = c.id === category.id;

                return (
                  <div
                    key={c.id}
                    onClick={() => {
                      setCategory(c);
                      setSubId(c.subCategories?.[0]?.id);
                      if (window.matchMedia("(max-width: 767px)").matches) setDrawerOpen(true);
                    }}
                    className={`cursor-pointer group flex items-center gap-4 p-3 rounded-xl transition-all duration-200
                      ${isActive
                        ? "bg-primary/8 dark:bg-primary/15 border-l-[3px] border-primary"
                        : "hover:bg-gray-50 dark:hover:bg-gray-800/60 border-l-[3px] border-transparent"
                      }`}
                  >
                    <div className={`relative h-12 w-12 overflow-hidden rounded-xl flex-shrink-0 transition-transform duration-200 ${isActive ? 'scale-105' : 'group-hover:scale-105'}`}>
                      <Image src={c.image} alt={c.name} fill className="object-cover scale-[1.2]" unoptimized />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className={`font-semibold text-sm truncate transition-colors ${isActive ? 'text-primary dark:text-blue-400' : 'text-gray-800 dark:text-gray-200'}`}>{c.name}</h4>
                      <p className="text-xs text-gray-400 dark:text-gray-500 truncate">{c.description}</p>
                      <div className="mt-0.5 flex items-center gap-1">
                        <Users className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-400">{total} services</span>
                      </div>
                    </div>
                    <ArrowRight className={`h-4 w-4 flex-shrink-0 transition-all duration-200 ${isActive ? 'text-primary translate-x-1' : 'text-gray-300 dark:text-gray-600 group-hover:text-gray-500'}`} />
                  </div>
                );
              })}
            </div>

            {/* Desktop Details Panel */}
            <div className="hidden md:block lg:col-span-8">{Details}</div>
          </div>
        </div>
      </section>

      {/* Mobile Category Drawer — Custom Swipeable Sheet */}
      {drawerOpen && (
        <div className="md:hidden fixed inset-0 z-[150] touch-none">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setDrawerOpen((o) => !o)}
            style={{ opacity: isDragging ? Math.max(0, 1 - translateY / 300) : 1 }}
          />

          {/* Drawer Panel */}
          <div
            className={`absolute bottom-0 left-0 right-0 h-[85vh] bg-white dark:bg-gray-950 rounded-t-3xl shadow-2xl flex flex-col ${!isDragging ? 'animate-in slide-in-from-bottom duration-300' : ''}`}
            style={{
              transform: `translateY(${translateY}px)`,
              transition: isDragging ? 'none' : 'transform 0.3s ease-out'
            }}
          >
            {/* Handle area to swipe */}
            <div
              className="w-full pt-4 pb-2 flex-shrink-0 bg-white dark:bg-gray-950 rounded-t-3xl shadow-sm z-10 touch-none flex flex-col items-center relative"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-700 rounded-full mb-4 absolute top-4" />
              <div className="w-full flex justify-between items-center mt-2 px-4">
                <h2 className="text-xl font-bold dark:text-white truncate pr-8">{category.name}</h2>
              </div>

              <button
                onClick={() => setDrawerOpen(false)}
                className="absolute right-4 top-4 p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 transition-colors"
                aria-label="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
              </button>
            </div>

            {/* Scrollable Content */}
            <div
              ref={drawerScrollRef}
              className="flex-1 overflow-y-auto px-5 pb-8 overscroll-contain"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              {Details}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
