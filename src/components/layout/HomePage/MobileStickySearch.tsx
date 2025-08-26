"use client";

import { useEffect, useState } from "react";
import { MapPin, Search } from "lucide-react";

export default function MobileStickySearch() {
  const [locationLabel, setLocationLabel] = useState<string>("Detecting location…");
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setLocationLabel("Location unavailable");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setCoords({ lat: latitude, lng: longitude });
        setLocationLabel("Your location");
      },
      () => {
        setLocationLabel("Set location");
      },
      { enableHighAccuracy: false, timeout: 5000, maximumAge: 600000 }
    );
  }, []);

  return (
    <div className="md:hidden fixed left-0 right-0 top-16 z-40">
      <div className="container mx-auto px-4">
        <div className="rounded-xl border bg-white/95 backdrop-blur shadow-sm px-3 py-2 flex items-center gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-[#204099]/10 text-[#204099] text-xs font-medium"
            aria-label="Current location"
            title={coords ? `${coords.lat.toFixed(3)}, ${coords.lng.toFixed(3)}` : locationLabel}
          >
            <MapPin className="h-3.5 w-3.5" />
            <span className="truncate max-w-[120px]">{locationLabel}</span>
          </button>
          <div className="relative flex-1">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" aria-hidden="true" />
            <input
              type="search"
              placeholder="Search services"
              className="w-full pl-8 pr-2 py-2 text-sm rounded-lg border bg-white outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}


