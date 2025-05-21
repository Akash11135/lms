"use client";
import { Product } from "@/lib/validators/products";
import { Heart, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/products?productId=${product.id}`);
  };

  const content = (
    <div
      className="flex flex-col justify-between items-center border  md:w-[300px] cursor-pointer"
      onClick={handleClick}
    >
      <div className="max-h-[60%] w-full  relative  ">
        <div className="absolute bottom-2 left-0 right-0 flex justify-between px-4 z-10 ">
          <div className="p-1 bg-gray-200 flex items-center justify-center gap-2  ">
            <Heart size={20} className="text-[#3643BA] " /> {product.ratings} |
            1k
          </div>

          <div className="bg-gray-200 rounded-full p-2 flex items-center border-gray-500 ">
            <Star size={20} className="text-[#3643BA] cursor-pointer" />
          </div>
        </div>
        <img
          src={
            product.imageUrl ||
            "https://contents.mediadecathlon.com/p1587979/7813db01883c118aebbc2d12db109eef/p1587979.jpg?format=auto&quality=70&f=256x0"
          }
          alt="image here"
          className="w-full h-full object-cover"
        />
      </div>
      <div className=" h-[40%] w-full mt-7 p-2">
        <p className="font-bold text-md">{product.name}</p>
        <p className="font-primary text-sm mt-2">
          {product.description.length > 30
            ? product.description.slice(0, 30)
            : product.description}
          .
        </p>
        <p className="text-md font-bold mt-2">Rs. {product.price}</p>
        <div className="w-full mt-7">
          <button className="cartButton">ADD TO CART</button>
        </div>
      </div>
    </div>
  );
  return content;
};

export default ProductCard;
