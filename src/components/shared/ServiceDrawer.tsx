"use client";

import { DrawerPreview as Drawer } from '@base-ui/react/drawer';
import { Star, Shield, Clock, X, Camera } from 'lucide-react';
import Image from 'next/image';

interface ServiceDrawerProps {
    children: React.ReactNode;
    product: any;
    categoryName: string;
}

export function ServiceDrawer({ children, product, categoryName }: ServiceDrawerProps) {
    if (!product) return <>{children}</>;

    const ctx = (categoryName + " " + product.name).toLowerCase();
    const isCleaning = ctx.includes("cleaning") || ctx.includes("pest") || ctx.includes("wash");
    const isRepair = ctx.includes("repair") || ctx.includes("fix") || ctx.includes("electric") || ctx.includes("plumb") || ctx.includes("carpent") || ctx.includes("fan") || ctx.includes("switch") || ctx.includes("appliance") || ctx.includes("machine") || ctx.includes("ac ");

    const procedureSteps = product.procedureSteps || (isCleaning ? [
        { title: "Inspection", desc: "Assessing the areas to be cleaned and identifying stains/dirt." },
        { title: "Dry Dusting", desc: "Removing loose dust and cobwebs from all surfaces." },
        { title: "Scrubbing & Wiping", desc: "Using industry-grade chemicals to clean and sanitize." },
        { title: "Deep Stain Removal", desc: "Targeted treatment for tough spots and grime." },
        { title: "Wet Mopping/Vacuuming", desc: "Final cleanup of floors and carpets." },
    ] : isRepair ? [
        { title: "Pre-service Check", desc: "Testing the equipment/area before starting work." },
        { title: "Diagnosis", desc: "Identifying the root cause of the issue." },
        { title: "Installation / Repair", desc: "Executing high-quality repairs with proper tools." },
        { title: "Post-service Quality Check", desc: "Ensuring everything works perfectly before leaving." },
    ] : [
        { title: "Cleansing", desc: "Removes dirt & impurities for a clean base" },
        { title: "Steam & Exfoliation", desc: "Opens pores & removes dead skin cells" },
        { title: "Face/Body Massage", desc: "Relaxes muscles & improves blood flow" },
        { title: "Finishing Mask/Lotion", desc: "Locks in moisture for long-lasting glow" },
    ]);

    const essentials = product.essentials || (isCleaning
        ? [{ name: "Eco Chemicals", icon: "cleaning" }, { name: "Microfiber cloth", icon: "cloth" }, { name: "Vacuum", icon: "vacuum" }]
        : isRepair
            ? [{ name: "Professional Tools", icon: "tools" }, { name: "Multimeter", icon: "meter" }, { name: "Safety Gear", icon: "safety" }]
            : [{ name: "Premium Creams", icon: "cream" }, { name: "Cotton Pads", icon: "pads" }, { name: "Sheet Mask", icon: "mask" }]);

    const essentialIcons: Record<string, string> = {
        cleaning: "🧴", cloth: "🧽", vacuum: "🧹",
        tools: "🔧", meter: "⚡", safety: "🥽",
        cream: "🧴", pads: "☁️", mask: "🎭"
    };

    const fallbackImages = isCleaning ? [
        "https://images.pexels.com/photos/4108715/pexels-photo-4108715.jpeg?auto=compress&cs=tinysrgb&w=400",
        "https://images.pexels.com/photos/4239116/pexels-photo-4239116.jpeg?auto=compress&cs=tinysrgb&w=400",
    ] : isRepair ? [
        "https://images.pexels.com/photos/3825584/pexels-photo-3825584.jpeg?auto=compress&cs=tinysrgb&w=400",
        "https://images.pexels.com/photos/10369713/pexels-photo-10369713.jpeg?auto=compress&cs=tinysrgb&w=400",
    ] : [
        "https://images.pexels.com/photos/3993318/pexels-photo-3993318.jpeg?auto=compress&cs=tinysrgb&w=400",
        "https://images.pexels.com/photos/3993444/pexels-photo-3993444.jpeg?auto=compress&cs=tinysrgb&w=400",
    ];

    const workImages = [product.image, ...fallbackImages].filter(Boolean).slice(0, 3);

    return (
        <Drawer.Root>
            <Drawer.Trigger className="w-full text-left focus:outline-none block appearance-none bg-transparent p-0 m-0 border-none cursor-pointer">
                {children}
            </Drawer.Trigger>

            <Drawer.Portal>
                <Drawer.Backdrop className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm transition-opacity duration-300 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />

                <Drawer.Viewport className="fixed inset-0 z-[100] flex md:justify-end items-end md:items-stretch pointer-events-none">
                    <Drawer.Popup className="w-full md:w-[480px] max-h-[92vh] md:max-h-full md:h-full bg-white dark:bg-gray-950 rounded-t-[2rem] md:rounded-none md:rounded-l-[2rem] shadow-2xl flex flex-col outline-none pointer-events-auto overflow-hidden relative border-t md:border-l border-gray-100 dark:border-gray-800 transition-transform duration-300 data-[ending-style]:translate-y-full md:data-[ending-style]:translate-y-0 md:data-[ending-style]:translate-x-full data-[starting-style]:translate-y-full md:data-[starting-style]:translate-y-0 md:data-[starting-style]:translate-x-full">

                        {/* Handle + Close header */}
                        <div className="relative w-full pt-3 pb-2 flex-shrink-0 bg-white dark:bg-gray-950 rounded-t-[2rem] z-10">
                            <div className="flex justify-center mb-1">
                                <div className="w-10 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full" />
                            </div>
                            <Drawer.Close aria-label="Close" className="absolute top-2 right-3 w-9 h-9 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 transition-colors z-20">
                                <X className="w-4 h-4" />
                            </Drawer.Close>
                        </div>

                        {/* Scrollable content with swipe-to-dismiss */}
                        <Drawer.Content className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col">

                            {/* Hero Image */}
                            <div className="relative h-56 sm:h-64 md:h-72 w-full flex-shrink-0 bg-gray-100 dark:bg-gray-800">
                                <Image
                                    src={product.image || "https://images.pexels.com/photos/4108715/pexels-photo-4108715.jpeg?auto=compress&cs=tinysrgb&w=600"}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Title + Rating + Price */}
                            <div className="p-5 pb-2 space-y-3">
                                <Drawer.Title className="text-2xl font-extrabold text-gray-900 dark:text-white leading-tight">
                                    {product.name}
                                </Drawer.Title>

                                <div className="flex items-center gap-2 text-sm">
                                    <div className="flex items-center gap-1 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2.5 py-1 rounded font-bold">
                                        <Star className="w-4 h-4 fill-current" />
                                        <span>{product.rating || "4.8"}</span>
                                    </div>
                                    <span className="text-gray-300 dark:text-gray-600">•</span>
                                    <span className="text-gray-600 dark:text-gray-400 font-medium">{product.reviews?.toLocaleString() || "10K"} Reviews</span>
                                </div>

                                <div className="flex items-baseline gap-3">
                                    <span className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">{product.price}</span>
                                    {product.originalPrice && <span className="text-gray-400 line-through font-semibold">{product.originalPrice}</span>}
                                    {product.discount && <span className="text-blue-600 dark:text-blue-400 font-bold ml-1">{product.discount}</span>}
                                </div>

                                <Drawer.Description className="flex items-center gap-3 text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1" /> 60 MIN</span>
                                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                    <span className="flex items-center text-green-600"><Shield className="w-3.5 h-3.5 mr-1" /> VERIFIED PRO</span>
                                </Drawer.Description>
                            </div>

                            <hr className="my-4 border-t-[6px] border-gray-50 dark:border-gray-900/50" />

                            {/* Our Work */}
                            <div className="px-5 space-y-3">
                                <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                    Our Work <Camera className="w-4 h-4 text-gray-400" />
                                </h3>
                                <div className="flex gap-2.5 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-1">
                                    {workImages.map((img, idx) => (
                                        <div key={idx} className="relative w-36 h-24 flex-shrink-0 snap-start bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden">
                                            <Image src={img} alt="Our Work" fill className="object-cover" sizes="144px" />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <hr className="my-4 border-t-[6px] border-gray-50 dark:border-gray-900/50" />

                            {/* What we use */}
                            <div className="px-5 space-y-3">
                                <h3 className="text-base font-bold text-gray-900 dark:text-white">What we use</h3>
                                <div className="grid grid-cols-3 gap-2.5">
                                    {essentials.map((item: any, i: number) => (
                                        <div key={i} className="bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-3 rounded-xl flex flex-col items-center text-center">
                                            <div className="text-xl mb-1">{essentialIcons[item.icon] || item.icon}</div>
                                            <span className="text-[10px] font-bold text-gray-600 dark:text-gray-400 leading-tight">{item.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <hr className="my-4 border-t-[6px] border-gray-50 dark:border-gray-900/50" />

                            {/* Procedure */}
                            <div className="px-5 space-y-3 pb-6">
                                <h3 className="text-base font-bold text-gray-900 dark:text-white">Service Procedure</h3>
                                <div className="space-y-2.5">
                                    {procedureSteps.map((step: any, i: number) => (
                                        <div key={i} className="flex gap-3 items-start bg-gray-50 dark:bg-gray-900/50 p-3.5 rounded-xl border border-gray-100 dark:border-gray-800">
                                            <div className="w-7 h-7 rounded-full bg-blue-50 dark:bg-gray-800 border border-blue-100 dark:border-gray-700 font-bold text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0 text-xs">
                                                {i + 1}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-sm text-gray-900 dark:text-gray-100 mb-0.5">{step.title}</h4>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{step.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Drawer.Content>

                        {/* Sticky bottom bar */}
                        <div className="bg-white dark:bg-gray-950 px-5 py-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between flex-shrink-0">
                            <div>
                                <span className="block text-lg font-black text-gray-900 dark:text-white leading-none mb-0.5">{product.price}</span>
                                <span className="text-xs font-semibold text-blue-600">View Details</span>
                            </div>
                            <button className="bg-[#204099] hover:bg-[#1a3a90] text-white px-8 py-3 rounded-xl font-bold text-sm shadow-lg transition-all active:scale-95">
                                Add to Cart
                            </button>
                        </div>

                    </Drawer.Popup>
                </Drawer.Viewport>
            </Drawer.Portal>
        </Drawer.Root>
    );
}
