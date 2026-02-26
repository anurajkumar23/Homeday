import { Calendar, Clock, Star } from "lucide-react";
import { motion, Variants } from "motion/react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 24 } },
};

export default function ServiceShowcase() {
  return (
    <div className="relative hidden md:block">
      {/* Main Grid Container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-12 grid-rows-5 gap-3 h-[500px] p-5 bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50 dark:from-gray-800/50 dark:via-gray-900/50 dark:to-gray-800/50 rounded-[2.5rem] shadow-2xl shadow-[#204099]/10 border border-white/50 dark:border-gray-800 backdrop-blur-3xl"
      >
        {/* Hero Service - House Cleaning (Large focal point) */}
        <motion.div variants={itemVariants} className="col-span-6 row-span-3 relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer">
          <img
            src="/Images/kitchen-cleaning.jpeg"
            alt="Professional house cleaning service"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          <div className="absolute top-3 left-3 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md px-3 py-1 rounded-full shadow-sm">
            <span className="text-xs font-bold text-[#204099] dark:text-blue-400 flex items-center gap-1">
              <span className="text-[10px]">✨</span> Most Popular
            </span>
          </div>

          <div className="absolute bottom-5 left-5 text-white">
            <h3 className="font-bold text-xl mb-1 transform group-hover:-translate-y-1 transition-transform">House Cleaning</h3>
            <p className="text-xs text-gray-200 mb-2 max-w-xs opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">Professional deep cleaning & sanitization</p>
            <div className="flex items-center space-x-3 text-xs bg-black/30 backdrop-blur-md px-2.5 py-1 rounded-lg w-max border border-white/10">
              <div className="flex items-center space-x-1">
                <Star className="h-3.5 w-3.5 text-yellow-400 fill-current" />
                <span className="font-semibold">4.9</span>
              </div>
              <span className="opacity-40">•</span>
              <span>2.5k booked</span>
              <span className="opacity-40">•</span>
              <span className="font-semibold">₹299+</span>
            </div>
          </div>
        </motion.div>

        {/* AC Service */}
        <motion.div variants={itemVariants} className="col-span-6 row-span-2 relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer">
          <img
            src="/Images/ac-repair.jpeg"
            alt="AC repair and installation service"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/10" />

          <div className="absolute top-3 right-3 bg-cyan-100/95 dark:bg-cyan-900/90 backdrop-blur-md px-2.5 py-1 rounded-full shadow-sm">
            <span className="text-[10px] font-bold text-cyan-700 dark:text-cyan-300 flex items-center gap-1">
              <span className="text-[10px]">❄️</span> Emergency
            </span>
          </div>

          <div className="absolute bottom-4 left-4 text-white">
            <h3 className="font-bold text-base mb-1 transform group-hover:-translate-y-0.5 transition-transform">AC Service & Repair</h3>
            <div className="flex items-center space-x-1.5 text-[11px] bg-black/20 backdrop-blur-md px-2 py-1 rounded-lg w-max">
              <Star className="h-3 w-3 text-yellow-400 fill-current" />
              <span>4.8 • Same day</span>
            </div>
          </div>
        </motion.div>

        {/* Plumbing Service */}
        <motion.div variants={itemVariants} className="col-span-3 row-span-2 relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer">
          <img
            src="/Images/plumber.jpeg"
            alt="Professional plumbing services"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          <div className="absolute top-3 left-3 bg-red-500/95 backdrop-blur-md px-2 py-0.5 rounded-full shadow-sm">
            <span className="text-[10px] font-bold text-white flex items-center">🚨 24/7</span>
          </div>

          <div className="absolute bottom-3 left-3 text-white">
            <h3 className="font-bold text-sm mb-0.5">Plumbing</h3>
            <p className="text-[10px] text-gray-300">Leaks & Repairs</p>
          </div>
        </motion.div>

        {/* Electrical Service */}
        <motion.div variants={itemVariants} className="col-span-3 row-span-2 relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer">
          <img
            src="/Images/electrician.jpeg"
            alt="Electrical repair and installation"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          <div className="absolute top-3 right-3 bg-yellow-100/95 dark:bg-yellow-900/90 backdrop-blur-md px-2 py-0.5 rounded-full shadow-sm">
            <span className="text-[10px] font-bold text-yellow-800 dark:text-yellow-300">⚡ Fast</span>
          </div>

          <div className="absolute bottom-3 left-3 text-white">
            <h3 className="font-bold text-sm mb-0.5">Electrical</h3>
            <p className="text-[10px] text-gray-300">Wiring & Switches</p>
          </div>
        </motion.div>

        {/* Salon Services */}
        <motion.div variants={itemVariants} className="col-span-4 row-span-2 relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer">
          <img
            src="/Images/salon-massage.jpeg"
            alt="Home salon and beauty services"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />

          <div className="absolute top-3 left-3 bg-gradient-to-r from-pink-500 to-purple-500 px-2 py-0.5 rounded-full shadow-sm">
            <span className="text-[10px] font-bold text-white">💅 Trending</span>
          </div>

          <div className="absolute bottom-3 left-4 text-white">
            <h3 className="font-bold text-base">Salon at Home</h3>
            <p className="text-[10px] text-gray-300">Facial & Massage</p>
          </div>
        </motion.div>

        {/* Painting Service */}
        <motion.div variants={itemVariants} className="col-span-2 row-span-2 relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer">
          <img
            src="/Images/cooking-service.jpeg"
            alt="Professional painting services"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          <div className="absolute bottom-3 left-3 text-white">
            <h3 className="font-bold text-sm mb-0.5">Painting</h3>
            <p className="text-[10px] text-gray-300">Interior</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating Trust Cards */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.6, type: "spring" }}
        className="absolute -bottom-6 -left-6 p-4 shadow-2xl backdrop-blur-xl bg-white/95 dark:bg-gray-800/95 border border-gray-100 dark:border-gray-700 rounded-3xl z-20 group hover:-translate-y-1 transition-transform"
      >
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-[#204099] to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-[#204099]/30">
            <Calendar className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="font-extrabold text-sm text-gray-900 dark:text-white">Same Day Service</div>
            <div className="text-xs font-medium text-gray-500 dark:text-gray-400 flex items-center mt-0.5">
              <Clock className="h-3 w-3 mr-1 text-[#204099] dark:text-blue-400" />
              Available 24/7 • 90min arrival
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.9, duration: 0.6, type: "spring" }}
        className="absolute -top-6 -right-6 p-5 shadow-2xl backdrop-blur-xl bg-white/95 dark:bg-gray-800/95 border border-gray-100 dark:border-gray-700 rounded-3xl text-center z-20 group hover:-translate-y-1 transition-transform"
      >
        <div className="text-4xl font-black bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent transform group-hover:scale-110 transition-transform">
          4.8<span className="text-2xl">★</span>
        </div>
        <div className="text-xs font-bold text-gray-900 dark:text-white mt-1">Customer Rating</div>
        <div className="text-[10px] font-medium text-gray-500 dark:text-gray-400 mt-0.5">50,000+ happy customers</div>
      </motion.div>
    </div>
  );
}
