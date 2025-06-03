import { cart } from "@/db/schema";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";

type props = {
  userId: string;
};

export async function getCartElements({ userId }: props) {
  const result = await db.select().from(cart).where(eq(cart.userId, userId));
}
