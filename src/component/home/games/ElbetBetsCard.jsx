import { Link } from "react-router-dom";
import BaseClass from "../../../services/BaseClass";

function ElbetBetsCard({ src, gameName, gameAlias, gameID }) {
  const baseClass = new BaseClass();
  const linkTo = baseClass.userId ? `/elbet/${gameAlias}/${gameID}` : `/login`;

  return (
    <Link to={linkTo} className="block">
      <div className="relative w-full aspect-square rounded-lg overflow-hidden shadow-lg bg-[#1b1c20] group cursor-pointer transition-transform duration-300 hover:scale-105">
        <img
          src={src}
          alt={gameName}
          crossOrigin="anonymous"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-center"
        />
      </div>
    </Link>
  );
}

export default ElbetBetsCard;
