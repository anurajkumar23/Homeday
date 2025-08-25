import { Star, Shield, Clock, Users, CheckCircle, Award, Play, Sparkles } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-screen flex items-center bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(32,64,153,0.15),transparent_60%)] animate-pulse"></div>
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(32,64,153,0.1),transparent_60%)] animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_30%,rgba(32,64,153,0.03)_50%,transparent_70%)]"></div>
        
        {/* Floating elements */}
        <div className="absolute top-20 left-20 animate-float">
          <Sparkles className="h-6 w-6 text-[#204099]/30" />
        </div>
        <div className="absolute top-40 right-32 animate-float" style={{ animationDelay: "1s" }}>
          <Sparkles className="h-4 w-4 text-[#204099]/40" />
        </div>
        <div className="absolute bottom-32 left-1/4 animate-float" style={{ animationDelay: "2s" }}>
          <Sparkles className="h-5 w-5 text-[#204099]/20" />
        </div>
      </div>

      <div className="relative py-20 lg:py-32 w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Content */}
            <div className="space-y-12">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-3 bg-white/80 text-[#204099] px-6 py-3 rounded-full text-sm font-bold shadow-lg border border-[#204099]/20">
                  <Award className="h-5 w-5" />
                  India's #1 Home Services Platform
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-ping ml-2"></div>
                </div>

                <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
                  Professional
                  <span className="block text-[#204099] mt-4 relative">
                    Home Services
                    <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#204099] to-[#2a4fb9] rounded-full"></div>
                  </span>
                  <span className="block text-2xl lg:text-4xl font-medium text-gray-600 mt-6 leading-tight">
                    Made Simple & Reliable
                  </span>
                </h1>

                <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
                  Connect with verified, skilled professionals for all your home service needs. From cleaning to
                  repairs, we deliver excellence at your doorstep with guaranteed satisfaction.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  className="bg-[#204099] hover:bg-[#2a4fb9] text-lg px-8 py-4 font-bold text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
                >
                  Book a Service Now
                </button>
                <button
                  className="text-lg px-8 py-4 font-bold border-2 border-[#204099]/30 hover:bg-[#204099]/10 bg-white text-[#204099] rounded-lg transition-all duration-300 flex items-center justify-center group"
                >
                  <Play className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                  Watch Demo
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8">
                {[
                  { icon: Users, value: "2M+", label: "Happy Customers" },
                  { icon: Shield, value: "100%", label: "Verified Pros" },
                  { icon: Star, value: "4.9", label: "Average Rating" },
                  { icon: Clock, value: "24/7", label: "Support" },
                ].map((stat, index) => (
                  <div key={index} className="text-center group cursor-pointer">
                    <div className="flex justify-center mb-4">
                      <div className="p-4 bg-white/80 rounded-2xl group-hover:scale-110 transition-all duration-300 shadow-md border border-[#204099]/20">
                        <stat.icon className="h-8 w-8 text-[#204099]" />
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-[#204099] mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content - Service Cards */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-6">
                {/* Cleaning Service */}
                <div className="bg-white rounded-xl shadow-lg p-5 border border-[#204099]/20 hover:shadow-xl transition-all duration-300 group">
                  <div className="h-40 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                    <div className="text-center p-4">
                      <div className="w-16 h-16 bg-[#204099] rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                        </svg>
                      </div>
                      <h3 className="font-bold text-[#204099]">Home Cleaning</h3>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Deep cleaning
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Disinfection
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Kitchen & bathroom
                    </li>
                  </ul>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-lg font-bold text-[#204099]">From ₹499</span>
                    <button className="text-xs bg-[#204099] text-white px-3 py-1 rounded-lg">Book Now</button>
                  </div>
                </div>

                {/* Plumbing Service */}
                <div className="bg-white rounded-xl shadow-lg p-5 border border-[#204099]/20 hover:shadow-xl transition-all duration-300 group">
                  <div className="h-40 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                    <div className="text-center p-4">
                      <div className="w-16 h-16 bg-[#204099] rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                        </svg>
                      </div>
                      <h3 className="font-bold text-[#204099]">Plumbing</h3>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Leakage repair
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Tap installation
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Pipe replacement
                    </li>
                  </ul>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-lg font-bold text-[#204099]">From ₹299</span>
                    <button className="text-xs bg-[#204099] text-white px-3 py-1 rounded-lg">Book Now</button>
                  </div>
                </div>

                {/* Electrical Service */}
                <div className="bg-white rounded-xl shadow-lg p-5 border border-[#204099]/20 hover:shadow-xl transition-all duration-300 group">
                  <div className="h-40 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                    <div className="text-center p-4">
                      <div className="w-16 h-16 bg-[#204099] rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                        </svg>
                      </div>
                      <h3 className="font-bold text-[#204099]">Electrical</h3>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Wiring issues
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Switch repair
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Appliance installation
                    </li>
                  </ul>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-lg font-bold text-[#204099]">From ₹399</span>
                    <button className="text-xs bg-[#204099] text-white px-3 py-1 rounded-lg">Book Now</button>
                  </div>
                </div>

                {/* Appliance Repair */}
                <div className="bg-white rounded-xl shadow-lg p-5 border border-[#204099]/20 hover:shadow-xl transition-all duration-300 group">
                  <div className="h-40 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                    <div className="text-center p-4">
                      <div className="w-16 h-16 bg-[#204099] rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                      </div>
                      <h3 className="font-bold text-[#204099]">Appliance Repair</h3>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      AC service
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Washing machine
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Refrigerator
                    </li>
                  </ul>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-lg font-bold text-[#204099]">From ₹599</span>
                    <button className="text-xs bg-[#204099] text-white px-3 py-1 rounded-lg">Book Now</button>
                  </div>
                </div>
              </div>

              <div className="absolute -left-4 top-1/2 bg-white border-2 border-[#204099]/20 rounded-2xl p-4 shadow-xl">
                <div className="text-center">
                  <div className="text-xl font-bold text-[#204099] mb-1">50K+</div>
                  <div className="text-xs text-gray-600 font-medium">Services Completed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

     
    </section>
  );
}