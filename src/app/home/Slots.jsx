import { useState, useEffect, useMemo } from "react";
import GameCategories from "../../component/home/GameCategories";
import Footer from "../../component/Footer";
import {
  useGames,
  useImoonGames,
  useGetTurboGames,
} from "../../hooks/useGames";
import GameSearchBar from "../../component/home/GameSearchBar";
import BetsCard from "../../component/home/games/BetsCard";
import LoadMoreGames from "../../component/home/games/LoadMoreGames";
import SpribeBetsCard from "../../component/home/games/SpribeBetsCard";
import TurboCard from "../../component/home/games/TurboCard";

function Slots() {
  const { imoonGames = [] } = useImoonGames();
  const { games = [] } = useGames();
  const { turboGames = [] } = useGetTurboGames();

  const [searchTerm, setSearchTerm] = useState("");
  const [displayCount, setDisplayCount] = useState(14);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      const nowMobile = window.innerWidth < 768;
      setIsMobile(nowMobile);
      setDisplayCount(nowMobile ? 12 : 14);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Normalize Turbo games so they match the same structure
  const normalizedTurboGames = turboGames.map((g) => ({
    provider: "turbo",
    title: g?.gameName, // for display/search
    image: g?.image,
    gameAlias: g?.gameAlias, // for routing
  }));

  const normalizedSpribeGames = games.map((g) => ({
    provider: "spribe",
    title: g?.title,
    image: g?.image,
    gameId: g?.gameId,
  }));

  const normalizedImoonGames = imoonGames.map((g) => ({
    provider: "imoon",
    title: g?.title,
    image: g?.image,
    gameId: g?.gameId,
  }));

  // ✅ Merge all providers
  const combinedGames = useMemo(
    () => [
      ...normalizedSpribeGames,
      ...normalizedImoonGames,
      ...normalizedTurboGames,
    ],
    [games, imoonGames, turboGames]
  );

  // ✅ Search filter
  const filteredGames = combinedGames.filter((game) =>
    game?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + (isMobile ? 12 : 14));
  };

  return (
    <>
      <GameCategories />
      <div className="p-4">
        <GameSearchBar
          showSort={false}
          showProvider={false}
          placeholder="Search games..."
          onSearchChange={(val) => {
            setSearchTerm(val);
            setDisplayCount(isMobile ? 12 : 14);
          }}
        />

        <section className="py-4 mb-6 rounded">
          {filteredGames.length > 0 ? (
            <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-3">
              {filteredGames.slice(0, displayCount).map((game, idx) => {
                if (game.provider === "imoon") {
                  return (
                    <BetsCard
                      key={`imoon-${idx}`}
                      title={game.title}
                      src={game.image}
                      gameID={game.gameId}
                    />
                  );
                } else if (game.provider === "spribe") {
                  return (
                    <SpribeBetsCard
                      key={`spribe-${idx}`}
                      title={game.title}
                      gameName={game.title}
                      src={game.image}
                      gameID={game.gameId}
                    />
                  );
                } else if (game.provider === "turbo") {
                  return (
                    <TurboCard
                      key={`turbo-${idx}`}
                      title={game.title}
                      src={game.image}
                      gameAlias={game.gameAlias}
                    />
                  );
                }
                return null;
              })}
            </div>
          ) : (
            <div className="text-center text-[rgb(151,137,205)]/90 text-sm mt-10">
              No games found
            </div>
          )}
        </section>

        {filteredGames.length > displayCount && (
          <LoadMoreGames onClick={handleLoadMore} />
        )}
      </div>
      <Footer />
    </>
  );
}

export default Slots;
