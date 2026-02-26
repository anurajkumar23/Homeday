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
  categories = servicesData.categories,
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
    <div className="w-full bg-white dark:bg-gray-950 md:hidden">
      <div className="py-3">
        <div className="flex gap-5 overflow-x-auto no-scrollbar py-2 px-4">
          {categories.map((category) => {
            const isSelected = selectedId === category.id;

            return (
              <button
                key={category.id}
                onClick={() => onClick(category.id)}
                className="flex flex-col items-center gap-2 min-w-[64px] flex-shrink-0 group"
              >
                {/* Image circle */}
                <div
                  className={`relative w-16 h-16 rounded-full overflow-hidden transition-all duration-200 ${isSelected
                    ? "ring-2 ring-[#204099] ring-offset-2 shadow-lg"
                    : "ring-1 ring-gray-200 dark:ring-gray-700 shadow-sm group-hover:shadow-md group-active:scale-95"
                    }`}
                >
                  {category.image ? (
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      sizes="64px"
                      className="object-cover scale-[1.2]"
                    />
                  ) : (
                    <span className="text-gray-400 font-bold text-lg absolute inset-0 flex items-center justify-center bg-gray-50 dark:bg-gray-800">
                      {category.name.charAt(0)}
                    </span>
                  )}
                </div>

                {/* Label */}
                <span
                  className={`text-[11px] font-medium text-center leading-tight w-full max-w-[72px] transition-colors ${isSelected
                    ? "text-[#204099] dark:text-blue-400 font-bold"
                    : "text-gray-700 dark:text-gray-300"
                    }`}
                >
                  {category.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .no-scrollbar {
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
