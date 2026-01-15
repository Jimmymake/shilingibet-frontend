import { useState } from "react";
import { CopyOutlined, WhatsAppOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
import BaseClass from "../../services/BaseClass";
import { useUpdateBalance } from "../../hooks/usePayment";
import { FiUsers } from "react-icons/fi";
import { FaMoneyBillWave } from "react-icons/fa";
import Footer from "../../component/Footer";

export default function ReferAndEarn() {
  const [accepted, setAccepted] = useState(true);
  const base = new BaseClass();
  const referralCode = base?.referralCode;
  const referralLink = `https://www.ShilingiBet.com/register?ref=${referralCode}`;
  const { balance } = useUpdateBalance();
  // calculate total bonus
  const bonusTotal = (balance?.referralBonus ?? 0) + (balance?.cashback ?? 0);
  const referralStats = balance?.referralsCount ?? 0;

  const copyToClipboard = () => {
    if (!accepted) {
      toast.error("You must accept the Terms & Conditions first");
      return;
    }
    navigator.clipboard.writeText(referralLink);
    toast.success("Referral link copied!");
  };

  const shareOnWhatsApp = () => {
    if (!accepted) {
      toast.error("You must accept the Terms & Conditions first");
      return;
    }
    window.open(
      `https://wa.me/?text=${encodeURIComponent(referralLink)}`,
      "_blank"
    );
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-background px-4 py-10">
        <div className="w-full md:max-w-3xl bg-background backdrop-blur-lg md:border md:border-gray-700 rounded-2xl shadow-2xl p-2 md:p-10">
          {/* Header */}
          <h4 className="text-md md:text-3xl font-bold text-[rgb(151,137,205)] mb-3">
            Refer Friends, Earn Rewards!
          </h4>
          <p className="text-[rgb(151,137,205)]/90 text-base mb-8">
            Build a multi-level network by inviting your friends who in turn
            will refer their friends. Earn rewards on every deposit they make!
          </p>
          {/* Referral Stats */}
          <div className="bg-background border border-gray-700 rounded-2xl p-6 mb-8 shadow-lg hover:shadow-primary/20 transition">
            <h2 className="text-xl font-bold text-[rgb(151,137,205)] mb-6 flex items-center gap-2">
              📊 Your Stats
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Total Referrals */}
              <div className="flex items-center gap-4 bg-background/60 rounded-lg p-4 border border-gray-700 hover:border-primary transition">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/20 text-primary text-2xl">
                  <FiUsers />
                </div>
                <div>
                  <p className="text-sm text-[rgb(151,137,205)]/90">
                    Total Referrals
                  </p>
                  <p className="text-lg font-bold text-primary">
                    {referralStats}
                  </p>
                </div>
              </div>

              {/* Total Earned */}
              <div className="flex items-center gap-4 bg-background/60 rounded-lg p-4 border border-gray-700 hover:border-primary transition">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-500/20 text-green-400 text-2xl">
                  <FaMoneyBillWave />
                </div>
                <div>
                  <p className="text-sm text-[rgb(151,137,205)]/70">
                    Total Earned
                  </p>
                  <p className="text-lg font-bold text-primary">
                    KSH {bonusTotal}
                  </p>
                </div>
              </div>
            </div>
          </div>{" "}
          {/* Terms */}
          <div className="flex items-start gap-2 mb-6">
            <input
              type="checkbox"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
              className="accent-primary mt-1 w-4 h-4"
            />
            <label className="text-sm text-[rgb(151,137,205)]/90">
              I accept the{" "}
              <span className="text-primary cursor-pointer hover:underline">
                Terms and Conditions
              </span>
              .
            </label>
          </div>
          {/* Referral Link Section */}
          <div className="bg-background/80 border border-gray-700 rounded-xl p-4 flex flex-col md:flex-row md:items-center gap-4 mb-6">
            <input
              type="text"
              value={referralLink}
              readOnly
              className="flex-1 bg-transparent text-primary font-mono text-sm focus:outline-none"
            />
            <div className="flex gap-3">
              <button
                onClick={copyToClipboard}
                disabled={!accepted}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition cursor-pointer ${
                  accepted
                    ? "bg-secondary text-[rgb(151,137,205)]/90 hover:bg-primary/20 hover:scale-105"
                    : "bg-gray-600 text-gray-400 cursor-not-allowed"
                }`}
              >
                <CopyOutlined /> Copy Link
              </button>
              <button
                onClick={shareOnWhatsApp}
                disabled={!accepted}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition cursor-pointer ${
                  accepted
                    ? "bg-green-600 white hover:bg-green-700 hover:scale-105"
                    : "bg-gray-600 text-gray-400 cursor-not-allowed"
                }`}
              >
                <WhatsAppOutlined /> Share
              </button>
            </div>
          </div>{" "}
          {/* How it Works */}
          <div className="bg-background/60 border border-gray-700 rounded-xl p-6 shadow-inner mb-8">
            <h2 className="text-xl font-bold text-[rgb(151,137,205)] mb-4">
              How does it work?
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-[rgb(151,137,205)]/90 text-sm md:text-base">
              <li>You invite your friends.</li>
              <li>Your friends register, deposit funds, and place bets.</li>
              <li>You receive your reward instantly!</li>
            </ul>
            <p className="mt-4 text-sm text-[rgb(151,137,205)]/80">
              When you refer friends, you’ll receive a 5% bonus on every deposit
              they make — helping you grow your earnings effortlessly. 🎉
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
