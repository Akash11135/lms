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
      <div className="flex justify-center  flex-wrap w-full gap-4 ">
        <h1 className="text-2xl text-start font-bold  w-full">
          Try wide range of latest brands and products
        </h1>
        <div className="flex flex-wrap gap-7 p-2 items-center justify-center">
          <>
            {(products ?? []).filter(
              (
                product //concept :- here in first case i wnat to return a length of products filtered, to use the length function to pront no items message, hence use closed parenthesis to return an array.
              ) =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
            ).length === 0 &&
              searchQuery.length !== 0 && <p>Sorry no items found.</p>}
          </>
          {(products ?? []) //to handle the case when products is undefined
            .filter((product) =>
              product.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-center m-2">
            Explore More of latest fashion.{" "}
          </h1>
          <div onClick={handleCarousel} className="cursor-pointer">
            <CarouselDemo />
          </div>
        </div>
        <div className="flex flex-col border w-[75%] justify-between items-center p-3 m-3">
          <p>Get our free guide for applying at JUSTSHOP.</p>
          <p className="mt-2 text-sm text-gray-500">
            (Enter yout email to get free broschure.)
          </p>
          <Input placeholder="email" className="m-3 w-1/2" />
          <Button type="button">Send</Button>
        </div>
      </div>
    </>
  );
};

export default ProductHome;
