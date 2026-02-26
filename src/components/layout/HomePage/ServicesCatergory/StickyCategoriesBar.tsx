"use client";

import { useEffect, useState } from "react";
import servicesData from "@/data/services.json";
import {
  Sparkles,
  UtensilsCrossed,
  ChefHat,
  Wrench,
} from "lucide-react";

type IconMap = Record<string, React.ComponentType<{ className?: string }>>;

const iconByCategory: IconMap = {
  "Cleaning Services": Sparkles,
  "Kitchen & Home Help": UtensilsCrossed,
  "Maid & Cooking": ChefHat,
  "Instant Technical": Wrench,
};

export default function StickyCategoriesBar() {
  const [visible, setVisible] = useState(false);
  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    const onScroll = () => {
      // Show after scrolling past the mobile circle categories (~200px)
      setVisible(window.scrollY > 200);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (categoryId: number) => {
    setActiveId(categoryId);
    window.dispatchEvent(
      new CustomEvent("selectCategory", { detail: { id: categoryId } })
    );
    const anchor = document.getElementById("service-categories");
    if (anchor) anchor.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      aria-hidden={!visible}
      className={`fixed left-0 right-0 z-30 transition-all duration-300 ease-out ${visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-full pointer-events-none"
        } top-[56px] md:top-[64px]`}
    >
      <div className="w-full bg-white/98 dark:bg-gray-950/98 backdrop-blur-lg border-b border-gray-100 dark:border-gray-800 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar px-3 py-2">
          {servicesData.categories.map((cat) => {
            const Icon = iconByCategory[cat.name] ?? Sparkles;
            const isActive = activeId === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => handleClick(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-semibold transition-all duration-200 shrink-0 active:scale-95 whitespace-nowrap ${isActive
                    ? "bg-[#204099] text-white shadow-sm shadow-[#204099]/25"
                    : "text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800/80 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
              >
                <Icon className={`h-3.5 w-3.5 flex-shrink-0 ${isActive ? "text-white" : "text-[#204099] dark:text-blue-400"}`} />
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
