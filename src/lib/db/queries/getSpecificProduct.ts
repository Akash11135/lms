import { products, properties } from "@/db/schema";
import { db } from "@/lib/db";
import { productDetailListSchema } from "@/lib/validators/productDetail";
import { productDetail } from "@/lib/validators/productDetail";
import { eq, sql } from "drizzle-orm";
type SpecificProductsProps = {
  productId: string;
};

export async function getSpecificProduct({ productId }: SpecificProductsProps) {
  try {
    const result = await db.execute(sql`
      SELECT 
        products.*, 
        property_values.value, 
        properties.name AS property_name
      FROM product_properties
      INNER JOIN products
        ON product_properties.product_id = products.id
      INNER JOIN property_values
        ON product_properties.property_value_id = property_values.id
      INNER JOIN properties
        ON properties.id = property_values.property_id
      WHERE product_properties.product_id = ${productId};
    `);

    const propertyMap: Record<string, string[]> = {};

    if (!result?.rows?.length) return null;

    for (const row of result?.rows) {
      const propName = row.property_name as string; //to handle typescript error for row.property_name
      if (!propertyMap[propName]) {
        propertyMap[propName] = [];
      }
      propertyMap[propName].push(row.value as string);
    }

    const transformedResult = {
      id: result?.rows[0]?.id,
      name: result?.rows[0]?.name,
      description: result?.rows[0]?.description,
      price: Number(result?.rows[0]?.price),
      imageUrl: result?.rows[0]?.image_url,
      categoryId: result?.rows[0]?.category_id,
      stock: result?.rows[0]?.stock,
      createdAt: result?.rows[0]?.created_at,
      updatedAt: result?.rows[0]?.updated_at,
      ratings: result?.rows[0]?.ratings,
      properties: propertyMap,
    };

    const finalParsedResult = productDetail.parse(transformedResult);
    return finalParsedResult;
  } catch (error) {
    console.log(
      "error in getting specific product from the table backend (lib/query): ",
      error
    );
  }
}
