"use client";
import ProductCard from "@/components/ProductCard";
import { useCategory } from "@/hooks/getCategories";
import { useProducts } from "@/hooks/getProducts";
import { CarouselDemo } from "@/reusableComponents/Carousel";
import { CircleX, LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CategoriesPage = () => {
  const { categories, loading, error } = useCategory();
  const router = useRouter();
  const { products } = useProducts();
  const [proceRange, setPriceRange] = useState();
  const [sortBy, setSoryBy] = useState();
  const categoryImages: Record<string, string> = {
    men: "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/2024/NOVEMBER/11/YdsNM0vp_c456140273e149568591325e7f1eda94.jpg",
    women:
      "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/2025/MAY/16/QPU8LJ4L_9726200c572e49b294d6156b86185493.jpg",
    kids: "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/30021272/2024/6/22/d15d9e4e-6e1c-4ad6-acd5-c95fb974b5aa1719057219676SangriaPrintedPureCottonStraightKurtaWithPyjamaSet1.jpg",
    sports:
      "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/24380892/2024/2/15/597244e4-b1eb-40c9-8d50-b751882bdd7f1707974610479-NIVIA-Men-Warrior-20-Basketball-Shoes-6731707974610085-1.jpg",
    electronics:
      "https://www.apple.com/v/imac/u/images/overview/closer-look/colors_pf_yellow__fhckfv6xx8yi_large.jpg",
  };

  if (loading)
    return (
      <div className="w-full text-center flex items-center justify-center p-2">
        <div className="flex gap-2 items-center">
          <LoaderCircle className="animate-spin" />
          Loading categories...
        </div>
      </div>
    );
  if (error)
    return (
      <div className="w-full text-center flex items-center justify-center p-2">
        <div className="flex gap-2 items-center">
          <CircleX />
          Error in loading categories : {error}
        </div>
      </div>
    );

  return (
    <div className="flex flex-col p-2 items-center">
      <div className="w-full  flex justify-around flex-wrap gap-4 p-4">
        {categories?.map((category) => (
          <div
            key={category.id}
            className=" p-4 mt-3 cursor-pointer hover:shadow-lg transition-shadow rounded"
            onClick={() => router.push(`/categories/${category.id}`)}
          >
            <h1 className="text-2xl font-bold mb-4 text-center">
              {category.name} Category
            </h1>
            <div className="flex justify-center">
              <img
                src={categoryImages[category.name.toLowerCase()] ?? ""}
                alt={`${category.name} image`}
                className="w-48 h-48 object-cover rounded"
              />
            </div>
          </div>
        ))}
      </div>
      <div>
        <CarouselDemo />
      </div>
      <h1 className="text-2xl font-bold m-3 ">Explore more products.</h1>
      <div className="flex flex-wrap gap-4 justify-around w-[75%]">
        {(products ?? [])
          .map((item) => <ProductCard key={item.id} product={item} />)
          .slice(0, 8)}
      </div>
    </div>
  );
};

export default CategoriesPage;
