import express from "express";
import {
  deleteUser,
  getAllUser,
  getUser,
  getUserStats,
  updateUser,
} from "../controllers/users.js";
export const userRouter = express.Router();

// UPDATE
// http://localhost:5000/api/users/:id
// put
userRouter.put("/:id", updateUser);

// delete
// http://localhost:5000/api/users/:id
// put
userRouter.delete("/:id", deleteUser);

// GET USER
// http://localhost:5000/api/users/find/:id
// get
userRouter.get("/find/:id", getUser);

// GET ALL USER
// http://localhost:5000/api/users
// get
userRouter.get("/", getAllUser);

// GET USER STATS
// http://localhost:5000/api/users/stats
// get
userRouter.get("/stats", getUserStats);
