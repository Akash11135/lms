import { z } from "zod";

export const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().min(1).max(100),
  picture: z.string().url().optional(),
  phone: z.string().optional(),
  familyName: z.string().optional(),
  address: z.string().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const userListSchema = z.array(userSchema);

export type User = z.infer<typeof userSchema>;
