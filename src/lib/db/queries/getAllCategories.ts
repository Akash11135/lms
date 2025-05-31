import { categories } from "@/db/schema";
import { db } from "@/lib/db";
import { categorySchemaList } from "@/lib/validators/categories";

export default async function getAllCategories() {
  const result = await db.select().from(categories);
  const validate = categorySchemaList.parse(result);
  return validate;
}
