import express from "express";
import {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getAllCategory,
} from "../controllers/category.js";
export const categoryRouter = express.Router();

// add
// http://localhost:5000/api/categories/:id
// put
categoryRouter.post("/", createCategory);

// update
// http://localhost:5000/api/categories/:id
// put
categoryRouter.put("/:id", updateCategory);

// delete
// http://localhost:5000/api/categories/:id
// put
categoryRouter.delete("/:id", deleteCategory);

// GET
// http://localhost:5000/api/categories/find/:id
// get
categoryRouter.get("/find/:id", getCategory);

// GET ALL USER
// http://localhost:5000/api/categories
// get
categoryRouter.get("/", getAllCategory);
