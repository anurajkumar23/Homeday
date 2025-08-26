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
      className={`fixed left-0 right-0 z-30 transition-all ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3 pointer-events-none"
      } ${atTop ? "top-18" : "top-18"}`}
    >
      <div className="container ">
        <div className="bg-white/90 dark:bg-gray-900/80 backdrop-blur border rounded-xl shadow-sm">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar p-2">
            {servicesData.categories.map((cat) => {
              const Icon = iconByCategory[cat.name] ?? Sparkles;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleClick(cat.id)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-200 hover:bg-[#204099]/5 transition-colors shrink-0"
                >
                  <Icon className="h-4 w-4 text-[#204099]" />
                  <span className="whitespace-nowrap">{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}


