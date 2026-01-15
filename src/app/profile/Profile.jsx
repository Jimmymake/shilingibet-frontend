import { useState } from "react";
import {
  FaCrown,
  FaUniversity,
  FaComments,
  FaTrash,
  FaSignOutAlt,
  FaWallet,
  FaHistory,
  FaCoins,
} from "react-icons/fa";
import { TfiGift } from "react-icons/tfi";
import { IoWalletOutline } from "react-icons/io5";
import { MdOutlineAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { BsBoxes } from "react-icons/bs";
import { useUpdateBalance } from "../../hooks/usePayment";
import BaseClass from "../../services/BaseClass";
import Footer from "../../component/Footer";
import MenuItem from "../../component/profile/MenuItem";
import DepositModal from "../../component/payments/DepositModal";
import WithdrawalModal from "../../component/payments/WithdrawalModal";
import Loader from "../../component/Loader";
import { BounceLoading } from "respinner";
import LogoutModal from "../../component/LogoutModal";
import DeleteAccountModal from "../../component/profile/DeleteAccountModal";
import WalletCard from "../../component/profile/WalletCard";
import { useGame } from "../../context/GameContext";
import { LoadTawk } from "../../component/profile/LoadTawk";

export default function Profile() {
  const { balance, isLoading: gettingBalance } = useUpdateBalance();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [openDeposit, setOpenDeposit] = useState(false);
  const [openWithdraw, setOpenWithdraw] = useState(false);
  const [isLoggingOut] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const base = new BaseClass();
  const referralCode = base?.referralCode;
  const referralLink = `https://www.ShilingiBet.com/register?ref=${referralCode}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };
  const { resetGame } = useGame();

  return (
    <div className="min-h-screen">
      {/* Centered container on desktop */}
      <div className="text-[rgb(151,137,205)]/90 p-4 md:p-8 w-full max-w-6xl mx-auto">
        <h1 className="text-xl font-bold mb-4 text-[rgb(151,137,205)]/90">
          Profile
        </h1>
        <hr className="border-gray-700 mb-4" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sidebar Menu */}
          <div className="bg-secondary border border-gray-600 rounded-lg p-4 order-2 md:order-1">
            <ul className="space-y-6">
              <MenuItem
                icon={<TfiGift />}
                label="Promotions"
                route="promotions"
              />
              <MenuItem icon={<BsBoxes />} label="Refer & Earn" route="refer" />
              <MenuItem
                icon={<FaHistory />}
                label="Transaction Records"
                route="history"
              />{" "}
              <MenuItem
                icon={<FaCrown />}
                label="Redeem Bonus"
                route="redeem"
              />
              <MenuItem
                icon={<FaUniversity />}
                label="Legal Terms"
                route="legals"
              />
              <MenuItem
                icon={<FaComments />}
                label="Chat with Support"
                onClick={() => LoadTawk()}
              />
              <MenuItem
                icon={<FaTrash />}
                label="Delete Account"
                onClick={() => setShowDeleteModal(true)}
              />
              <MenuItem
                onClick={() => setShowLogoutModal(true)}
                icon={<FaSignOutAlt />}
                label={isLoggingOut ? "Logging Out..." : "Log Out"}
                textColor="text-red-500"
              />
              <LogoutModal
                open={showLogoutModal}
                onConfirm={() => {
                  // Clear only what’s needed (safer than clearing all LS)
                  localStorage.removeItem("user");
                  localStorage.removeItem("launchURL");
                  localStorage.removeItem("seenDownloadBanner");

                  // Reset the Spribe game session from context
                  resetGame();

                  // Navigate back to login
                  navigate("/login");

                  // Close modal
                  setShowLogoutModal(false);
                }}
                onCancel={() => setShowLogoutModal(false)}
              />
            </ul>
          </div>

          {/* User Info */}
          <div className="bg-secondary border border-gray-600 rounded-lg p-4 md:col-span-2 order-1 md:order-2">
            {/* User Details */}
            <div className="flex items-center gap-4 mb-4">
              <img
                src="/prof-1.png"
                alt="User Avatar"
                className="w-12 h-12 rounded-full border-2 border-[rgb(151,137,205)]"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-4">
              <WalletCard
                icon={FaWallet}
                label="Wallet"
                value={`KES ${balance?.balance?.toLocaleString() ?? 0}`}
                loading={gettingBalance}
                iconColor="text-yellow-400"
                badgeColor="bg-green-500"
              />
              <WalletCard
                icon={TfiGift}
                label="Referral"
                value={`KES ${balance?.referralBonus?.toLocaleString() ?? 0}`}
                loading={gettingBalance}
                iconColor="text-pink-400"
                badgeColor="bg-purple-500"
                type="referral"
              />
              <WalletCard
                icon={FaCoins}
                label="Cashback"
                value={`KES ${balance?.cashback?.toLocaleString() ?? 0}`}
                loading={gettingBalance}
                iconColor="text-cyan-400"
                badgeColor="bg-blue-500"
                type="cashback"
              />
            </div>
            {/* Deposit & Withdraw */}
            <div className="flex gap-4 mb-4">
              <button
                onClick={() => setOpenDeposit(true)}
                className="bg-green-500 text-white w-full sm:w-auto font-bold px-4 py-2 rounded-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <MdOutlineAdd className="h-6 font-bold " /> Deposit
              </button>
              {openDeposit && (
                <DepositModal
                  onClose={() => setOpenDeposit(false)}
                  isOpen={openDeposit}
                  setIsOpen={setOpenDeposit}
                />
              )}

              <button
                onClick={() => setOpenWithdraw(true)}
                className="bg-primary cursor-pointer w-full sm:w-auto text-black font-bold px-4 py-2 rounded-md flex items-center justify-center gap-2"
              >
                <IoWalletOutline /> Withdraw
              </button>
              {openWithdraw && (
                <WithdrawalModal onClose={() => setOpenWithdraw(false)} />
              )}
            </div>
            {/* Supported Networks */}
            <div className="mb-4">
              <p className="text-[rgb(151,137,205)]/90 text-sm mb-2">
                Supported Networks:
              </p>
              <img src="/mpesa.png" alt="M-Pesa" className="h-12" />
            </div>
            {/* Referral Section */}
            <div className="mt-6 border-t border-gray-700 pt-6">
              {/* Title */}
              <p className="text-base font-semibold text-[rgb(151,137,205)]/90 mb-3">
                🎉 Refer friends & win{" "}
                <span className="text-primary">KES 350,000 Weekly</span>
              </p>

              {/* Referral Input with Copy Button Inside */}
              <div className="relative w-full">
                <input
                  type="text"
                  readOnly
                  value={referralLink}
                  className="w-full bg-secondary/60 border border-gray-600 rounded-xl shadow-md px-4 py-3 text-sm text-[rgb(151,137,205)]/90 font-medium pr-16 outline-none"
                />
                <button
                  onClick={handleCopy}
                  className={`absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    copied
                      ? "bg-green-500 text-[rgb(151,137,205)]/90"
                      : "bg-primary/90 text-black hover:bg-primary"
                  }`}
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>

              {/* Description */}
              <p className="text-[rgb(151,137,205)]/70 text-xs mt-2 text-center">
                Share this referral link with your friends and start earning
                rewards 💸
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Delete Account Modal */}
      <DeleteAccountModal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        // eslint-disable-next-line no-unused-vars
        onConfirm={({ phone, period }) => {
          setShowDeleteModal(false);
        }}
      />
      <Footer />
    </div>
  );
}
