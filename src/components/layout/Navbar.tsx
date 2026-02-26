// app/components/Navbar.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  User,
  Phone,
  ShoppingCart,
  CalendarCheck,
} from "lucide-react";
import SearchBar from "./Searchbar";
import { ThemeToggle } from "../ThemeToggle";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ─── Promo banner ─── */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#204099] to-[#2d50b0] py-1.5 px-4 text-center text-xs sm:text-sm text-white/90">
        <span>
          🎉 Get 20% off your first booking — code{" "}
          <strong className="rounded bg-white/15 px-1.5 py-0.5 text-white font-bold">HOMEDAY20</strong>
        </span>
      </div>

      {/* ─── Navbar ─── */}
      <nav
        className={`sticky top-0 z-40 transition-all duration-300 ${scrolled
            ? "bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl shadow-md"
            : "bg-white dark:bg-gray-950 shadow-sm"
          } border-b border-gray-100 dark:border-gray-800`}
      >
        <div className="container mx-auto px-3 sm:px-4">
          <div className="flex items-center gap-2 sm:gap-3 h-14 md:h-16">
            {/* ── Logo ── */}
            <Link href="/" className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0 group">
              <Image
                src="/Homeday%20logos-512.png"
                alt="Homeday logo"
                width={34}
                height={34}
                className="rounded-xl shadow-sm group-hover:shadow-md transition-shadow"
                priority
              />
              <span className="text-lg sm:text-xl md:text-2xl font-black tracking-tight text-[#204099] dark:text-white hidden xs:inline">
                Homeday
              </span>
            </Link>

            {/* ── Search bar ── */}
            <div className="flex-1 min-w-0 mx-1 md:mx-6 lg:mx-8 max-w-2xl">
              <SearchBar />
            </div>

            {/* ── Right actions ── */}
            <div className="flex items-center gap-0.5 sm:gap-1 md:gap-2 flex-shrink-0">
              <Link
                href="/bookings"
                className="hidden md:flex items-center gap-1.5 text-gray-500 dark:text-gray-400 hover:text-[#204099] dark:hover:text-blue-400 transition-colors px-2.5 py-2 rounded-xl hover:bg-[#204099]/5 dark:hover:bg-blue-900/20"
              >
                <CalendarCheck className="h-[18px] w-[18px]" />
                <span className="text-sm font-medium">Bookings</span>
              </Link>
              <Link
                href="/cart"
                className="hidden md:flex items-center gap-1.5 text-gray-500 dark:text-gray-400 hover:text-[#204099] dark:hover:text-blue-400 transition-colors px-2.5 py-2 rounded-xl hover:bg-[#204099]/5 dark:hover:bg-blue-900/20"
              >
                <ShoppingCart className="h-[18px] w-[18px]" />
                <span className="text-sm font-medium">Cart</span>
              </Link>
              <Link
                href="/profile"
                className="flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-[#204099] dark:hover:text-blue-400 transition-colors p-2 rounded-xl hover:bg-[#204099]/5 dark:hover:bg-blue-900/20"
              >
                <User className="h-[18px] w-[18px]" />
                <span className="text-sm font-medium hidden md:inline">Profile</span>
              </Link>

              {/* Contact CTA */}
              <Link
                href="/contact"
                className="hidden lg:flex items-center gap-1.5 rounded-full bg-[#204099] hover:bg-[#173172] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:shadow-md transition-all active:scale-[0.97]"
              >
                <Phone className="h-3.5 w-3.5" />
                Contact
              </Link>

              <div className="text-gray-500 dark:text-gray-400 ml-0.5">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
