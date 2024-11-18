import { pgTable, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { user } from "./user";

export const cart = pgTable("cart", {
  id: serial("id").primaryKey(),
  userId: integer("cart")
    .notNull()
    .references(() => user.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
