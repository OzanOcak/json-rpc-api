import { pgTable, integer, serial } from "drizzle-orm/pg-core";
import { wishlist } from "./wishlist";
import { product } from "./product";

export const wishlistItem = pgTable("wishlist_item", {
  id: serial("id").primaryKey(),
  wishlistId: integer("wishlist_id")
    .notNull()
    .references(() => wishlist.id),
  productId: integer("product_id")
    .notNull()
    .references(() => product.id),
});
