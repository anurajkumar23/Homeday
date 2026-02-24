import { Calendar, Clock, Star } from "lucide-react";

export default function ServiceShowcase() {
  return (
    <div className="relative hidden md:block">
      {/* Main Grid Container */}
      <div className="grid grid-cols-12 grid-rows-5 gap-3 h-[500px] p-5 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 rounded-3xl shadow-xl dark:shadow-2xl dark:shadow-black/20">

        {/* Hero Service - House Cleaning (Large focal point) */}
        <div className="col-span-6 row-span-3 relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer">
          <img
            src="https://images.pexels.com/photos/5691622/pexels-photo-5691622.jpeg?auto=compress&cs=tinysrgb&w=600&h=500&fit=crop"
            alt="Professional house cleaning service"
            className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

          <div className="absolute top-3 left-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-3 py-1 rounded-full">
            <span className="text-xs font-bold text-primary">🧹 Most Popular</span>
          </div>

          <div className="absolute bottom-5 left-5 text-white">
            <h3 className="font-bold text-xl mb-1">House Cleaning</h3>
            <p className="text-xs opacity-90 mb-2 max-w-xs">Professional deep cleaning & sanitization</p>
            <div className="flex items-center space-x-3 text-xs">
              <div className="flex items-center space-x-1">
                <Star className="h-3.5 w-3.5 text-yellow-400 fill-current" />
                <span className="font-semibold">4.9</span>
              </div>
              <span className="opacity-60">•</span>
              <span>2.5k bookings</span>
              <span className="opacity-60">•</span>
              <span className="opacity-75">₹299+</span>
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
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/20" />

          <div className="absolute top-3 right-3 bg-cyan-100/90 dark:bg-cyan-900/70 backdrop-blur-sm px-2 py-0.5 rounded-full">
            <span className="text-[10px] font-bold text-cyan-700 dark:text-cyan-300">❄️ Emergency</span>
          </div>

          <div className="absolute bottom-3 left-4 text-white">
            <h3 className="font-bold text-base mb-0.5">AC Service & Repair</h3>
            <p className="text-[11px] opacity-80 mb-1">Installation • Maintenance • Gas Refill</p>
            <div className="flex items-center space-x-1.5 text-[11px]">
              <Star className="h-3 w-3 text-yellow-400 fill-current" />
              <span>4.8 • Same day service</span>
            </div>
          </div>
        </div>

        {/* Plumbing Service */}
        <div className="col-span-3 row-span-2 relative rounded-xl overflow-hidden shadow-lg group cursor-pointer">
          <img
            src="https://images.pexels.com/photos/5691630/pexels-photo-5691630.jpeg?auto=compress&cs=tinysrgb&w=300&h=250&fit=crop"
            alt="Professional plumbing services"
            className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          <div className="absolute top-3 left-3 bg-red-500/90 backdrop-blur-sm px-2 py-0.5 rounded-full">
            <span className="text-[10px] font-bold text-white">🚨 24/7</span>
          </div>

          <div className="absolute bottom-3 left-3 text-white">
            <h3 className="font-bold text-sm mb-0.5">Plumbing</h3>
            <p className="text-[10px] opacity-80">Leaks • Repairs • Installation</p>
          </div>
        </div>

        {/* Electrical Service */}
        <div className="col-span-3 row-span-2 relative rounded-xl overflow-hidden shadow-lg group cursor-pointer">
          <img
            src="https://images.pexels.com/photos/5691624/pexels-photo-5691624.jpeg?auto=compress&cs=tinysrgb&w=300&h=250&fit=crop"
            alt="Electrical repair and installation"
            className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          <div className="absolute top-3 right-3 bg-yellow-100/90 dark:bg-yellow-900/70 backdrop-blur-sm px-2 py-0.5 rounded-full">
            <span className="text-[10px] font-bold text-yellow-800 dark:text-yellow-300">⚡ Certified</span>
          </div>

          <div className="absolute bottom-3 left-3 text-white">
            <h3 className="font-bold text-sm mb-0.5">Electrical</h3>
            <p className="text-[10px] opacity-80">Wiring • Switches • Appliances</p>
          </div>
        </div>

        {/* Salon Services */}
        <div className="col-span-4 row-span-2 relative rounded-xl overflow-hidden shadow-lg group cursor-pointer">
          <img
            src="https://images.pexels.com/photos/5691651/pexels-photo-5691651.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop"
            alt="Home salon and beauty services"
            className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />

          <div className="absolute top-3 left-3 bg-gradient-to-r from-pink-500 to-purple-500 px-2 py-0.5 rounded-full">
            <span className="text-[10px] font-bold text-white">💅 Trending</span>
          </div>

          <div className="absolute bottom-3 left-4 text-white">
            <h3 className="font-bold text-base">Salon at Home</h3>
            <p className="text-[10px] opacity-80">Haircut • Facial • Manicure • Massage</p>
          </div>
        </div>

        {/* Painting Service */}
        <div className="col-span-2 row-span-2 relative rounded-xl overflow-hidden shadow-lg group cursor-pointer">
          <img
            src="https://images.pexels.com/photos/6195125/pexels-photo-6195125.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop"
            alt="Professional painting services"
            className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          <div className="absolute bottom-3 left-3 text-white">
            <h3 className="font-bold text-xs mb-0.5">Painting</h3>
            <p className="text-[10px] opacity-80">Interior & Exterior</p>
          </div>
        </div>
      </div>

      {/* Only 2 floating cards: Same Day Service + Rating */}
      <div className="absolute -bottom-6 -left-6 p-4 shadow-xl backdrop-blur-md bg-white/90 dark:bg-gray-800/90 border border-white/30 dark:border-gray-700/50 rounded-2xl">
        <div className="flex items-center space-x-3">
          <div className="w-11 h-11 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
            <Calendar className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="font-bold text-sm text-gray-900 dark:text-white">Same Day Service</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              Available 24/7 • 90min arrival
            </div>
          </div>
        </div>
      </div>

      <div className="absolute -top-6 -right-6 p-4 shadow-xl backdrop-blur-md bg-white/90 dark:bg-gray-800/90 border border-white/30 dark:border-gray-700/50 rounded-2xl text-center">
        <div className="text-3xl font-black bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent mb-0.5">
          4.8★
        </div>
        <div className="text-xs font-bold text-gray-900 dark:text-white">Customer Rating</div>
        <div className="text-[10px] text-gray-500 dark:text-gray-400">50,000+ happy customers</div>
      </div>
    </div>
  );
}
