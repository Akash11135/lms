import { getAllProducts } from "@/lib/db/queries/getAllProducts";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await getAllProducts();
    return NextResponse.json(res);
  } catch (error) {
    console.log("Error in GET products route", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
