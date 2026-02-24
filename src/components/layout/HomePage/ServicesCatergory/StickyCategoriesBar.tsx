"use client";

import { useEffect, useState } from "react";
import servicesData from "@/data/services.json";
import {
  Sparkles,
  Wrench,
  Zap,
  Cog,
  Paintbrush,
  Hammer,
} from "lucide-react";

type IconMap = Record<string, React.ComponentType<{ className?: string }>>;

const iconByCategory: IconMap = {
  "Home Cleaning": Sparkles,
  Plumbing: Wrench,
  Electrical: Zap,
  "Appliance Repair": Cog,
  Painting: Paintbrush,
  Carpentry: Hammer,
};

export default function StickyCategoriesBar() {
  const [visible, setVisible] = useState(false);
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop;
      setAtTop(y < 16);
      setVisible(y > 240);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (categoryId: number) => {
    window.dispatchEvent(
      new CustomEvent("selectCategory", { detail: { id: categoryId } })
    );
    const anchor = document.getElementById("service-categories");
    if (anchor) anchor.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      aria-hidden={!visible}
      className={`fixed left-0 right-0 z-30 transition-all ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3 pointer-events-none"
        } top-[72px] md:top-[76px]`}
    >
      <div className="w-full bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="flex items-center gap-4 overflow-x-auto no-scrollbar px-4 py-2 sm:px-6">
          {servicesData.categories.map((cat) => {
            const Icon = iconByCategory[cat.name] ?? Sparkles;
            return (
              <button
                key={cat.id}
                onClick={() => handleClick(cat.id)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors shrink-0"
              >
                <Icon className="h-4 w-4 text-[#204099]" />
                <span className="whitespace-nowrap">{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}


