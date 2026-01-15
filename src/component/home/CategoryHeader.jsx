import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

function CategoryHeader({
  title = "Category",
  onPrev,
  onNext,
  src,
  provider = "imoon",
  showNav = true,
  viewAllState,
}) {
  return (
    <div className="flex items-center justify-between px-1 pb-2">
      <div className="flex items-center justify-center gap-1">
        {src ? <img src={src} className="h-6" alt={title} /> : null}
        <h4 className="text-[rgb(151,137,205)]/90 md:text-md text-sm md:font-semibold font-semibold">
          {title}
        </h4>
      </div>

      {showNav && (
        <div className="flex gap-2">
          {/* View All */}
          <Link to={`/viewAll/${provider}`} state={viewAllState}>
            <button className="bg-secondary text-[rgb(151,137,205)]/90 font-medium text-sm px-4 cursor-pointer p-2 rounded-lg hover:brightness-110">
              View All
            </button>
          </Link>

          {/* Arrows */}
          <div className="flex rounded-lg overflow-hidden">
            <button
              onClick={onPrev}
              className="bg-secondary w-10 p-2 flex items-center cursor-pointer justify-center border-r border-[#3C3768] hover:brightness-110"
            >
              <ChevronLeft className="text-[rgb(151,137,205)]/90 w-5 h-5" />
            </button>
            <button
              onClick={onNext}
              className="bg-secondary w-10 p-2 flex items-center cursor-pointer justify-center hover:brightness-110"
            >
              <ChevronRight className="text-[rgb(151,137,205)]/90 w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoryHeader;
