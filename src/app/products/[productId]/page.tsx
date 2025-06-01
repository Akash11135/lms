"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { productDetail } from "@/lib/validators/productDetail";
import { Product } from "@/lib/validators/products";
import { Star, Heart, Divide, LoaderCircle } from "lucide-react";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const ProductDetailPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<productDetail>();
  const [loading, setLoading] = useState<boolean>(false);

  const [productColor, setProductColor] = useState<string>("");
  const [productSize, setProductSize] = useState<string>("");

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/products/${productId}`);

        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await response.json();

        setProduct(data);
      } catch (error) {
        console.log("error in fetching single product : ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <LoaderCircle className="mr-2 animate-spin" /> Loading product
        details...
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("handeled.", productColor, productSize);
  };
  return (
    <div className="w-full min-h-screen mx-auto">
      {product && (
        <div className="w-[80%] border flex flex-col">
          <div className="productDetailsPage flex">
            <div className="w-[30%] p-4 border">
              <img
                src={product?.imageUrl || "/placeholder.png"}
                alt="Product Image"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-[70%] p-4 border">
              <h1 className="text-2xl font-bold">{product.name}</h1>
              <p className="text-gray-600 mt-2">{product.description}</p>

              <div className="flex  mt-4 flex-col">
                <span className="text-lg font-semibold ">
                  Price: ${product.price}
                </span>

                <div className="flex items-center justify-center border w-fit p-2 mt-5 ">
                  <Star className="w-5 h-5 text-yellow-500 mr-1" />
                  {product.ratings} | 1k+ Reviews
                </div>

                <form action="" onSubmit={handleSubmit}>
                  <div className="mt-3">
                    <label className="font-bold text-xl">COLOR OPTIONS:</label>
                    <div className="flex gap-2 w-fit p-2 mt-3">
                      {product?.properties?.color.map((color, index) => (
                        <div
                          key={index}
                          className={`w-5 h-5 rounded-full border border-black cursor-pointer transition ${
                            productColor === color
                              ? "ring-2 ring-offset-2 ring-black scale 110"
                              : "border-black"
                          }`}
                          style={{ backgroundColor: color }}
                          onClick={() => setProductColor(color)}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="mt-3">
                    <label className="font-bold text-xl">SELECT SIZE:</label>
                    <div className="flex gap-2 w-fit p-2 mt-3">
                      {product?.properties?.size.map((size) => (
                        <div
                          key={size}
                          className={` border w-fit p-2 border-gray-300 cursor-pointer transition ${
                            productSize === size
                              ? "bg-black text-white"
                              : "bg-white text-black"
                          }`}
                          onClick={() => setProductSize(size)}
                        >
                          {size}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-5">
                    <Button type="submit" className="w-fit">
                      ADD TO CART
                    </Button>
                    <Button className="w-fit">ADD TO WISHLIST</Button>
                  </div>
                </form>
                <div className="font-semibold text-lg mt-5">
                  Dilevery and address details
                </div>
              </div>
            </div>
          </div>
          <div className="reviwes">reviews</div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
