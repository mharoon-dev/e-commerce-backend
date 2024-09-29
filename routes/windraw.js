import express from "express";
import { reqWindrw, updateWindrw } from "../controllers/windraw.js";
export const winDrawRouter = express.Router();

// create
// http://localhost:5000/api/windraw
// post
winDrawRouter.post("/", reqWindrw);

// update
// http://localhost:5000/api/windraw/:id
// put
winDrawRouter.put("/:id", updateWindrw);
