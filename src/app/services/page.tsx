"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ChevronRight, SearchX } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/footer";
import servicesData from "@/data/services.json";
import { ServiceDrawer } from "@/components/shared/ServiceDrawer";

function SearchResults() {
    const searchParams = useSearchParams();
    const query = searchParams.get("q")?.toLowerCase() || "";
    const location = searchParams.get("loc") || "";

    // Flatten all products
    const allProducts = useMemo(() => {
        return servicesData.categories
            .flatMap((c) => (c.subCategories || []).map(sc => ({ ...sc, categoryParent: c.name })))
            .flatMap((sc) => (sc.products || []).map(p => ({ ...p, categoryName: sc.categoryParent })));
    }, []);

    // Filter based on query
    const filteredProducts = useMemo(() => {
        if (!query) return allProducts; // If no query, return all
        return allProducts.filter(
            (p) =>
                p.name.toLowerCase().includes(query) ||
                (p as any).description?.toLowerCase().includes(query)
        );
    }, [allProducts, query]);

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
            <Navbar />

            <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
                        {query ? `Search results for "${query}"` : "All Services"}
                    </h1>
                    {location && location !== "Select City" && (
                        <p className="text-gray-500 dark:text-gray-400">
                            Showing available services in <span className="font-medium text-gray-700 dark:text-gray-300">{location}</span>
                        </p>
                    )}
                    <p className="text-sm text-gray-500 mt-2">{filteredProducts.length} services found</p>
                </div>

                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredProducts.map((service: any, i) => (
                            <ServiceDrawer categoryName={service.categoryName || "Service"} product={service} key={service.id || i}>
                                <div
                                    className="cursor-pointer group flex flex-col bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800"
                                >
                                    <div className="aspect-[4/3] relative overflow-hidden bg-gray-100 dark:bg-gray-800">
                                        <Image
                                            src={service.image || "https://images.pexels.com/photos/5691622/pexels-photo-5691622.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"}
                                            alt={service.name}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                        />
                                        {service.rating && (
                                            <div className="absolute top-3 left-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md px-2 py-1 rounded-md flex items-center gap-1 shadow-sm">
                                                <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                                                <span className="text-xs font-bold">{service.rating}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-5 flex flex-col flex-1">
                                        <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 group-hover:text-[#204099] transition-colors line-clamp-2">
                                            {service.name}
                                        </h3>
                                        <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-100 dark:border-gray-800">
                                            <div>
                                                <span className="text-xs text-gray-500 dark:text-gray-400 block mb-0.5">Starting at</span>
                                                <span className="font-bold text-lg text-gray-900 dark:text-white">
                                                    {service.price || "₹499"}
                                                </span>
                                            </div>
                                            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center group-hover:bg-[#204099] group-hover:text-white transition-colors duration-300">
                                                <ChevronRight className="w-5 h-5" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </ServiceDrawer>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 border-dashed">
                        <div className="w-20 h-20 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6 text-gray-400">
                            <SearchX className="w-10 h-10" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No results found</h2>
                        <p className="text-gray-500 dark:text-gray-400 max-w-md">
                            We couldn't find any services matching "{query}". Try double-checking your spelling or searching for a broader term.
                        </p>
                        <Link
                            href="/"
                            className="mt-8 bg-[#204099] text-white px-6 py-3 rounded-xl font-medium shadow-md hover:bg-[#173172] transition-colors"
                        >
                            Browse all categories
                        </Link>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}

export default function ServicesPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <SearchResults />
        </Suspense>
    );
}
