import { FaGift, FaInfoCircle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import Footer from "../../component/Footer";
import { BounceLoading } from "respinner";
import useRedeemBonus from "../../hooks/usePayment";
import toast from "react-hot-toast";
import { useState } from "react";
import { Select } from "antd";

const { Option } = Select;

function RedeemBonus() {
  const { register, handleSubmit, reset } = useForm();
  const { redeemingBonus, isLoading } = useRedeemBonus();
  const [searchParams] = useSearchParams();

  // Get type from URL (?type=cashback/referral)
  const urlType = searchParams.get("type");
  const [bonusType, setBonusType] = useState(urlType || "");

  const onSubmit = (data) => {
    const amount = Number(data.amount);
    if (!amount || amount <= 0) {
      return toast.error("Please enter a valid redeem amount");
    }

    if (!bonusType) {
      return toast.error("Please select a bonus type to redeem");
    }

    redeemingBonus(
      { type: bonusType, amount },
      {
        onSuccess: (res) => {
          if (res?.status) {
            reset();
            // toast.success("Bonus redeemed successfully!");
          }
        },
      }
    );
  };

  return (
    <>
      <div className="flex items-center justify-center bg-background px-4 py-10">
        <div className="w-full max-w-lg bg-secondary/70 backdrop-blur-xl border border-gray-700 rounded-2xl shadow-2xl p-6 md:p-10 transition-all hover:shadow-primary/20">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-primary/20 p-3 rounded-full">
              <FaGift className="text-primary text-2xl" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-[rgb(151,137,205)]/90 tracking-wide">
              Redeem Bonus
            </h1>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Bonus Type Dropdown (only if no type in URL) */}
            {!urlType && (
              <div>
                <label className="block text-sm font-semibold text-[rgb(151,137,205)]/90 mb-2">
                  Select Bonus Type
                </label>
                <Select
                  value={bonusType || undefined}
                  onChange={(value) => setBonusType(value)}
                  placeholder="Choose type"
                  size="large"
                  className="w-full"
                  style={{
                    borderRadius: "0.75rem",
                    background: "rgba(40, 40, 60, 0.8)", // glassy background
                  }}
                  dropdownStyle={{
                    background: "rgba(30, 30, 50, 0.95)", // dropdown matches your dark cards
                    borderRadius: "0.75rem",
                    padding: "0.5rem",
                  }}
                  dropdownRender={(menu) => (
                    <div style={{ padding: 4 }}>{menu}</div>
                  )}
                >
                  <Option value="referral">
                    <span className="text-pink-400 font-medium">
                      Referral Bonus
                    </span>
                  </Option>
                  <Option value="cashback">
                    <span className="text-green-400 font-medium">
                      Cashback Bonus
                    </span>
                  </Option>
                </Select>
              </div>
            )}

            {/* Amount Input */}
            <div>
              <label className="block text-sm font-semibold text-[rgb(151,137,205)]/90 mb-2">
                Enter Amount
              </label>
              <input
                type="number"
                placeholder="Enter redeem amount"
                {...register("amount", { required: true, min: 1 })}
                className="w-full bg-background/80 border border-gray-600 rounded-lg px-4 py-3 text-[rgb(151,137,205)]/90 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary transition"
              />
            </div>

            {/* Redeem Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full font-bold py-3 rounded-lg shadow-md transform transition-all duration-300 cursor-pointer flex justify-center items-center ${
                isLoading
                  ? "bg-primary/50 text-black cursor-not-allowed"
                  : "bg-primary text-black hover:brightness-110 hover:scale-105"
              }`}
            >
              {isLoading ? (
                <BounceLoading fill="#000" barHeight={12} />
              ) : (
                "REDEEM"
              )}
            </button>
          </form>

          {/* Rules Section */}
          <div className="mt-10">
            <h2 className="text-lg font-bold text-red-400 flex items-center gap-2 mb-4">
              <FaInfoCircle className="text-red-500" /> Rules
            </h2>
            <div className="bg-background/60 rounded-xl border border-gray-700 p-4 space-y-2 shadow-inner">
              <ul className="list-decimal list-inside text-[rgb(151,137,205)]/90 space-y-2 text-sm leading-relaxed">
                <li>
                  You won’t be able to redeem your bonus if your account is
                  inactive for 30 days.
                </li>
                <li>
                  Your bonus wallet must be greater than or equal to KES 100.
                </li>
                <li>
                  You can only use the bonus to play{" "}
                  <span className="text-primary font-semibold">Aviator</span>.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default RedeemBonus;
