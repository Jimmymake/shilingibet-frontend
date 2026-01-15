import { useEffect, useState } from "react";
import { useGameSession } from "../../hooks/useGames";
import Loader from "../../component/Loader";
import { useGame } from "../../context/GameContext";

export default function Homepage() {
  const { launchGame, isLoading,  } = useGameSession();
  const { launchURL, setLaunchURL, sessionUserId } = useGame();
  const [urlValid, setUrlValid] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.userId;

    // Guest → always load demo
    if (!userId) {
      if (!launchURL) {
        setLaunchURL(
          "https://demo.spribe.io/launch/aviator?currency=USD&lang=EN&return_url=https://demo.spribe.io/game-browser/",
          null
        );
      }
      return;
    }

    // If URL is stale or belongs to a different user → relaunch
    if (!launchURL || !urlValid || sessionUserId !== userId) {
      launchGame(
        { userId, game: "aviator" },
        {
          onSuccess: (data) => setLaunchURL(data?.launchUrl, userId),
          onError: (err) => console.error("Game launch failed:", err),
        }
      );
    }
  }, [launchGame, launchURL, urlValid, sessionUserId, setLaunchURL]);

  if (isLoading && !launchURL) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader size={62} iconClass="text-primary" />
      </div>
    );
  }

  // if (error) {
  //   return <div className="text-center mt-10 text-red-500">Game Error</div>;
  // }

  return (
    <div className="w-full h-[calc(100vh)] md:h-[calc(100vh-46px)] mt14 md:mt16">
      {launchURL && (
        <iframe
          src={launchURL}
          key={launchURL}
          title="Aviator"
          allowFullScreen
          className="w-full h-full border-none"
          onError={() => {
            console.warn("Iframe error, loading demo URL...");
            setUrlValid(false);
            setLaunchURL(
              "https://demo.spribe.io/launch/aviator?currency=USD&lang=EN&return_url=https://demo.spribe.io/game-browser/",
              null
            );
          }}
        />
      )}
    </div>
  );
}
