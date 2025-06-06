import { cart } from "@/db/schema";
import { db } from "@/lib/db";
import addToCart from "@/lib/db/queries/addToCart";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

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

export async function GET() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const userId = user?.id;
  try {
    if (!userId) {
      return new NextResponse(JSON.stringify({ error: "Not logged in" }), {
        status: 401,
      });
    }

    const result = await db.select().from(cart).where(eq(cart.userId, userId));

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error in getting cart items:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 }
    );
  } finally {
    console.log("route get executed.", userId);
  }
}
