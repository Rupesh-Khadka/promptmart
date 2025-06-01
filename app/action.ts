"use server";
import { z } from "zod";
import { promptSchema, shopSchema } from "./utils/zodSchemas";
import { requireUser } from "./utils/requireUser";
import { prisma } from "./utils/db";
import { redirect } from "next/navigation";
import { stripe } from "./lib/stripe";
import { revalidatePath } from "next/cache";

export async function createShop(data: z.infer<typeof shopSchema>) {
  const session = await requireUser();

  const existingShop = await prisma.shop.findUnique({
    where: {
      userId: session.id,
    },
  });

  if (existingShop) {
    throw new Error("You already have a shop. You can only have one.");
  }

  const validateData = shopSchema.parse(data);

  await prisma.shop.create({
    data: {
      name: validateData.name,
      description: validateData.description,
      shopProductType: validateData.shopProductType,
      avatar: validateData.avatar,
      userId: session.id,
    },
  });
  return redirect("/");
}

export async function createPrompt(data: z.infer<typeof promptSchema>) {
  const session = await requireUser();
  const validateData = promptSchema.parse(data);

  const user = await prisma.user.findUnique({
    where: {
      id: session?.id as string,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  await prisma.prompts.create({
    data: {
      category: validateData.category,
      description: validateData.description,
      name: validateData.name,
      price: validateData.promptPrice,
      promptImageUrl: validateData.images,
      promptFileUrl: validateData.attachments,
      shortDescription: validateData.shortDescription,
      tags: validateData.tags,
      estimatedPrice: validateData.estimatePrice,
      sellerId: session?.id as string,
    },
  });

  await prisma.shop.update({
    where: {
      userId: session?.id as string,
    },
    data: {
      allProduct: {
        increment: 1,
      },
    },
  });

  redirect("/my-shop/prompts");
}

export async function getPrompt(pageNumber = 1, pageSize = 8) {
  try {
    const data = await prisma.prompts.findMany({
      include: {
        orders: true,
        reviews: true,
        seller: true,
      },
      where: {
        status: "Live",
      },
      take: pageSize,
      skip: (pageNumber - 1) * pageSize,
    });
    return data;
  } catch (error) {
    console.log("Internal serverl error.", error);
    return [];
  }
}

export async function getPromptById(promptId: string) {
  try {
    const data = await prisma.prompts.findUnique({
      where: {
        id: promptId,
      },
      include: {
        _count: true,
        orders: true,
        reviews: {
          include: {
            user: true,
          },
        },
        seller: {
          include: {
            Shop: true,
          },
        },
      },
    });
    return data;
  } catch (error) {
    console.log("Internal serverl error.", error);
    return null;
  }
}

export async function getPromptByCategory(PromptCategories: string) {
  try {
    const data = await prisma.prompts.findMany({
      include: {
        orders: true,
        reviews: true,
        seller: {
          include: {
            Shop: true,
          },
        },
      },
      where: {
        category: PromptCategories,
      },
    });
    return data;
  } catch (error) {
    console.log("Internal serverl error.", error);
    return null;
  }
}

export async function stripePaymentIntegration(promptId: string) {
  const user = await requireUser();

  const prompt = await prisma.prompts.findUnique({
    where: {
      id: promptId,
    },
    select: {
      id: true,
      price: true,
      name: true,
      promptImageUrl: true,
      shortDescription: true,
      seller: {
        select: {
          id: true,
          stripeCustomerId: true,
        },
      },
    },
  });

  let stripeCustomerId = user.stripeCustomerId;

  if (!stripeCustomerId) {
    const customer = await stripe.customers.create({
      email: user?.email as string,
      name: user?.name as string,
    });

    stripeCustomerId = customer.id;

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        stripeCustomerId: customer.id,
      },
    });
  }

  const amount = prompt?.price;
  if (!amount) {
    throw new Error("Invalid purchase");
  }

  if (prompt.seller.id === user.id) {
    throw new Error("The owner cannot purchase its own product");
  }

  const session = await stripe.checkout.sessions.create({
    customer: stripeCustomerId,
    line_items: [
      {
        price_data: {
          product_data: {
            name: `${prompt.name} buying`,
            description: `${prompt.shortDescription}`,
            images: [prompt.promptImageUrl[0]],
          },
          currency: "USD",
          unit_amount: prompt.price * 100,
        },
        quantity: 1,
      },
    ],
    metadata: {
      promptId: promptId,
      promptName: prompt.name,
    },
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_URL}/payment/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/payment/cancel`,
  });

  return redirect(session.url as string);

  // return session;
}

export async function newOrder({
  userId,
  promptId,
  payment_id,
  payment_method,
  promptName,
}: {
  userId: string;
  promptId: string;
  payment_id: string;
  payment_method: string;
  promptName: string;
}) {
  await prisma.orders.create({
    data: {
      userId,
      payment_id,
      payment_method,
      promptId,
      promptName,
    },
  });
}

export async function getOrders() {
  const session = await requireUser();
  try {
    const orders = await prisma.orders.findMany({
      where: {
        userId: session?.id as string,
      },
      include: {
        Prompt: {
          include: {
            reviews: true,
          },
        },
      },
    });
    return orders;
  } catch (error) {
    console.log("Internal serverl error.", error);
    return null;
  }
}

export async function newReview(
  promptId: string,
  review: string,
  rating: number
) {
  const session = await requireUser();

  await prisma.reviews.create({
    data: {
      promptId,
      userId: session.id as string,
      comment: review,
      rating,
    },
  });

  const aggregate = await prisma.reviews.aggregate({
    where: { promptId },
    _avg: {
      rating: true,
    },
  });

  const averageRating = aggregate._avg.rating || 0;

  await prisma.prompts.update({
    where: { id: promptId },
    data: {
      rating: averageRating,
    },
  });

  const promptDetails = await prisma.prompts.findUnique({
    where: {
      id: promptId,
    },
    include: {
      seller: true,
    },
  });

  const shop = await prisma.shop.findUnique({
    where: {
      userId: promptDetails?.sellerId,
    },
  });

  if (shop) {
    const shopRatings = shop.rating + rating;
    await prisma.shop.update({
      where: {
        userId: promptDetails?.sellerId,
      },
      data: {
        rating: shop.rating === 0 ? shopRatings : shopRatings / 2,
      },
    });
  }

  revalidatePath(`/my-orders`);
}

export async function getUserOrders(userID: string) {
  const user = await requireUser();

  const orders = await prisma.orders.findMany({
    where: {
      Prompt: {
        sellerId: userID,
      },
    },
    include: {
      Users: {
        select: {
          name: true,
          email: true,
        },
      },
      Prompt: {
        select: {
          name: true,
          price: true,
        },
      },
    },
  });
  return orders;
}
