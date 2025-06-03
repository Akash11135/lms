"use client";
import { Product } from "@/lib/validators/products";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import React from "react";

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/products/${product.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onClick={handleClick}
      className="relative w-full sm:w-[45%] md:w-[30%] lg:w-[22%] xl:w-[18%] min-w-[160px] max-w-[240px] aspect-[3/4] bg-gray-200 rounded-lg overflow-hidden shadow-md cursor-pointer group"
    >
      {/* Background Image */}
      <img
        src={
          product.imageUrl ||
          "https://contents.mediadecathlon.com/p1587979/7813db01883c118aebbc2d12db109eef/p1587979.jpg?format=auto&quality=70&f=256x0"
        }
        alt={product.name}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />

      {/* Overlay Info Section */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white backdrop-blur-md px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h3 className="text-sm font-semibold truncate">{product.name}</h3>
        <div className="flex items-center gap-1 mt-1 text-xs">
          <Star className="w-4 h-4 text-yellow-400" />
          <span>{product.ratings} | 1k reviews</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
