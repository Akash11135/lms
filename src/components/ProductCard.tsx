import { Heart, Star } from "lucide-react";
import React from "react";

const ProductCard = () => {
  const content = (
    <div className="flex flex-col justify-center items-center border  md:w-[300px]  ">
      <div className="max-h-[60%] w-full  relative ">
        <div className="absolute bottom-2 left-0 right-0 flex justify-between px-4 z-10 ">
          <div className="p-1 bg-gray-200 flex items-center justify-center gap-2  ">
            <Heart size={20} className="text-[#3643BA] " /> 4.5 | 1k
          </div>

          <div className="bg-gray-200 rounded-full p-2 flex items-center border-gray-500 ">
            <Star size={20} className="text-[#3643BA] cursor-pointer" />
          </div>
        </div>
        <img
          src="https://contents.mediadecathlon.com/p1587979/7813db01883c118aebbc2d12db109eef/p1587979.jpg?format=auto&quality=70&f=256x0"
          alt="image here"
          className="h-full w-full"
        />
      </div>
      <div className=" h-[40%] w-full mt-7 p-2">
        <p className="font-bold text-md"> QUECHUA</p>
        <p className="font-primary text-sm mt-2">Product slight description.</p>
        <p className="text-md font-bold mt-2">Rs. 3,299</p>
        <div className="w-full mt-7">
          <button className="cartButton">ADD TO CART</button>
        </div>
      </div>
    </div>
  );
  return content;
};

export default ProductCard;
