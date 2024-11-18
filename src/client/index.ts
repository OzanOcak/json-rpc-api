import { rpcClient } from "typed-rpc";
import type { MyService } from "../api/service";

const client = rpcClient<MyService>("http://localhost:4000/api");

async function callApi() {
  try {
    //const response = await client.getAllUsers();
    //const response = await client.getUserById(2);
    //const response = await client.getAllProducts();
    //const response = await client.getProductByCategoryId(1);
    //const response = await client.getOrdersByUserId(1);
    //const response = await client.getOrdersWithUsers();
    //const response = await client.getOrderItemsWithProductsByOrderId(1);
    //const response = await client.getAllReviewsByProductId(1);
    //const response = await client.productAndReviewNames();
    //const response = await client.totalSalesByProduct();
    //const response = await client.getAvarageRatingByProduct(); // TODO
    //const response = await client.getProductsWithNoReviews();
    //const response = await client.getAllCartItems();
    //const response = await client.getCartItemById(1);
    //const response = await client.getFilteredReview(1, 1);
    //const response = await client.getFilteredReview2(1, 1);
    //const response = await client.getFilteredReviews(1);
    //const response = await client.getSortedReviews();
    //const response = await client.getTopFiveReviews();
    //const response = await client.getReviewCount();getTotalPayments
    //const response = await client.getTotalPayments();
    //const response = await client.getAverageRating();
    //const response = await client.getMinPayment();
    //const response = await client.getMaxRating();
    //const response = await client.getNumberOfReviewsByUser();
    const response = await client.getFrequentReviewers();

    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

callApi();
