import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../../component/Loader";
import DepositHeader from "../../../component/payments/DepositHeader";
import { useLaunchTurboGame } from "../../../hooks/useGames";

function LaunchTurboGame() {
  const { gameAlias } = useParams();

  const { launchTurbo, isLoading, error } = useLaunchTurboGame();

  const [launchURL, setLaunchURL] = useState(null);

  useEffect(() => {
    let hasLaunched = false;

    if (!hasLaunched) {
      const data = { game: gameAlias };
      launchTurbo(data, {
        onSuccess: (data) => {
          setLaunchURL(data?.url);
        },
      });

      hasLaunched = true;
    }
  }, [gameAlias, launchTurbo]);

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loader size={62} iconClass="text-primary" />
      </div>
    );
  }

  if (error) {
    return <div>Game Error</div>;
  }

  const launchUrl = launchURL;

  return (
    <>
      <DepositHeader />
      <iframe
        src={`${launchUrl}`}
        className="w-full lg:h-[calc(100vh-3rem)] border-none h-[calc(100dvh-48px)]"
        title="Turbo "
      ></iframe>
    </>
  );
}

export default LaunchTurboGame;
