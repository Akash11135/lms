"use client";
import { CircleX, Loader, LoaderCircle } from "lucide-react";
import ProductCard from "./ProductCard";
import { useProducts } from "@/hooks/getProducts";
import { useSearch } from "@/context/SearchContext";
import { Carousel } from "./ui/carousel";
import { CarouselDemo } from "@/reusableComponents/Carousel";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import HorizontalSlider from "@/reusableComponents/HorizontalSlider";
const ProductHome = () => {
  const { products, loading, error } = useProducts();
  const { searchQuery } = useSearch();
  const router = useRouter();
  const handleCarousel = () => {
    router.push("/categories");
  };
  if (loading)
    return (
      <div className="flex justify-center items-center w-full  p-2">
        <LoaderCircle className="animate-spin text-center" size={24} />
        <p className="text-sm">Loading...</p>
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center w-full  p-2">
        <CircleX className="animate-spin text-center" size={24} />
        <p className="text-sm">Error</p>
      </div>
    );

  return (
    <>
      <div className="flex flex-col gap-2 items-center">
        <div className="flex justify-center flex-wrap w-full gap-4 ">
          <h1 className="text-2xl max-sm:text-base text-start font-bold w-full mt-5 max-sm:mt-2">
            Try wide range of latest brands and products
          </h1>

          <div className="flex flex-wrap gap-7 p-2 items-center justify-center max-sm:gap-4">
            <>
              {(products ?? []).filter((product) =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
              ).length === 0 &&
                searchQuery.length !== 0 && (
                  <p className="text-sm text-center text-gray-500 max-sm:text-xs">
                    Sorry no items found.
                  </p>
                )}
            </>
            {(products ?? [])
              .filter((product) =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>
        </div>

        <div className="w-full">
          <h1 className="text-2xl font-bold text-center m-2 max-sm:text-base">
            Explore More of latest fashion.
          </h1>
          <div onClick={handleCarousel} className="cursor-pointer">
            <CarouselDemo />
          </div>
        </div>

        <div className="flex flex-col border w-[75%] justify-between items-center p-3 m-3 max-sm:w-[90%] max-sm:p-2 max-sm:m-2">
          <p className="text-base max-sm:text-sm text-center">
            Get our free guide for applying at JUSTSHOP.
          </p>
          <p className="mt-2 text-sm text-gray-500 max-sm:text-xs max-sm:mt-1 text-center">
            (Enter your email to get free brochure.)
          </p>
          <Input
            placeholder="email"
            className="m-3 w-1/2 max-sm:w-full max-sm:m-2 max-sm:text-sm"
          />
          <Button type="button" className="max-sm:text-sm">
            Send
          </Button>
        </div>
        <div className="max-sm:hidden">
          <HorizontalSlider
            title="LATEST TRENDS"
            products={products?.slice(0, 10) || []}
          />
        </div>
      </div>
    </>
  );
};

export default ProductHome;
