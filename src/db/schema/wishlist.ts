import { pgTable, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { user } from "./user";

export const wishlist = pgTable("wishlist", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => user.id),
  createdAt: timestamp("created_at").defaultNow(),
});
