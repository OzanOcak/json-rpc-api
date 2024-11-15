import { sql, Table } from "drizzle-orm";
import { db, DB } from "./dbConn";
import * as schema from "./schema/category";
import { seed as categorySeed } from "./seeds/category";

async function resetTable(db: DB, table: Table) {
  return db.execute(sql`truncate table ${table} restart identity cascade`);
}

async function main() {
  for (const table of [schema.default]) {
    await resetTable(db, table);
  }
  await categorySeed(db);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    console.log("Seeding done!");
    process.exit(0);
  });
