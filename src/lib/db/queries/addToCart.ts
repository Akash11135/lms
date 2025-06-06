import { cart } from "@/db/schema";
import { db } from "@/lib/db";
import { cartSchema } from "@/lib/validators/cart";
import { and, eq } from "drizzle-orm";

type addToCartProps = {
  cartItem: {
    id: string;
    userId: string;
    productId: string;
    quantity: number;
    createdAt?: Date; // Optional, can be undefined
    updatedAt?: Date; // Optional, can be undefined
    color?: string; // Optional, can be undefined
    size?: string; // Optional, can be undefined
  };
};

export default async function addToCart({ cartItem }: addToCartProps) {
  try {
    const {
      id,
      userId,
      productId,
      quantity,
      color,
      size,
      createdAt,
      updatedAt,
    } = cartItem;

    // Check if the item already exists in the cart for the user
    const existingItem = await db
      .select()
      .from(cart)
      .where(and(eq(cart.userId, userId), eq(cart.productId, productId)));
    console.log("existing items :: ", existingItem);
    if (existingItem?.length > 0) {
      const updatedItem = await db
        .update(cart)
        .set({ quantity: quantity })
        .where(and(eq(cart.userId, userId), eq(cart.productId, productId)))
        .returning();
      return { "updated item": updatedItem };
    }

    const newCartItem = {
      id: id || crypto.randomUUID(),
      userId,
      productId,
      quantity: quantity || 1, // Default quantity to 1 if not provided
      createdAt: createdAt || new Date(), // Default to current date if not provided
      updatedAt: updatedAt || new Date(), // Default to current date if not provided
      color: color || "defaultColor",
      size: size || "defaultSize",
      // Default color if not provided
    };
    const validate = cartSchema.parse(newCartItem);
    if (validate) {
      await db.insert(cart).values(newCartItem);
    }

    return validate;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw new Error("Failed to add item to cart");
  }
}
