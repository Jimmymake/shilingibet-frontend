import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Loader from "../../../component/Loader";
import DepositHeader from "../../../component/payments/DepositHeader";
import { useLaunchImoonGame } from "../../../hooks/useGames";

function ImoonPlayGame() {
  const [launchURL, setLaunchURL] = useState("");
  const { gameID } = useParams();

  const navigate = useNavigate();

  const { launchImoonGames, isLoading } = useLaunchImoonGame();

  const hasLaunched = useRef(false);

  useEffect(() => {
    // if (hasLaunched.current) return;

    const data = { gameID };

    launchImoonGames(data, {
      onSuccess: (data) => {
        setLaunchURL(data?.data?.url);
      },
    });

    hasLaunched.current = true;
  }, [gameID, launchImoonGames]);

  // Add message handler for iframe communication
  useEffect(() => {
    function handleiMoonMessages(message) {
      if (!message.data) return;
      const { action, payload } = message.data;
      switch (action) {
        case "HOME":
          handleHomeAction(payload);
          break;
        case "INSUFFICIENT_FUNDS":
          handleInsufficientFunds(payload);
          break;
      }
    }

    window.addEventListener("message", handleiMoonMessages);

    return () => {
      window.removeEventListener("message", handleiMoonMessages);
    };
  }, []);

  // Define action handlers
  // eslint-disable-next-line no-unused-vars
  function handleHomeAction(payload) {
    // window.location.href = "/";
    navigate("/");
  }

  // eslint-disable-next-line no-unused-vars
  function handleInsufficientFunds(payload) {
    toast.error("Insufficient funds top up to continue playing");
  }
  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader size={62} iconClass="text-primary" />
      </div>
    );
  }
  return (
    <>
      <DepositHeader />
      <iframe
        className="w-full lg:h-[calc(100vh-3rem)] border-none h-[calc(100dvh-48px)]"
        src={launchURL}
        title="Game"
      ></iframe>
    </>
  );
}

export default ImoonPlayGame;
