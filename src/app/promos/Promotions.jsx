import Footer from "../../component/Footer";
import PromotionsCard from "../../component/promotions/PromotionsCard";

function Promotions() {
  return (
    <div className="min-h-screen bg-bgBody  overflow-y-scroll no-scrollbar ">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 p-3 mb-16 max-w-6xl mx-auto">
        <PromotionsCard
          id="registration"
          title="Registration Bonus"
          description="Register and instantly get Ksh.10 Instant Stake to start playing."
          src="/banner1.png"
        />
        <PromotionsCard
          id="refer"
          title="Refer & Earn"
          description="Invite friends and earn weekly rewards every time they deposit & play."
          src="/banner2.png"
        />
        <PromotionsCard
          id="daily-cashback"
          title="Daily Cashback"
          description="Get guaranteed cashback daily on your bets. No hidden conditions."
          src="/banner3.png"
        />
        <PromotionsCard
          id="aviator-daily"
          title="Aviator Daily Cashback"
          description="Daily Freebets & Free Rains worth Ksh.5M available every day."
          src="/banner4.png"
        />
        <PromotionsCard
          id="aviator-challenges"
          title="Aviator Challenges"
          description="Join Missions, Races, and Tournaments to win Freebets, Cash & Merch."
          src="/banner5.png"
        />
      </div>{" "}
      <Footer />
    </div>
  );
}

export default Promotions;
