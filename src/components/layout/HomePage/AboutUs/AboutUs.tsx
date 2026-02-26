import { Target, Lightbulb, ShieldCheck, HeartPulse } from "lucide-react";

export default function AboutUs() {
    return (
        <section className="bg-gray-50 dark:bg-gray-900/50 py-16 md:py-24">
            <div className="container mx-auto px-4">
                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-6">
                        About <span className="text-[#204099] dark:text-blue-400">Homeday</span>
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 font-medium leading-relaxed">
                        Homeday is a fast-growing home services platform built to simplify everyday household needs. We provide trusted, verified and affordable professionals for cleaning, cooking, technical repairs and home assistance — all at fixed prices.
                    </p>
                    <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                        <p className="text-xl md:text-2xl font-black italic text-gray-800 dark:text-gray-200">
                            "Har ghar ko reliable aur affordable service mile, bina tension ke."
                        </p>
                        <p className="text-sm mt-3 font-semibold text-gray-500 uppercase tracking-wider">
                            — Founded under Aroma Real Estate (Private Limited)
                        </p>
                    </div>
                </div>

                {/* Vision & Mission Grid */}
                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-20">
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                        <div className="h-12 w-12 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-6">
                            <Target className="h-6 w-6 text-[#204099] dark:text-blue-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            To make home services affordable, organized and easily accessible for every household in India. From basic room cleaning to full house deep cleaning, we ensure quality, safety and convenience at your doorstep.
                        </p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                        <div className="h-12 w-12 bg-green-50 dark:bg-green-900/30 rounded-2xl flex items-center justify-center mb-6">
                            <Lightbulb className="h-6 w-6 text-green-600 dark:text-green-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Vision</h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            To become India's most trusted hyperlocal home service platform by empowering service providers and delivering consistent quality to customers.
                        </p>
                    </div>
                </div>

                {/* Why Homeday & Growth Stats */}
                <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
                    {/* What Makes Us Different */}
                    <div className="lg:col-span-3 bg-[#204099] rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-white/10 rounded-full blur-3xl mix-blend-overlay"></div>
                        <h3 className="text-2xl md:text-3xl font-bold mb-8">What Makes Homeday Different?</h3>
                        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
                            {[
                                "Fixed Transparent Pricing",
                                "Verified & Trained Providers",
                                "Company Provided Products",
                                "Instant & Scheduled Booking",
                                "Quick Customer Support",
                                "Focus on Local Jobs"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <ShieldCheck className="h-5 w-5 text-blue-300 flex-shrink-0" />
                                    <span className="font-medium text-blue-50">{item}</span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-10 pt-8 border-t border-white/20">
                            <p className="text-blue-100 italic font-medium leading-relaxed">
                                We are not just a service company — we are building a system where local workers get regular income and families get reliable help.
                            </p>
                        </div>
                    </div>

                    {/* Growth Stats */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 text-center">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Our Current Progress</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-2xl">
                                    <div className="text-3xl font-black text-[#204099] dark:text-blue-400 mb-1">1K+</div>
                                    <div className="text-xs font-semibold text-gray-500 uppercase">Orders</div>
                                </div>
                                <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-2xl">
                                    <div className="text-3xl font-black text-[#204099] dark:text-blue-400 mb-1">300+</div>
                                    <div className="text-xs font-semibold text-gray-500 uppercase">Providers</div>
                                </div>
                            </div>
                            <p className="mt-6 text-sm text-gray-600 dark:text-gray-400 font-medium">
                                Active in Patna.<br />
                                Expanding to Gurgaon, Noida & Lucknow.
                            </p>
                        </div>
                        <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-8 rounded-3xl shadow-sm text-white text-center flex flex-col items-center justify-center">
                            <HeartPulse className="h-8 w-8 text-green-100 mb-3" />
                            <h4 className="text-lg font-bold mb-2">Our Commitment</h4>
                            <p className="text-sm text-green-50 font-medium opacity-90">
                                Safety. Quality. Affordability. Trust.<br />
                                Every service is delivered with care.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
