"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const carouselImages = [
  "https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/7/25/9be788ff-39a4-4214-99d0-fc97505aae5a1658752545685-USPA_Desk_Banner.jpg",
  "https://contents.mediadecathlon.com/s1236598/k$2903a515ea45071cf931506ffa1590d6/defaut.jpg?format=auto&quality=70&f=1920x0",
  "https://contents.mediadecathlon.com/s1248252/k$880b0138c044b7d5455d1831ddbb5287/defaut.jpg?format=auto&quality=70&f=1920x0",
  "https://contents.mediadecathlon.com/s1244904/k$a76dc441afe46ff71e9c0e9ee86f999a/defaut.jpg?format=auto&quality=70&f=1920x0",
  "https://contents.mediadecathlon.com/s1250324/k$ee87e7559f58c28d58145592ddc21727/defaut.jpg?format=auto&quality=70&f=1920x0",
];

export function CarouselDemo() {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-play every 3 seconds
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % carouselImages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [isHovered]);

  const prev = () =>
    setCurrent(
      (prev) => (prev - 1 + carouselImages.length) % carouselImages.length
    );
  const next = () => setCurrent((prev) => (prev + 1) % carouselImages.length);

  return (
    <div
      className="relative w-full h-[250px] md:h-[350px] lg:h-[450px] overflow-hidden rounded-md shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence initial={false}>
        <motion.img
          key={carouselImages[current]}
          src={carouselImages[current]}
          alt="Carousel Slide"
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="w-full h-full object-cover absolute top-0 left-0"
        />
      </AnimatePresence>

      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/90 p-2 rounded-full shadow z-10"
      >
        <ChevronLeft className="text-gray-700" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/90 p-2 rounded-full shadow z-10"
      >
        <ChevronRight className="text-gray-700" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {carouselImages.map((_, idx) => (
          <div
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-2 w-2 rounded-full transition cursor-pointer ${
              current === idx ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
