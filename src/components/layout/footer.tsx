import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-950 text-gray-700 dark:text-gray-300 border-t dark:border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg overflow-hidden bg-white">
                <Image src="/Homeday%20logos-512.png" alt="Homeday logo" width={40} height={40} className="object-contain" />
              </div>
              <h3 className="text-2xl font-serif font-black text-[#204099]">Homeday</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Your trusted partner for professional home services. Connecting you with verified experts for all your
              home needs.
            </p>
            <div className="flex space-x-2">
              <Button aria-label="Facebook" variant="ghost" size="sm" className="text-[#204099] hover:bg-[#204099]/10">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button aria-label="Twitter" variant="ghost" size="sm" className="text-[#204099] hover:bg-[#204099]/10">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button aria-label="Instagram" variant="ghost" size="sm" className="text-[#204099] hover:bg-[#204099]/10">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button aria-label="LinkedIn" variant="ghost" size="sm" className="text-[#204099] hover:bg-[#204099]/10">
                <Linkedin className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-[#204099]">Services</h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li>
                <a href="#" className="hover:text-[#204099] transition-colors">
                  Cleaning Services
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#204099] transition-colors">
                  Home Repairs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#204099] transition-colors">
                  Painting
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#204099] transition-colors">
                  Electrical Work
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#204099] transition-colors">
                  Plumbing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#204099] transition-colors">
                  Beauty Services
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-[#204099]">Company</h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li>
                <Link href="/about" className="hover:text-[#204099] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-[#204099] transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#204099] transition-colors">
                  Become a Pro
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#204099] transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#204099] transition-colors">
                  Press
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#204099] transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-[#204099]">Stay Connected</h4>
            <div className="space-y-3 text-gray-700 dark:text-gray-400">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>1-800-HOMEDAY</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>support@homeday.co.in</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Available Nationwide</span>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-500">Subscribe to our newsletter</p>
              <div className="flex space-x-2">
                <Input
                  placeholder="Your email"
                  className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-500 border-gray-300 dark:border-gray-700"
                />
                <Button size="sm" className="bg-gradient-to-r from-[#204099] to-[#173172] hover:from-[#183a8a] hover:to-[#122a64] text-white">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500 dark:text-gray-500 text-sm">© 2025 Homeday. All rights reserved.</p>
            <div className="flex space-x-6 text-sm text-gray-500 dark:text-gray-500">
              <a href="#" className="hover:text-[#204099] transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-[#204099] transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-[#204099] transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
