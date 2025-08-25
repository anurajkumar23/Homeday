"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Menu,
  X,
  MapPin,
  User,
  Phone,
  Sparkles,
  Clock,
  Shield,
  Star,
  ShoppingCart,
  CalendarCheck,
} from "lucide-react";
import SearchBar from "./Searchbar";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Brand colors
  const brandColor = "#204099";

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-gradient-to-r from-blue-700 via-purple-700 to-blue-800 text-white text-sm py-2.5 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
        <div className="text-sm md:text-md container mx-auto flex items-center justify-center relative z-10">
          <Sparkles className="h-4 w-4 mr-2 animate-pulse" />
          <span>
            🎉 Get 20% off on your first booking! Use code:{" "}
            <strong className="bg-white/20 px-2 py-1 rounded-md">
              HOMEDAY20
            </strong>
          </span>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <div
                className="h-10 w-10 rounded-xl flex items-center justify-center shadow-lg relative overflow-hidden"
                style={{ backgroundColor: brandColor }}
              >
                <span className="text-white font-bold text-lg relative z-10">
                  H
                </span>
              </div>
              <span
                className="text-xl font-bold group-hover:scale-105 transition-transform duration-200"
                style={{ color: brandColor }}
              >
                Homeday
              </span>
            </Link>

            {/* Search (Desktop) */}
            <div className=" md:flex flex-1 justify-center px-6">
              <SearchBar />
            </div>

            {/* Right Section (Desktop) */}
            <div className="hidden md:flex items-center space-x-6">
              <Link
                href="/bookings"
                className="flex items-center text-gray-600 hover:text-blue-600 transition"
              >
                <CalendarCheck className="h-5 w-5 mr-1" />
                <span className="text-sm font-medium">Bookings</span>
              </Link>

              <Link
                href="/cart"
                className="flex items-center text-gray-600 hover:text-blue-600 transition"
              >
                <ShoppingCart className="h-5 w-5 mr-1" />
                <span className="text-sm font-medium">Cart</span>
              </Link>

              <Link
                href="/profile"
                className="flex items-center text-gray-600 hover:text-blue-600 transition"
              >
                <User className="h-5 w-5 mr-1" />
                <span className="text-sm font-medium">Profile</span>
              </Link>

              <Link
                href="/contact"
                className="flex items-center px-3 py-2 rounded-lg text-white text-sm font-medium shadow-md hover:shadow-lg transition"
                style={{ backgroundColor: brandColor }}
              >
                <Phone className="h-4 w-4 mr-1" />
                Contact
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-gray-100 transition"
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Search (Mobile) */}
          {isMenuOpen && (
            <div className="md:hidden border-t pt-3 pb-4 space-y-3">
              {/* Mobile Links */}
              <Link
                href="/bookings"
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                <CalendarCheck className="h-5 w-5 mr-2" />
                Bookings
              </Link>

              <Link
                href="/cart"
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Cart
              </Link>

              <Link
                href="/profile"
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                <User className="h-5 w-5 mr-2" />
                Profile
              </Link>

              <Link
                href="/contact"
                className="flex items-center px-4 py-2 text-white rounded-lg font-medium shadow-md"
                style={{ backgroundColor: brandColor }}
              >
                <Phone className="h-5 w-5 mr-2" />
                Contact
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Trust Indicators */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50/30 border-b py-3 hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-600">
            <div className="flex items-center group">
              <Clock className="h-3 w-3 mr-2 text-blue-600" />
              <span className="font-medium">90-min arrival</span>
            </div>
            <div className="flex items-center group">
              <Shield className="h-3 w-3 mr-2 text-green-600" />
              <span className="font-medium">Verified professionals</span>
            </div>
            <div className="flex items-center group">
              <Star className="h-3 w-3 mr-2 text-yellow-600" />
              <span className="font-medium">4.8/5 customer rating</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
