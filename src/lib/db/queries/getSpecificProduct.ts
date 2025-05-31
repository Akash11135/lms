import { products } from "@/db/schema";
import { db } from "@/lib/db";
import { productListSchema, productSchema } from "@/lib/validators/products";
import { eq } from "drizzle-orm";
type SpecificProductsProps = {
  productId: string;
};

export async function getSpecificProduct({ productId }: SpecificProductsProps) {
  try {
    const result = await db
      .select()
      .from(products)
      .where(eq(products.id, productId));

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
  } catch (error) {
    console.log(
      "error in getting specific product from the table backend (lib/query): ",
      error
    );
  }
}
