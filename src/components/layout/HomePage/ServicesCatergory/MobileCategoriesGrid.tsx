"use client";

import servicesData from "@/data/services.json";
import Image from "next/image";
import { useState } from "react";

interface Category {
  id: number;
  name: string;
  image?: string;
}

interface MobileCategoriesGridProps {
  categories?: Category[];
}

export default function MobileCategoriesGrid({ 
  categories = servicesData.categories 
}: MobileCategoriesGridProps) {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const onClick = (id: number) => {
    setSelectedId(id);
    
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("selectCategory", { detail: { id } }));
      const anchor = document.getElementById("service-categories");
      if (anchor) anchor.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="w-full bg-white md:hidden">
      <div className="py-4">
        {/* Horizontal scrolling container */}
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 pl-4 pr-4">
          {categories.map((category) => {
            const isSelected = selectedId === category.id;
            
            return (
              <button
                key={category.id}
                onClick={() => onClick(category.id)}
                className="flex flex-col items-center gap-2 min-w-[65px] flex-shrink-0 group relative"
              >
                {/* Image Container - Cover style */}
                <div className={`relative w-[70px] h-[70px] rounded-full bg-white border overflow-hidden group-active:scale-95 transition-all duration-150 shadow-sm ${
                  isSelected 
                    ? 'border-blue-500 shadow-blue-100' 
                    : 'border-gray-100'
                }`}>
                  {category.image ? (
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      sizes="70px"
                      className="object-cover"
                    />
                  ) : (
                    <span className="text-gray-400 font-bold text-lg absolute inset-0 flex items-center justify-center">
                      {category.name.charAt(0)}
                    </span>
                  )}
                </div>
                
                {/* Category Name */}
                <span className={`text-xs font-medium text-center leading-tight w-full max-w-[75px] transition-colors duration-150 ${
                  isSelected ? 'text-blue-600' : 'text-gray-800'
                }`}>
                  {category.name}
                </span>

                {/* Bottom indicator bar */}
                <div className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 h-0.5 rounded-full transition-all duration-200 ${
                  isSelected 
                    ? 'w-8 bg-blue-500' 
                    : 'w-0 bg-transparent'
                }`} />
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Custom scrollbar hiding styles */}
      <style jsx>{`
        .scrollbar-hide {
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
