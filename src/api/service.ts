import { db } from "../db/dbConn";
import { category } from "../db/schema";

export const myService = {
  getCategoriesSelect() {
    return db.select().from(category);
  },
};

export type MyService = typeof myService;
