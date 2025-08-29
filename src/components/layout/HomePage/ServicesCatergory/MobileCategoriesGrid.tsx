"use client";

import servicesData from "@/data/services.json";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";

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
  const [isSticky, setIsSticky] = useState(false);
  const [containerHeight, setContainerHeight] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Measure container height for smooth transition
    if (containerRef.current) {
      setContainerHeight(containerRef.current.offsetHeight);
    }
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop;
      const shouldBeSticky = y > 100;
      
      if (shouldBeSticky !== isSticky) {
        setIsSticky(shouldBeSticky);
      }
    };
    
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isSticky]);

  const onClick = (id: number) => {
    setSelectedId(id);
    
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("selectCategory", { detail: { id } }));
      const anchor = document.getElementById("service-categories");
      if (anchor) anchor.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      {/* Placeholder to prevent layout shift when sticky */}
      {isSticky && (
        <div 
          className="w-full md:hidden"
          style={{ height: containerHeight }}
          aria-hidden="true"
        />
      )}
      
      <div
        ref={containerRef}
        className={`
          w-full bg-white md:hidden
          transition-all duration-300 ease-in-out
          ${isSticky 
            ? "fixed left-0 right-0 z-30 top-17 md:top-16 shadow-md transform translate-y-0" 
            : "relative transform translate-y-0"
          }
        `}
        style={{
          transform: isSticky 
            ? 'translateY(0) translateZ(0)' 
            : 'translateY(0) translateZ(0)',
          backfaceVisibility: 'hidden',
          perspective: 1000
        }}
      >
        <div className="py-4 transition-all duration-300 ease-in-out">
          {/* Horizontal scrolling container */}
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 pl-4 pr-4">
            {categories.map((category) => {
              const isSelected = selectedId === category.id;
              
              return (
                <button
                  key={category.id}
                  onClick={() => onClick(category.id)}
                  className="flex flex-col items-center gap-2 min-w-[65px] flex-shrink-0 group relative transform transition-transform duration-150 ease-out hover:scale-105"
                >
                  {/* Image Container - Cover style */}
                  <div className={`
                    relative w-[70px] h-[70px] rounded-full bg-white border overflow-hidden 
                    group-active:scale-95 transition-all duration-200 ease-out
                    transform-gpu backface-visibility-hidden
                    ${isSelected 
                      ? 'border-blue-500 shadow-lg shadow-blue-100/50 scale-105' 
                      : 'border-gray-100 shadow-sm hover:shadow-md'
                    }
                  `}>
                    {category.image ? (
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        sizes="70px"
                        className="object-cover transition-transform duration-200 ease-out"
                      />
                    ) : (
                      <span className="text-gray-400 font-bold text-lg absolute inset-0 flex items-center justify-center">
                        {category.name.charAt(0)}
                      </span>
                    )}
                  </div>
                  
                  {/* Category Name */}
                  <span className={`
                    text-xs font-medium text-center leading-tight w-full max-w-[75px] 
                    transition-all duration-200 ease-out
                    ${isSelected 
                      ? 'text-blue-600 font-semibold transform scale-105' 
                      : 'text-gray-800'
                    }
                  `}>
                    {category.name}
                  </span>

                  {/* Bottom indicator bar */}
                  <div className={`
                    absolute -bottom-1 left-1/2 transform -translate-x-1/2 h-0.5 rounded-full 
                    transition-all duration-300 ease-out
                    ${isSelected 
                      ? 'w-8 bg-blue-500 opacity-100' 
                      : 'w-0 bg-transparent opacity-0'
                    }
                  `} />
                </button>
              );
            })}
          </div>
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
        .transform-gpu {
          transform: translateZ(0);
        }
        .backface-visibility-hidden {
          backface-visibility: hidden;
        }
      `}</style>
    </>
  );
}
