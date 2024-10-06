import express from "express";
import { getWinDraw, reqWindrw, updateWindrw } from "../controllers/windraw.js";
export const winDrawRouter = express.Router();

// create
// http://localhost:5000/api/windraws
// post
winDrawRouter.post("/", reqWindrw);

// update
// http://localhost:5000/api/windraws/:id
// put
winDrawRouter.put("/:id", updateWindrw);

// get all
// http://localhost:5000/api/windraws
// get
winDrawRouter.get("/", getWinDraw);
