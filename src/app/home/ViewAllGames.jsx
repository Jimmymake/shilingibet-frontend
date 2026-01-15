import { useEffect, useMemo, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  useElbetGames,
  useGames,
  useGetTurboGames,
  useImoonGames,
} from "../../hooks/useGames";
import LoadMoreGames from "../../component/home/games/LoadMoreGames";
import SpribeBetsCard from "../../component/home/games/SpribeBetsCard";
import BetsCard from "../../component/home/games/BetsCard";
import TurboCard from "../../component/home/games/TurboCard";
import GameCategories from "../../component/home/GameCategories";
import GameSearchBar from "../../component/home/GameSearchBar";
import ElbetBetsCard from "../../component/home/games/ElbetBetsCard";

const PROVIDERS = {
  spribe: {
    useHook: useGames,
    normalize: (g) => ({
      id: g?.gameId,
      title: g?.title,
      image: g?.image,
      alias: g?.title,
    }),
    Component: SpribeBetsCard,
    extraProps: (g) => ({ gameName: g?.title }),
  },
  imoon: {
    useHook: useImoonGames,
    normalize: (g) => ({
      id: g?.gameId,
      title: g?.title,
      image: g?.image,
      alias: g?.title,
    }),
    Component: BetsCard,
    extraProps: () => ({}),
  },
  elbet: {
    useHook: useElbetGames,
    normalize: (g) => ({
      id: g?.GameID,
      title: g?.GameName,
      image: g?.GameImageUrl,
      alias: g?.GameAlias,
    }),
    Component: ElbetBetsCard,
    extraProps: (g) => ({ gameName: g?.GameName }),
  },
  turbo: {
    useHook: useGetTurboGames,
    normalize: (g) => ({
      id: g?.gameAlias,
      title: g?.gameName,
      image: g?.image,
      alias: g?.gameAlias,
    }),
    Component: TurboCard,
    extraProps: (g) => ({ gameAlias: g?.alias }), // ✅ gives the right prop
  },
};

function ViewAllGames() {
  const { provider } = useParams();
  const location = useLocation();

  // ✅ State from CategoryHeader
  const groups = location.state?.groups;
  const stateTitle = location.state?.title;
  const stateGames = location.state?.games;

  // ✅ Load all provider data
  const { games: spribeGames } = useGames();
  const { imoonGames } = useImoonGames();
  const { elbetGames } = useElbetGames();
  const { turboGames } = useGetTurboGames();

  const providerData = useMemo(
    () => ({
      spribe: spribeGames,
      imoon: imoonGames,
      // elbet: elbetGames,
      turbo: turboGames,
    }),
    [spribeGames, imoonGames, elbetGames, turboGames]
  );

  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : true
  );
  const [displayCount, setDisplayCount] = useState(isMobile ? 12 : 14);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    setDisplayCount(isMobile ? 12 : 14);
  }, [isMobile]);

  // ✅ Build base list
  const baseList = useMemo(() => {
    let list = [];

    if (Array.isArray(groups) && groups.length > 0) {
      list = groups.flatMap(({ provider, games }) =>
        (games || []).map((g) => ({
          ...PROVIDERS[provider]?.normalize(g),
          __provider: provider,
        }))
      );
    } else if (Array.isArray(stateGames) && stateGames.length > 0) {
      list = stateGames.map((g) => {
        const prov =
          g.__provider ||
          (imoonGames?.some((x) => x?.gameId === g?.gameId) && "imoon") ||
          (elbetGames?.some((x) => x?.GameID === g?.GameID) && "elbet") ||
          (turboGames?.some((x) => x?.gameAlias === g?.gameAlias) && "turbo") ||
          "spribe";
        return { ...PROVIDERS[prov].normalize(g), __provider: prov };
      });
    } else if (provider && PROVIDERS[provider]) {
      list = (providerData[provider] || []).map((g) => ({
        ...PROVIDERS[provider].normalize(g),
        __provider: provider,
      }));
    } else {
      list = (spribeGames || []).map((g) => ({
        ...PROVIDERS.spribe.normalize(g),
        __provider: "spribe",
      }));
    }

    // De-dupe
    const seen = new Set();
    return list.filter((g) => {
      const key = `${g.__provider}:${g.id}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [
    groups,
    stateGames,
    provider,
    spribeGames,
    imoonGames,
    elbetGames,
    turboGames,
    providerData,
  ]);

  // ✅ Search filter (search by title + alias for turbo)
  const filtered = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return baseList;
    return baseList.filter(
      (g) =>
        g?.title?.toLowerCase().includes(q) ||
        g?.alias?.toLowerCase().includes(q) // ✅ alias support (Turbo)
    );
  }, [baseList, searchTerm]);

  const displayed = filtered?.slice(0, displayCount);

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + (isMobile ? 12 : 14));
  };

  return (
    <div className="bg-bgBody min-h-screen w-full overflow-x-auto pb-10">
      <GameCategories />

      <div className="px-2 my-4">
        <GameSearchBar
          placeholder={
            stateTitle ? `Search in ${stateTitle}` : "Search games here"
          }
          showSort={false}
          showProvider={false}
          onSearchChange={(val) => {
            setSearchTerm(val);
            setDisplayCount(isMobile ? 12 : 14);
          }}
        />
      </div>

      {displayed?.length === 0 ? (
        <div className="text-center text-gray-400 py-10 text-sm">
          No games found
        </div>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-3 mt-2 px-2">
          {displayed?.map((g, i) => {
            const prov = g.__provider;
            const { Component, extraProps } = PROVIDERS[prov] || {};
            if (!Component) return null;
            return (
              <Component
                key={`${prov}:${g.id}:${i}`}
                title={g.title}
                src={g.image}
                gameID={g.id}
                gameAlias={g.alias}
                {...extraProps(g)}
              />
            );
          })}
        </div>
      )}

      {filtered?.length > displayCount && (
        <LoadMoreGames onClick={handleLoadMore} />
      )}
    </div>
  );
}

export default ViewAllGames;
