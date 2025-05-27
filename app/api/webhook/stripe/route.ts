import { prisma } from "@/app/utils/db";
import { stripe } from "@/app/lib/stripe";
import { headers } from "next/headers";
import Stripe from "stripe";
import { newOrder } from "@/app/action";
import { NextResponse } from "next/server";
import { sendEmail } from "@/app/utils/emial";

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
      const metadata = session.metadata;

      const user = await prisma.user.findUnique({
        where: {
          stripeCustomerId: customerId as string,
        },
        select: {
          id: true,
          email: true,
        },
      });

      if (!user) {
        return new Response("No user found");
      }

      if (!metadata?.promptId || !metadata?.promptName) {
        return NextResponse.json(
          { error: "Missing metadata in Stripe session" },
          { status: 400 }
        );
      }

      try {
        await newOrder({
          userId: user.id,
          promptId: metadata.promptId,
          promptName: metadata.promptName,
          payment_id: session.payment_intent as string,
          payment_method: session.payment_method_types[0],
        });

        const prompt = await prisma.prompts.findUnique({
          where: {
            id: metadata?.promptId,
          },
          select: {
            sellerId: true,
          },
        });

        if (!prompt) {
          return new Response("Prompt not found", { status: 404 });
        }

        await prisma.shop.update({
          where: {
            userId: prompt.sellerId,
          },
          data: {
            totalSales: { increment: 1 },
          },
        });

        await sendEmail({
          to: user.email!,
          subject: "Your Order Confirmation",
          text: "",
          html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #fafafa;">
      <h1 style="font-size: 26px; color: #222; text-align: center;">🎉 Thank you for your order!</h1>

      <p style="font-size: 16px; color: #555; text-align: center;">We've received your order and will send you an update when it’s processed.</p>

      <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;" />

      <div>
        <h2 style="font-size: 20px; color: #333;">🧾 Order Summary</h2>
        <p style="font-size: 16px; color: #333;"><strong>Product:</strong> ${metadata.promptName}</p>
        ${
          metadata.promptImage
            ? `<img src="${metadata.promptImage}" alt="${metadata.promptName}" style="width: 100%; max-width: 500px; border-radius: 6px; margin: 15px 0;" />`
            : ""
        }
          <p style="font-size: 16px; color: #333;"><strong>Email:</strong> ${user.email}</p>I
          <p style="font-size: 16px; color: #333;"><strong>Order ID:</strong> ${session.payment_intent}</p>
        <p style="font-size: 16px; color: #333;"><strong>Quantity:</strong> ${metadata.quantity || 1}</p>
        <p style="font-size: 16px; color: #333;"><strong>Total:</strong> $${(session.amount_total! / 100).toFixed(2)}</p>
      </div>

      <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;" />

      <p style="font-size: 14px; color: #888; text-align: center;">If you have any questions, contact us at ${process.env.NEXT_PUBLIC_URL}</p>
    </div>
  `,
        });
      } catch (error) {
        console.error("Failed to create order or send email:", error);
        return new Response("Internal Server Error", { status: 500 });
      }
    }
  } catch (err) {
    console.error("Error processing checkout.session.completed:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
  return new Response(null, { status: 200 });
}
