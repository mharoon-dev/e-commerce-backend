import express from "express";
export const authRouter = express.Router();
import { login, register } from "../controllers/auth.js";

// registeration
// http://localhost:5000/api/auth/register
// post
authRouter.post("/register", register);

// login
// http://localhost:5000/api/auth/login
// post
authRouter.post("/login", login);
