// app/components/ServiceCategories.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Star, ArrowRight, Users } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";          // ← shadcn drawer
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import servicesData from "@/data/services.json";

export default function ServiceCategories() {
  /* ───────── state ───────── */
  const [category, setCategory] = useState(servicesData.categories[0]);
  const [subId, setSubId] = useState(category.subCategories?.[0]?.id);
  const [drawerOpen, setDrawerOpen] = useState(false); // ← mobile sheet
  const animateKey = `${category.id}-${subId}`;         // triggers re-animation
  const sectionRef = useRef<HTMLElement>(null);

  /* ───────── global “selectCategory” event (unchanged) ───────── */
  useEffect(() => {
    const onSelect = (e: Event) => {
      const id = (e as CustomEvent<{ id: number }>).detail.id;
      const next = servicesData.categories.find(c => c.id === id);
      if (!next) return;

      setCategory(next);
      setSubId(next.subCategories?.[0]?.id);
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      /* open mobile drawer automatically */
      if (window.matchMedia("(max-width: 767px)").matches) setDrawerOpen(true);
    };
    window.addEventListener("selectCategory", onSelect as EventListener);
    return () => window.removeEventListener("selectCategory", onSelect as EventListener);
  }, []);

  /* ───────── helpers ───────── */
  const currentSub = category.subCategories?.find(s => s.id === subId);

  /* ───────── reusable “details” fragment ───────── */
  const Details = (
    <div key={animateKey} className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      {/* header */}
      <div className="flex items-center gap-6">
        <div className="relative h-24 w-24 overflow-hidden rounded-xl">
          <Image src={category.image} alt={category.name} fill className="object-cover" />
        </div>
        <div>
          <h3 className="text-2xl font-bold">{category.name}</h3>
          <p className="text-lg text-muted-foreground">{category.description}</p>
          <Badge variant="secondary" className="mt-2">
            {category.subCategories?.reduce(
              (sum, s) => sum + (s.products?.length ?? 0),
              0
            )}{" "}
            Available Products
          </Badge>
        </div>
      </div>

      {/* sub-category tabs */}
      <div className="flex flex-wrap gap-2">
        {category.subCategories?.map(sub => (
          <button
            key={sub.id}
            onClick={() => setSubId(sub.id)}
            className={`rounded-full border px-3 py-1 text-sm transition
              ${subId === sub.id
                ? "bg-primary text-white border-primary"
                : "bg-transparent text-foreground hover:bg-muted border-border"}`}
          >
            {sub.name}
          </button>
        ))}
      </div>

      {/* products */}
      <div className="grid gap-6 md:grid-cols-2">
        {currentSub?.products?.map(p => (
          <Card key={p.id} className="transition-shadow hover:shadow-lg">
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <CardTitle className="text-lg">{p.name}</CardTitle>
                <Badge variant="outline" className="font-semibold text-primary">
                  {p.price}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{p.rating}</span>
                  <span className="text-muted-foreground">
                    ({p.reviews} reviews)
                  </span>
                </div>
                <Button size="sm">Book Now</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* view-all */}
      <div className="pt-6 text-center">
        <Button variant="outline" size="lg" className="min-w-[200px]">
          View All {category.name} Services
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );

  /* ───────── JSX ───────── */
  return (
    <section id="service-categories" ref={sectionRef} className="bg-background py-20">
      <div className="container mx-auto px-4">
        {/* heading */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold lg:text-4xl">Popular Service Categories</h2>
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
            Choose from hundreds of services across different categories. All professionals are verified and rated by customers.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          {/* left list */}
          <div className="space-y-3 lg:col-span-4">
            <h3 className="mb-4 text-lg font-semibold text-[#204099]">Service Categories</h3>

            {servicesData.categories.map(c => {
              const total = c.subCategories?.reduce(
                (sum, sc) => sum + (sc.products?.length ?? 0),
                0
              );
              const isActive = c.id === category.id;

              return (
                <Card
                  key={c.id}
                  onClick={() => {
                    setCategory(c);
                    setSubId(c.subCategories?.[0]?.id);
                    if (window.matchMedia("(max-width: 767px)").matches) setDrawerOpen(true);
                  }}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-md
                    ${isActive ? "bg-[#204099]/5 ring-2 ring-[#204099]" : "hover:bg-muted/50"}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="relative h-16 w-16 overflow-hidden rounded-lg">
                        <Image src={c.image} alt={c.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{c.name}</h4>
                        <p className="text-sm text-muted-foreground">{c.description}</p>
                        <div className="mt-1 flex items-center">
                          <Users className="mr-1 h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{total} products</span>
                        </div>
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* desktop details */}
          <div className="hidden md:block lg:col-span-8">{Details}</div>
        </div>
      </div>

      {/* ───────── mobile drawer ───────── */}
      <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
        <SheetContent
          side="bottom"
          className="h-[85vh] rounded-t-3xl p-6 md:hidden overflow-y-auto"
        >
          <SheetHeader className="mb-6 text-center">
            <SheetTitle className="text-xl font-semibold">{category.name}</SheetTitle>
          </SheetHeader>
          {Details}
        </SheetContent>
      </Sheet>
    </section>
  );
}
