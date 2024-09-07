import express from "express";
import { verifyTokenAndAdmin } from "../routes/verifyToken.js";
import {
  createOrder,
  deleteOrder,
  getAllOrder,
  getMonthlyIncome,
  getOrder,
  updateOrder,
} from "../controllers/order.js";
export const orderRouter = express.Router();

// create
// http://localhost:5000/api/orders
// post
orderRouter.post("/", createOrder);

// update
// http://localhost:5000/api/orders/:id
// put
orderRouter.put("/:id", verifyTokenAndAdmin, updateOrder);

// delete
// http://localhost:5000/api/orders/:id
// delete
orderRouter.delete("/:id", verifyTokenAndAdmin, deleteOrder);

// get user orders
// http:localhost:5000/api/orders/find/:userId
// get
orderRouter.get("/find/:userId", getOrder);

// get all orders
// http://localhost:5000/api/orders
// get
orderRouter.get("/", verifyTokenAndAdmin, getAllOrder);

// get monthly income
// http://localhost:5000/api/orders/income
// get
orderRouter.get("/income",  getMonthlyIncome);
