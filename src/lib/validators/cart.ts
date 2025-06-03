import { z } from "zod";

export const cartSchema = z.object({
  id: z.string().uuid(),
  userId: z.string(),
  productId: z.string().uuid(),
  quantity: z.number().int().min(1).max(100).default(1),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  color: z.string(),
  size: z.string(),
});

export const cartSchemaList = z.array(cartSchema);

export type Cart = z.infer<typeof cartSchema>;
