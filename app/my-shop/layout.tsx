import React from "react";
import { ShopSideBar } from "@/components/general/shop/ShopSideBar";
import { requireUser } from "../utils/requireUser";

export default async function MyShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireUser();

  return (
    <div className="flex w-full min-h-screen bg-[#0F172A]">
      <aside className="bg-[#111C42] w-[20%] 2xl:w-[17%]  sticky top-0 left-0 z-[20]">
        <ShopSideBar />
      </aside>
      <main className="flex-1 p-6 overflow-y-auto">{children}</main>
    </div>
  );
}
