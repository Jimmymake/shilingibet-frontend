import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import Loader from "../../../component/Loader";
import DepositHeader from "../../../component/payments/DepositHeader";
import { useGameSession } from "../../../hooks/useGames";

function PlayGame() {
  const { gameAlias } = useParams();

  const { launchGame, isLoading, error } = useGameSession();

  const [launchURL, setLaunchURL] = useState("");

  useEffect(() => {
    let hasLaunched = false;

    if (!hasLaunched) {
      const user = JSON.parse(localStorage.getItem("user"));
      const userID = user?.userID;

      const data = { userId: userID, game: gameAlias };
      launchGame(data, {
        onSuccess: (data) => {
          setLaunchURL(data?.launchUrl);
        },
        onError: () => {},
      });

      hasLaunched = true;
    }
  }, [gameAlias, launchGame]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader size={62} iconClass="text-primary" />
      </div>
    );
  }

  if (error) {
    return <div>Game Error</div>;
  }

  const launchUrl = launchURL;

  return (
    <div className="">
      <DepositHeader />
      <iframe
        src={launchUrl}
        title="Aviator"
        allowFullScreen
        className="w-full lg:h-[calc(100vh-3rem)] border-none h-[calc(100dvh-48px)]"
      />
    </div>
  );
}

export default PlayGame;
