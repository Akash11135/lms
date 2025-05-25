// app/api/product/[productId]/route.ts

import { getSpecificProduct } from "@/lib/db/queries/getSpecificProduct";

export async function GET(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const product = await getSpecificProduct({ productId: params.productId });
    return Response.json(product);
  } catch (err) {
    return new Response("Product not found", { status: 404 });
  }
}
