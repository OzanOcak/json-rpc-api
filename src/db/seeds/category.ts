import categories from "./data/categories.json";
import { DB } from "../dbConn";
import { category } from "../schema";

export async function seed(db: DB) {
  await db.insert(category).values(categories);
}
