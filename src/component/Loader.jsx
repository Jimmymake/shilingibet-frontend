import { GiSoccerBall } from "react-icons/gi";

export default function Loader() {
  return (
    <>
      <style>{`
        @keyframes inOut {
          0%   { transform: scale(0.85); filter: drop-shadow(0 6px 10px rgba(0,0,0,.35)); }
          50%  { transform: scale(1.18); filter: drop-shadow(0 10px 18px rgba(0,0,0,.45)); }
          100% { transform: scale(0.85); filter: drop-shadow(0 6px 10px rgba(0,0,0,.35)); }
        }
      `}</style>

      <div
        className={`inline-flex items-center justify-center`}
        role="status"
        aria-live="polite"
        aria-busy="true"
      >
        <img
          src="/fav.svg"
          style={{ animation: "inOut 1.2s ease-in-out infinite" }}
        />
      </div>
    </>
  );
}
