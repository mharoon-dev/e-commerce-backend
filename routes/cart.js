import express from "express";
import {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "../routes/verifyToken.js";
import {
  createCart,
  deleteCart,
  getAllCart,
  getCart,
  updateCart,
} from "../controllers/cart.js";
export const cartRouter = express.Router();

// create
// http://localhost:5000/api/cart
// post
cartRouter.post("/", verifyToken, createCart);

// updat
// http://localhost:5000/api/cart/:id
// put
cartRouter.put("/:id", verifyTokenAndAuthorization, updateCart);

// delete
// http://localhost:5000/api/cart/:id
// delete
cartRouter.delete("/:id", verifyTokenAndAuthorization, deleteCart);

// get
// http://localhost:5000/api/cart/find/:userId
// get
cartRouter.get("/find/:userId", verifyTokenAndAuthorization, getCart);

// get all
// http://localhost:5000/api/cart
// get
cartRouter.get("/", verifyTokenAndAdmin, getAllCart);
