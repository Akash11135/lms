"use client";
import { Category, categorySchemaList } from "@/lib/validators/categories";
import { useEffect, useState } from "react";

export function useCategory() {
  const [categories, setCategories] = useState<Category[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    async function fetchCategories() {
      setLoading(true);
      try {
        const result = await fetch("/api/categories");
        console.log("calles", result);
        if (!result.ok) {
          throw new Error("Error in fetching categories from hook.");
        }
        const data = await result.json();
        const validate = categorySchemaList.parse(data);
        setCategories(validate);
      } catch (error) {
        if (error instanceof Error) setError(error.message);
        console.log("error from categories hook in catch block : ", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  return { categories, loading, error };
}
