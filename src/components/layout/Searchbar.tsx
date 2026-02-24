"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, X, MapPin, ChevronDown } from "lucide-react";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("Select City");
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const router = useRouter();

  const locationRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const locations = [
    { id: 1, name: "Delhi", area: "NCR", popular: true },
    { id: 2, name: "Mumbai", area: "Maharashtra", popular: true },
    { id: 3, name: "Bangalore", area: "Karnataka", popular: false },
  ];

  const handleLocationSelect = (location: { id: number; name: string }) => {
    setSelectedLocation(location.name);
    setIsLocationOpen(false);
    setHighlightedIndex(-1);
    inputRef.current?.focus();
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    const query = searchQuery.trim();
    const area = selectedLocation;

    setTimeout(() => {
      setIsSearching(false);
      if (!query) return;
      router.push(`/services?q=${encodeURIComponent(query)}&loc=${encodeURIComponent(area)}`);
    }, 300); // Small delay for UX feel
  };

  // Debounce user typing to simulate suggestions fetch
  const debouncedOnChange = useCallback(() => {
    // placeholder for future suggestions API call
  }, []);

  useEffect(() => {
    const id = setTimeout(() => {
      debouncedOnChange();
    }, 250);
    return () => clearTimeout(id);
  }, [searchQuery, debouncedOnChange]);

  // Close dropdown on outside click or Escape
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (
        isLocationOpen &&
        locationRef.current &&
        !locationRef.current.contains(e.target as Node)
      ) {
        setIsLocationOpen(false);
        setHighlightedIndex(-1);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsLocationOpen(false);
        setHighlightedIndex(-1);
        buttonRef.current?.focus();
      }
    };
    window.addEventListener("mousedown", onClick);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onClick);
      window.removeEventListener("keydown", onKey);
    };
  }, [isLocationOpen]);

  const onLocationKeyDown = (e: React.KeyboardEvent) => {
    if (!isLocationOpen && (e.key === "ArrowDown" || e.key === "Enter")) {
      setIsLocationOpen(true);
      setHighlightedIndex(0);
      e.preventDefault();
      return;
    }
    if (!isLocationOpen) return;
    if (e.key === "ArrowDown") {
      setHighlightedIndex((prev) => (prev + 1) % locations.length);
      e.preventDefault();
    } else if (e.key === "ArrowUp") {
      setHighlightedIndex((prev) => (prev - 1 + locations.length) % locations.length);
      e.preventDefault();
    } else if (e.key === "Enter") {
      const item = locations[highlightedIndex];
      if (item) handleLocationSelect(item);
      e.preventDefault();
    } else if (e.key === "Tab") {
      setIsLocationOpen(false);
      setHighlightedIndex(-1);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      role="search"
      aria-label="Site search"
      className="flex w-full max-w-3xl mx-auto bg-white border border-gray-200/60 rounded-full shadow-sm hover:shadow-md focus-within:ring-2 focus-within:ring-[#204099]/20 focus-within:border-[#204099]/40 overflow-hidden md:flex-row flex-col md:items-stretch transition-all duration-300"
    >
      {/* Left Side - Location Selector */}
      <div
        className="relative hidden md:block md:w-1/3 w-full border-b md:border-b-0 md:border-r border-gray-200"
        ref={locationRef}
      >
        <button
          ref={buttonRef}
          type="button"
          aria-haspopup="listbox"
          aria-expanded={isLocationOpen}
          aria-controls="location-listbox"
          onClick={() => setIsLocationOpen(!isLocationOpen)}
          onKeyDown={onLocationKeyDown}
          className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <MapPin className="h-4 w-4 text-gray-400 mr-2" />
          <span className="truncate font-medium">{selectedLocation}</span>
          <ChevronDown
            className={`h-4 w-4 ml-auto transition-transform ${isLocationOpen ? "rotate-180" : ""
              }`}
          />
        </button>

        {isLocationOpen && (
          <div
            id="location-listbox"
            role="listbox"
            aria-label="Choose a city"
            className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto"
          >
            {locations.map((location, index) => (
              <button
                key={location.id}
                role="option"
                aria-selected={selectedLocation === location.name}
                onClick={() => handleLocationSelect(location)}
                className={`w-full flex items-center px-4 py-3 text-left transition-colors ${highlightedIndex === index ? "bg-blue-50" : "hover:bg-blue-50"
                  } ${selectedLocation === location.name
                    ? "border-l-2 border-blue-500"
                    : ""
                  }`}
              >
                <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                <div>
                  <div className="font-medium text-gray-900">{location.name}</div>
                  <div className="text-xs text-gray-500">{location.area}</div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Right Side - Search Input */}
      <div className="relative flex items-center px-4 md:flex-1">
        <Search
          className={`absolute left-4 h-5 w-5 ${isSearching ? "text-blue-500 animate-spin" : "text-gray-400"
            }`}
          aria-hidden="true"
        />

        <input
          ref={inputRef}
          type="search"
          inputMode="search"
          placeholder="Search for services (e.g., plumber, electrician)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search services"
          className="w-full pl-12 pr-10 py-3 text-sm text-gray-900 placeholder-gray-500 bg-transparent outline-none"
        />

        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            aria-label="Clear search"
            className="absolute right-4"
          >
            <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchBar;
