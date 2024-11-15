import { rpcClient } from "typed-rpc";
import type { MyService } from "../api/service";

const client = rpcClient<MyService>("http://localhost:4000/api");

async function callApi() {
  try {
    const categories = await client.getCategoriesSelect();
    console.log(categories);
  } catch (error) {
    console.error(error);
  }
}

callApi();
