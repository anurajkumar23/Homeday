"use client";

import { useEffect, useState } from "react";
import SearchBar from "./Searchbar";

export default function GlobalSlideDownSearch() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show the search bar when scrolled past 250px
            setIsVisible(window.scrollY > 250);
        };

        // Initial check
        handleScroll();

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div
            className={`fixed top-0 left-0 right-0 z-[60] bg-white/90 dark:bg-gray-950/90 backdrop-blur-xl shadow-md border-b border-gray-200 dark:border-gray-800 transition-transform duration-500 ease-spring ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
                }`}
        >
            <div className="container mx-auto px-4 py-3 sm:py-4 flex items-center justify-center">
                <div className="w-full max-w-4xl">
                    <SearchBar />
                </div>
            </div>
        </div>
    );
}
