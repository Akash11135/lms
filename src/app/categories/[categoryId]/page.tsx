"use client";

import ProductCard from "@/components/ProductCard";
import { useCategory } from "@/hooks/getCategories";
import { useProducts } from "@/hooks/getProducts";
import { CircleX, LoaderCircle } from "lucide-react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";

const CategoryPage = () => {
  const { categoryId } = useParams();
  const { categories } = useCategory();
  const { products, loading, error } = useProducts();

  const category = categories?.find((item) => item.id === categoryId);
  const filteredProducts = products?.filter(
    (item) => item.categoryId === categoryId
  );

  if (loading)
    return (
      <div className="w-full flex justify-center items-center p-4">
        <LoaderCircle className="animate-spin mr-2" />
        <span>Loading products...</span>
      </div>
    );

  if (error)
    return (
      <div className="w-full flex justify-center items-center p-4 text-red-500">
        <CircleX className="mr-2" />
        Error loading data: {error}
      </div>
    );

  return (
    <div className="w-full px-4 py-6 flex justify-center">
      <div className="w-full max-w-[1400px] flex flex-col lg:flex-row gap-8">
        {/* Filters */}
        <motion.aside
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full lg:w-[25%] bg-white border rounded-lg shadow-sm p-4 sticky top-6 h-fit"
        >
          <h2 className="text-2xl font-bold mb-4">Filters</h2>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Color</h3>
              {/* Add color filter options here */}
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Size</h3>
              {/* Add size filter options here */}
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Price</h3>
              {/* Add price range selector here */}
            </div>
          </div>
        </motion.aside>

        {/* Products */}
        <motion.section
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full lg:w-[75%]"
        >
          <h1 className="text-3xl font-bold mb-6">
            {category ? `${category.name} Category` : "Category"}
          </h1>

          {filteredProducts?.length === 0 ? (
            <p className="text-gray-600">No products found in this category.</p>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {filteredProducts?.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.section>
      </div>
    </div>
  );
};

export default CategoryPage;
