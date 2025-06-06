"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "@/lib/validators/products";
import ProductCardSlider from "@/components/ProductCardSlider";

type ProductSliderProps = {
  products: Product[];
  title?: string;
};

const ProductSlider = ({ products, title }: ProductSliderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const scrollAmount = container.offsetWidth * 0.8;

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 mb-10 max-sm:px-2 max-sm:mb-6">
      {title && (
        <h2 className="text-xl font-bold mb-4 max-sm:text-lg max-sm:mb-3">
          {title}
        </h2>
      )}

      <div className="relative group">
        {/* Arrows */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow hidden group-hover:flex max-sm:flex max-sm:p-1 max-sm:left-1"
          aria-label="Scroll Left"
        >
          <ChevronLeft className="w-5 h-5 max-sm:w-4 max-sm:h-4" />
        </button>

        <button
          onClick={() => scroll("right")}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow hidden group-hover:flex max-sm:flex max-sm:p-1 max-sm:right-1"
          aria-label="Scroll Right"
        >
          <ChevronRight className="w-5 h-5 max-sm:w-4 max-sm:h-4" />
        </button>

        {/* Scrollable product row */}
        <motion.div
          ref={containerRef}
          className="flex overflow-x-auto gap-4 scroll-smooth scrollbar-hide pb-2 max-sm:px-4"
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              className="flex-shrink-0 min-w-[140px] sm:min-w-[180px] md:min-w-[200px] lg:min-w-[220px] xl:min-w-[240px] max-w-[240px]"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <ProductCardSlider product={product} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ProductSlider;
