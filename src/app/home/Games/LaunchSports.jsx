import { useEffect, useState } from "react";
import Loader from "../../../component/Loader";
import SportsHeader from "../../../component/home/SportsHeader";
import { useLaunchSports } from "../../../hooks/useGames";
import { sportsTenantId } from "../../../utils/configs";

function LaunchSports() {
  const { launchSports, isLoading } = useLaunchSports();
  const [launchURL, setLaunchURL] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.userId;

    console.log("User object from localStorage:", user);
    console.log("Using userId for sports launch:", userId);

    // If no user, don't launch
    if (!userId) {
      return;
    }

    // Only launch if we don't have a URL yet
    if (!launchURL) {
      launchSports(
        { userId, tenantId: sportsTenantId },
        {
          onSuccess: (data) => {
            // Handle different possible response formats
            const url = data?.launchUrl || data?.url || data?.data?.launchUrl || data?.data?.url;
            if (url) {
              setLaunchURL(url);
            }
          },
          onError: (err) => {
            console.error("Game launch failed:", err);
          },
        }
      );
    }
  }, [launchSports, launchURL]);

  if (isLoading && !launchURL) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader size={62} iconClass="text-primary" />
      </div>
    );
  }

  return (
    <div className="">
      <SportsHeader />
      {launchURL && (
        <iframe
          src={launchURL}
          key={launchURL}
          title="Sports"
          allowFullScreen
          className="w-full lg:h-[calc(100vh-3rem)] border-none h-[calc(100dvh-48px)]"
        />
      )}
    </div>
  );
}

export default LaunchSports;


