"use client";

import servicesData from "@/data/services.json";
import { Sparkles, Wrench, Zap, Cog, Paintbrush, Hammer } from "lucide-react";

const iconMap: Record<string, any> = {
  "Home Cleaning": Sparkles,
  Plumbing: Wrench,
  Electrical: Zap,
  "Appliance Repair": Cog,
  Painting: Paintbrush,
  Carpentry: Hammer,
};

export default function MobileCategoriesGrid() {
  const onClick = (id: number) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("selectCategory", { detail: { id } }));
      const anchor = document.getElementById("service-categories");
      if (anchor) anchor.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="md:hidden container mx-auto px-4 mt-4">
      <div className="grid grid-cols-4 gap-3">
        {servicesData.categories.map((c) => {
          const Icon = iconMap[c.name] ?? Sparkles;
          return (
            <button
              key={c.id}
              onClick={() => onClick(c.id)}
              className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl border hover:bg-[#204099]/5 transition-colors"
            >
              <div className="h-9 w-9 rounded-lg bg-[#204099]/10 text-[#204099] flex items-center justify-center">
                <Icon className="h-5 w-5" />
              </div>
              <span className="text-[11px] text-gray-700 text-center leading-tight line-clamp-2">
                {c.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}


