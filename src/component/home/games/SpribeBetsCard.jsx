import { Link } from "react-router-dom";
import BaseClass from "../../../services/BaseClass";

const GAME_URL = import.meta.env.VITE_IMAGE_URL;

function SpribeBetsCard({ src, title, gameName }) {
  const baseClass = new BaseClass();

  const linkTo = baseClass.userId ? `/playGame/${gameName}` : `/login`;
  return (
    <Link to={linkTo}>
      <div className="relative w-full aspect-square rounded-lg overflow-hidden shadow-lg bg-[#1b1c20] group cursor-pointer transition-transform duration-300 hover:scale-105">
        <img
          src={src}
          alt={title}
          // crossOrigin="anonymous"
          className="w-full h-full object-center rounded-lg"
        />
      </div>
    </Link>
  );
}

export default SpribeBetsCard;
