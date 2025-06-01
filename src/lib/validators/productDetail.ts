import { z } from "zod";

export const productDetail = z.object({
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
  properties: z.object({
    size: z.array(z.string()),
    color: z.array(z.string()),
  }),
});

export const productDetailListSchema = z.array(productDetail);
export type productDetail = z.infer<typeof productDetail>;
