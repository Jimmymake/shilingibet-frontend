import { BounceLoading } from "respinner";
import { useNavigate } from "react-router-dom";

export default function WalletCard({
  icon: Icon,
  label,
  type,
  value,
  loading,
  iconColor = "text-yellow-400",
}) {
  const navigate = useNavigate();

  const handleRedeem = () => {
    if (type) {
      navigate(`/redeem?type=${type}`);
    } else {
      navigate("/redeem");
    }
  };

  return (
    <div
      className="
        relative rounded-2xl border border-gray-700/60 p-5 shadow-md
        bg-secondary/80 backdrop-blur-lg transition-transform duration-200
        hover:scale-[1.02]
      "
    >
      {/* Header */}
      <div className="flex items-center gap-2">
        <Icon className={`text-xl ${iconColor}`} />
        <span className="text-sm font-semibold tracking-wide text-[rgb(151,137,205)]/90">
          {label}
        </span>
      </div>

      {/* Value + Redeem Button */}
      <div className="mt-4 flex items-center justify-between">
        <div className="font-extrabold text-lg tracking-wide text-[rgb(151,137,205)]">
          {loading ? <BounceLoading fill="#f9ce36" barHeight={12} /> : value}
        </div>

        {type && (
          <button
            onClick={handleRedeem}
            className="
              ml-3 rounded-full cursor-pointer px-4 py-1.5 text-xs font-bold uppercase tracking-wide
              bg-green-500 text-white
              hover:bg-green-600 transition-colors
            "
          >
            Redeem
          </button>
        )}
      </div>
    </div>
  );
}
