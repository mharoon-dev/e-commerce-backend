import express from "express";
export const authRouter = express.Router();
import { isUserLoggedIn, login, register } from "../controllers/auth.js";
import { verifyToken } from "./verifyToken.js";

// registeration
// http://localhost:5000/api/auth/register
// post
authRouter.post("/register", register);

// login
// http://localhost:5000/api/auth/login
// post
authRouter.post("/login", login);

// isUserLoggedIn
// http://localhost:7000/api/auth/isuserloggedin
// get
authRouter.get("/isuserloggedin", verifyToken, isUserLoggedIn);
