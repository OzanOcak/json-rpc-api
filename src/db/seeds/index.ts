import { db, DB } from "../dbConn"; // Import  database connection
import * as schema from "../schema"; // Import  schema definitions
import { sql, Table } from "drizzle-orm";

import users from "./data/users.json";
import products from "./data/products.json";
import orders from "./data/orders.json";
import orderItems from "./data/order_items.json";
import carts from "./data/carts.json";
import cartItems from "./data/cart_items.json";
import reviews from "./data/reviews.json";
import addresses from "./data/addresses.json";
import payments from "./data/payments.json";
import wishlists from "./data/wishlists.json";
import wishlistItems from "./data/wishlist_items.json";
import categories from "./data/categories.json";
import productCategories from "./data/product_category.json";

// Array of tables and their corresponding JSON files
const seedData = [
  { table: schema.user, data: users },
  { table: schema.product, data: products },
  { table: schema.order, data: orders },
  { table: schema.orderItem, data: orderItems },
  { table: schema.cart, data: carts },
  { table: schema.cartItem, data: cartItems },
  { table: schema.review, data: reviews },
  { table: schema.address, data: addresses },
  { table: schema.payment, data: payments },
  { table: schema.wishlist, data: wishlists },
  { table: schema.wishlistItem, data: wishlistItems },
  { table: schema.category, data: categories },
  { table: schema.productCategory, data: productCategories },
];

async function resetTable(db: DB, table: Table) {
  return db.execute(sql`truncate table ${table} restart identity cascade`);
}

export default async function seed(db: DB) {
  console.log(seedData.length + " tables are going to be created....");

  // Seed new data
  for (let { table, data } of seedData) {
    if (table === schema.payment) {
      data = data.map((payment) => ({
        ...payment,
        paymentDate: new Date(payment.paymentDate), // Convert to Date object
      }));
    }

    if (table === schema.order) {
      data = data.map((order) => ({
        ...order,
        orderDate: new Date(order.orderDate), // Convert to Date object
      }));
    }

    try {
      await db.insert(table).values(data);
      console.log(`Inserted data into ${table[0]}`);
    } catch (error) {
      console.error(`Error inserting data into ${table[0]}:`, error);
    }
  }
}
async function main() {
  try {
    await seed(db);
  } catch (error) {
    console.error(`Error during seeding:`, error);
  } finally {
    console.log("\nDatabase's tables are successfully seeded!\n");
    process.exit(0);
  }
}

// Start the seeding process
main();
