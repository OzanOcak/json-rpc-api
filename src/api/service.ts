import {
  and,
  avg,
  countDistinct,
  desc,
  eq,
  exists,
  gt,
  inArray,
  isNull,
  not,
  or,
  sql,
} from "drizzle-orm";
import { db } from "../db/dbConn";
import {
  cartItem,
  category,
  order,
  orderItem,
  payment,
  product,
  productCategory,
  review,
  user,
  wishlist,
  wishlistItem,
} from "../db/schema";
import { sum } from "drizzle-orm";
import { min } from "drizzle-orm";
import { max } from "drizzle-orm";

export const myService: any = {
  getAllUsers: async () => {
    return await db.select().from(user).execute();
  },
  getUserById: async (userId: number) => {
    return await db.select().from(user).where(eq(user.id, userId)).execute();
  },
  getAllProducts: async () => {
    return await db.select().from(product).execute();
  },
  getProductByCategoryId: async (categoryId: number) => {
    return await db
      .select()
      .from(product)
      .where(eq(product.id, categoryId))
      .execute();
  },
  getOrdersByUserId: async (userId: number) => {
    return await db.select().from(order).where(eq(order.id, userId)).execute();
  },
  getOrdersWithUsers: async () => {
    return await db
      .select({
        orderId: order.id,
        userName: user.username,
        totalAmount: order.total,
      })
      .from(order)
      .innerJoin(user, eq(order.userId, user.id))
      .execute();
  },
  getOrderItemsWithProductsByOrderId: async (orderId: number) => {
    return await db
      .select({
        orderItemId: orderItem.id,
        productName: product.name,
        quantity: orderItem.quantity,
        price: orderItem.price,
      })
      .from(orderItem)
      .innerJoin(product, eq(orderItem.productId, product.id))
      .where(eq(orderItem.orderId, orderId))
      .execute();
  },
  getAllReviewsByProductId: async (productId: number) => {
    return await db
      .select()
      .from(review)
      .where(eq(review.productId, productId))
      .execute();
  },
  productAndReviewNames: async () => {
    return await db
      .select({ name: product.name })
      .from(product)
      .union(db.select({ name: review.comment }).from(review))
      .execute();
  },
  totalSalesByProduct: async () => {
    return await db
      .select({
        productId: product.id,
        totalSales: sql`SUM(${orderItem.price})`.as("total"),
      })
      .from(orderItem)
      .innerJoin(product, eq(orderItem.productId, product.id))
      .groupBy(product.id)
      .execute();
  },
  getAvarageRatingByProduct: async () => {
    return await db
      .select({
        productId: product.id,
        averageRating: sql`AVG(${review.rating})`.as("average"), // avg(review.rating)
      })
      .from(review)
      .leftJoin(product, eq(review.productId, product.id))
      .groupBy(product.id)
      .execute();
  },
  getProductsWithNoReviews: async () => {
    return await db
      .select({
        productId: product.id,
        productName: product.name,
      })
      .from(product)
      .leftJoin(review, eq(product.id, review.productId))
      .where(isNull(review.id))
      .execute();
  },
  /** ------------- Blog --------------------- */

  // Basic Queries

  getAllCartItems: async () => {
    return await db.select().from(cartItem).execute();
  },
  getCartItemById: async (cartId: number) => {
    return await db
      .select()
      .from(cartItem)
      .where(eq(cartItem.id, cartId))
      .execute();
  },
  getFilteredReview: async (productId: number, userId: number) => {
    return await db
      .select()
      .from(review)
      .where(
        and(
          eq(review.productId, productId), // Replace with actual UUID
          eq(review.userId, userId) // Replace with actual UUID
        )
      )
      .execute();
  },
  getFilteredReview2: async (userId: number) => {
    return await db
      .select()
      .from(review)
      .where(
        or(
          eq(review.userId, userId), // Replace with actual UUID
          eq(review.rating, 4) // Replace with actual UUID
        )
      )
      .execute();
  },
  getFilteredReviews: async (userId: number) => {
    return await db
      .select()
      .from(review)
      .where(
        not(
          eq(review.userId, userId) // Replace with actual UUID
        )
      )
      .execute();
  },
  getSortedReviews: async () => {
    return await db
      .select()
      .from(review)
      .orderBy(desc(review.rating)) // Sort by rating in descending order
      .execute();
  },
  getTopFiveReviews: async () => {
    return await db
      .select()
      .from(review)
      .where(eq(review.productId, 2)) // Replace with actual UUID
      .orderBy(desc(review.rating)) // Sort by rating in descending order
      .limit(5) // Limit to 5 results
      .execute();
  },
  getReviewCount: async () => {
    return await db
      .select({
        count: countDistinct(review.id), // Count the number of review IDs
      })
      .from(review)
      .where(eq(review.productId, 2)) // Replace with actual UUID
      .execute();
  },
  getTotalPayments: async () => {
    return await db
      .select({
        total: sum(payment.amount), // Sum of all payment amounts
      })
      .from(payment)
      .execute();
  },
  getAverageRating: async () => {
    return await db
      .select({
        average: avg(review.rating), // Average of ratings
      })
      .from(review)
      .where(eq(review.productId, 2)) // Replace with actual UUID
      .execute();
  },
  getMinPayment: async () => {
    return await db
      .select({
        minimum: min(payment.amount), // Minimum payment amount
      })
      .from(payment)
      .execute();
  },
  getMaxRating: async () => {
    return await db
      .select({
        maximum: max(review.rating), // Maximum rating
      })
      .from(review)
      .where(eq(review.productId, 2)) // Replace with actual UUID
      .execute();
  },
  getNumberOfReviewsByUser: async () => {
    return await db
      .select({
        userId: review.userId,
        reviewCount: countDistinct(review.id), // Count reviews for each user
      })
      .from(review)
      .groupBy(review.userId) // Group by userId
      .execute();
  },
  getFrequentReviewers: async () => {
    return await db
      .select({
        userId: review.userId,
        reviewCount: countDistinct(review.id), // Count reviews for each user
      })
      .from(review)
      .groupBy(review.userId) // Group by userId
      .having(gt(countDistinct(review.id), 1)) // Filter groups with more than 1 reviews
      .execute();
  },

  // Intermediate Queries

  getCartItemsWithProducts: async () => {
    return await db
      .select()
      .from(cartItem)
      .innerJoin(product, eq(cartItem.productId, product.id)) // Join with products table
      .execute();
  },
  getAllCartItemsWithProducts: async () => {
    return await db
      .select()
      .from(cartItem)
      .leftJoin(product, eq(cartItem.productId, product.id))
      .execute();
  },
  getAllProductsWithCartItems: async () => {
    return await db
      .select()
      .from(product)
      .rightJoin(cartItem, eq(cartItem.productId, product.id))
      .execute();
  },
  getAllCartItemsAndProducts: async () => {
    return await db
      .select()
      .from(cartItem)
      .fullJoin(product, eq(cartItem.productId, product.id))
      .execute();
  },
  getHighRatedProducts: async () => {
    return await db
      .select()
      .from(product)
      .where(
        inArray(
          product.id,
          db
            .select({ productId: avg(review.rating) })
            .from(review)
            .groupBy(review.productId)
            .having(gt(avg(review.rating), 4.0))
        )
      )
      .execute();
  },
  getUsersWithHighRatedReviews: async () => {
    return await db
      .select()
      .from(user)
      .where(
        exists(
          db
            .select()
            .from(review)
            .where(
              and(
                eq(review.userId, user.id), // Correlated subquery linking userId
                inArray(
                  product.id,
                  db
                    .select({ productId: avg(review.rating) })
                    .from(review)
                    .groupBy(review.productId)
                    .having(gt(avg(review.rating), 4.0))
                )
              )
            )
        )
      )
      .execute();
  },
  getUserIdsFromReviewsAndWishlists: async () => {
    return await db
      .select({ userId: review.userId })
      .from(review)
      .union(db.select({ userId: wishlist.userId }).from(wishlist)) // get user IDs from wishlists
      .execute();
  },
  getAllUserIdsFromReviewsAndWishlists: async () => {
    return await db
      .select({ userId: review.userId })
      .from(review)
      .unionAll(
        db.select({ userId: wishlist.userId }).from(wishlist) // get user IDs from wishlists
      )
      .execute();
  },
  getCommonUserIds: async () => {
    return await db
      .select({ userId: review.userId })
      .from(review)
      .intersect(
        db.select({ userId: wishlist.userId }).from(wishlist) // Another query to get user IDs from wishlists
      )
      .execute();
  },
  getUniqueUserIdsFromReviews: async () => {
    return await db
      .select({ userId: review.userId })
      .from(review)
      .except(
        db.select({ userId: wishlist.userId }).from(wishlist) // Another query to get user IDs from wishlists
      )
      .execute();
  },

  addNewProduct: async () => {
    return await db
      .insert(product)
      .values({
        name: "Coke",
        //description: "Bevarage",  // nullable
        price: "3.99",
        stockQuantity: 20,
      })
      .execute();
  },
  updateReview: async () => {
    return await db
      .update(review)
      .set({
        rating: 5, // New rating
        // comment: "Perfect !", // Updated comment nullable
      })
      .where(eq(review.id, 3))
      .execute();
  },
  deleteWishlistItem: async () => {
    return await db
      .delete(wishlistItem)
      .where(eq(wishlistItem.id, 2)) // Replace with actual UUID
      .execute();
  },
};

export type MyService = typeof myService;
