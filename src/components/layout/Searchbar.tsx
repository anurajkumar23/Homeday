import { useState, useRef } from "react";
import { Search, X, MapPin, ChevronDown, Loader2 } from "lucide-react";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("Select City");
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const locationRef = useRef<HTMLDivElement>(null);

  const locations = [
    { id: 1, name: "Delhi", area: "NCR", popular: true },
    { id: 2, name: "Mumbai", area: "Maharashtra", popular: true },
    { id: 3, name: "Bangalore", area: "Karnataka", popular: false },
  ];

  const handleLocationSelect = (location: any) => {
    setSelectedLocation(location.name);
    setIsLocationOpen(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      alert(`Searching "${searchQuery}" in ${selectedLocation}`);
    }, 1500);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center w-full max-w-3xl mx-auto bg-white border rounded-xl shadow-sm overflow-hidden"
    >
      {/* Left Side - Location Selector */}
      <div className="relative w-1/3 border-r border-gray-200" ref={locationRef}>
        <button
          type="button"
          onClick={() => setIsLocationOpen(!isLocationOpen)}
          className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <MapPin className="h-4 w-4 text-gray-400 mr-2" />
          <span className="truncate font-medium">{selectedLocation}</span>
          <ChevronDown
            className={`h-4 w-4 ml-auto transition-transform ${
              isLocationOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isLocationOpen && (
          <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto">
            {locations.map((location) => (
              <button
                key={location.id}
                onClick={() => handleLocationSelect(location)}
                className={`w-full flex items-center px-4 py-3 text-left hover:bg-blue-50 transition-colors ${
                  selectedLocation === location.name
                    ? "bg-blue-50 border-l-2 border-blue-500"
                    : ""
                }`}
              >
                <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                <div>
                  <div className="font-medium text-gray-900">
                    {location.name}
                  </div>
                  <div className="text-xs text-gray-500">{location.area}</div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Right Side - Search Input */}
      <div className="flex-1 relative flex items-center px-4">
        <Search
          className={`absolute left-4 h-5 w-5 ${
            isSearching ? "text-blue-500 animate-spin" : "text-gray-400"
          }`}
        />

        <input
          type="text"
          placeholder="Search for services (e.g., plumber, electrician)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-10 py-3 text-sm text-gray-900 placeholder-gray-500 bg-transparent outline-none"
        />

        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery("")}
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
