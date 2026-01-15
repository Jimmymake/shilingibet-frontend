import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useLaunchElbetGame } from "../../../hooks/useGames";
import Loader from "../../../component/Loader";
import DepositHeader from "../../../component/payments/DepositHeader";

function LaunchElbetGame() {
  const [launchURL, setLaunchURL] = useState("");
  const { gameAlias, gameID } = useParams();
  const { launchElbetGame, isLoading, error } = useLaunchElbetGame();

  useEffect(() => {
    if (!gameAlias || !gameID) return;
    const data = { game: gameAlias, gameID: gameID };

    launchElbetGame(data, {
      onSuccess: (data) => {
        setLaunchURL(data?.launchUrl);
      },
    });
  }, [gameAlias, gameID]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">Failed to launch game</div>
    );
  }

  return (
    <>
      <DepositHeader />
      {launchURL && (
        <iframe
          src={launchURL}
          className="w-full h-[calc(100vh-2.5rem)] border-none"
          title="Elbet Game"
          allowFullScreen
        />
      )}
    </>
  );
}

export default LaunchElbetGame;
