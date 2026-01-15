import { useState } from "react";
import { Copy, Check, X } from "lucide-react";
import toast from "react-hot-toast";
import BaseClass from "../../services/BaseClass";
import {
  useCryptoDeposit,
  useCryptoUpdateDeposit,
  useDeposit,
} from "../../hooks/usePayment";

export default function PaymentModal({ isOpen, setIsOpen }) {
  const baseClass = new BaseClass();
  const [transactionID, setTransactionID] = useState("");
  const [tab, setTab] = useState("mpesa");
  const [copied, setCopied] = useState(false);
  const [amount, setAmount] = useState("");
  const { depositCrypto, isLoading: isDepositingCrypto } = useCryptoDeposit();
  const { depositCrypto: updatingCryptoBalance } =
    useCryptoUpdateDeposit();
  const { makingPayment, isLoading: isMakingPayment } = useDeposit();

  const cryptoAddress = "TDar6Jvdb8Hs4MhawzpXUEyXUSg2R6qpMk";

  const handleCopy = () => {
    navigator.clipboard.writeText(cryptoAddress);
    setCopied(true);
    toast.success("Address copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  async function handleCryptoDeposit(e) {
    e.preventDefault();

    if (!transactionID) {
      toast.error("Please enter a valid Transaction ID");
      return;
    }

    const data = { trasactionID: transactionID };

    depositCrypto(
      { data },
      {
        onSuccess: (res) => {
          console.log(res);
          if (res.success !== true) {
            toast.error(
              res?.data?.message ?? "Something went wrong try again later"
            );
          } else {
            const updateBalanceData = {
              transactionId: transactionID,
              userID: baseClass?.userId,
              amount: res?.amount,
            };

            updatingCryptoBalance(
              { updateBalanceData },
              {
                onSuccess: (res) => {
                  if (res.status !== "success") {
                    toast.error(
                      res?.data?.message ?? "Failed to update balance"
                    );
                  } else {
                    toast.success("Balance updated successfully");
                  }
                },
                onError: (err) => {
                  toast.error(err?.message ?? "Something went wrong");
                },
              }
            );
            toast.success(res?.message ?? "Deposit successful");
            setIsOpen(false);
          }
        },
        onError: (err) => {
          toast.error(err?.message ?? "Something went wrong");
        },
      }
    );
  }

  async function handleMpesaPayment(e) {
    if(!amount) return;

    e.preventDefault();

    makingPayment(
      {amount},
      {
        onSuccess: (res) => {
          if (res.status !== true) {
            toast.error(
              res?.data?.message ?? "Something went wrong try again later"
            );
          } else {
            setIsOpen(false);
          }
        },
        onError: (err) => {
          toast.error(err?.message ?? "Something went wrong");
        },
      }
    );
  }

  return (
    <>
      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm transition-all duration-300">
          {/* Modal Container */}
          <div className="relative w-full max-w-xl mx-auto bg-[#0b0b0b] border border-[#1f1f1f] rounded-2xl p-6 shadow-2xl scale-100 animate-fadeIn">
            {/* Floating Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute -top-4 -right-4 bg-[#1a1a1a] border border-[#333] text-gray-400 hover:text-white hover:bg-[#222] transition p-2 rounded-full shadow-md"
            >
              <X size={18} />
            </button>

            {/* Tab Switcher */}
            <div className="flex items-center justify-center gap-3 bg-[#0e0e0e] border border-[#222] rounded-2xl p-1 mb-6 shadow-inner">
              <button
                type="button"
                onClick={() => setTab("mpesa")}
                className={`flex-1 py-3 text-sm font-semibold rounded-xl transition-all duration-300 ${
                  tab === "mpesa"
                    ? "bg-[#f5c542] text-black shadow-[0_0_10px_rgba(245,197,66,0.5)]"
                    : "bg-transparent text-gray-400 hover:text-[#f5c542]"
                }`}
              >
                M-PESA
              </button>
              <button
                type="button"
                onClick={() => setTab("crypto")}
                className={`flex-1 py-3 text-sm font-semibold rounded-xl transition-all duration-300 ${
                  tab === "crypto"
                    ? "bg-[#f5c542] text-black shadow-[0_0_10px_rgba(245,197,66,0.5)]"
                    : "bg-transparent text-gray-400 hover:text-[#f5c542]"
                }`}
              >
                Crypto
              </button>
            </div>

            {/* M-PESA TAB */}
            {tab === "mpesa" && (
              <div className="bg-[#111] border border-[#222] rounded-2xl p-5 text-gray-300">
                <h3 className="text-lg font-semibold mb-3 text-white">
                  Pay with M-PESA
                </h3>
                <p className="text-sm mb-2 text-gray-400">
                  Use your number below to make payment:
                </p>

                <div className="mt-4">
                  <label className="block text-sm text-gray-400 mb-1">
                    Enter Amount (KES)
                  </label>
                  <div className="relative">
                    <input
                    onChange={(e) => setAmount(e.target.value)}
                      type="number"
                      placeholder="e.g. 1500"
                      className="w-full bg-[#0e0e0e] border border-[#333] rounded-lg px-4 py-3 text-sm text-gray-200 font-medium focus:outline-none focus:border-[#f5c542] focus:shadow-[0_0_10px_rgba(245,197,66,0.2)] transition placeholder-gray-500"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#f5c542] font-semibold text-sm">
                      KES
                    </span>
                  </div>
                </div>

                <ul className="list-disc list-inside mt-4 text-sm text-gray-400 space-y-1">
                  <li>Send payment via M-PESA to the number above.</li>
                  <li>Ensure the amount matches your transaction total.</li>
                  <li>Confirm after payment to complete your order.</li>
                </ul>

                <button disabled={isMakingPayment} onClick={handleMpesaPayment} className="mt-6 w-full py-3 bg-[#f5c542] text-black font-semibold rounded-xl hover:bg-[#ffd84f] transition">
                {isMakingPayment ? "Processing Payment" : "Complete Payment"}  
                </button>
              </div>
            )}

            {/* CRYPTO TAB */}
            {tab === "crypto" && (
              <div className="bg-[#111] border border-[#222] rounded-2xl p-5 text-gray-300">
                {/* Step 1 */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#f5c542] text-black font-bold">
                      1
                    </div>
                    <h3 className="text-lg font-semibold text-white">
                      Send USDT to this address:
                    </h3>
                  </div>

                  <div className="flex items-center justify-between bg-[#0e0e0e] border border-[#f5c542]/40 rounded-lg px-3 py-3 text-[#f5c542] font-mono">
                    <span className="truncate">{cryptoAddress}</span>
                    <button
                      onClick={handleCopy}
                      className="hover:text-yellow-400 transition"
                    >
                      {copied ? <Check size={18} /> : <Copy size={18} />}
                    </button>
                  </div>

                  <ul className="list-disc list-inside mt-4 text-sm text-gray-400 space-y-1">
                    <li>Send USDT strictly from Binance.</li>
                    <li>Copy the address above and send your USDT.</li>
                    <li>
                      After sending, enter your transaction details below.
                    </li>
                  </ul>
                </div>

                {/* Step 2 */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#f5c542] text-black font-bold">
                      2
                    </div>
                    <h3 className="text-lg font-semibold text-white">
                      Enter Transaction Details:
                    </h3>
                  </div>

                  {/* Transaction ID */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">
                      Transaction ID (TxID)
                    </label>
                    <input
                      type="text"
                      placeholder="Transaction ID (TxID)"
                      className="w-full bg-[#0e0e0e] border border-[#333] rounded-lg px-3 py-3 text-sm text-gray-200 focus:outline-none focus:border-[#f5c542] transition"
                      onChange={(e) => setTransactionID(e.target.value)}
                    />
                  </div>

                  <button
                    disabled={isDepositingCrypto}
                    className="mt-6 w-full py-3 bg-[#f5c542] text-black font-semibold rounded-xl hover:bg-[#ffd84f] transition"
                    onClick={handleCryptoDeposit}
                  >
                    {isDepositingCrypto
                      ? "Processing Transactions..."
                      : "Complete Transaction"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
