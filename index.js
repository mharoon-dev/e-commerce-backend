import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/default.js";
import { userRouter } from "./routes/user.js";
import { authRouter } from "./routes/auth.js";
import { productRouter } from "./routes/product.js";
import { categoryRouter } from "./routes/category.js";
import { cartRouter } from "./routes/cart.js";
import { orderRouter } from "./routes/order.js";
import { stripeRouter } from "./routes/stripe.js";
import { winDrawRouter } from "./routes/windraw.js";

// const PORT = 5000;

const app = express();

dotenv.config();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);

connectDB();

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/carts", cartRouter);
app.use("/api/orders", orderRouter);
app.use("/api/checkout", stripeRouter);
app.use("/api/windraws", winDrawRouter);

// const limiter = rateLimit({
//     windowMs: 1 * 60 * 1000, // 15 minutes
//     limit: 4, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
//     // standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
//     // legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
//     // store: ... , // Use an external store for consistency across multiple server instances.
//     message: "Too many requests, please try again later.",
// })

// Apply the rate limiting middleware to all requests.
// app.use(limiter)

app.listen(process.env.PORT, () => {
  console.log(`Server is Running at http://localhost:${process.env.PORT}`);
});
