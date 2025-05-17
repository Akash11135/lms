import ProductHome from "@/components/ProductHome";

import { CarouselDemo } from "@/reusableComponents/Carousel";
import React from "react";

function page() {
  return (
    <div className=" w-full">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Discover new items.</h1>
      </div>
      <div className="">
        <CarouselDemo />
      </div>
      <ProductHome />
    </div>
  );
}

export default page;
