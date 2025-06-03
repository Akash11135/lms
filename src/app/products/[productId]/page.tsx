"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { productDetail } from "@/lib/validators/productDetail";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import {
  Star,
  LoaderCircle,
  TruckIcon,
  CreditCard,
  Warehouse,
  CheckCircle,
} from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { cartSchema } from "@/lib/validators/cart";
import { useProducts } from "@/hooks/getProducts";
import ProductCard from "@/components/ProductCard";
import HorizontalSlider from "../../../reusableComponents/HorizontalSlider";
import { motion } from "framer-motion";

const ProductDetailPage = () => {
  const { productId } = useParams();

  const [product, setProduct] = useState<productDetail>();
  const [loading, setLoading] = useState<boolean>(false);
  const [buttonLoader, setButtonLoader] = useState<boolean>(false);

  const [productColor, setProductColor] = useState<string>("");
  const [productSize, setProductSize] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);

  const { user } = useKindeAuth();

  const { products } = useProducts();

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!productColor || !productSize) {
      alert("Please select color and size before adding to cart.");
      return;
    }
    try {
      setButtonLoader(true);
      let cartItem;
      if (productId && user?.id) {
        cartItem = {
          id: crypto.randomUUID(),
          userId: user?.id,
          productId: productId,
          quantity,
          createdAt: new Date(),
          updatedAt: new Date(),
          color: productColor,
          size: productSize,
        };
      }

      const parsedCartItem = cartSchema.parse(cartItem);

      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parsedCartItem),
      });

      if (!response.ok) {
        throw new Error("Failed to add item to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add product to cart. Please try again.");
    } finally {
      setButtonLoader(false);
    }
  };

  // Animation Variants
  const imageContainerVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const reviewVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <div className="w-full flex flex-col items-center p-2">
      {product && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
          }}
          className="w-full md:w-[90%] flex flex-col gap-4"
        >
          <h1 className="text-xl font-bold">CHECK IT OUT</h1>
          <div className="productDetailsPage flex flex-col md:flex-row ">
            {/* Images */}
            <motion.div
              className="w-full md:w-[60%] p-4 flex flex-wrap gap-5 justify-center rounded-sm"
              variants={imageContainerVariant}
            >
              {[...Array(4)].map((_, i) => (
                <motion.img
                  key={i}
                  src={product?.imageUrl || "/placeholder.png"}
                  alt="Product Image"
                  className="md:h-[400px] md:w-[400px] sm:h-[200px] sm:w-[200px] object-contain border p-1 cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                />
              ))}
            </motion.div>

            {/* Product Info */}
            <motion.div
              className="w-full md:w-[40%] p-4 flex flex-col"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-2xl font-bold">{product.name}</h1>
              <p className="text-gray-600 mt-2">{product.description}</p>

              <div className="flex mt-4 flex-col">
                <span className="text-lg font-semibold">
                  Price: ${product.price}
                </span>

                <div className="flex items-center justify-center border w-fit p-2 mt-5">
                  <Star className="w-5 h-5 text-yellow-500 mr-1" />
                  {product.ratings} | 1k+ Reviews
                </div>

                {/* Form */}
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col mt-5 gap-4"
                >
                  {/* Color */}
                  <div>
                    <label className="font-bold text-xl">COLOR OPTIONS:</label>
                    <div className="flex gap-2 mt-2 flex-wrap">
                      {product?.properties?.color.map((color, index) => (
                        <div
                          key={index}
                          className={`h-20 w-20 flex items-center justify-center cursor-pointer transition ${
                            productColor === color
                              ? `ring-2 ring-offset-1  scale-110`
                              : "border-black"
                          }`}
                          style={{ border: `1px solid ${color}` }}
                          onClick={() => setProductColor(color)}
                        >
                          <img
                            src={product?.imageUrl || "/placeholder.png"}
                            alt="Product color variant"
                            className="h-19 w-20 object-contain"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Size */}
                  <div>
                    <label className="font-bold text-xl">SELECT SIZE:</label>
                    <div className="flex gap-2 mt-2 flex-wrap">
                      {product?.properties?.size.map((size) => (
                        <div
                          key={size}
                          className={`border w-fit px-3 py-1 border-gray-300 cursor-pointer transition ${
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

                  {/* Quantity */}
                  <div>
                    <label className="text-xl font-bold">QUANTITY</label>
                    <Input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="w-24 mt-2"
                      min={1}
                    />
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-wrap gap-3">
                    <Button type="submit" className="cursor-pointer">
                      {buttonLoader ? (
                        <LoaderCircle className="mr-2 animate-spin" />
                      ) : (
                        "ADD TO CART"
                      )}
                    </Button>
                    <Button type="button" className="cursor-pointer">
                      ADD TO WISHLIST
                    </Button>
                  </div>
                </form>

                <div className="reviwes p-4 flex flex-col gap-4 mt-2">
                  <h1 className="text-xl font-bold mt-3">
                    DELIVERY & SERVICES :{" "}
                  </h1>
                  <div>
                    <Input
                      type="text"
                      placeholder={`Enter your pincode `}
                      className="outline-none rounded-none"
                      defaultValue={160030}
                    />
                  </div>
                  <div className="flex gap-6 flex-wrap justify-between">
                    <div className="p-2">
                      <Warehouse />
                      <p>FREE pickup in Store Available View nearest stores</p>
                    </div>
                    <div className="p-2">
                      <CreditCard />
                      <p>Pay on Delivery available *</p>
                    </div>
                    <div className="p-2">
                      <TruckIcon />
                      <p>Home Delivery by Tomorrow Order within 7hrs 24mins</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Reviews placeholder */}
          <motion.div
            className="bg-white rounded-md mt-8 p-4 shadow-sm"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.5 }}
            variants={reviewVariant}
          >
            <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>

            {/* Summary */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b pb-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold">4.3</span>
                <Star className="text-yellow-400" />
                <span className="text-gray-500">1,236 ratings</span>
              </div>
              <Button className="mt-2 md:mt-0">Write a Review</Button>
            </div>

            {/* Reviews */}
            <div className="space-y-6">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="border p-4 rounded-md shadow-sm flex flex-col gap-2"
                >
                  <div className="flex items-center gap-2">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        className={`w-4 h-4 ${
                          index < 4 ? "text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="text-sm text-gray-500 ml-2">
                      March 15, 2025
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold">Rohit Sharma</p>
                    <p className="text-sm text-gray-600">
                      Very comfortable and fits perfectly. The color is exactly
                      as shown, and the material feels premium. Highly
                      recommended!
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.5 }}
            variants={reviewVariant}
            className="mt-5"
          >
            <h1 className="text-xl font-bold">CONTINUE SURFING</h1>
            <div className="flex flex-wrap gap-4 mt-4">
              {products
                ?.map((product) => (
                  <ProductCard product={product} key={product.id} />
                ))
                .slice(0, 15)}
            </div>
          </motion.div>
          <div>
            <HorizontalSlider
              title="LATEST TRENDS"
              products={products?.slice(0, 10) || []}
            />
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ProductDetailPage;
