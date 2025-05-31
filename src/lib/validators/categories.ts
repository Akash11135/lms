import { TypeOf, z } from "zod";

export const categorySchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(100),
});

export const categorySchemaList = z.array(categorySchema);

export type Category = z.infer<typeof categorySchema>;
