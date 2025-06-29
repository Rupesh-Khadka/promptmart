import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SCERETE_KEY!, {
  apiVersion: "2025-05-28.basil",
  typescript: true,
});
