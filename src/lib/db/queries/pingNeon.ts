// src/lib/db/pingNeon.ts
import { db } from "@/lib/db";
import { sql } from "drizzle-orm";
export async function pingNeon() {
  try {
    await db.execute(sql`SELECT 1`);
  } catch (e) {
    console.error("Neon keep-alive failed:", e);
  }
}
