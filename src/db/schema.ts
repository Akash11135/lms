// db/schema.ts
import {
  pgTable,
  uuid,
  varchar,
  numeric,
  text,
  timestamp,
  integer,
} from "drizzle-orm/pg-core";

export const categories = pgTable("categories", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
});

export const products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  imageUrl: text("image_url"),
  stock: integer("stock").default(0),
  categoryId: uuid("category_id").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  ratings: numeric("ratings", { precision: 2, scale: 1 }).default("4.5"),
});
