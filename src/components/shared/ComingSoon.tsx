"use client";

import Link from "next/link";
import * as icons from "lucide-react";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/footer";
import { Badge } from "@/components/ui/badge";

interface ComingSoonProps {
    title: string;
    description: string;
    iconName: string;
}

export default function ComingSoon({ title, description, iconName }: ComingSoonProps) {
    const Icon = (icons as any)[iconName] || icons.HelpCircle;

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-gray-950 relative overflow-hidden">
                {/* Decorative background blobs */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

                <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-2xl shadow-gray-200/50 dark:shadow-black/50 rounded-3xl p-8 md:p-12 max-w-lg w-full text-center relative z-10 overflow-hidden transform transition-all">
                    <div className="absolute -top-16 -right-16 w-32 h-32 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-2xl" />

                    <div className="relative flex flex-col items-center">
                        <div className="h-24 w-24 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-blue-100/50 dark:border-blue-800/30 rotate-3 transition-transform hover:rotate-0 duration-300">
                            <Icon className="h-12 w-12 text-[#204099] dark:text-blue-400" strokeWidth={1.5} />
                        </div>

                        <Badge className="mb-5 bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/40 border-0 px-3 py-1 text-xs font-bold uppercase tracking-widest shadow-sm">
                            Coming Soon
                        </Badge>

                        <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
                            {title}
                        </h1>

                        <p className="text-gray-500 dark:text-gray-400 text-lg mb-10 leading-relaxed font-medium">
                            {description}
                        </p>

                        <Link href="/" className="inline-flex items-center justify-center gap-2 bg-[#204099] hover:bg-[#1a3a90] text-white font-bold py-3.5 px-8 rounded-xl shadow-lg shadow-blue-900/20 transition-all hover:scale-105 active:scale-95 w-full sm:w-auto">
                            <ArrowLeft className="w-5 h-5" />
                            Back to Home
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
