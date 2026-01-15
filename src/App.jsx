import { Routes, Route } from "react-router-dom";
import Login from "./app/auth/Login";
import Register from "./app/auth/Register";
import ForgotPassword from "./app/auth/ForgotPassword";
import ResetPassword from "./app/auth/ResetPassword";
import ImoonPlayGame from "./app/home/Games/ImoonPlayGame";
import PlayGame from "./app/home/Games/PlayGame";
import LaunchTurboGame from "./app/home/Games/LaunchTurboGames";
import DashboardLayout from "./app/home/DashboardLayout";
import ViewAllGames from "./app/home/ViewAllGames";
import Profile from "./app/profile/Profile";
import Homepage from "./app/home/Homepage";
import Promotions from "./app/promos/Promotions";
import PaymentView from "./app/payment/PaymentView";
import WithdrawView from "./app/payment/WithdrawView";
import Legals from "./app/auth/policies/Legals";
import HistoryPage from "./app/profile/History";
import CasinoLayout from "./app/home/CasinoLayout";
import Aviator from "./app/home/Aviator";
import Slots from "./app/home/Slots";

import PromotionsDetails from "./app/promos/PromotionsDetails";
import ReferAndEarn from "./app/profile/ReferAndEarn";
import RedeemBonus from "./app/profile/ReedemBonus";
import LaunchElbetGame from "./app/home/Games/LaunchElbetGame";
import Sports from "./app/home/Sports";
import LaunchSports from "./app/home/Games/LaunchSports";

function App() {
  if (localStorage.getItem("user") === "undefined") {
    localStorage.removeItem("user");
  }
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset" element={<ResetPassword />} />
      <Route path="imoon/:gameID" element={<ImoonPlayGame />} />
      <Route path="playGame/:gameAlias" element={<PlayGame />} />
      <Route path="turbo/:gameAlias" element={<LaunchTurboGame />} />{" "}
      <Route path="elbet/:gameAlias/:gameID" element={<LaunchElbetGame />} />
      <Route path="sports/launch" element={<LaunchSports />} />
      <Route path="/" element={<DashboardLayout />}>
        {/* <Route element={<AuthLayout />}></Route> */}
        <Route path="viewAll/:provider" element={<ViewAllGames />} />
        <Route path="/profile" element={<Profile />} />
        <Route index element={<Homepage />} />
        {/* <Route path="sports" element={<Sports />} /> */}
        <Route path="promotions" element={<Promotions />} />
        <Route path="/callback/:id" element={<PaymentView />} />
        <Route path="/withdraw/callback/:id" element={<WithdrawView />} />
        <Route path="legals" element={<Legals />} />
        <Route path="/history" element={<HistoryPage />} />{" "}
        <Route path="/redeem" element={<RedeemBonus />} />
        <Route path="promotions" element={<Promotions />} />
        <Route path="/promotions/:id" element={<PromotionsDetails />} />
        <Route path="/refer" element={<ReferAndEarn />} />
        <Route path="/casino" element={<CasinoLayout />}>
          <Route path="slots" element={<Slots />} />
        </Route>
        <Route path="aviator" element={<Aviator />} />
        <Route path="sports" element={<Sports />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Route>
    </Routes>
  );
}

export default App;
