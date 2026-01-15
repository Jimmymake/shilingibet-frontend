import { Carousel } from "antd";
import { useEffect, useState } from "react";

const categories = [
  {
    bgImage: "/IMG1.jpg",
  },
  {
    bgImage: "IMG2.jpg",
  },
  {
    bgImage: "/IMG3.jpg",
  },
  {
    bgImage: "/IMG4.jpg",
  },
];

function CategoryCard({ bgImage }) {
  return (
    <div className="flex-1 flex items-center justify-center rounded-lg overflow-hidden bg-gray-100 py12">
      <img src={bgImage} className=" object-contain" alt="" />
    </div>
  );
}

export default function GameCategories() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className=" px-2 md:px-4 mt-2">
      {isMobile ? (
        // Mobile: Show one card per slide
        <Carousel autoplay dots infinite className="w-full" effect="fade">
          {categories.map((cat, index) => (
            <div key={index} className="px-1">
              <CategoryCard {...cat} />
            </div>
          ))}
        </Carousel>
      ) : (
        // Desktop: Show two cards per slide
        <Carousel
          autoplay
          dots
          infinite
          className="w-full"
          slidesToShow={2}
          slidesToScroll={1}
          centerMode
          // centerPadding="20px"
        >
          {categories.map((cat, index) => (
            <div key={index} className="px-2">
              <CategoryCard {...cat} />
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
}
