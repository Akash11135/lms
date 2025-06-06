"use client";
import { AppSidebar } from "@/components/app-sidebar";
import ProductHome from "@/components/ProductHome";
import { useSearch } from "@/context/SearchContext";
import { CarouselDemo } from "@/reusableComponents/Carousel";
import { motion } from "framer-motion";
function page() {
  const { searchQuery } = useSearch();

  return (
    <div className="w-full">
      <div className="text-center">
        <h1 className="text-4xl font-bold max-sm:text-xl">
          <AppSidebar />
          Discover new items.
        </h1>
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

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <ProductHome />
      </motion.div>
    </div>
  );
}

export default page;
