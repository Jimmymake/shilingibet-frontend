import { useRef, useMemo } from "react";

import DepositBanner from "../../component/payments/DepositBanner";
import SpribeBetsCard from "../../component/home/games/SpribeBetsCard";
import BetsCard from "../../component/home/games/BetsCard";
import CategoryHeader from "../../component/home/CategoryHeader";
import GameCategories from "../../component/home/GameCategories";
import {
  Virtuals,
  popularGames,
  crashGames,
  Slots,
  casino,
} from "../../utils/gamesArrangement";
import TurboCard from "../../component/home/games/TurboCard";
import {
  useElbetGames,
  useGames,
  useGetTurboGames,
  useImoonGames,
} from "../../hooks/useGames";
import Footer from "../../component/Footer";
import ElbetBetsCard from "../../component/home/games/ElbetBetsCard";

function Homepage() {
  const { imoonGames } = useImoonGames();
  const { games: spribeGames } = useGames();
  const { elbetGames } = useElbetGames();
  const { turboGames } = useGetTurboGames();

  /** 🔹 Match config with API */
  const matchGame = (cfg) => {
    switch (cfg.provider) {
      case "spribe":
        return spribeGames?.find(
          (g) => g.title?.toLowerCase() === cfg.gameName.toLowerCase()
        );
      case "imoon":
        return imoonGames?.find(
          (g) => String(g?.gameId) === String(cfg.gameName)
        );
      case "elbet":
        return elbetGames?.find(
          (g) =>
            g.GameAlias?.toLowerCase() === cfg.gameName.toLowerCase() ||
            String(g.GameID) === String(cfg.gameName.split("/")[1])
        );
      case "turbo":
        return turboGames?.find(
          (g) => g.gameAlias?.toLowerCase() === cfg.gameName.toLowerCase()
        );
      default:
        return null;
    }
  };

  /** 🔹 Ensure extension games first */
  const buildOrdered = (extArr, allGames) => {
    const first = extArr.map(matchGame).filter(Boolean);
    const seen = new Set(first.map((g) => g._id || g.gameId || g.GameID));
    const rest = (allGames || []).filter(
      (g) => !seen.has(g._id || g.gameId || g.GameID)
    );
    return [...first, ...rest];
  };

  /** 🔹 Final ordered lists */
  const allPopular = useMemo(
    () =>
      buildOrdered(popularGames, [
        ...(spribeGames || []),
        ...(imoonGames || []),
      ]),
    [spribeGames, imoonGames]
  );

  const allCrash = useMemo(
    () =>
      buildOrdered(crashGames, [
        ...(spribeGames || []),
        ...(imoonGames || []),
        // ...(elbetGames || []),
        ...(turboGames || []),
      ]),
    [spribeGames, imoonGames, elbetGames, turboGames]
  );

  const allVirtuals = useMemo(
    () => buildOrdered(Virtuals, [...(turboGames || [])]),
    [elbetGames]
  );

  const allSlots = useMemo(() => buildOrdered(Slots, elbetGames), [elbetGames]);
  const allCasino = useMemo(
    () => buildOrdered(casino, turboGames),
    [turboGames]
  );

  /** 🔹 Scroll helpers */
  const makeScroll = (ref) => ({
    scrollLeft: () => ref.current?.scrollBy({ left: -300, behavior: "smooth" }),
    scrollRight: () => ref.current?.scrollBy({ left: 300, behavior: "smooth" }),
  });

  const popularRef = useRef(null);
  const crashRef = useRef(null);
  const virtualsRef = useRef(null);
  const slotsRef = useRef(null);
  const casinoRef = useRef(null);

  return (
    <div>
      <GameCategories />
      {/* Popular */}
      <section className="px-2 pt-4">
        <CategoryHeader
          title="Popular"
          src="/popular.png"
          onPrev={makeScroll(popularRef).scrollLeft}
          onNext={makeScroll(popularRef).scrollRight}
          viewAllState={{ title: "Popular Games", games: allPopular }}
        />
        <div
          ref={popularRef}
          className="flex overflow-x-auto gap-3 pb-1 no-scrollbar"
        >
          {allPopular?.map((g, idx) => (
            <div
              key={g._id || g.gameId || g.GameID || idx}
              className="flex-none w-[115px] md:w-[160px]"
            >
              {g.GameID ? (
                <ElbetBetsCard
                  src={g.GameImageUrl}
                  gameName={g.GameName}
                  gameAlias={g.GameAlias}
                  gameID={g.GameID}
                />
              ) : g.gameAlias ? (
                <TurboCard src={g.image} gameAlias={g.gameAlias} />
              ) : g.provider === "spribe" ? (
                <SpribeBetsCard
                  title={g.title}
                  src={g.image}
                  gameID={g._id}
                  gameName={g.title}
                />
              ) : (
                <BetsCard title={g.title} src={g.image} gameID={g.gameId} />
              )}
            </div>
          ))}
        </div>
      </section>
      {/* Crash */}
      <section className="px-2 pt-4">
        <CategoryHeader
          title="Crash"
          src="/crash-games.svg"
          onPrev={makeScroll(crashRef).scrollLeft}
          onNext={makeScroll(crashRef).scrollRight}
          viewAllState={{ title: "Crash Games", games: allCrash }}
        />
        <div
          ref={crashRef}
          className="flex overflow-x-auto gap-3 pb-1 no-scrollbar"
        >
          {allCrash?.map((g, idx) => (
            <div
              key={g._id || g.gameId || g.GameID || idx}
              className="flex-none w-[115px] md:w-[160px]"
            >
              {g.GameID ? (
                <ElbetBetsCard
                  src={g.GameImageUrl}
                  gameName={g.GameName}
                  gameAlias={g.GameAlias}
                  gameID={g.GameID}
                />
              ) : g.gameAlias ? (
                <TurboCard src={g.image} gameAlias={g.gameAlias} />
              ) : g.provider === "spribe" ? (
                <SpribeBetsCard
                  title={g.title}
                  src={g.image}
                  gameID={g._id}
                  gameName={g.title}
                />
              ) : (
                <BetsCard title={g.title} src={g.image} gameID={g.gameId} />
              )}
            </div>
          ))}
        </div>
      </section>
      <DepositBanner />
      {/* Virtuals */}
      <section className="px-2 pt-4">
        <CategoryHeader
          title="Virtuals"
          src="/virtuals.png"
          onPrev={makeScroll(virtualsRef).scrollLeft}
          onNext={makeScroll(virtualsRef).scrollRight}
          viewAllState={{ title: "Virtuals", games: allVirtuals }}
        />
        <div
          ref={virtualsRef}
          className="flex overflow-x-auto gap-3 pb-1 no-scrollbar"
        >
          {allVirtuals?.map((g, idx) => (
            <div
              key={g.GameID || idx}
              className="flex-none w-[115px] md:w-[160px]"
            >
              {g.GameID ? (
                <ElbetBetsCard
                  src={g.GameImageUrl}
                  gameName={g.GameName}
                  gameAlias={g.GameAlias}
                  gameID={g.GameID}
                />
              ) : g.gameAlias ? (
                <TurboCard src={g.image} gameAlias={g.gameAlias} />
              ) : g.provider === "spribe" ? (
                <SpribeBetsCard
                  title={g.title}
                  src={g.image}
                  gameID={g._id}
                  gameName={g.title}
                />
              ) : (
                <BetsCard title={g.title} src={g.image} gameID={g.gameId} />
              )}
            </div>
          ))}
        </div>
      </section>
      {/* Slots */}
      <section className="px-2 pt-4">
        <CategoryHeader
          title="Slots"
          src="/slots.svg"
          onPrev={makeScroll(slotsRef).scrollLeft}
          onNext={makeScroll(slotsRef).scrollRight}
          viewAllState={{ title: "Slots", games: allSlots }}
        />
        <div
          ref={slotsRef}
          className="flex overflow-x-auto gap-3 pb-1 no-scrollbar"
        >
          {allSlots?.map((g, idx) => (
            <div
              key={g.GameID || idx}
              className="flex-none w-[115px] md:w-[160px]"
            >
              {g.GameID ? (
                <ElbetBetsCard
                  src={g.GameImageUrl}
                  gameName={g.GameName}
                  gameAlias={g.GameAlias}
                  gameID={g.GameID}
                />
              ) : g.gameAlias ? (
                <TurboCard src={g.image} gameAlias={g.gameAlias} />
              ) : g.provider === "spribe" ? (
                <SpribeBetsCard
                  title={g.title}
                  src={g.image}
                  gameID={g._id}
                  gameName={g.title}
                />
              ) : (
                <BetsCard title={g.title} src={g.image} gameID={g.gameId} />
              )}
            </div>
          ))}
        </div>
      </section>
      {/* Casino */}
      <section className="px-2 pt-4">
        <CategoryHeader
          title="Casino"
          src="/casino.svg"
          onPrev={makeScroll(casinoRef).scrollLeft}
          onNext={makeScroll(casinoRef).scrollRight}
          viewAllState={{ title: "Casino", games: allCasino }}
        />
        <div
          ref={casinoRef}
          className="flex overflow-x-auto gap-3 pb-1 no-scrollbar"
        >
          {allCasino?.map((g, idx) => (
            <div
              key={g._id || g.gameId || idx}
              className="flex-none w-[115px] md:w-[160px]"
            >
              <TurboCard
                title={g.title}
                src={g.image}
                gameAlias={g.gameAlias}
              />
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Homepage;
