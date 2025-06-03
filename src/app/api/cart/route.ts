import addToCart from "@/lib/db/queries/addToCart";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest): Promise<Response> {
  const body = await req.json();
  const { id, productId, quantity, color, size, userId, createdAt, updatedAt } =
    body;
  try {
    const cartItem = {
      id: id || crypto.randomUUID(),
      userId,
      productId,
      quantity: quantity || 1,
      createdAt: createdAt ? new Date(createdAt) : new Date(), // Default to current date if not provided
      updatedAt: updatedAt ? new Date(updatedAt) : new Date(), // Default quantity to 1 if not provided
      color: color || "defaultColor", // Default color if not provided
      size: size || "defaultSize", // Default size if not provided
    };
    const result = await addToCart({ cartItem });

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("error from cart adding item route : ", error);
    return new Response(
      JSON.stringify({ error: "Failed to add item to cart" }),
      {
        status: 500,
      }
    );
  }
}
