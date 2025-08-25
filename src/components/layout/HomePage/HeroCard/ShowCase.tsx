import { Calendar, Clock, Phone, Shield, Star } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function ServiceShowcase() {
  return (
<div className="relative hidden md:block">
  {/* Main Grid Container */}
  <div className="grid grid-cols-12 grid-rows-6 gap-4 h-[600px] p-6 bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-3xl shadow-2xl">
    
    {/* Hero Service - House Cleaning (Large focal point) */}
    <div className="col-span-6 row-span-4 relative rounded-2xl overflow-hidden shadow-xl group cursor-pointer">
      <img
        src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=500&fit=crop"
        alt="Professional house cleaning service"
        className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500 ease-out"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-blue-600/20 to-transparent group-hover:from-blue-900/70 transition-all duration-300" />
      
      {/* Service Badge */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
        <span className="text-sm font-semibold text-blue-600">🧹 Most Popular</span>
      </div>
      
      {/* Content */}
      <div className="absolute bottom-6 left-6 text-white">
        <h3 className="font-bold text-2xl mb-2 group-hover:text-blue-200 transition-colors">House Cleaning</h3>
        <p className="text-sm opacity-90 mb-3 max-w-xs">Professional deep cleaning, regular maintenance, and sanitization services</p>
        <div className="flex items-center space-x-4 mb-2">
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium">4.9</span>
          </div>
          <span className="text-xs opacity-75">•</span>
          <span className="text-sm">2.5k bookings</span>
        </div>
        <div className="flex items-center text-xs opacity-75">
          <Clock className="h-3 w-3 mr-1" />
          Starting from $299
        </div>
      </div>
    </div>

    {/* AC Service */}
    <div className="col-span-6 row-span-2 relative rounded-xl overflow-hidden shadow-lg group cursor-pointer">
      <img
        src="https://plus.unsplash.com/premium_photo-1682126012378-859ca7a9f4cf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="AC repair and installation service"
        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/50 to-blue-600/30 group-hover:from-cyan-600/60 transition-all duration-300" />
      
      {/* Service Badge */}
      <div className="absolute top-3 right-3 bg-cyan-100/90 backdrop-blur-sm px-2 py-1 rounded-full">
        <span className="text-xs font-medium text-cyan-700">❄️ Emergency</span>
      </div>
      
      <div className="absolute bottom-4 left-4 text-white">
        <h3 className="font-bold text-lg mb-1">AC Service & Repair</h3>
        <p className="text-xs opacity-90 mb-2">Installation • Maintenance • Gas Refill</p>
        <div className="flex items-center space-x-2 text-xs">
          <Star className="h-3 w-3 text-yellow-400 fill-current" />
          <span>4.8 • Same day service</span>
        </div>
      </div>
    </div>

    {/* Plumbing Service */}
    <div className="col-span-3 row-span-2 relative rounded-xl overflow-hidden shadow-lg group cursor-pointer">
      <img
        src="https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=300&h=250&fit=crop"
        alt="Professional plumbing services"
        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-orange-800/70 via-orange-600/30 to-transparent group-hover:from-orange-800/80 transition-all duration-300" />
      
      {/* Emergency Badge */}
      <div className="absolute top-3 left-3 bg-red-500/90 backdrop-blur-sm px-2 py-1 rounded-full">
        <span className="text-xs font-bold text-white">🚨 24/7</span>
      </div>
      
      <div className="absolute bottom-3 left-3 text-white">
        <h3 className="font-bold text-base mb-1">Plumbing</h3>
        <p className="text-xs opacity-90 mb-1">Leaks • Repairs • Installation</p>
        <div className="text-xs flex items-center">
          <Shield className="h-3 w-3 mr-1" />
          Licensed Pro
        </div>
      </div>
    </div>

    {/* Electrical Service */}
    <div className="col-span-3 row-span-2 relative rounded-xl overflow-hidden shadow-lg group cursor-pointer">
      <img
        src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=300&h=250&fit=crop"
        alt="Electrical repair and installation"
        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-yellow-700/70 via-yellow-500/30 to-transparent group-hover:from-yellow-700/80 transition-all duration-300" />
      
      {/* Certified Badge */}
      <div className="absolute top-3 right-3 bg-yellow-100/90 backdrop-blur-sm px-2 py-1 rounded-full">
        <span className="text-xs font-bold text-yellow-800">⚡ Certified</span>
      </div>
      
      <div className="absolute bottom-3 left-3 text-white">
        <h3 className="font-bold text-base mb-1">Electrical</h3>
        <p className="text-xs opacity-90 mb-1">Wiring • Switches • Appliances</p>
        <div className="text-xs flex items-center">
          <Star className="h-3 w-3 mr-1 text-yellow-300 fill-current" />
          4.9 Rating
        </div>
      </div>
    </div>

    {/* Salon Services */}
    <div className="col-span-4 row-span-2 relative rounded-xl overflow-hidden shadow-lg group cursor-pointer">
      <img
        src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=200&fit=crop"
        alt="Home salon and beauty services"
        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-pink-600/50 via-purple-500/30 to-transparent group-hover:from-pink-600/60 transition-all duration-300" />
      
      {/* Trending Badge */}
      <div className="absolute top-3 left-3 bg-gradient-to-r from-pink-500 to-purple-500 px-2 py-1 rounded-full">
        <span className="text-xs font-bold text-white">💅 Trending</span>
      </div>
      
      <div className="absolute bottom-4 left-4 text-white">
        <h3 className="font-bold text-lg">Salon at Home</h3>
        <p className="text-xs opacity-90 mb-2">Haircut • Facial • Manicure • Massage</p>
        <div className="flex items-center space-x-2 text-xs">
          <Star className="h-3 w-3 text-yellow-400 fill-current" />
          <span>4.7 • Women specialists</span>
        </div>
      </div>
    </div>

    {/* Painting Service */}
    <div className="col-span-2 row-span-2 relative rounded-xl overflow-hidden shadow-lg group cursor-pointer">
      <img
        src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=200&h=200&fit=crop"
        alt="Professional painting services"
        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-green-700/70 via-green-500/20 to-transparent group-hover:from-green-700/80 transition-all duration-300" />
      
      <div className="absolute bottom-3 left-3 text-white">
        <h3 className="font-bold text-sm mb-1">Painting</h3>
        <p className="text-xs opacity-90 mb-1">Interior & Exterior</p>
        <div className="text-xs">🎨 Expert painters</div>
      </div>
    </div>
  </div>

  {/* Enhanced Floating Cards with Glassmorphism */}
  
  {/* Same Day Service Card */}
  <div className="absolute -bottom-8 -left-8 p-5 shadow-2xl backdrop-blur-md bg-white/80 border border-white/20 rounded-2xl">
    <div className="flex items-center space-x-4">
      <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
        <Calendar className="h-7 w-7 text-white" />
      </div>
      <div>
        <div className="font-bold text-lg text-gray-900">Same Day Service</div>
        <div className="text-sm text-gray-600 flex items-center">
          <Clock className="h-3 w-3 mr-1" />
          Available 24/7 • 90min arrival
        </div>
      </div>
    </div>
  </div>
  
  {/* Rating Card */}
  <div className="absolute -top-8 -right-8 p-5 shadow-2xl backdrop-blur-md bg-white/80 border border-white/20 rounded-2xl text-center">
    <div className="text-4xl font-black bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent mb-1">
      4.8★
    </div>
    <div className="text-sm font-bold text-gray-900">Customer Rating</div>
    <div className="text-xs text-gray-600">50,000+ happy customers</div>
    <div className="text-xs text-emerald-600 font-medium mt-1">✓ Verified reviews</div>
  </div>

  {/* Verified Professionals Card */}
  <div className="absolute top-1/3 -left-6 transform -translate-y-1/2 p-4 shadow-xl backdrop-blur-md bg-white/80 border border-white/20 rounded-xl">
    <div className="flex items-center space-x-3">
      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
        <Shield className="h-5 w-5 text-white" />
      </div>
      <div>
        <div className="font-bold text-sm text-gray-900">Verified Pros</div>
        <div className="text-xs text-gray-600">Background checked</div>
      </div>
    </div>
  </div>

  {/* Service Count Badge */}
  <div className="absolute bottom-1/4 -right-6 p-4 shadow-xl backdrop-blur-md bg-white/80 border border-white/20 rounded-xl text-center">
    <div className="text-2xl font-black bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
      200+
    </div>
    <div className="text-xs font-bold text-gray-900">Services</div>
    <div className="text-xs text-gray-600">All categories</div>
  </div>

  {/* Book Now Floating Button */}
  <div className="absolute bottom-1/2 right-1/4 transform translate-y-1/2">
    <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-full shadow-2xl hover:shadow-blue-500/25 hover:scale-105 transition-all duration-300 backdrop-blur-sm border border-white/20">
      <span className="flex items-center space-x-2">
        <Phone className="h-4 w-4" />
        <span>Book Now</span>
      </span>
    </button>
  </div>

  {/* Decorative Elements */}
  <div className="absolute top-4 left-4 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl"></div>
  <div className="absolute bottom-8 right-8 w-32 h-32 bg-gradient-to-br from-pink-400/20 to-orange-400/20 rounded-full blur-xl"></div>
</div>

  );
}
