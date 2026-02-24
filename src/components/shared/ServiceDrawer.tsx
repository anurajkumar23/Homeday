"use client";

import { useState, useCallback, useEffect, useRef } from 'react';
import { Star, Shield, Clock, X, CheckCircle } from 'lucide-react';
import Image from 'next/image';

interface ServiceDrawerProps {
    children: React.ReactNode;
    product: any;
    categoryName: string;
}

export function ServiceDrawer({ children, product, categoryName }: ServiceDrawerProps) {
    const [open, setOpen] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    if (!product) return <>{children}</>;

    const handleOpen = useCallback(() => setOpen(true), []);
    const handleClose = useCallback(() => setOpen(false), []);

    // Lock body scroll when drawer is open
    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [open]);

    return (
        <>
            {/* Trigger */}
            <button
                type="button"
                onClick={handleOpen}
                className="w-full text-left focus:outline-none block appearance-none bg-transparent p-0 m-0 border-none cursor-pointer"
            >
                {children}
            </button>

            {/* Drawer overlay + panel */}
            {open && (
                <div className="fixed inset-0 z-[200]">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
                        onClick={handleClose}
                    />

                    {/* Drawer Panel */}
                    <div className="absolute bottom-0 left-0 right-0 md:left-auto md:top-0 md:right-0 md:w-[480px] max-h-[92vh] md:max-h-full md:h-full bg-white dark:bg-gray-900 rounded-t-[2rem] md:rounded-none md:rounded-l-[2rem] shadow-2xl flex flex-col animate-in slide-in-from-bottom duration-300 md:animate-in md:slide-in-from-right md:duration-300">

                        {/* Handle + Close — non-scrollable */}
                        <div className="relative w-full pt-3 pb-2 flex-shrink-0 bg-white dark:bg-gray-900 rounded-t-[2rem] z-10">
                            <div className="flex justify-center mb-1">
                                <div className="w-10 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full" />
                            </div>
                            <button
                                type="button"
                                aria-label="Close"
                                onClick={handleClose}
                                className="absolute top-2 right-3 w-9 h-9 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full flex items-center justify-center text-gray-600 dark:text-white transition-colors z-20"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Scrollable content — uses native overflow */}
                        <div
                            ref={scrollRef}
                            className="flex-1 overflow-y-auto overflow-x-hidden overscroll-contain"
                            style={{ WebkitOverflowScrolling: 'touch' }}
                        >
                            {/* Hero Image */}
                            <div className="relative h-56 sm:h-64 md:h-72 w-full flex-shrink-0 bg-gray-200 dark:bg-gray-800">
                                <Image
                                    src={product.image || "https://images.pexels.com/photos/4108715/pexels-photo-4108715.jpeg?auto=compress&cs=tinysrgb&w=600"}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                    unoptimized
                                />
                            </div>

                            {/* Title + Rating + Price */}
                            <div className="p-5 pb-3 space-y-3 bg-white dark:bg-gray-900">
                                <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white leading-tight">
                                    {product.name}
                                </h2>

                                <div className="flex items-center gap-2 text-sm">
                                    <div className="flex items-center gap-1 bg-green-50 dark:bg-green-900/40 text-green-700 dark:text-green-400 px-2.5 py-1 rounded font-bold">
                                        <Star className="w-4 h-4 fill-current" />
                                        <span>{product.rating || "4.8"}</span>
                                    </div>
                                    <span className="text-gray-300 dark:text-gray-600">•</span>
                                    <span className="text-gray-600 dark:text-gray-400 font-medium">{product.reviews?.toLocaleString() || "1K"} Reviews</span>
                                </div>

                                <div className="flex items-baseline gap-3">
                                    <span className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">{product.price}</span>
                                    {product.originalPrice && <span className="text-gray-400 line-through font-semibold">{product.originalPrice}</span>}
                                    {product.discount && <span className="text-blue-600 dark:text-blue-400 font-bold ml-1">{product.discount}</span>}
                                </div>

                                <div className="flex items-center gap-3 text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1" /> {product.duration || "30–60 mins"}</span>
                                    {product.slot && (
                                        <>
                                            <span className="w-1 h-1 bg-gray-300 dark:bg-gray-600 rounded-full"></span>
                                            <span className="flex items-center">Slot: {product.slot}</span>
                                        </>
                                    )}
                                    <span className="w-1 h-1 bg-gray-300 dark:bg-gray-600 rounded-full"></span>
                                    <span className="flex items-center text-green-600 dark:text-green-400"><Shield className="w-3.5 h-3.5 mr-1" /> VERIFIED</span>
                                </div>
                            </div>

                            <div className="h-2 bg-gray-100 dark:bg-gray-800" />

                            {/* What's Included */}
                            {product.includes && product.includes.length > 0 && (
                                <>
                                    <div className="px-5 py-4 space-y-3 bg-white dark:bg-gray-900">
                                        <h3 className="text-base font-bold text-gray-900 dark:text-white">What&apos;s Included</h3>
                                        <div className="space-y-2">
                                            {product.includes.map((item: string, i: number) => (
                                                <div key={i} className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-100 dark:border-green-800/30">
                                                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                                                    <span className="text-sm text-gray-800 dark:text-gray-200 font-medium">{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="h-2 bg-gray-100 dark:bg-gray-800" />
                                </>
                            )}

                            {/* Why Choose Homeday */}
                            <div className="px-5 py-4 space-y-3 bg-white dark:bg-gray-900">
                                <h3 className="text-base font-bold text-gray-900 dark:text-white">Why Choose Homeday?</h3>
                                <div className="grid grid-cols-2 gap-2.5">
                                    {[
                                        { text: "Verified Professionals", icon: "✅" },
                                        { text: "Fixed Pricing", icon: "💰" },
                                        { text: "Company Products", icon: "🧴" },
                                        { text: "Same-Day Booking", icon: "⚡" },
                                    ].map((item, i) => (
                                        <div key={i} className="bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-3 rounded-xl flex items-center gap-2">
                                            <span className="text-lg">{item.icon}</span>
                                            <span className="text-[11px] font-bold text-gray-700 dark:text-gray-300 leading-tight">{item.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Booking Slots */}
                            <div className="h-2 bg-gray-100 dark:bg-gray-800" />
                            <div className="px-5 py-4 space-y-3 bg-white dark:bg-gray-900">
                                <h3 className="text-base font-bold text-gray-900 dark:text-white">Available Slots</h3>
                                <div className="flex flex-wrap gap-2">
                                    {["7–9 AM", "9–12 PM", "12–4 PM", "4–8 PM"].map((slot, i) => (
                                        <div key={i} className="px-3 py-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 rounded-full text-xs font-bold text-blue-700 dark:text-blue-400">
                                            {slot}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {product.note && (
                                <>
                                    <div className="h-2 bg-gray-100 dark:bg-gray-800" />
                                    <div className="px-5 py-4 bg-amber-50 dark:bg-amber-900/20 border-y border-amber-100 dark:border-amber-800/30">
                                        <p className="text-sm text-amber-800 dark:text-amber-300 font-medium">📝 {product.note}</p>
                                    </div>
                                </>
                            )}

                            <div className="h-4 bg-white dark:bg-gray-900" />
                        </div>

                        {/* Sticky bottom */}
                        <div className="bg-white dark:bg-gray-900 px-5 py-3 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between flex-shrink-0">
                            <div>
                                <span className="block text-lg font-black text-gray-900 dark:text-white leading-none mb-0.5">{product.price}</span>
                                <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">View Details</span>
                            </div>
                            <button className="bg-[#204099] hover:bg-[#1a3a90] text-white px-8 py-3 rounded-xl font-bold text-sm shadow-lg transition-all active:scale-95">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
