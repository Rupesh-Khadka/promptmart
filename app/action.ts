"use server";
import { z } from "zod";
import {
  promptSchema,
  shopSchema,
  withdrawMethodSchema,
} from "./utils/zodSchemas";
import { requireUser } from "./utils/requireUser";
import { prisma } from "./utils/db";
import { redirect } from "next/navigation";
import { stripe } from "./lib/stripe";
import { revalidatePath } from "next/cache";
import redis from "./lib/redis";
import { clearPromptCache } from "./utils/clearPromptCache";
import { openai } from "./lib/openai";

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

  await clearPromptCache();
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

export async function getAllPrompt(page: number, pageSize = 8) {
  const cacheKey = `prompts:page:${page}:size:${pageSize}`;
  try {
    const cached = await redis.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }

    const [prompts, totalCount] = await Promise.all([
      prisma.prompts.findMany({
        include: {
          orders: true,
          reviews: true,
          seller: true,
        },
        where: {
          status: "Live",
        },
        take: pageSize,
        skip: (page - 1) * pageSize,
      }),
      prisma.prompts.count({
        where: {
          status: "Live",
        },
      }),
    ]);

    const totalPages = Math.ceil(totalCount / pageSize);

    const result = { prompts, totalPages };

    // Store the result in Redis with TTL (e.g., 5 min)
    await redis.set(cacheKey, JSON.stringify(result), "EX", 300);

    return { prompts, totalPages };
  } catch (error) {
    console.log("Internal server error.", error);
    return { prompts: [], totalPages: 0 };
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

export async function getTopSellers() {
  const sellers = await prisma.shop.findMany({
    take: 4,
    orderBy: [{ totalSales: "desc" }, { createdAt: "asc" }],
    select: {
      id: true,
      name: true,
      avatar: true,
      rating: true,
      totalSales: true,
    },
  });
  return sellers;
}

export async function getPromptByShop() {
  const session = await requireUser();

  return await prisma.prompts.findMany({
    where: {
      sellerId: session.id,
    },
    select: {
      id: true,
      name: true,
      price: true,
      rating: true,
      orders: true,
      status: true,
    },
  });
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

export async function addWithDrawMethod(
  data: z.infer<typeof withdrawMethodSchema>
) {
  const session = await requireUser();
  const validateData = withdrawMethodSchema.parse(data);

  const shop = await prisma.shop.findUnique({
    where: {
      userId: session.id,
    },
  });

  if (!shop) {
    throw new Error("Shop not found for user");
  }

  const newBanks = await prisma.banks.create({
    data: {
      sellerId: shop.id,
      account_holder_name: validateData.account_holder_name,
      bankName: validateData.bankName,
      bankAddress: validateData.bankAddress,
      account_number: validateData.account_number,
      routing_number: validateData.routing_number,
      swift_code: validateData.swift_code,
    },
  });
  revalidatePath("/my-shop/withdraw");
  return newBanks;
}

export async function addWithdraw({ amount }: { amount: number }) {
  const user = await requireUser();
  const respose = await prisma.withdraws.create({
    data: {
      sellerId: user.shop?.id,
      amount: amount,
      status: "Pending",
    },
  });
}

export const deleteWithDrawMethod = async (id: string) => {
  try {
    const user = await requireUser();
    const withDrawMethod = await prisma.banks.delete({
      where: {
        id,
      },
    });
    revalidatePath("/my-shop/withdraw");
  } catch (error) {
    console.log(error);
  }
};

export const sellerInvoices = async ({ sellerId }: { sellerId: string }) => {
  try {
    const session = await requireUser();
    const invoices = await prisma.withdraws.findMany({
      where: {
        sellerId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return invoices;
  } catch (error) {
    console.log(error);
  }
};

export async function getSellerInfo() {
  try {
    const user = await requireUser();

    const shop = await prisma.shop.findUnique({
      where: {
        userId: user.id,
      },
      include: {
        banks: true,
      },
    });

    if (!shop) {
      throw new Error("Shop not found for this user.");
    }

    const orders = await prisma.orders.findMany({
      where: {
        Prompt: {
          sellerId: shop.userId,
        },
      },
      include: {
        Prompt: {
          select: {
            price: true,
            promptImageUrl: true,
            reviews: true,
            promptFileUrl: true,
            orders: {
              include: {
                Prompt: {
                  select: {
                    price: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return { shop, orders };
  } catch (error) {
    console.error("Failed to fetch seller info:", error);
    throw new Error("Could not retrieve seller info.");
  }
}

interface MonthData {
  month: string;
  count: number;
}

export async function generateLast12MonthsOrderData(): Promise<{
  last12Months: MonthData[];
}> {
  const last12Months: MonthData[] = [];
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 1);

  for (let i = 11; i >= 0; i--) {
    const endDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - i * 28
    );
    const startDate = new Date(
      endDate.getFullYear(),
      endDate.getMonth(),
      endDate.getDate() - 28
    );

    const monthYear = endDate.toLocaleString("default", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    const allOrders = await prisma.orders.findMany();

    const orders = allOrders.filter((order) => {
      const createdAt = new Date(order.createdAt);
      return createdAt >= startDate && createdAt < endDate;
    });

    const count = orders.length;

    last12Months.push({ month: monthYear, count });
  }
  return { last12Months };
}

export async function askAI(message: string): Promise<string> {
  const response = await openai.chat.completions.create({
    model: "llama3-8b-8192",
    messages: [{ role: "user", content: message }],
  });

  return response.choices[0].message.content || "";
}
