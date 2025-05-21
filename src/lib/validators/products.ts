//we use zod to verify the data that we get from Database.

import { z } from "zod";

export const productSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(100),
  description: z.string().min(1).max(1000),
  price: z.number().min(0),
  imageUrl: z.string().url(),
  categoryId: z.string().uuid(),
  stock: z.number().min(0),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  ratings: z.coerce.number().min(0).max(5),
});

export const productListSchema = z.array(productSchema);

export type Product = z.infer<typeof productSchema>;
