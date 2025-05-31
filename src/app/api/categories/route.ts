import getAllCategories from "@/lib/db/queries/getAllCategories";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await getAllCategories();

    return NextResponse.json(res);
  } catch (error) {
    console.log("error in getting data from category route.", error);
  }
}
