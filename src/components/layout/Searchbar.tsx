"use client";

import { useState, useRef, useEffect, useCallback, useId } from "react";
import { useRouter } from "next/navigation";
import { Search, X, MapPin, ChevronDown, Navigation, Clock, TrendingUp } from "lucide-react";
import servicesData from "@/data/services.json";

const LOCATIONS = [
  { id: 1, name: "Gurgaon", area: "NCR" },
  { id: 2, name: "Delhi", area: "NCR" },
  { id: 3, name: "Bangalore", area: "Karnataka" },
  { id: 4, name: "Mumbai", area: "Maharashtra" },
  { id: 5, name: "Hyderabad", area: "Telangana" },
  { id: 6, name: "Chennai", area: "Tamil Nadu" },
];

const ALL_SERVICES = Array.from(
  new Set(
    servicesData.categories
      .flatMap((c: any) => c.subCategories ?? [])
      .flatMap((sc: any) => sc.products ?? [])
      .map((p: any) => p.name as string)
  )
);

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("Gurgaon");
  const [cityOpen, setCityOpen] = useState(false);
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const [highlightIdx, setHighlightIdx] = useState(-1);

  const router = useRouter();
  const cityRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestRef = useRef<HTMLDivElement>(null);

  const suggestions =
    query.trim().length > 0
      ? ALL_SERVICES.filter((s) => s.toLowerCase().includes(query.toLowerCase())).slice(0, 6)
      : [];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (cityRef.current && !cityRef.current.contains(e.target as Node)) setCityOpen(false);
      if (suggestRef.current && !suggestRef.current.contains(e.target as Node) && inputRef.current !== e.target)
        setSuggestionsOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const submit = useCallback(
    (value?: string) => {
      const q = (value ?? query).trim();
      if (!q) return;
      setSuggestionsOpen(false);
      router.push(`/services?q=${encodeURIComponent(q)}&loc=${encodeURIComponent(city)}`);
    },
    [query, city, router]
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") { setSuggestionsOpen(false); setHighlightIdx(-1); return; }
    if (!suggestionsOpen || suggestions.length === 0) {
      if (e.key === "Enter") { e.preventDefault(); submit(); }
      return;
    }
    if (e.key === "ArrowDown") { e.preventDefault(); setHighlightIdx((i) => (i + 1) % suggestions.length); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setHighlightIdx((i) => (i - 1 + suggestions.length) % suggestions.length); }
    else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightIdx >= 0) { const val = suggestions[highlightIdx]; setQuery(val); submit(val); }
      else submit();
    }
  };

  return (
    <div className="relative w-full">
      {/* ══ Main search bar ══ */}
      <div className="flex items-center h-10 md:h-11 w-full rounded-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 focus-within:border-[#204099] dark:focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-[#204099]/10 dark:focus-within:ring-blue-500/10 transition-all duration-200">
        {/* City picker */}
        <div ref={cityRef} className="relative h-full flex-shrink-0">
          <button
            type="button"
            onClick={() => setCityOpen((o) => !o)}
            className="flex items-center gap-1 h-full pl-3 pr-2 sm:pl-3.5 sm:pr-2.5 rounded-l-full text-gray-700 dark:text-gray-300 hover:text-[#204099] dark:hover:text-blue-400 transition-colors"
          >
            <MapPin className="h-3.5 w-3.5 text-[#204099] dark:text-blue-400 flex-shrink-0" />
            <span className="text-sm font-semibold hidden sm:inline truncate max-w-[64px]">{city}</span>
            <ChevronDown className={`h-3 w-3 text-gray-400 transition-transform duration-200 flex-shrink-0 ${cityOpen ? "rotate-180" : ""}`} />
          </button>

          {/* City dropdown */}
          {cityOpen && (
            <div className="absolute top-[calc(100%+6px)] left-0 w-56 bg-white dark:bg-gray-900 rounded-xl shadow-xl ring-1 ring-black/5 dark:ring-white/10 z-[60] overflow-hidden">
              <button
                type="button"
                className="w-full flex items-center gap-2 px-3.5 py-2.5 text-sm font-medium text-[#204099] dark:text-blue-400 hover:bg-[#204099]/5 dark:hover:bg-blue-900/20 transition-colors border-b border-gray-100 dark:border-gray-800"
              >
                <Navigation className="h-3.5 w-3.5" />
                Detect my location
              </button>
              <div className="p-1">
                {LOCATIONS.map((loc) => (
                  <button
                    key={loc.id}
                    type="button"
                    onClick={() => { setCity(loc.name); setCityOpen(false); inputRef.current?.focus(); }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-colors ${city === loc.name
                      ? "bg-[#204099]/5 dark:bg-blue-900/20 text-[#204099] dark:text-blue-400"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                      }`}
                  >
                    <MapPin className={`h-3.5 w-3.5 flex-shrink-0 ${city === loc.name ? "text-[#204099]" : "text-gray-400"}`} />
                    <div>
                      <div className={`text-sm ${city === loc.name ? "font-bold" : "font-medium"}`}>{loc.name}</div>
                      <div className="text-[11px] text-gray-400">{loc.area}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="w-px h-5 bg-gray-300 dark:bg-gray-700 flex-shrink-0" />

        {/* Search input */}
        <div className="flex-1 flex items-center h-full min-w-0">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for services..."
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSuggestionsOpen(true); setHighlightIdx(-1); }}
            onFocus={() => { if (query.trim().length > 0) setSuggestionsOpen(true); }}
            onKeyDown={onKeyDown}
            className="w-full h-full bg-transparent text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 outline-none pl-3 pr-1"
          />
          {query && (
            <button
              type="button"
              onClick={() => { setQuery(""); setSuggestionsOpen(false); inputRef.current?.focus(); }}
              className="p-1 mr-0.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <X className="h-3.5 w-3.5 text-gray-400" />
            </button>
          )}
        </div>

        {/* Search button */}
        <button
          type="button"
          onClick={() => submit()}
          className="flex items-center justify-center h-7 w-7 md:h-8 md:w-8 mr-1 rounded-full bg-[#204099] hover:bg-[#173172] active:scale-90 text-white transition-all duration-150"
        >
          <Search className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* ══ Auto-suggest dropdown ══ */}
      {suggestionsOpen && suggestions.length > 0 && (
        <div ref={suggestRef} className="absolute top-[calc(100%+6px)] left-0 right-0 bg-white dark:bg-gray-900 rounded-xl shadow-xl ring-1 ring-black/5 dark:ring-white/10 z-[60] overflow-hidden">
          <p className="px-3.5 pt-2.5 pb-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
            <TrendingUp className="h-3 w-3" /> Suggestions
          </p>
          {suggestions.map((s, i) => (
            <button
              key={s}
              type="button"
              onClick={() => { setQuery(s); submit(s); }}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 text-left transition-colors ${highlightIdx === i
                ? "bg-[#204099]/5 dark:bg-blue-900/20"
                : "hover:bg-gray-50 dark:hover:bg-gray-800/40"
                }`}
            >
              <Search className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
              <span className={`text-sm ${highlightIdx === i ? "text-[#204099] dark:text-blue-400 font-semibold" : "text-gray-600 dark:text-gray-300"}`}>{s}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
