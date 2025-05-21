"use client";

import { Product, productListSchema } from "@/lib/validators/products";
import { useEffect, useState } from "react";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const res = await fetch("/api/products");
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await res.json();
        const validateProducts = productListSchema.parse(data);
        setProducts(validateProducts);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return { products, loading, error };
}
