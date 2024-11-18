import {
  pgTable,
  serial,
  timestamp,
  varchar,
  integer,
  numeric,
} from "drizzle-orm/pg-core";
import { user } from "./user";

export const order = pgTable("order", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => user.id),
  orderDate: timestamp("order_date").defaultNow(),
  status: varchar("status", { length: 50 }).notNull(),
  total: numeric("total", { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
