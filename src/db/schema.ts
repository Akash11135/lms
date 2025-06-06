// db/schema.ts
import {
  integer,
  numeric,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
  varchar,
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

export const properties = pgTable("properties", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
});

export const propertyValues = pgTable("property_values", {
  id: uuid("id").defaultRandom().primaryKey(),
  value: text("value").notNull(),
  propertyId: uuid("property_id")
    .references(() => properties.id)
    .notNull(),
});

//join table for properties
export const productProperties = pgTable("product_properties", {
  id: uuid("id").defaultRandom().notNull(),
  productId: uuid("product_id").references(() => products.id),
  propertyValueId: uuid("property_value_id").references(
    () => propertyValues.id
  ),
});

export const users = pgTable("users", {
  id: varchar("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 100 }),
  picture: text("picture"),
  phone: varchar("phone", { length: 20 }),
  familyName: varchar("family_name", { length: 100 }),
  address: text("address"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const contactUs = pgTable("contact_us", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const cart = pgTable("cart", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: varchar("user_id")
    .references(() => users.id)
    .notNull(),
  productId: uuid("product_id")
    .references(() => products.id)
    .notNull(),
  quantity: integer("quantity").default(1).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  color: text("color"),
  size: text("size"),
});
