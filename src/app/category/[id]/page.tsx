"use client";

import { use, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Star, Shield, Clock, ChevronRight, ChevronLeft, Share2, Search } from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/footer";
import servicesData from "@/data/services.json";
import { ServiceDrawer } from "@/components/shared/ServiceDrawer";

export default function CategoryPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const resolvedParams = use(params);
    const categoryId = parseInt(resolvedParams.id, 10);
    const category = servicesData.categories.find(c => c.id === categoryId);

    if (!category) return notFound();

    const [activeSubId, setActiveSubId] = useState<number | null>(
        category.subCategories?.[0]?.id || null
    );

    // Smooth scroll to subcategory section on mobile/desktop
    const scrollToSub = (id: number) => {
        setActiveSubId(id);
        const el = document.getElementById(`sub-${id}`);
        if (el) {
            const yOffset = -120; // Accounts for sticky headers
            const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
            <div className="hidden md:block">
                <Navbar />
            </div>

            {/* Mobile Header */}
            <div className="md:hidden sticky top-0 z-40 bg-white/95 dark:bg-gray-950/95 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 px-4 py-3 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                    <Link href="/" className="w-10 h-10 bg-gray-50 dark:bg-gray-900 rounded-full flex items-center justify-center text-gray-900 dark:text-gray-100">
                        <ChevronLeft className="h-5 w-5" />
                    </Link>
                    <h1 className="font-bold text-gray-900 dark:text-white truncate max-w-[200px]">{category.name}</h1>
                </div>
                <div className="flex gap-2">
                    <button className="w-10 h-10 flex items-center justify-center text-gray-900 dark:text-gray-100">
                        <Search className="h-5 w-5" />
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center text-gray-900 dark:text-gray-100">
                        <Share2 className="h-5 w-5" />
                    </button>
                </div>
            </div>

            <main className="flex-1 container mx-auto px-4 md:px-8 py-6 md:py-12 flex flex-col md:flex-row gap-8 relative items-start">

                {/* Desktop Sidebar (Sticky) */}
                <div className="hidden md:block w-72 flex-shrink-0 sticky top-28 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-2">
                    <h2 className="text-xl font-extrabold text-gray-900 dark:text-white p-4 pb-2">{category.name}</h2>
                    <ul className="space-y-1">
                        {category.subCategories?.map(sub => (
                            <li key={sub.id}>
                                <button
                                    onClick={() => scrollToSub(sub.id)}
                                    className={`w-full text-left px-4 py-3 rounded-xl transition-all text-sm font-semibold flex items-center justify-between group
                                        ${activeSubId === sub.id ? 'bg-[#204099]/10 text-[#204099] dark:bg-blue-900/40 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                                >
                                    {sub.name}
                                    <ChevronRight className={`w-4 h-4 transition-transform ${activeSubId === sub.id ? 'translate-x-1 opacity-100' : 'opacity-0 -translate-x-2 group-hover:opacity-50'}`} />
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Mobile Subcategories (Horizontal Scroll, Sticky below header) */}
                <div className="md:hidden sticky top-[65px] z-30 -mx-4 px-4 py-3 bg-white/95 dark:bg-gray-950/95 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 shadow-sm overflow-x-auto no-scrollbar flex gap-2">
                    {category.subCategories?.map(sub => (
                        <button
                            key={sub.id}
                            onClick={() => scrollToSub(sub.id)}
                            className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-colors border
                                ${activeSubId === sub.id ? 'bg-[#204099] text-white border-[#204099]' : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-800'}`}
                        >
                            {sub.name}
                        </button>
                    ))}
                </div>

                {/* Main Content Area */}
                <div className="flex-1 space-y-12">
                    {/* Category Hero Image */}
                    <div className="relative h-48 md:h-72 w-full rounded-2xl md:rounded-[2rem] overflow-hidden shadow-sm">
                        <Image
                            src={category.image}
                            alt={category.name}
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6 md:p-10">
                            <div>
                                <h2 className="text-3xl md:text-5xl font-black text-white mb-2">{category.name}</h2>
                                <div className="flex items-center gap-2 text-white/90 text-sm font-medium">
                                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    <span>4.8 (100K+ bookings)</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Subcategories & Products */}
                    <div className="space-y-12">
                        {category.subCategories?.map((sub) => (
                            <div key={sub.id} id={`sub-${sub.id}`} className="scroll-mt-36">
                                <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                                    {sub.name}
                                    <span className="h-[2px] flex-1 bg-gradient-to-r from-gray-100 to-transparent dark:from-gray-800"></span>
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6">
                                    {sub.products?.map((prod) => (
                                        <ServiceDrawer key={prod.id} product={prod} categoryName={category.name}>
                                            <div className="group bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-4 flex gap-4 cursor-pointer hover:shadow-lg transition-all duration-300">
                                                <div className="w-28 h-28 md:w-32 md:h-32 bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden flex-shrink-0 relative">
                                                    <Image
                                                        src={prod.image || "https://images.unsplash.com/photo-1560066984-138dadb4c035"}
                                                        alt={prod.name}
                                                        fill
                                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                    <div className="absolute top-2 left-2 bg-white/90 dark:bg-black/90 px-1.5 py-0.5 rounded text-[10px] font-bold shadow-sm backdrop-blur-md">
                                                        <span className="flex items-center"><Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-0.5" />{prod.rating || "4.8"}</span>
                                                    </div>
                                                </div>

                                                <div className="flex-1 flex flex-col justify-between">
                                                    <div>
                                                        <h4 className="font-bold text-gray-900 dark:text-white text-base leading-snug group-hover:text-[#204099] line-clamp-2 transition-colors mb-1">{prod.name}</h4>
                                                        <div className="text-[11px] text-gray-500 dark:text-gray-400 flex items-center gap-3 font-semibold uppercase tracking-wider mb-2">
                                                            <span className="flex items-center gap-0.5"><Clock className="w-3 h-3" /> 45 mins</span>
                                                        </div>
                                                        <div className="flex items-center gap-1.5 mb-2">
                                                            <span className="text-sm font-black text-gray-900 dark:text-white">{prod.price}</span>
                                                            {prod.originalPrice && <span className="text-[10px] text-gray-400 line-through">{prod.originalPrice}</span>}
                                                        </div>
                                                    </div>

                                                    {/* Add Trigger visually looking like Urban Company Add button */}
                                                    <div className="flex justify-between items-center mt-2">
                                                        <span className="text-[10px] text-[#204099] font-bold group-hover:underline">View details</span>
                                                        <button className="bg-blue-50 dark:bg-blue-900/30 text-[#204099] dark:text-blue-400 px-5 py-1.5 rounded-lg text-sm font-extrabold group-hover:bg-[#204099] group-hover:text-white transition-colors">
                                                            Add
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </ServiceDrawer>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <div className="hidden md:block">
                <Footer />
            </div>
        </div>
    );
}
