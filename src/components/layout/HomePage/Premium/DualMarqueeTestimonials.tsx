"use client";

import { Star } from "lucide-react";

const reviews = [
    {
        name: "Priya Sharma",
        location: "Mumbai",
        text: "The salon at home service was incredibly professional. The tools were sanitized, and the aesthetician was so polite. Will definitely book again!",
        rating: 5,
    },
    {
        name: "Rahul Verma",
        location: "Delhi",
        text: "AC repair was quick and transparent. They explained exactly what the issue was before fixing it. No hidden charges!",
        rating: 5,
    },
    {
        name: "Anjali Gupta",
        location: "Bangalore",
        text: "Used their deep cleaning service before Diwali. The team was thorough and my house looks spotless. Highly recommend.",
        rating: 5,
    },
    {
        name: "Vikram Singh",
        location: "Pune",
        text: "Very reliable. I needed a plumber urgently on a Sunday, and Homeday sent someone within an hour. Excellent service.",
        rating: 4,
    },
    {
        name: "Sneha Patel",
        location: "Ahmedabad",
        text: "The UI of the website is smooth, but the actual service is even better. The pest control guys knew exactly what they were doing.",
        rating: 5,
    },
];

// Tailwind config requires adding these animations manually, but we can do it via inline styles for simplicity here
export default function DualMarqueeTestimonials() {
    return (
        <section className="py-20 bg-gray-50 dark:bg-gray-900 overflow-hidden border-t border-gray-100 dark:border-gray-800">
            <div className="container mx-auto px-4 text-center mb-12">
                <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                    Trusted by <span className="text-[#204099]">100,000+</span> Customers
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                    Don't just take our word for it. See what our community has to say.
                </p>
            </div>

            <div className="relative flex flex-col gap-6 w-full overflow-hidden">
                {/* Row 1 - Left to Right */}
                <div className="flex w-max animate-marquee gap-6">
                    {[...reviews, ...reviews].map((review, i) => (
                        <div
                            key={`r1-${i}`}
                            className="w-[350px] md:w-[400px] bg-white dark:bg-gray-950 p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800"
                        >
                            <div className="flex mb-4">
                                {[...Array(review.rating)].map((_, idx) => (
                                    <Star key={idx} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6 font-medium">
                                "{review.text}"
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#204099] to-blue-400 flex items-center justify-center text-white font-bold text-xl shadow-inner">
                                    {review.name.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white">{review.name}</h4>
                                    <p className="text-sm text-gray-500">{review.location}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Row 2 - Right to Left */}
                <div className="flex w-max animate-marquee-reverse gap-6 -ml-32">
                    {[...[...reviews].reverse(), ...[...reviews].reverse()].map((review, i) => (
                        <div
                            key={`r2-${i}`}
                            className="w-[350px] md:w-[400px] bg-white dark:bg-gray-950 p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800"
                        >
                            <div className="flex mb-4">
                                {[...Array(review.rating)].map((_, idx) => (
                                    <Star key={idx} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6 font-medium">
                                "{review.text}"
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-[#204099] flex items-center justify-center text-white font-bold text-xl shadow-inner">
                                    {review.name.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white">{review.name}</h4>
                                    <p className="text-sm text-gray-500">{review.location}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Soft edge gradients */}
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-gray-50 dark:from-gray-900 to-transparent pointer-events-none"></div>
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-gray-50 dark:from-gray-900 to-transparent pointer-events-none"></div>
            </div>
        </section>
    );
}
