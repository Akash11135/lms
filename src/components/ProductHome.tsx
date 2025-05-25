"use client";
import { CircleX, Loader, LoaderCircle } from "lucide-react";
import ProductCard from "./ProductCard";
import { useProducts } from "@/hooks/getProducts";
import { useSearch } from "@/context/SearchContext";

const ProductHome = () => {
  const { products, loading, error } = useProducts();
  const { searchQuery } = useSearch();

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
        <>
          {(products ?? []).filter(
            (
              product //concept :- here in first case i wnat to return a length of products filtered, to use the length function to pront no items message, hence use closed parenthesis to return an array.
            ) => product.name.toLowerCase().includes(searchQuery.toLowerCase())
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
    </>
  );
};

export default ProductHome;
