import { prisma } from "@/app/utils/db";
import { stripe } from "@/app/lib/stripe";
import { headers } from "next/headers";
import Stripe from "stripe";
import { newOrder } from "@/app/action";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook verification failed:", err);
    return new Response("Webhook verification failed", { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  try {
    if (event.type === "checkout.session.completed") {
      const customerId = session.customer;
      console.log("Received Stripe event:", event.type);
      const user = await prisma.user.findUnique({
        where: {
          stripeCustomerId: customerId as string,
        },
        select: {
          id: true,
        },
      });

      if (!user) {
        return new Response("No user found");
      }

      const metadata = session.metadata;
      if (!metadata?.promptId || !metadata?.promptName) {
        return NextResponse.json(
          { error: "Missing metadata in Stripe session" },
          { status: 400 }
        );
      }
      console.log("Payment types", session.payment_method_types[0]);
      await newOrder({
        userId: user.id,
        promptId: metadata.promptId,
        promptName: metadata.promptName,
        payment_id: session.payment_intent as string,
        payment_method: "Visa",
      });
    }
  } catch (err) {
    console.error("Error processing checkout.session.completed:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
  return new Response(null, { status: 200 });
}
