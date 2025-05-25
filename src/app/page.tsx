"use client";
import ProductHome from "@/components/ProductHome";
import { useSearch } from "@/context/SearchContext";

import { CarouselDemo } from "@/reusableComponents/Carousel";

function page() {
  const { searchQuery } = useSearch();
  return (
    <div className=" w-full">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Discover new items.</h1>
      </div>
      <div className="">
        {searchQuery.length <= 0 ? (
          <CarouselDemo />
        ) : (
          <h2 className="text-2xl font-semibold text-center p-5">
            Search results for "{searchQuery}"
          </h2>
        )}
      </div>
      <ProductHome />
    </div>
  );
}

export default page;
