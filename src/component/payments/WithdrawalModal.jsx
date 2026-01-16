import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";

import { IoWalletOutline } from "react-icons/io5";
import BaseClass from "../../services/BaseClass";
import toast from "react-hot-toast";

import {
  useUpdateBalance,
  useWithdraw,
  useWithdrawToOtherProvider,
} from "../../hooks/usePayment";
import { debouncedWithdraw } from "../../utils/debounce";

export default function WithdrawalModal({ onClose }) {
  const [withdrawType, setWithdrawType] = useState("telkom"); // "telkom" or "other"
  const [withdrawAmount, setWithdrawAmount] = useState(100);
  const [destinationPhone, setDestinationPhone] = useState("");
  const [callbackUrl, setCallbackUrl] = useState("");
  const [localBalance, setLocalBalance] = useState(500); // Session balance
  const presetAmounts = [100, 250, 500, 1000, 1500];
  const { balance } = useUpdateBalance();
  const { withdrawingCash, isLoading: isWithdrawing } = useWithdraw();
  const { withdrawingToOther, isLoading: isWithdrawingToOther } = useWithdrawToOtherProvider();
  const baseClass = new BaseClass();

  // Initialize local balance from actual balance
  useEffect(() => {
    if (balance?.balance) {
      setLocalBalance(balance.balance);
    }
  }, [balance?.balance]);

  // Format phone number to include country code (254)
  const formatPhoneNumber = (phone) => {
    if (!phone) return null;
    // Remove any spaces, dashes, or non-numeric characters
    let cleaned = phone.replace(/\D/g, '');
    // If it starts with 0, replace with 254
    if (cleaned.startsWith('0')) {
      cleaned = '254' + cleaned.substring(1);
    }
    // If it doesn't start with 254, add it
    if (!cleaned.startsWith('254')) {
      cleaned = '254' + cleaned;
    }
    return cleaned;
  };

  const handlePresetClick = (val) => setWithdrawAmount(val);
  
  function handleWithdraw() {
    debouncedWithdraw(withdrawAmount, () => {
      if (isWithdrawing || isWithdrawingToOther) return;

      const amount = +withdrawAmount;
      const currentBalance = withdrawType === "other" ? localBalance : (balance?.balance || 0);

      if (currentBalance === 0) {
        return toast.error(
          "You don't have enough amount to make this transaction"
        );
      }

      if (amount > currentBalance) {
        return toast.error(
          "You don't have enough amount to make this transaction"
        );
      }

      if (amount < 100) {
        return toast.error("Withdrawals start at Ksh 100 and above.");
      }

      if (withdrawType === "telkom") {
        // Withdraw to Telkom (existing flow)
        const phoneNumber = formatPhoneNumber(baseClass?.phone);
        if (!phoneNumber) {
          return toast.error("Phone number is required for withdrawal");
        }

        withdrawingCash(
          { 
            msisdn: phoneNumber, 
            amount: amount, 
            info1: "Payment for services" 
          },
          {
            onSuccess: () => {
              setWithdrawAmount(100);
              onClose();
            },
            onError: (err) => {
              toast.error(
                err?.message ||
                  `Withdrawal of Ksh ${withdrawAmount} failed`
              );
            },
          }
        );
      } else {
        // Withdraw to other provider
        if (!destinationPhone) {
          return toast.error("Please enter destination phone number");
        }

        if (!callbackUrl) {
          return toast.error("Please provide a callback URL");
        }

        // Validate callback URL format
        try {
          new URL(callbackUrl);
        } catch {
          return toast.error("Please enter a valid callback URL");
        }

        const destPhone = formatPhoneNumber(destinationPhone);
        if (!destPhone) {
          return toast.error("Invalid destination phone number format");
        }

        // Deduct balance for this session
        setLocalBalance(prev => prev - amount);

        withdrawingToOther(
          {
            destinationMsisdn: destPhone,
            amount: amount.toString(),
            callbackUrl: callbackUrl
          },
          {
            onSuccess: () => {
              setWithdrawAmount(100);
              setDestinationPhone("");
              setCallbackUrl("");
              onClose();
            },
            onError: (err) => {
              // Restore balance on error
              setLocalBalance(prev => prev + amount);
              toast.error(
                err?.message ||
                  `Withdrawal to other provider failed`
              );
            },
          }
        );
      }
    });
  }

  return (
    <div className="fixed inset-0 bottom-15 flex flex-col justify-end md:justify-center items-center z-50">
      <div className="w-full md:w-[90%] md:max-w-md bg-secondary rounded-t-2xl md:rounded-2xl overflow-hidden shadow-2xl text-[rgb(151,137,205)]/90">
        {/* Header */}
        <div className="bg-primary flex items-center justify-between px-4 py-2">
          <h2 className="font-semibold text-[17px] flex items-center gap-2 text-black">
            <IoWalletOutline /> Withdraw
          </h2>
          <button onClick={onClose}>
            <IoClose className="text-black text-2xl" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Withdrawal Type Tabs */}
          <div className="flex gap-2 mb-5 bg-secondary rounded-lg p-1">
            <button
              onClick={() => setWithdrawType("telkom")}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                withdrawType === "telkom"
                  ? "bg-primary text-black"
                  : "text-[rgb(151,137,205)]/90 hover:text-white"
              }`}
            >
              To Telkom
            </button>
            <button
              onClick={() => setWithdrawType("other")}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                withdrawType === "other"
                  ? "bg-primary text-black"
                  : "text-[rgb(151,137,205)]/90 hover:text-white"
              }`}
            >
              To Other
            </button>
          </div>

          {/* Account Info */}
          <div className="bg-secondary border border-[#444] text-sm px-4 py-3 rounded-lg mb-1 font-medium tracking-wide text-[rgb(151,137,205)]/90">
            KE {baseClass?.phone}
          </div>
          <p className="text-sm text-[rgb(151,137,205)]/90 my-4 font-normal">
            {withdrawType === "telkom" 
              ? "This is your primary account number"
              : "Available Balance: KES " + localBalance.toLocaleString()}
          </p>

          {/* Destination Phone Number (for Other providers) */}
          {withdrawType === "other" && (
            <>
              <div className="mb-4">
                <label className="block text-sm text-[rgb(151,137,205)]/90 mb-1">
                  Destination Phone Number
                </label>
                <input
                  type="text"
                  value={destinationPhone}
                  onChange={(e) => setDestinationPhone(e.target.value)}
                  placeholder="e.g. 0712345678 or 254712345678"
                  className="w-full px-4 py-2 rounded-md bg-secondary text-[rgb(151,137,205)]/90 border border-[#444] outline-none text-sm"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm text-[rgb(151,137,205)]/90 mb-1">
                  Callback URL <span className="text-red-400">*</span>
                </label>
                <input
                  type="url"
                  value={callbackUrl}
                  onChange={(e) => setCallbackUrl(e.target.value)}
                  placeholder="https://your-domain.com/webhook"
                  className="w-full px-4 py-2 rounded-md bg-secondary text-[rgb(151,137,205)]/90 border border-[#444] outline-none text-sm"
                />
                <p className="text-xs text-[rgb(151,137,205)]/70 mt-1">
                  We'll send transaction status updates to this URL
                </p>
              </div>
            </>
          )}

          {/* Preset Amounts */}
          <div className="flex rounded-lg overflow-hidden border border-[#444] mb-4">
            {presetAmounts.map((val, idx) => (
              <button
                key={val}
                onClick={() => handlePresetClick(val)}
                className={`flex-1 py-2 text-sm font-medium transition-all 
                  ${
                    withdrawAmount === val
                      ? "bg-primary text-black"
                      : "bg-secondary text-[rgb(151,137,205)]/90"
                  } 
                  ${
                    idx !== presetAmounts.length - 1
                      ? "border-r border-[#444]"
                      : ""
                  } 
                  ${idx === 0 ? "rounded-l-md" : ""} 
                  ${idx === presetAmounts.length - 1 ? "rounded-r-md" : ""}`}
              >
                +{val}
              </button>
            ))}
          </div>

          {/* Amount Input */}
          <input
            type="text"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-secondary text-[rgb(151,137,205)]/90 border border-[#444] outline-none mb-2 text-sm"
          />

          {/* Max Note */}
          <p className="text-xs text-[rgb(151,137,205)]/90 mb-4 font-normal">
            Minimum withdrawal amount is KES 100.00
            {withdrawType === "other" && ` | Available: KES ${localBalance.toLocaleString()}`}
          </p>

          {/* Withdraw Button */}
          <button
            onClick={() => handleWithdraw()}
            disabled={isWithdrawing || isWithdrawingToOther}
            className="w-full bg-primary text-black font-bold py-3 rounded-lg text-[15px] hover:brightness-105 transition mb-6"
          >
            {(isWithdrawing || isWithdrawingToOther) ? "Processing..." : "Withdraw"}
          </button>
        </div>
      </div>
    </div>
  );
}
