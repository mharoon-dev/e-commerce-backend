import express from "express";
import Stripe from 'stripe';


export const stripeRouter = express.Router();
const stripe = new Stripe(process.env.STRIPE_KEY);

stripeRouter.post("/payment", async (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
});
