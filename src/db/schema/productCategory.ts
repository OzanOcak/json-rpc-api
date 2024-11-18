import { pgTable, integer, serial } from "drizzle-orm/pg-core";
import { user } from "./user";
import { category } from "./category";

export const productCategory = pgTable("product_category", {
  id: serial("id").primaryKey(),
  productId: integer("product_id")
    .notNull()
    .references(() => user.id),
  categoryId: integer("category_id")
    .notNull()
    .references(() => category.id),
});
