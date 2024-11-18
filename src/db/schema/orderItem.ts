import { pgTable, serial, integer, numeric } from "drizzle-orm/pg-core";
import { order } from "./order";
import { product } from "./product";

export const orderItem = pgTable("order_item", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id")
    .notNull()
    .references(() => order.id),
  productId: integer("product_id")
    .notNull()
    .references(() => product.id),
  quantity: integer("quantity").notNull(),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
});
