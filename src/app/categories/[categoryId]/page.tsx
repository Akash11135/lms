"use client";

import ProductCard from "@/components/ProductCard";
import { useCategory } from "@/hooks/getCategories";
import { useProducts } from "@/hooks/getProducts";
import { CircleX, LoaderCircle } from "lucide-react";
import { useParams } from "next/navigation";

const CategoryPage = () => {
  const { categoryId } = useParams();
  const { categories } = useCategory();
  const { products, loading, error } = useProducts();

  // Get category details and products for this category
  const category = categories?.find((item) => item.id === categoryId);
  const filteredProducts = products?.filter(
    (item) => item.categoryId === categoryId
  );

  if (loading)
    return (
      <div className="w-full flex justify-center items-center p-2">
        <LoaderCircle className="animate-spin mr-2" />
        <span>Loading products...</span>
      </div>
    );

  if (error)
    return (
      <div className="w-full flex justify-center items-center p-2 text-red-500">
        <CircleX className="mr-2" />
        Error loading data: {error}
      </div>
    );

  return (
    <div className="w-full border flex justify-center">
      <div className=" p-4 flex gap-1 w-[75%]">
        <div className="w-[30%] border border-red-500">filtering options</div>
        <div className="w-[70%]">
          <h1 className="text-2xl font-bold mb-4">
            {category ? `${category.name} Category` : "Category"}
          </h1>

          {filteredProducts?.length === 0 ? (
            <p className="text-gray-600">No products found in this category.</p>
          ) : (
            <div className="flex flex-wrap gap-4">
              {filteredProducts?.map((product) => (
                <ProductCard product={product} key={product.id} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
