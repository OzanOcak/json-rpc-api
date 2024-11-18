import { pgTable, serial, integer, varchar } from "drizzle-orm/pg-core";
import { user } from "./user";

export const address = pgTable("address", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => user.id),
  addressLine1: varchar("address_line1", { length: 255 }).notNull(),
  addressLine2: varchar("address_line2", { length: 255 }),
  city: varchar("city", { length: 255 }).notNull(),
  state: varchar("state", { length: 255 }).notNull(),
  zipCode: varchar("zip_code", { length: 20 }).notNull(),
});
