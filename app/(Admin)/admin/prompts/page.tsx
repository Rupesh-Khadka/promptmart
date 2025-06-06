import React from "react";
import Heading from "../../components/general/Heading";
import Prompts from "../../components/general/Prompts";
import { prisma } from "@/app/utils/db";

export default async function AllPrompt() {
  const data = await prisma.prompts.findMany({
    include: {
      orders: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return (
    <div>
      <Heading
        title="Becodemy - Admin"
        description="Becodemy is a platform for students to learn and get help from teachers"
        keywords="Programming,MERN,Redux,Machine Learning"
      />
      <div className="flex min-h-screen ">
        <div className="w-full">
          <Prompts data={data} />
        </div>
      </div>
    </div>
  );
}
