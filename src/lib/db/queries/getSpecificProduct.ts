import { products } from "@/db/schema";
import { db } from "@/lib/db";
import { productSchema } from "@/lib/validators/products";
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
    const validateResult = productSchema.parse(result[0]);
    return validateResult;
  } catch (error) {
    console.log(
      "error in getting specific product from the table backend (lib/query): ",
      error
    );
  }
}
