"use client";
import { CircleX, Loader, LoaderCircle } from "lucide-react";
import ProductCard from "./ProductCard";
import { useProducts } from "@/hooks/getProducts";
import { SideBySideCarousel } from "@/reusableComponents/sideBySideCarousel";

const ProductHome = () => {
  const { products, loading, error } = useProducts();

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
      <div className="flex justify-center items-center flex-wrap w-full gap-4 p-5">
        {products
          ?.map((product) => <ProductCard key={product.id} product={product} />)
          .slice(0, 15)}
      </div>
      <div className="w-full border border-red-500 flex flex-col items-center justify-center p-5">
        <p>New range of men's wear</p>
        {/* <SideBySideCarousel products={products} /> */}
      </div>
    </>
  );
};

export default ProductHome;
