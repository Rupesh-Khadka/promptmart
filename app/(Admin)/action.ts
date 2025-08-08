"use server";

import { prisma } from "../utils/db";
import { subMonths, startOfMonth, endOfMonth } from "date-fns";
import { requireAdmin } from "../utils/requireUser";
import { promptStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

interface MonthData {
  month: string;
  count: number;
}

export async function generateLast12MonthsUserData(): Promise<{
  last12Months: MonthData[];
}> {
  const last12Months: MonthData[] = [];
  const currentDate = new Date();

  // Loop through the last 12 months
  for (let i = 11; i >= 0; i--) {
    // Get the first and last day of the current month
    const startOfPeriod = startOfMonth(subMonths(currentDate, i));
    const endOfPeriod = endOfMonth(startOfPeriod);

    const monthYear = startOfPeriod.toLocaleString("default", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    const count = await prisma.user.count({
      where: {
        role: "USER",
        createdAt: {
          gte: startOfPeriod,
          lt: endOfPeriod,
        },
      },
    });

    last12Months.push({ month: monthYear, count });
  }

  return { last12Months };
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

export async function updatePromptStatus({
  promptId,
  status,
}: {
  promptId: string;
  status: string;
}) {
  const session = await requireAdmin();
  const user = await prisma.user.findUnique({
    where: {
      id: session?.id as string,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  await prisma.prompts.update({
    where: {
      id: promptId,
    },
    data: {
      status: status as promptStatus,
    },
  });
  revalidatePath("/admin/prompts");
}

export async function getAllShops() {
  const session = await requireAdmin();

  const shopData = await prisma.shop.findMany({
    include: {
      user: {
        select: {
          id: true,
          email: true,
        },
      },
    },
  });
  return shopData.map((shop) => ({
    id: shop.id,
    name: shop.name,
    email: shop.user?.email ?? "N/A",
    avatar: shop.avatar,
    orders: shop.totalSales,
    prompts: shop.allProduct,
    rating: shop.rating,
    createdAt: shop.createdAt,
  }));
}

export async function getAllInvoices() {
  try {
    const invoices: any = await prisma.orders.findMany({
      include: {
        Prompt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    for (const invoice of invoices) {
      const userId = invoice?.userId;
      if (userId) {
        try {
          const user = await prisma.user.findUnique({
            where: {
              id: userId,
            },
          });
          invoice.user = user;
        } catch (userError: any) {
          console.log(`User with ID ${userId} not found: ${userError.message}`);
          invoice.user = null;
        }
      }
    }

    return invoices;
  } catch (error) {
    console.log(error);
  }
}
