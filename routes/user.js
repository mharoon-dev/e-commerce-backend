import express from "express";
import { verifyTokenAndAdmin, verifyTokenAndAuthorization } from "./verifyToken.js";
import { deleteUser, getAllUser, getUser, getUserStats, updateUser } from "../controllers/users.js";
export const userRouter = express.Router();

// UPDATE
// http://localhost:5000/api/users/:id
// put
userRouter.put("/:id", verifyTokenAndAuthorization , updateUser);

// delete
// http://localhost:5000/api/users/:id
// put
userRouter.delete("/:id", verifyTokenAndAuthorization , deleteUser);

// GET USER
// http://localhost:5000/api/users/find/:id
// get
userRouter.get("/find/:id", verifyTokenAndAdmin,  getUser);

// GET ALL USER
// http://localhost:5000/api/users
// get
userRouter.get("/", verifyTokenAndAdmin,  getAllUser);

// GET USER STATS
// http://localhost:5000/api/users/stats
// get
userRouter.get("/stats", verifyTokenAndAdmin,  getUserStats);
