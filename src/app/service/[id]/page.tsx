"use client";

import { use, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Star, Shield, Clock, ChevronRight, Check, Camera } from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/footer";
import servicesData from "@/data/services.json";

export default function ServiceDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const resolvedParams = use(params);
    const serviceId = parseInt(resolvedParams.id, 10);
    const [service, setService] = useState<any>(null);
    const [categoryName, setCategoryName] = useState("");

    useEffect(() => {
        let found = null;
        let catName = "";

        for (const category of servicesData.categories) {
            for (const sub of (category.subCategories || [])) {
                for (const prod of (sub.products || [])) {
                    if (prod.id === serviceId) {
                        found = prod;
                        catName = category.name;
                        break;
                    }
                }
                if (found) break;
            }
            if (found) break;
        }

        if (found) {
            setService(found);
            setCategoryName(catName);
        }
    }, [serviceId]);

    if (!service) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <Navbar />
                <div className="flex-1 flex items-center justify-center p-8">
                    <div className="w-8 h-8 rounded-full border-4 border-[#204099] border-t-transparent animate-spin"></div>
                </div>
            </div>
        );
    }

    const stringContext = categoryName + " " + service.name;
    const isCleaning = stringContext.toLowerCase().includes("cleaning") || stringContext.toLowerCase().includes("pest") || stringContext.toLowerCase().includes("wash");
    const isRepair = stringContext.toLowerCase().includes("ac") || stringContext.toLowerCase().includes("repair") || stringContext.toLowerCase().includes("fix") || stringContext.toLowerCase().includes("electric") || stringContext.toLowerCase().includes("plumb") || stringContext.toLowerCase().includes("carpent") || stringContext.toLowerCase().includes("fan") || stringContext.toLowerCase().includes("switch") || stringContext.toLowerCase().includes("appliance") || stringContext.toLowerCase().includes("machine");

    const getDummyProcedureSteps = () => {
        if (isCleaning) {
            return [
                { title: "Inspection", desc: "Assessing the areas to be cleaned and identifying stains/dirt." },
                { title: "Dry Dusting", desc: "Removing loose dust and cobwebs from all surfaces." },
                { title: "Scrubbing & Wiping", desc: "Using industry-grade chemicals to clean and sanitize." },
                { title: "Deep Stain Removal", desc: "Targeted treatment for tough spots and grime." },
                { title: "Wet Mopping/Vacuuming", desc: "Final cleanup of floors and carpets." },
            ];
        } else if (isRepair) {
            return [
                { title: "Pre-service Check", desc: "Testing the equipment/area before starting work." },
                { title: "Diagnosis", desc: "Identifying the root cause of the issue." },
                { title: "Installation / Repair", desc: "Executing high-quality repairs with proper tools." },
                { title: "Post-service Quality Check", desc: "Ensuring everything works perfectly before leaving." },
            ];
        } else {
            return [
                { title: "Cleansing", desc: "Removes dirt & impurities for a clean base" },
                { title: "Steam & Exfoliation", desc: "Opens pores & removes dead skin cells" },
                { title: "Face/Body Massage", desc: "Relaxes muscles & improves blood flow" },
                { title: "Finishing Mask/Lotion", desc: "Locks in moisture for long-lasting glow" },
            ];
        }
    };

    const getDummyEssentials = () => {
        if (isCleaning) return [{ name: "Eco Chemicals", icon: "🧴" }, { name: "Microfiber cloth", icon: "🧽" }, { name: "Vacuum", icon: "🧹" }];
        else if (isRepair) return [{ name: "Professional Tools", icon: "🔧" }, { name: "Multimeter", icon: "⚡" }, { name: "Safety Gear", icon: "🥽" }];
        else return [{ name: "Premium Creams", icon: "🧴" }, { name: "Cotton Pads", icon: "☁️" }, { name: "Sheet Mask", icon: "🎭" }];
    };

    const procedureSteps = service.procedureSteps || getDummyProcedureSteps();
    const essentials = service.essentials || getDummyEssentials();

    const getFallbackImages = () => {
        if (isCleaning) return [
            "https://images.pexels.com/photos/4108715/pexels-photo-4108715.jpeg?auto=compress&cs=tinysrgb&w=400",
            "https://images.pexels.com/photos/4239116/pexels-photo-4239116.jpeg?auto=compress&cs=tinysrgb&w=400",
            "https://images.pexels.com/photos/6195125/pexels-photo-6195125.jpeg?auto=compress&cs=tinysrgb&w=400"
        ];
        if (isRepair) return [
            "https://images.pexels.com/photos/3825584/pexels-photo-3825584.jpeg?auto=compress&cs=tinysrgb&w=400",
            "https://images.pexels.com/photos/10369713/pexels-photo-10369713.jpeg?auto=compress&cs=tinysrgb&w=400",
            "https://images.pexels.com/photos/2209170/pexels-photo-2209170.jpeg?auto=compress&cs=tinysrgb&w=400"
        ];
        return [
            "https://images.pexels.com/photos/3993318/pexels-photo-3993318.jpeg?auto=compress&cs=tinysrgb&w=400",
            "https://images.pexels.com/photos/3993444/pexels-photo-3993444.jpeg?auto=compress&cs=tinysrgb&w=400",
            "https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=400"
        ];
    };

    const workImages = [service.image, ...getFallbackImages()].filter(Boolean).slice(0, 3);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col font-sans">
            <Navbar />

            <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-6 md:py-12 flex flex-col md:flex-row gap-8 lg:gap-12 relative items-start">

                {/* Left side: Media & Main Info */}
                <div className="flex-1 w-full space-y-8">

                    {/* Breadcrumbs */}
                    <div className="text-xs text-gray-500 font-medium flex items-center gap-2 mb-4">
                        <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
                        <ChevronRight className="w-3 h-3" />
                        <span className="text-gray-900 dark:text-gray-300">{categoryName}</span>
                    </div>

                    <div className="relative aspect-[16/9] md:aspect-[4/3] w-full rounded-[2rem] overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800">
                        <Image
                            src={service.image || "https://images.pexels.com/photos/5691622/pexels-photo-5691622.jpeg?auto=compress&cs=tinysrgb&w=800"}
                            alt={service.name}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    <div className="space-y-6">
                        <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight tracking-tight">
                            {service.name}
                        </h1>

                        <div className="flex items-center gap-3 text-sm">
                            <div className="flex items-center gap-1.5 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-md font-bold">
                                <Star className="w-4 h-4 fill-current" />
                                <span>{service.rating || "4.8"}</span>
                            </div>
                            <span className="text-gray-300 dark:text-gray-700">•</span>
                            <span className="font-semibold text-gray-600 dark:text-gray-400">{(service.reviews || 10000).toLocaleString()} Reviews</span>
                        </div>
                    </div>

                    <div className="prose prose-gray dark:prose-invert max-w-none">
                        <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                            {service.description || "Our top-rated professionals will ensure your complete satisfaction. Designed for effectiveness and safety, using eco-friendly materials."}
                        </p>
                    </div>

                    <hr className="my-8 border-t-[8px] md:border-t-2 border-gray-100 dark:border-gray-900/50" />

                    {/* Our Work Section */}
                    <div className="space-y-5">
                        <h2 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-2">
                            Our Work <Camera className="w-5 h-5 text-gray-400" />
                        </h2>
                        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2">
                            {workImages.map((img, idx) => (
                                <div key={idx} className="relative w-56 h-36 md:w-64 md:h-40 flex-shrink-0 snap-start bg-gray-100 dark:bg-gray-800 rounded-[1.5rem] overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-shadow">
                                    <Image src={img} alt="Our Work" fill className="object-cover" sizes="256px" />
                                </div>
                            ))}
                        </div>
                    </div>

                    <hr className="my-8 border-t-[8px] md:border-t-2 border-gray-100 dark:border-gray-900/50" />

                    {/* What we use */}
                    <div className="space-y-5">
                        <h2 className="text-2xl font-black text-gray-900 dark:text-white">What we use</h2>
                        <div className="grid grid-cols-3 gap-4">
                            {essentials.map((item: any, i: number) => (
                                <div key={i} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-4 rounded-[1.5rem] flex flex-col items-center justify-center text-center shadow-sm">
                                    <div className="text-4xl mb-3">{item.icon}</div>
                                    <span className="text-sm font-bold text-gray-800 dark:text-gray-200">{item.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <hr className="my-8 border-t-[8px] md:border-t-2 border-gray-100 dark:border-gray-900/50" />

                    {/* Procedure */}
                    <div className="space-y-6">
                        <h2 className="text-2xl font-black text-gray-900 dark:text-white">Service Procedure</h2>
                        <div className="space-y-0 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 dark:before:via-gray-800 before:to-transparent">
                            {procedureSteps.map((step: any, i: number) => (
                                <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active py-4">
                                    {/* Icon Marker */}
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-gray-950 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                                        <Check className="w-5 h-5" />
                                    </div>
                                    {/* Content box */}
                                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-5 rounded-[1.5rem] bg-white dark:bg-gray-900 shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow">
                                        <div className="text-xs font-bold text-blue-600 dark:text-blue-400 mb-1">Step {i + 1}</div>
                                        <h3 className="font-bold text-gray-900 dark:text-white mb-1.5">{step.title}</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{step.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right side: Sticky Action Card */}
                <div className="w-full md:w-[380px] lg:w-[420px] flex-shrink-0 md:sticky md:top-24 mt-8 md:mt-12 space-y-6">
                    <div className="bg-white dark:bg-gray-900 rounded-[2rem] p-6 shadow-xl shadow-gray-200/50 dark:shadow-black/20 border border-gray-100 dark:border-gray-800">
                        <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2">{service.name}</h3>
                        <div className="flex items-center gap-2 mb-6 text-sm text-gray-500 dark:text-gray-400">
                            <Clock className="w-4 h-4" /> <span>60 Min</span>
                            <span className="mx-2">•</span>
                            <Shield className="w-4 h-4 text-green-600" /> <span className="text-green-600 font-medium">Urban Company Verified</span>
                        </div>

                        <div className="flex items-end gap-3 mb-8">
                            <span className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">{service.price}</span>
                            {service.originalPrice && (
                                <span className="text-lg text-gray-400 line-through font-medium mb-1">{service.originalPrice}</span>
                            )}
                            {service.discount && (
                                <span className="text-sm font-bold text-blue-600 dark:text-blue-400 mb-1">{service.discount}</span>
                            )}
                        </div>

                        <button className="w-full bg-[#204099] hover:bg-[#1a3a90] text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all active:scale-95 duration-200 flex items-center justify-center gap-2">
                            Add to Cart
                        </button>

                        <div className="mt-6 flex flex-col gap-3">
                            <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 px-4 py-3 rounded-xl border border-dashed border-gray-200 dark:border-gray-700">
                                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                                <span>Free cancellation till 3 hrs before service</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 px-4 py-3 rounded-xl border border-dashed border-gray-200 dark:border-gray-700">
                                <Shield className="w-5 h-5 flex-shrink-0 text-blue-500" />
                                <span>30-day post service guarantee</span>
                            </div>
                        </div>
                    </div>
                </div>

            </main>

            <Footer />
        </div>
    );
}
