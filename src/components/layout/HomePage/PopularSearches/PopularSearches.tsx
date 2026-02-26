"use client";

import { Button } from "@/components/ui/button";
import React from "react";

interface PopularSearchesProps {
  items: string[];
  onSelect?: (value: string) => void;
}

export default function PopularSearches({ items, onSelect }: PopularSearchesProps) {
  if (!items?.length) return null;

  return (
    <div className="py-2">
      <div className="space-y-3">
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400 ml-4 md:ml-0">
          Popular searches
        </p>

        {/* Mobile: horizontal slider with proper padding */}
        <div className="md:hidden">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pl-4 pr-4">
            {items.map((search, index) => (
              <button
                key={`${search}-${index}`}
                onClick={() => onSelect?.(search)}
                className="shrink-0 rounded-full border border-[#204099] dark:border-blue-800 px-3 py-1.5 text-xs font-medium text-[#204099] dark:text-blue-400 hover:bg-[#204099]/5 dark:hover:bg-blue-900/20 active:scale-95 transition"
              >
                {search}
              </button>
            ))}
          </div>
        </div>

        {/* Desktop: wrapping pills */}
        <div className="hidden md:flex md:flex-wrap md:gap-2">
          {items.map((search, index) => (
            <Button
              key={`${search}-${index}`}
              variant="outline"
              size="sm"
              className="rounded-full border-[#204099] dark:border-blue-800 text-[#204099] dark:text-blue-400 hover:bg-[#204099]/5 dark:hover:bg-blue-900/20"
              onClick={() => onSelect?.(search)}
            >
              {search}
            </Button>
          ))}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide { -webkit-overflow-scrolling: touch; scrollbar-width: none; -ms-overflow-style: none; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
