"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronRight, Star } from "lucide-react";
import servicesData from "@/data/services.json";
import Link from "next/link";
import { ServiceDrawer } from "@/components/shared/ServiceDrawer";

export default function TrendingServices() {
    const scrollRef = useRef<HTMLDivElement>(null);

    // Extract a few popular products across categories to feature them
    const trending = servicesData.categories
        .flatMap((c) =>
            (c.subCategories || []).flatMap((sc) =>
                (sc.products || []).map((p) => ({
                    ...p,
                    categoryId: c.id,
                }))
            )
        )
        .filter((p) => p.rating && p.rating >= 4.8)
        .slice(0, 8); // Grab top 8 highest-rated

    if (!trending.length) return null;

    return (
        <section className="py-12 md:py-20 bg-gray-50 dark:bg-gray-900/50">
            <div className="container mx-auto px-4 md:px-8">
                <div className="flex justify-between items-end mb-8 md:mb-12">
                    <div className="max-w-xl">
                        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4">
                            Trending <span className="text-[#204099] dark:text-blue-400">Services</span>
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400">
                            Most booked services by our community this week. High quality, vetted professionals.
                        </p>
                    </div>
                    <button className="hidden md:flex items-center gap-2 text-sm font-semibold text-[#204099] hover:text-[#173172] transition-colors">
                        View all services <ChevronRight className="w-4 h-4" />
                    </button>
                </div>

                {/* Horizontal scroll container full-bleed on mobile, contained on desktop */}
                <div className="relative -mx-4 md:mx-0">
                    <div
                        ref={scrollRef}
                        className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory px-4 md:px-0 no-scrollbar pb-8"
                    >
                        {trending.map((service, i) => (
                            <Link key={i} href={`/category/${service.categoryId || 1}`} className="block flex-none w-[280px] md:w-[340px] snap-start h-full cursor-pointer">
                                <div
                                    className="group relative bg-white dark:bg-gray-950 rounded-2xl md:rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 dark:border-gray-800"
                                >
                                    <div className="aspect-[4/3] relative overflow-hidden bg-gray-100 dark:bg-gray-900">
                                        <Image
                                            src={service.image || "https://images.pexels.com/photos/5691622/pexels-photo-5691622.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"}
                                            alt={service.name}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                            sizes="(max-width: 768px) 280px, 340px"
                                        />
                                        <div className="absolute top-3 right-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                                            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                                            <span className="text-xs font-bold">{service.rating}</span>
                                        </div>
                                    </div>

                                    <div className="p-5 md:p-6">
                                        <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1 group-hover:text-[#204099] dark:group-hover:text-blue-400 transition-colors truncate">
                                            {service.name}
                                        </h3>
                                        <div className="flex items-center justify-between mt-4">
                                            <div>
                                                <span className="text-xs text-gray-500 dark:text-gray-400 block mb-0.5">Starting at</span>
                                                <span className="font-bold text-lg text-gray-900 dark:text-white">
                                                    {service.price}
                                                </span>
                                            </div>
                                            <div className="w-10 h-10 rounded-full bg-gray-50 dark:bg-gray-900 flex items-center justify-center group-hover:bg-[#204099] dark:group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                                                <ChevronRight className="w-5 h-5" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
