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

const BRAND_COLOR = "#204099";
const SCROLL_THRESHOLD = 40; // px before the bar shrinks

/* ───────── Desktop-only links ───────── */
function DesktopLinks() {
  const items = [
    { href: "/bookings", icon: <CalendarCheck className="mr-1 h-5 w-5" />, label: "Bookings" },
    { href: "/cart",     icon: <ShoppingCart className="mr-1 h-5 w-5" />, label: "Cart" },
    { href: "/profile",  icon: <User className="mr-1 h-5 w-5" />,          label: "Profile" },
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
        className="flex items-center gap-1 rounded-lg bg-[--brand] px-3 py-2 text-sm font-medium text-white shadow-md hover:shadow-lg transition-shadow"
        style={{ "--brand": BRAND_COLOR } as React.CSSProperties}
      >
        <Phone className="h-4 w-4" />
        Contact
      </Link>
    </div>
  );
}

/* ───────── Trust indicators (desktop) ───────── */
function TrustIndicators({ hidden }: { hidden: boolean }) {
  if (hidden) return null;

  const icons = [
    { icon: <Clock  className="h-3 w-3 text-blue-600"   />, label: "90-min arrival" },
    { icon: <Shield className="h-3 w-3 text-green-600"  />, label: "Verified pros"   },
    { icon: <Star   className="h-3 w-3 text-yellow-600" />, label: "4.8/5 rating"   },
  ];

  return (
    <div className="hidden md:block border-b bg-gradient-to-r from-gray-50 to-blue-50/30">
      <div className="container mx-auto flex justify-center gap-8 px-4 py-3 text-sm text-gray-600">
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
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-purple-700 to-blue-800 py-2.5 px-4 text-center text-sm text-white">
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
            className="group flex items-center gap-2 md:flex"
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
            <span className=" text-xl font-bold transition-transform group-hover:scale-105 md:inline">
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
          className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ${
            shrink ? "max-h-0 opacity-0" : "max-h-[148px] opacity-100"
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
          <div className="border-b border-gray-100 px-4">
            <MobileLocation
              expanded={locOpen}
              toggle={() => setLocOpen(!locOpen)}
            />
          </div>
        </div>

        {/* Mobile sticky search (always present, sticks automatically) */}
        <div className="sticky top-0 z-50 border-t bg-white/95 backdrop-blur-md md:hidden">
          {/* Small upward slide when rows collapse */}
          <div
            className="px-4 transition-transform duration-300 translate-y-0 py-3"
          
          >
            <SearchBar />
          </div>
        </div>
      </nav>

      {/* Desktop trust indicators */}
      <TrustIndicators hidden={shrink} />
    </>
  );
}
