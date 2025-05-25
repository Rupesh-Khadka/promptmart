import { prisma } from "@/app/utils/db";
import { requireUser } from "@/app/utils/requireUser";
import AllPrompts from "@/components/general/prompt/AllPrompts";
import { redirect } from "next/navigation";
import React from "react";

async function getPrompt(userId: string) {
  const data = await prisma.prompts.findMany({
    where: {
      sellerId: userId,
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
  if (!data) {
    return redirect("/");
  }
  return data || [];
}

const Prompts = async () => {
  const session = await requireUser();

  const data = await getPrompt(session.id as string);

  return (
    <div>
      <AllPrompts prompts={data} />
    </div>
  );
};

export default Prompts;
