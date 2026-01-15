import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { ChevronDown } from "lucide-react";
import { ArrowUpDown, SlidersHorizontal } from "lucide-react";

const GameSearchBar = ({
  placeholder = "Search....",
  showSort = true,
  showProvider = true,
  sortOptions = ["Popular", "Newest", "A-Z", "Z-A"],
  providerOptions = ["All", "Evolution", "Pragmatic", "NetEnt", "Playtech"],
  onSearchChange = () => {},
  onSortChange = () => {},
  onProviderChange = () => {},
}) => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState(sortOptions[0]);
  const [provider, setProvider] = useState(providerOptions[0]);

  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showProviderMenu, setShowProviderMenu] = useState(false);

  const handleSearch = (value) => {
    setSearch(value);
    onSearchChange(value);
  };

  const handleSort = (option) => {
    setSort(option);
    setShowSortMenu(false);
    onSortChange(option);
  };

  const handleProvider = (option) => {
    setProvider(option);
    setShowProviderMenu(false);
    onProviderChange(option);
  };

  return (
    <div className="w-full flex flex-wrap items-center gap-2 relative">
      {/* Search input */}
      <div className="flex items-center gap-2 bg-secondary text-primary/70 rounded-lg px-4 py-2 flex-1 min-w-[200px] border-2 border-primary/90">
        <FaSearch className="text-primary/70 flex-shrink-0" />
        <input
          type="text"
          placeholder={placeholder}
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSearchChange(search);
          }}
        className="bg-transparent border-0 outline-none focus:outline-none focus:ring-0 text-sm placeholder-primary/70 text-purple-200 w-full"
        />
      </div>

      {/* Sort dropdown */}
      {showSort && (
        <div className="relative">
          <button
            onClick={() => setShowSortMenu((prev) => !prev)}
            className="flex items-center gap-1 bg-secondary text-purple-200 px-3 py-2 rounded-lg text-sm border border-[#29275e] whitespace-nowrap"
            aria-label="Sort games"
          >
            <span className="block md:hidden">
              <ArrowUpDown className="w-5 h-5 text-primary/70" />
            </span>
            <span className="hidden md:flex gap-1 items-center">
              <span className="text-textColor">Sort:</span>
              <span className="font-semibold truncate max-w-[80px]">
                {sort}
              </span>
              <ChevronDown className="w-4 h-4 flex-shrink-0" />
            </span>
          </button>
          {showSortMenu && (
            <div className="absolute right-0 mt-2 w-max bg-secondary border border-secondary rounded-lg shadow-lg z-10">
              {sortOptions.map((option) => (
                <div
                  key={option}
                  onClick={() => handleSort(option)}
                  className={`px-4 py-2 text-sm text-textColor hover:bg-[#2a2550] cursor-pointer ${
                    sort === option ? "bg-[#2a2550]" : ""
                  }`}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Provider dropdown */}
      {showProvider && (
        <div className="relative">
          <button
            onClick={() => setShowProviderMenu((prev) => !prev)}
            className="flex items-center gap-1 bg-secondary text-purple-200 px-3 py-2 rounded-lg text-sm border border-[#29275e] whitespace-nowrap"
            aria-label="Filter by provider"
          >
            <span className="block md:hidden">
              <SlidersHorizontal className="w-5 h-5 text-primary/70" />
            </span>
            <span className="hidden md:flex gap-1 items-center">
              <span className="text-textColor">Provider:</span>
              <span className="font-semibold truncate max-w-[90px]">
                {provider}
              </span>
              <ChevronDown className="w-4 h-4 flex-shrink-0" />
            </span>
          </button>
          {showProviderMenu && (
            <div className="absolute right-0 mt-2 w-max bg-[#3c2d7a] border border-[#29275e] rounded-lg shadow-lg z-10">
              {providerOptions.map((option) => (
                <div
                  key={option}
                  onClick={() => handleProvider(option)}
                  className={`px-4 py-2 text-sm text-purple-100 hover:bg-[#4d3d94] cursor-pointer ${
                    provider === option ? "bg-[#4d3d94]" : ""
                  }`}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GameSearchBar;