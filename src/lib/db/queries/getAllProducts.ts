import { products } from "@/db/schema";
import { db } from "@/lib/db";
import { productListSchema } from "@/lib/validators/products";

export async function getAllProducts() {
  const result = await db.select().from(products);

  const transformedResult = result.map((product) => ({
    id: product.id,
    name: product.name,
    description: product.description,
    price: Number(product.price),
    imageUrl: product.imageUrl,
    categoryId: product.categoryId,
    stock: product.stock,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
    ratings: Number(product.ratings ?? 4.5),
  }));
  const productValidation = productListSchema.parse(transformedResult);
  return productValidation;
}
