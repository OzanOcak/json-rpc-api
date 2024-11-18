import { pgTable, serial, integer } from "drizzle-orm/pg-core";
import { cart } from "./cart";
import { product } from "./product";

export const cartItem = pgTable("cart_item", {
  id: serial("id").primaryKey(),
  cartId: integer("cart_id")
    .notNull()
    .references(() => cart.id),
  productId: integer("product_id")
    .notNull()
    .references(() => product.id),
  quantity: integer("quantity").notNull(),
});
