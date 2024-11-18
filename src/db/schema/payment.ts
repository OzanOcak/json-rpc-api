import {
  pgTable,
  serial,
  varchar,
  timestamp,
  numeric,
  integer,
} from "drizzle-orm/pg-core";
import { order } from "./order";

export const payment = pgTable("payment", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id")
    .notNull()
    .references(() => order.id),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  paymentDate: timestamp("payment_date").defaultNow(),
  paymentMethod: varchar("payment_method", { length: 50 }).notNull(),
});
