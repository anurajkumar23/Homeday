
"use client";

import { Search, Calendar, CheckCircle, Star, ArrowRight, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function HowItWorks() {
  const steps = [
    {
      icon: Search,
      title: "Search & Compare",
      description: "Browse services, read reviews, and compare prices from verified professionals in your area.",
      color: "text-[#204099]",
      bgColor: "bg-[#204099]/10",
      borderColor: "border-[#204099]/20"
    },
    {
      icon: Calendar,
      title: "Book Instantly",
      description: "Choose your preferred time slot and book your service online. Get instant confirmation.",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200"
    },
    {
      icon: CheckCircle,
      title: "Get It Done",
      description: "Our vetted professionals arrive on time and complete your service to your satisfaction.",
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200"
    },
    {
      icon: Star,
      title: "Rate & Review",
      description: "Share your experience and help others make informed decisions about service providers.",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[#204099]/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-emerald-500/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-500/3 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-20 relative z-10">
          <Badge className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 dark:bg-primary/20 text-primary dark:text-blue-400 text-sm font-medium mb-6 border-0">
            <Sparkles className="h-4 w-4 mr-2" />
            Simple Process
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Getting the help you need is simple. Just follow these four easy steps
            and you'll have a professional at your door.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={index} className="relative">
                <Card className="h-full hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-500 border border-gray-100 dark:border-gray-700/50 bg-white dark:bg-gray-800/60 backdrop-blur-md rounded-3xl">
                  <CardContent className="p-8 text-center">
                    <div className="relative mb-8">
                      <div className={`w-20 h-20 mx-auto rounded-2xl ${step.bgColor} ${step.borderColor} border-2 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className={`h-10 w-10 ${step.color}`} />
                      </div>
                      <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-r from-[#204099] to-[#173172] text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                        {index + 1}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{step.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>

                {/* Connector Arrow - Hidden on mobile and last item */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                    <div className="w-8 h-1 bg-gradient-to-r from-[#204099]/20 to-[#204099]/40 rounded-full"></div>
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-[#204099]/40 border-t-2 border-b-2 border-t-transparent border-b-transparent"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20 relative z-10">
          <div className="bg-gradient-to-r from-primary/5 to-primary/10 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 md:p-12 max-w-4xl mx-auto border border-primary/10 dark:border-gray-700">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust Homeday for their home service needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#204099] to-[#173172] hover:from-[#183a8a] hover:to-[#122a64] text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#204099]/20 hover:-translate-y-1">
                Book Your First Service
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="inline-flex items-center px-8 py-4 border-2 border-primary dark:border-blue-400 text-primary dark:text-blue-400 hover:bg-primary/5 font-semibold rounded-xl transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
