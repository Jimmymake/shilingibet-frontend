import { useState, useMemo, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { XMarkIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import BetsCard from "./games/BetsCard";
import SpribeBetsCard from "./games/SpribeBetsCard";
import TurboCard from "./games/TurboCard";
import LoadMoreGames from "./games/LoadMoreGames";
import {
  useGames,
  useImoonGames,
  useGetTurboGames,
} from "../../hooks/useGames";

export default function SearchModal({ isOpen, onClose }) {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [displayCount, setDisplayCount] = useState(14);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setDisplayCount(mobile ? 12 : 14);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Providers
  const { imoonGames = [] } = useImoonGames();
  const { games: spribeGames = [] } = useGames();
  const { turboGames = [] } = useGetTurboGames();

  // Merge
  const allGames = useMemo(
    () => [
      ...imoonGames.map((g) => ({
        title: g?.title,
        src: g?.image,
        provider: "imoon",
        gameID: g?.gameId,
      })),
      ...spribeGames.map((g) => ({
        title: g?.title,
        src: g?.image,
        provider: "spribe",
        gameID: g?.gameId,
        gameName: g?.title,
      })),
      ...turboGames.map((g) => ({
        title: g?.gameName || g?.title,
        src: g?.image,
        provider: "turbo",
        gameAlias: g?.gameAlias,
      })),
    ],
    [imoonGames, spribeGames, turboGames]
  );

  // Partial search (all tokens must be in title)
  const norm = (s) =>
    String(s || "")
      .toLowerCase()
      .trim();
  const tokens = norm(query).split(/\s+/).filter(Boolean);
  const isSearching = tokens.length > 0;

  const filtered = useMemo(() => {
    if (!isSearching) return allGames;
    return allGames.filter((g) => {
      const title = norm(g.title);
      return tokens.every((t) => title.includes(t));
    });
  }, [allGames, tokens, isSearching]);

  const visible = isSearching ? filtered : filtered.slice(0, displayCount);

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + (isMobile ? 12 : 14));
  };

  // Navigate to the game’s route then close modal
  const openGame = (game) => {
    let path;
    if (game.provider === "spribe") {
      path = `/playGame/${game.gameName}`;
    } else if (game.provider === "imoon") {
      path = `/imoon/${game.gameID}`;
    } else if (game.provider === "turbo") {
      path = `/turbo/${game.gameAlias}`;
    }
    if (path) {
      navigate(path);
      onClose?.();
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed z-50 inset-0">
      <div className="fixed inset-0 bg-secondary/80" aria-hidden="true" />
      <div className="fixed inset-0 flex justify-center items-start mt-2 sm:mt-16">
        <Dialog.Panel className="w-full lg:max-w-7xl mx-auto bg-[#121212] rounded-xl shadow-lg sm:p-6 p-4 max-h-[90vh] flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg sm:text-xl font-semibold text-textColor">
              Search
            </h2>
            <button
              onClick={onClose}
              className="bg-secondary p-1 rounded hover:bg-[#2c3642]"
              aria-label="Close search"
            >
              <XMarkIcon className="h-5 w-5 text-textColor cursor-pointer" />
            </button>
          </div>

          {/* Search */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div className="relative flex-1">
              <MagnifyingGlassIcon className="absolute left-4 top-3.5 h-5 w-5 text-primary/70" />
              <input
                type="text"
                className="w-full pl-12 pr-4 py-3 border-2 border-primary/70 rounded-lg bg-secondary text-textColor placeholder-primary/70 focus:outline-none"
                placeholder="Search..."
                value={query}
                onChange={(e) => {
                  const val = e.target.value;
                  setQuery(val);
                  if (!val) setDisplayCount(isMobile ? 12 : 14);
                }}
              />
            </div>
          </div>

          {/* Results */}
          <div className="flex-1 overflow-y-auto no-scrollbar">
            <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 lg:gap-4 gap-2 mb-4">
              {visible.length > 0 ? (
                visible.map((game, idx) => (
                  <div
                    key={`${game.provider}-${
                      game.gameID || game.gameAlias || game.title
                    }-${idx}`}
                    onClick={() => openGame(game)}
                    className="cursor-pointer"
                  >
                    {game.provider === "spribe" ? (
                      <SpribeBetsCard
                        title={game.title}
                        gameName={game.gameName}
                        src={game.src}
                      />
                    ) : game.provider === "imoon" ? (
                      <BetsCard
                        title={game.title}
                        src={game.src}
                        gameID={game.gameID}
                      />
                    ) : (
                      <TurboCard src={game.src} gameAlias={game.gameAlias} />
                    )}
                  </div>
                ))
              ) : (
                <p className="text-textColor col-span-full text-center">
                  {isSearching
                    ? `No matches for “${query}”.`
                    : "No games available."}
                </p>
              )}
            </div>

            {/* Load more (only when not searching) */}
            {!isSearching && filtered.length > displayCount && (
              <div className="flex justify-center">
                <LoadMoreGames onClick={handleLoadMore} />
              </div>
            )}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
