import { pgTable, serial, timestamp, integer, text } from "drizzle-orm/pg-core";
import { product } from "./product";
import { user } from "./user";

export const review = pgTable("review", {
  id: serial("id").primaryKey(),
  productId: integer("product-id")
    .notNull()
    .references(() => product.id),
  userId: integer("user_id")
    .notNull()
    .references(() => user.id),
  rating: integer("rating").notNull(),
  comment: text("comment"),
  createdAt: timestamp("created_at").defaultNow(),
});
