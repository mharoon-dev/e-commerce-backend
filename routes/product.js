import express from "express";
export const productRouter = express.Router();
import { verifyTokenAndAdmin } from "./verifyToken.js";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  updateProduct,
} from "../controllers/product.js";

// create
// http://localhost:5000/api/products
// post
productRouter.post("/", verifyTokenAndAdmin, createProduct);

// update
// http://localhost:5000/api/products/:id
// put
productRouter.put("/:id", verifyTokenAndAdmin, updateProduct);

// delete
// http://localhost:5000/api/products/:id
// delete
productRouter.delete("/:id", verifyTokenAndAdmin, deleteProduct);

// get
// http://localhost:5000/api/products/find/:id
// get
productRouter.get("/find/:id", getProduct);

// get all
// http://localhost:5000/api/products
// get 
productRouter.get("/", getAllProducts);
