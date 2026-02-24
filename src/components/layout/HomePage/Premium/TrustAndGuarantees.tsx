"use client";

import { ShieldCheck, Sparkles, Clock, ArrowUpRight } from "lucide-react";

const guarantees = [
    {
        icon: <ShieldCheck className="w-8 h-8 text-[#204099]" />,
        title: "100% Verified Professionals",
        description: "Every service partner undergoes strict background checks and skill verification before joining us.",
    },
    {
        icon: <Sparkles className="w-8 h-8 text-[#204099]" />,
        title: "Safe & Premium Products",
        description: "We only use industry-grade, non-toxic, and genuine products to ensure maximum safety.",
    },
    {
        icon: <Clock className="w-8 h-8 text-[#204099]" />,
        title: "On-Time Service Guarantee",
        description: "We value your time. If our professional is late, you get a flat discount on your service.",
    },
];

export default function TrustAndGuarantees() {
    return (
        <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
            <div className="container mx-auto px-4 md:px-8">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Left Content */}
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-[#204099] dark:text-blue-300 text-sm font-semibold mb-6">
                            <ShieldCheck className="w-4 h-4" />
                            Why choose Homeday
                        </div>
                        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6 leading-tight">
                            Premium services, <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#204099] to-blue-500">zero compromises.</span>
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-xl">
                            We stand behind our work. Homeday brings the highest standards of safety, quality, and professionalism right to your doorstep.
                        </p>

                        <div className="space-y-8">
                            {guarantees.map((item, index) => (
                                <div key={index} className="flex gap-4 group">
                                    <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Image/Graphic */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#204099] to-blue-400 rounded-3xl transform rotate-3 scale-105 opacity-20 blur-xl dark:opacity-40"></div>
                        <div className="relative rounded-3xl overflow-hidden aspect-[4/5] md:aspect-square shadow-2xl">
                            <img
                                src="https://images.pexels.com/photos/5691651/pexels-photo-5691651.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop"
                                alt="Professional providing service"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-xl flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Customer Rating</p>
                                    <p className="text-3xl font-black text-gray-900 dark:text-white">4.88<span className="text-lg text-gray-500">/5</span></p>
                                </div>
                                <div className="w-12 h-12 rounded-full bg-[#204099] flex items-center justify-center text-white">
                                    <ArrowUpRight className="w-6 h-6" />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
