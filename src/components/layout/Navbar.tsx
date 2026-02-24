// app/components/Navbar.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  User,
  Phone,
  Sparkles,
  Clock,
  Shield,
  Star,
  ShoppingCart,
  CalendarCheck,
  ChevronDown,
} from "lucide-react";
import SearchBar from "./Searchbar";
import { ThemeToggle } from "../ThemeToggle";

const BRAND_COLOR = "#204099";
const SCROLL_THRESHOLD = 40; // px before the bar shrinks

/* ───────── Desktop-only links ───────── */
function DesktopLinks() {
  const items = [
    { href: "/bookings", icon: <CalendarCheck className="mr-1 h-5 w-5" />, label: "Bookings" },
    { href: "/cart", icon: <ShoppingCart className="mr-1 h-5 w-5" />, label: "Cart" },
    { href: "/profile", icon: <User className="mr-1 h-5 w-5" />, label: "Profile" },
  ];

  return (
    <div className="hidden md:flex items-center gap-6">
      {items.map(({ href, icon, label }) => (
        <Link
          key={href}
          href={href}
          className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
        >
          {icon}
          <span className="text-sm font-medium">{label}</span>
        </Link>
      ))}

      <Link
        href="/contact"
        className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-[#204099] to-[#173172] hover:from-[#3252ad] hover:to-[#224194] px-3 py-2 text-sm font-medium text-white shadow-md hover:shadow-lg transition-all"
      >
        <Phone className="h-4 w-4" />
        Contact
      </Link>

      <div className="ml-2 text-gray-700 dark:text-gray-300">
        <ThemeToggle />
      </div>
    </div>
  );
}

/* ───────── Trust indicators (desktop) ───────── */
function TrustIndicators({ hidden }: { hidden: boolean }) {
  if (hidden) return null;

  const icons = [
    { icon: <Clock className="h-3 w-3 text-blue-600" />, label: "90-min arrival" },
    { icon: <Shield className="h-3 w-3 text-green-600" />, label: "Verified pros" },
    { icon: <Star className="h-3 w-3 text-yellow-600" />, label: "4.8/5 rating" },
  ];

  return (
    <div className="hidden md:block border-b bg-gradient-to-r from-gray-50 from-10% to-[#204099]/5 to-90%">
      <div className="container mx-auto flex justify-center gap-8 px-4 py-3 text-sm text-gray-700">
        {icons.map(({ icon, label }) => (
          <span key={label} className="flex items-center gap-2 font-medium">
            {icon}
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ───────── Mobile location row ───────── */
function MobileLocation({
  expanded,
  toggle,
}: {
  expanded: boolean;
  toggle: () => void;
}) {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-2">
        <MapPin className="h-4 w-4 text-[--brand]" style={{ "--brand": BRAND_COLOR } as React.CSSProperties} />
        <div className="flex flex-col">
          <span className="text-sm font-semibold">S/9</span>
          <span className="truncate text-xs text-gray-600">
            Fraser Road – Budh Vihar – Fraser Road …
          </span>
        </div>
      </div>

      <button
        onClick={toggle}
        aria-expanded={expanded}
        className="inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs text-gray-700 hover:bg-gray-50"
      >
        <ChevronDown
          className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`}
        />
      </button>
    </div>
  );
}

/* ───────── Main navbar component ───────── */
export default function Navbar() {
  const [shrink, setShrink] = useState(false);
  const [locOpen, setLocOpen] = useState(false);

  /* Scroll listener (10 lines, ultra-light) */
  useEffect(() => {
    const onScroll = () => setShrink(window.scrollY > SCROLL_THRESHOLD);
    onScroll(); // init state
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ─── Announcement (mobile only before shrink) ─── */}
      {!shrink && (
        <div className="relative overflow-hidden bg-gradient-to-r from-[#204099] via-[#1a3a90] to-[#173172] py-2.5 px-4 text-center text-sm text-white">
          <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="relative z-10 flex items-center justify-center gap-2">
            <Sparkles className="h-4 w-4 animate-pulse" />
            <span>
              🎉 Get 20% off with code&nbsp;
              <strong className="rounded-md bg-white/20 px-2 py-1">HOMEDAY20</strong>
            </span>
          </div>
        </div>
      )}

      {/* ─── Sticky container (everything lives inside) ─── */}
      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-sm">
        {/* Desktop row (logo + desktop search + links) */}
        <div className="hidden container mx-auto md:flex h-16 items-center justify-between px-4">
          {/* Logo (always desktop, hides on mobile shrink) */}
          <Link
            href="/"
            className="group flex items-center gap-3 md:flex"
            style={{ color: BRAND_COLOR }}
          >
            <Image
              src="/Homeday%20logos-512.png"
              alt="Homeday logo"
              width={40}
              height={40}
              className="rounded-xl shadow-lg"
              priority
            />
            <span className="text-2xl font-black tracking-tight transition-transform group-hover:scale-105 md:inline">
              Homeday
            </span>
          </Link>

          {/* Desktop search */}
          <div className="mx-8 hidden max-w-3xl flex-1 md:block">
            <SearchBar />
          </div>

          {/* Desktop nav links */}
          <DesktopLinks />
        </div>

        {/* Mobile: brand + location rows (collapse with animation) */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${shrink ? "max-h-0 opacity-0" : "max-h-[260px] opacity-100"
            }`}
        >
          {/* Logo row */}
          <div className="flex items-center gap-2 px-4 py-3">
            <Image
              src="/Homeday%20logos-512.png"
              alt="Homeday logo"
              width={32}
              height={32}
              className="rounded-lg shadow"
              priority
            />
            <span className="text-lg font-bold" style={{ color: BRAND_COLOR }}>
              Homeday
            </span>
          </div>

          {/* Location */}
          <div className="border-b border-gray-100 dark:border-gray-800 px-4 flex justify-between items-center bg-white dark:bg-gray-950">
            <MobileLocation
              expanded={locOpen}
              toggle={() => setLocOpen(!locOpen)}
            />
            <div className="text-gray-700 dark:text-gray-300">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Search */}
          <div className="px-4 py-3 bg-white dark:bg-gray-950">
            <SearchBar />
          </div>
        </div>
      </nav>

      {/* Desktop trust indicators */}
      <TrustIndicators hidden={shrink} />
    </>
  );
}
