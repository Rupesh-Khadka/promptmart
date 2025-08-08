import { auth } from "@/app/utils/auth";
import { prisma } from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { userId } = await req.json();

  await prisma.user.update({
    where: { id: userId },
    data: { role: "ADMIN" },
  });

  return NextResponse.json({ success: true });
}
