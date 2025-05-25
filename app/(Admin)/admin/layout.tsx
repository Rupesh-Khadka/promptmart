import { requireAdmin } from "@/app/utils/requireUser";
import React from "react";
import Sidebar from "../components/general/SideBar";
import Heading from "../components/general/Heading";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PromptMart - Admin",
  // description: "Buy & Sell High-Quality AI Prompts Instantly",s
};

export default async function AdminLAyout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireAdmin();

  return (
    <div>
      <Heading
        title="PromptMart - Admin"
        description="PromptMart is a platform for students to learn and get help from teachers"
        keywords="Programming,MERN,Redux,Machine Learning"
      />
      <div className="flex min-h-screen gap-4">
        <div className="2xl:w-[16%] w-1/5">
          <Sidebar activeItem="Dashboard" data={user} />
        </div>
        <div className="2xl:w-[84%] w-[80%]">{children}</div>
      </div>
    </div>
  );
}
