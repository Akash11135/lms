"use client";
import { Product } from "@/lib/validators/products";
import { Heart, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

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
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="w-full sm:w-[45%] md:w-[30%] lg:w-[22%] xl:w-[18%] min-w-[260px] max-w-[240px] flex flex-col border shadow-sm overflow-hidden bg-white cursor-pointer hover:shadow-md transition"
      onClick={handleClick}
    >
      {/* Image Section */}
      <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
        <motion.img
          src={
            product.imageUrl ||
            "https://contents.mediadecathlon.com/p1587979/7813db01883c118aebbc2d12db109eef/p1587979.jpg?format=auto&quality=70&f=256x0"
          }
          alt={product.name}
          className="object-cover w-full h-full"
          whileHover={{ scale: 1.25 }}
          transition={{ duration: 0.4 }}
        />
        <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center bg-white/80 px-2 py-1 rounded">
          <span className="flex items-center gap-1 text-xs text-gray-700">
            <Heart size={14} className="text-[#3643BA]" />
            {product.ratings} | 1k
          </span>
          <Star size={14} className="text-[#3643BA]" />
        </div>
      </div>

      {/* Info Section */}
      <div className="flex flex-col justify-between p-3 h-[150px]">
        <div>
          <h3 className="text-sm font-semibold line-clamp-1">{product.name}</h3>
          <p className="text-xs text-gray-600 mt-1 line-clamp-2">
            {product.description}
          </p>
        </div>
        <div className="mt-2">
          <p className="text-sm font-bold text-black">₹ {product.price}</p>
          <Button
            className="w-full rounded-none bg-white text-gray-900 border border-black hover:bg-white cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              // handle add to cart
            }}
          >
            ADD TO CART
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
